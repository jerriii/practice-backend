import express from "express";
import DynamicUpload from "../middlewares/upload";
import validators from "../middlewares/validators";
import { createSubCategoryController } from "./subcategories.controller";

const router = express.Router();

const controller = createSubCategoryController();

router.post(
  "/create",
  new DynamicUpload({
    fieldName: "subCategoryImage",
    allowedMimeTypes: ["image/*"],
    fileSizeLimit: 5 * 1024 * 1024,
    uploadType: "single",
  }).handle(),
  validators.validateSubCategoryCreate,
  controller.createSubCategory
);

router.get("/", controller.getAllSubCategories);

router.put(
  "/update/:id",
  new DynamicUpload({
    fieldName: "subCategoryImage",
    allowedMimeTypes: ["image/*"],
    fileSizeLimit: 5 * 1024 * 1024,
    uploadType: "single",
  }).handle(),
  validators.validateSubCategoryUpdate,
  controller.updateSubCategory
);

router.delete("/delete/:id", controller.deleteSubCategory);
router.get("/:id", controller.getSubCategoryById);

export default router;
