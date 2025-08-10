import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";
import { handleError } from "../utils/handleError";
import { safeDeleteFile } from "../utils/handleFiles";
import { sendResponse } from "../utils/sendResponse";
import { SubCategoryRepository } from "../repositories/subcategory.repository";
import { CategoryRepository } from "../repositories/category.repository";

class CategoryController {
  constructor(private categoryService: CategoryServices) {}

  createCategory = async (req: Request, res: Response) => {
    try {
      const savedCategory = await this.categoryService.createCategory(req);
      sendResponse(res, {
        status: "success",
        code: 201,
        message: "Category created successfully",
        data: savedCategory,
      });
    } catch (error) {
      if (req.file) {
        await safeDeleteFile(req.file.path);
      }
      handleError.handle(res, error);
    }
  };

  getCategoryById = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryService.getCategoryById(
        req.params.id
      );
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "Category fetched successfully",
        data: category,
      });
    } catch (error) {
      handleError.handle(res, error);
    }
  };

  getAllCategories = async (req: Request, res: Response) => {
    try {
      const result = await this.categoryService.getAllCategories(req.query);
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "Categories retrieved successfully",
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      handleError.handle(res, error);
    }
  };

  getNameValueCategoriesList = async (req: Request, res: Response) => {
    try {
      const result = await this.categoryService.getNameValueCategoriesList(
        req.query
      );
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "Categories retrieved successfully",
        data: result.data,
        pagination: {
          ...result.pagination,
          lastId: result.pagination.lastId ?? undefined,
        },
      });
    } catch (error) {
      handleError.handle(res, error);
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryService.updateCategory(req);
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      handleError.handle(res, error);
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    try {
      const category = await this.categoryService.deleteCategory(req);
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "Category deleted successfully",
        data: category,
      });
    } catch (error) {
      handleError.handle(res, error);
    }
  };
}

export const createCategoryController = () => {
  const subCategoryRepository = new SubCategoryRepository();
  const categoryRepository = new CategoryRepository();
  const categoryService = new CategoryServices(
    categoryRepository,
    subCategoryRepository
  );
  return new CategoryController(categoryService);
};
