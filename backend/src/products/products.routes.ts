import express from "express";
import { createProductsController } from "./products.controller";
import DynamicUpload from "../middlewares/upload";
import validators from "../middlewares/validators";

const router = express.Router();
const controller = createProductsController();

router.post(
  "/create",
  new DynamicUpload({
    fieldName: "productImages",
    allowedMimeTypes: ["image/*"],
    fileSizeLimit: 5 * 1024 * 1024,
    uploadType: "multiple",
    uploadLimit: 5,
  }).handle(),
  validators.validateProductsCreate,
  validators.validateMultipleImages,
  controller.createProduct
);

router.get("/", controller.getAllProducts);

export default router;
