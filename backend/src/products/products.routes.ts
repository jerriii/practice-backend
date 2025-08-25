import express from "express";
import { createProductsController } from "./products.controller";
import DynamicUpload from "../middlewares/upload";
import validators from "../middlewares/validators";

const router = express.Router();
const controller = createProductsController();

const dynamicUpload = new DynamicUpload({
  fieldName: "productImages",
  allowedMimeTypes: ["image/*"],
  fileSizeLimit: 5 * 1024 * 1024,
  uploadType: "multiple",
  uploadLimit: 5,
}).handle();

router.post(
  "/create",
  dynamicUpload,
  validators.product.validateProductsCreate,
  validators.product.handleValidationErrors,
  controller.createProduct
);

router.get("/", controller.getAllProducts);

router.put(
  "/:id",
  dynamicUpload,
  validators.product.validateProductsUpdate,
  validators.product.handleValidationErrors,
  controller.updateProduct
);

router.delete(
  "/:id",
  validators.product.validateProductsDelete,
  validators.product.handleValidationErrors,
  controller.deleteProduct
);

export default router;
