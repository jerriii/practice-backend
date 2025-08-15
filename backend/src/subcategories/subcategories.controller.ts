import { Request, Response } from "express";
import { handleError } from "../utils/handleError";
import { safeDeleteFile } from "../utils/handleFiles";
import { sendResponse } from "../utils/sendResponse";
import { SubCategoryServices } from "./subcategories.services";
import { SubCategoryRepository } from "./subcategories.repository";
class SubCategoryController {
  constructor(private subCategoryService: SubCategoryServices) {}

  createSubCategory = async (req: Request, res: Response) => {
    try {
      const savedCategory =
        await this.subCategoryService.createSubCategory(req);
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

  getAllSubCategories = async (req: Request, res: Response) => {
    try {
      const result = await this.subCategoryService.getAllSubCategories(
        req.query
      );
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "SubCategories retrieved successfully",
        data: result.data,
        pagination: result.pagination,
      });
    } catch (error) {
      handleError.handle(res, error);
    }
  };

  getSubCategoryById = async (req: Request, res: Response) => {
    try {
      const category = await this.subCategoryService.getSubCategoryById(
        req.params.id
      );
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "Category retrieved successfully",
        data: category,
      });
    } catch (error) {
      handleError.handle(res, error);
    }
  };

  updateSubCategory = async (req: Request, res: Response) => {
    try {
      const updatedCategory =
        await this.subCategoryService.updateSubCategory(req);
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (error) {
      if (req.file) {
        await safeDeleteFile(req.file.path);
      }
      handleError.handle(res, error);
    }
  };

  deleteSubCategory = async (req: Request, res: Response) => {
    try {
      await this.subCategoryService.deleteSubCategory(req.params.id);
      sendResponse(res, {
        status: "success",
        code: 200,
        message: "Category deleted successfully",
      });
    } catch (error) {
      handleError.handle(res, error);
    }
  };
}

export const createSubCategoryController = () => {
  const subCategoryRepository = new SubCategoryRepository();
  const subCategoryService = new SubCategoryServices(subCategoryRepository);
  return new SubCategoryController(subCategoryService);
};
