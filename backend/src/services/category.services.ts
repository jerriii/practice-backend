import { NotFoundError, ValidationError } from "../error";
import Category, { ICategory } from "../models/category.model";
import { CategoryRepository } from "../repositories/category.repository";
import { safeDeleteFile } from "../utils/handleFiles";
import { getAbsolutePath, getRelativePath } from "../config/paths";
import { Request } from "express";
import { validationResult } from "express-validator";
import fs from "fs";
import { getUpdatedFields, processBooleanField } from "../utils/objectUtils";
import { SubCategoryRepository } from "../repositories/subcategory.repository";
import mongoose, { FilterQuery } from "mongoose";

interface CategoriesResult {
  data: Array<{
    name: string;
    value: string;
  }>;
  pagination: {
    limit: number;
    hasMore: boolean;
    lastId: string | null;
  };
}

export class CategoryServices {
  constructor(
    private repository: CategoryRepository,
    private subCategoryRepository: SubCategoryRepository
  ) {}

  async deleteCategory(req: Request) {
    const subCategoriesCount =
      await this.subCategoryRepository.countSubCategoriesWithCategoryId(
        req.params.id
      );
    if (subCategoriesCount > 0) {
      throw new ValidationError(
        `Cannot delete. ${subCategoriesCount} subcategories linked.`
      );
    }
    const category = await this.repository.getCategoryItemById(req.params.id);
    if (!category) {
      throw new NotFoundError("Category not found");
    }

    // Delete the image file if it exists
    if (category.categoryImage) {
      const imagePath = await getAbsolutePath(category.categoryImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    return await this.repository.deleteById(req.params.id);
  }

  async createCategory(req: Request) {
    const errors = validationResult(req);

    //Check if validation errors exist
    if (!errors.isEmpty()) {
      if (req.file) await safeDeleteFile(req.file.path);
      const errorDetails = errors.array().map((err) => ({
        field: err.type === "field" ? err.path : "unknown",
        message: err.msg,
      }));
      throw new ValidationError("Invalid entries", errorDetails);
    }

    //Check if image is uploaded
    if (!req.file) {
      throw new ValidationError("Image is required");
    }

    //Process boolean field
    const isActive = processBooleanField(req.body.isActive);

    //Get image path
    const imagePath = await getRelativePath(req.file.path);

    //Create data to save
    const dataToSave: ICategory = {
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description,
      categoryImage: imagePath,
      productCount: 0,
      isActive,
    };

    try {
      return await this.repository.create(dataToSave);
    } catch (error) {
      // Clean up uploaded file if database operation fails
      await safeDeleteFile(req.file.path);
      throw error; // Re-throw for controller to handle
    }
  }

  async updateCategory(req: Request) {
    const errors = validationResult(req);

    // Handle validation errors
    if (!errors.isEmpty()) {
      if (req.file) await safeDeleteFile(req.file.path);
      const errorDetails = errors.array().map((err) => ({
        field: err.type === "field" ? err.path : "unknown",
        message: err.msg,
      }));
      throw new ValidationError("Invalid entries", errorDetails);
    }

    // Find existing category
    const existing = await this.repository.getCategoryItemById(req.params.id);
    if (!existing) {
      if (req.file) await safeDeleteFile(req.file.path);
      throw new NotFoundError("Category not found");
    }

    // Track old image for cleanup
    let oldImagePath: string | null = null;

    // If new image uploaded, store old image path
    if (req.file && existing.categoryImage) {
      oldImagePath = await getAbsolutePath(existing.categoryImage);
    }

    // Safely construct update object
    const updateData = getUpdatedFields(existing, req.body);
    updateData.isActive = processBooleanField(req.body.isActive);

    // If new image is uploaded
    if (req.file) {
      updateData.categoryImage = await getRelativePath(req.file.path);
    }

    // Perform update
    const updated = await this.repository.updateById(req.params.id, updateData);
    if (!updated) throw new NotFoundError("Category not found");

    // Delete old image after successful update
    if (oldImagePath) {
      await safeDeleteFile(oldImagePath);
    }

    return updated;
  }

  async getAllCategories(queryParams: any) {
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const isActive =
      queryParams.isActive === "all" ? undefined : queryParams.isActive;
    const search = queryParams.search;

    const query: any = {};
    if (isActive !== undefined) query.isActive = isActive === "true";
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const [categories, total] = await Promise.all([
      this.repository.getAllCategoriesList(query, page, limit),
      this.repository.countCategories(query),
    ]);

    return {
      data: categories,
      pagination: {
        page,
        limit,
        totalData: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getNameValueCategoriesList(queryParams: {
    limit?: number | string;
    lastId?: string; // API always receives string
    search?: string;
    isActive?: string | boolean;
  }): Promise<CategoriesResult> {
    const limit = Math.min(Number(queryParams.limit) || 10, 100);
    const { lastId, search } = queryParams;

    // Build query
    const query: FilterQuery<typeof Category> = {};

    // Handle isActive filter
    if (queryParams.isActive !== undefined && queryParams.isActive !== "all") {
      query.isActive =
        queryParams.isActive === true || queryParams.isActive === "true";
    }

    // Handle lastId
    if (lastId && mongoose.Types.ObjectId.isValid(lastId)) {
      const lastObjectId = new mongoose.Types.ObjectId(lastId);
      query._id = { $lt: lastObjectId };
    }

    // Handle search filter
    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }];
    }

    // Fetch data
    const result = await this.repository.getNameValueCategoriesList(
      query,
      limit,
      lastId // Pass string ID; repository will convert to ObjectId
    );

    // Determine pagination
    const hasMore = result.length > limit;
    const resultCategories = hasMore ? result.slice(0, -1) : result;

    // Return structured result
    return {
      data: resultCategories.map((c) => ({
        name: c.name,
        value: c._id.toString(),
      })),
      pagination: {
        limit,
        hasMore,
        lastId: hasMore ? result[result.length - 2]._id.toString() : null,
      },
    };
  }

  async getCategoryById(id: string) {
    return await this.repository.getCategoryItemById(id);
  }
}
