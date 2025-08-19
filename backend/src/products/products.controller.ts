import { Request, Response } from "express";
import { sendResponse } from "../utils/sendResponse";
import { ProductRepository } from "./products.repositories";
import { ProductServices } from "./products.services";

export class ProductsController {
  constructor(private readonly productServices: ProductServices) {}

  createProduct = async (req: Request, res: Response) => {
    const product = await this.productServices.createProduct(req);
    sendResponse(res, {
      status: "success",
      code: 201,
      message: "Product created successfully",
      data: product.toResponse(),
    });
  };

  getAllProducts = async (req: Request, res: Response) => {
    const products = await this.productServices.getAllProducts();
    sendResponse(res, {
      status: "success",
      code: 200,
      message: "Products retrieved successfully",
      data: products.map((product) => product.toResponse()),
    });
  };
}

export const createProductsController = () => {
  const productRepository = new ProductRepository();
  const productServices = new ProductServices(productRepository);
  return new ProductsController(productServices);
};
