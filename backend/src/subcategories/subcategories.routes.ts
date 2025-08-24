import express from "express";
import DynamicUpload from "../middlewares/upload";
import validators from "../middlewares/validators";
import { createSubCategoryController } from "./subcategories.controller";

const router = express.Router();

const controller = createSubCategoryController();

const imageUpload = new DynamicUpload({
  fieldName: "subCategoryImage",
  allowedMimeTypes: ["image/*"],
  fileSizeLimit: 5 * 1024 * 1024,
  uploadType: "single",
}).handle();

router.post(
  "/create",
  imageUpload,
  validators.subcategory.validateSubCategoryCreate,
  validators.subcategory.handleValidationErrors,
  controller.createSubCategory
);

router.get("/", controller.getAllSubCategories);
router.get("/:id", controller.getSubCategoryById);
router.put(
  "/:id",
  imageUpload,
  validators.subcategory.validateSubCategoryUpdate,
  validators.subcategory.handleValidationErrors,
  controller.updateSubCategory
);
router.delete(
  "/:id",
  validators.subcategory.validateSubCategoryDelete,
  validators.subcategory.handleValidationErrors,
  controller.deleteSubCategory
);

export default router;
