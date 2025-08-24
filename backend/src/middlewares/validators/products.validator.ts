import { body } from "express-validator";
import Product from "../../products/products.model";
import { ImageValidationError, ValidationError } from "../../error";
import Category from "../../categories/categories.model";
import SubCategory from "../../subcategories/subcategories.model";
import { BaseValidator } from "./base.validator";

export class ProductValidator extends BaseValidator {
  validateProductsCreate = [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Name must be less than 100 characters"),

    body("slug")
      .notEmpty()
      .withMessage("Slug is required")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Slug must be less than 100 characters")
      .custom(async (value) => {
        const exists = await Product.exists({ slug: value });
        if (exists) throw new ValidationError("Slug already exists");
      }),

    body("categoryId")
      .notEmpty()
      .withMessage("Category ID is required")
      .bail()
      .custom(async (value) => {
        const exists = await Category.exists({ _id: value });
        if (!exists) throw new ValidationError("Category does not exist");
      }),

    body("subcategoryId")
      .notEmpty()
      .withMessage("Subcategory ID is required")
      .bail()
      .custom(async (value) => {
        const exists = await SubCategory.exists({ _id: value });
        if (!exists) throw new ValidationError("Subcategory does not exist");
      }),

    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .bail()
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),

    body("productCount")
      .notEmpty()
      .withMessage("Product count is required")
      .bail()
      .isInt({ min: 0 })
      .withMessage("Product count must be a positive integer"),

    body("isActive")
      .optional()
      .toBoolean()
      .isBoolean()
      .withMessage("Must be Active or Inactive"),

    body("productImages").custom((_value, { req }) => {
      console.log("Validating product images...", req.files);
      const files = req.files as Express.Multer.File[];

      if (!files || files.length === 0) {
        throw new ImageValidationError("Product images are required");
      }

      if (files.length < 2) {
        throw new ImageValidationError(
          "At least 2 product images are required"
        );
      }

      if (!this.isValidImage(files[0])) {
        throw new ImageValidationError(
          "Invalid image format. Allowed formats: JPEG, JPG, PNG"
        );
      }

      return true;
    }),
  ];
}
