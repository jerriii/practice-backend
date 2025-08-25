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
    const products = await this.productServices.getAllProducts(req.query);
    sendResponse(res, {
      status: "success",
      code: 200,
      message: "Products retrieved successfully",
      data: products.data.map((product) => product.toResponse()),
      pagination: products.pagination,
    });
  };
  updateProduct = async (req: Request, res: Response) => {
    const product = await this.productServices.updateProduct(req);
    sendResponse(res, {
      status: "success",
      code: 200,
      message: "Product updated successfully",
      data: product.toResponse(),
    });
  };
  deleteProduct = async (req: Request, res: Response) => {
    await this.productServices.deleteProduct(req);
    sendResponse(res, {
      status: "success",
      code: 200,
      message: "Product deleted successfully",
    });
  };
}

export const createProductsController = () => {
  const productRepository = new ProductRepository();
  const productServices = new ProductServices(productRepository);
  return new ProductsController(productServices);
};
