import express from "express";
import { createCategoryController } from "./categories.controller";
import DynamicUpload from "../middlewares/upload";
import validators from "../middlewares/validators";

const router = express.Router();
const controller = createCategoryController();

//Create Category
router.post(
  "/create",
  new DynamicUpload({
    fieldName: "categoryImage",
    allowedMimeTypes: ["image/*"],
    fileSizeLimit: 5 * 1024 * 1024,
    uploadType: "single",
  }).handle(),
  validators.validateCategoryCreate,
  controller.createCategory
);

//Get All Categories
router.get("/", controller.getAllCategories);

//Get Name Value Categories List
router.get("/name-value-list", controller.getNameValueCategoriesList);

//Get Category by Id
router.get("/:id", controller.getCategoryById);

//Update Category
router.put(
  "/:id",
  new DynamicUpload({
    fieldName: "categoryImage",
    allowedMimeTypes: ["image/*"],
    fileSizeLimit: 5 * 1024 * 1024,
    uploadType: "single",
  }).handle(),
  validators.validateCategoryUpdate,
  controller.updateCategory
);

//Delete Category
router.delete("/:id", controller.deleteCategory);

export default router;
