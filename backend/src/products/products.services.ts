import { Request } from "express";
import { ProductRepository } from "./products.repositories";
import { getUpdatedFields, processBooleanField } from "../utils/objectUtils";
import { IProduct } from "./products.interface";
import mongoose from "mongoose";
import { ProductsDto } from "./products.dto";
import {
  handleMultipleFileUploads,
  safeDeleteFile,
} from "../utils/handleFiles";
import Category from "../categories/categories.model";
import SubCategory from "../subcategories/subcategories.model";
import { PaginationMeta } from "../types/index.types";
import { NotFoundError } from "../error";
import { getAbsolutePath } from "../config/paths";

export class ProductServices {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(req: Request): Promise<ProductsDto> {
    //Get image paths
    const productImages = await handleMultipleFileUploads(
      req.files as Express.Multer.File[]
    );

    //Process boolean field
    const isActive = processBooleanField(req.body.isActive);

    //Create data to save
    const dataToSave: IProduct = {
      name: req.body.name,
      slug: req.body.slug,
      categoryId: new mongoose.Types.ObjectId(String(req.body.categoryId)),
      subcategoryId: new mongoose.Types.ObjectId(
        String(req.body.subcategoryId)
      ),
      price: req.body.price,
      productCount: req.body.productCount,
      isActive: isActive ?? true, // default true if not provided
      productImages,
    };

    const createdProduct = await this.productRepository.create(dataToSave);
    return ProductsDto.fromEntity(createdProduct);
  }

  async getAllProducts(queryParams: any): Promise<{
    data: ProductsDto[];
    pagination: PaginationMeta;
  }> {
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    // const isActive =
    //   queryParams.isActive === "all" ? undefined : queryParams.isActive;
    const search = queryParams.search;

    const query: any = {};
    // if (isActive !== undefined) query.isActive = isActive === "true";
    if (search) {
      // First, find categories that match the search term
      const matchingCategories = await Category.find({
        name: { $regex: search, $options: "i" },
      }).select("_id");

      const matchingSubCategories = await SubCategory.find({
        name: { $regex: search, $options: "i" },
      }).select("_id");

      const categoryIds = matchingCategories.map((cat) => cat._id);
      const subCategoryIds = matchingSubCategories.map((subCat) => subCat._id);
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { categoryId: { $in: categoryIds } },
        { subcategoryId: { $in: subCategoryIds } },
      ];
    }
    const [products, count] = await Promise.all([
      this.productRepository.findAll(query, page, limit),
      this.productRepository.count(query),
    ]);
    return {
      data: ProductsDto.fromEntities(products),
      pagination: {
        page: page,
        limit: limit,
        totalData: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async getProductById(id: string): Promise<ProductsDto> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundError("Product not found");
    return ProductsDto.fromEntity(product);
  }

  async updateProduct(req: Request): Promise<ProductsDto> {
    const existing = await this.productRepository.findById(req.params.id);
    const files = req.files as Express.Multer.File[];
    if (!existing) {
      if (files && files.length > 0) {
        await safeDeleteFile(files[0].path);
      }
      throw new NotFoundError("Product not found");
    }

    // Track old image for cleanup
    let oldImagePath: string[] | null = null;

    // If new image uploaded, store old image path
    if (files && existing.productImages) {
      oldImagePath = await Promise.all(
        existing.productImages.map((imagePath) => getAbsolutePath(imagePath))
      );
    }

    // Safely construct update object
    const updateData = getUpdatedFields(existing, req.body);
    updateData.isActive = processBooleanField(req.body.isActive);

    // If new image is uploaded
    if (files && files.length > 0) {
      updateData.productImages = await handleMultipleFileUploads(files);
    }

    // Perform update
    const updated = await this.productRepository.updateById(
      req.params.id,
      updateData
    );

    if (!updated) throw new NotFoundError("Product not found");

    // Delete old image after successful update
    if (oldImagePath) {
      await Promise.all(oldImagePath.map((path) => safeDeleteFile(path)));
    }

    return ProductsDto.fromEntity(updated);
  }

  async deleteProduct(req: Request): Promise<void> {
    const existing = await this.productRepository.findById(req.params.id);
    if (!existing) throw new NotFoundError("Product not found");

    // Delete associated images
    if (existing.productImages) {
      const imagePaths = await Promise.all(
        existing.productImages.map((img) => getAbsolutePath(img))
      );
      await Promise.all(imagePaths.map((path) => safeDeleteFile(path)));
    }

    await this.productRepository.deleteById(req.params.id);
  }
}
