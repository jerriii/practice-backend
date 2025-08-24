import { Request } from "express";
import { ProductRepository } from "./products.repositories";
import { validateRequest } from "../utils/validateRequest";
import { ValidationError } from "../error";
import { processBooleanField } from "../utils/objectUtils";
import { IProduct } from "./products.interface";
import mongoose from "mongoose";
import { ProductsDto } from "./products.dto";
import { handleMultipleFileUploads } from "../utils/handleFiles";

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

  async getAllProducts(): Promise<ProductsDto[]> {
    const products = await this.productRepository.findAll();
    return ProductsDto.fromEntities(products);
  }
}
