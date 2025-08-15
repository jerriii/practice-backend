import { Request } from "express";
import { validationResult } from "express-validator";
import { SubCategoryRepository } from "./subcategories.repository";
import { safeDeleteFile } from "../utils/handleFiles";
import { NotFoundError, ValidationError } from "../error";
import { getUpdatedFields, processBooleanField } from "../utils/objectUtils";
import { getAbsolutePath, getRelativePath } from "../config/paths";
import Category from "../categories/categories.model";
import { handleError } from "../utils/handleError";
import { ISubCategory } from "./subcategories.interface";

export class SubCategoryServices {
  constructor(private subCategoryRepository: SubCategoryRepository) {}

  createSubCategory = async (req: Request) => {
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
    const dataToSave: ISubCategory = {
      name: req.body.name,
      categoryId: req.body.categoryId,
      description: req.body.description,
      subCategoryImage: imagePath,
      productCount: 0,
      isActive,
    };
    try {
      const savedSubCategory =
        await this.subCategoryRepository.create(dataToSave);
      return savedSubCategory;
    } catch (error) {
      throw error;
    }
  };

  async getAllSubCategories(queryParams: any) {
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const isActive =
      queryParams.isActive === "all" ? undefined : queryParams.isActive;
    const search = queryParams.search;

    const query: any = {};
    if (isActive !== undefined) query.isActive = isActive === "true";
    if (search) {
      // First, find categories that match the search term
      const matchingCategories = await Category.find({
        name: { $regex: search, $options: "i" },
      }).select("_id");

      const categoryIds = matchingCategories.map((cat) => cat._id);
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { categoryId: { $in: categoryIds } },
      ];
    }

    const [subCategories, total] = await Promise.all([
      this.subCategoryRepository.getAllSubCategoriesList(query, page, limit),
      this.subCategoryRepository.countSubCategories(query),
    ]);

    return {
      data: subCategories,
      pagination: {
        page,
        limit,
        totalData: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getSubCategoryById(id: string) {
    const subCategory =
      await this.subCategoryRepository.getSubCategoryItemById(id);
    if (!subCategory) throw new NotFoundError("Sub Category not found");
    return subCategory;
  }

  async updateSubCategory(req: Request) {
    await handleError.handleValidationErrors(req);

    // Find existing subcategory
    const existing = await this.subCategoryRepository.getSubCategoryItemById(
      req.params.id
    );
    if (!existing) {
      if (req.file) await safeDeleteFile(req.file.path);
      throw new NotFoundError("Sub Category not found");
    }

    // Track old image for cleanup
    let oldImagePath: string | null = null;

    // If new image uploaded, store old image path
    if (req.file && existing.subCategoryImage) {
      oldImagePath = await getAbsolutePath(existing.subCategoryImage);
    }

    // Safely construct update object
    const updateData = getUpdatedFields(existing, req.body);
    updateData.isActive = processBooleanField(req.body.isActive);

    // If new image is uploaded
    if (req.file) {
      updateData.subCategoryImage = await getRelativePath(req.file.path);
    }

    // Perform update
    const updated = await this.subCategoryRepository.updateById(
      req.params.id,
      updateData
    );
    if (!updated) throw new NotFoundError("Sub Category not found");

    // Delete old image after successful update
    if (oldImagePath) {
      await safeDeleteFile(oldImagePath);
    }

    return updated;
  }

  async deleteSubCategory(id: string) {
    const subCategory =
      await this.subCategoryRepository.getSubCategoryItemById(id);
    if (!subCategory) throw new NotFoundError("Sub Category not found");

    // Delete image file if exists
    if (subCategory.subCategoryImage) {
      const imagePath = await getAbsolutePath(subCategory.subCategoryImage);
      await safeDeleteFile(imagePath);
    }

    await this.subCategoryRepository.deleteById(id);
  }
}
