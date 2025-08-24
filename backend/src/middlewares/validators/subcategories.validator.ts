import { body, Meta, param } from "express-validator";
import { BaseValidator } from "./base.validator";
import Category from "../../categories/categories.model";
import {
  ImageValidationError,
  NotFoundError,
  ValidationError,
} from "../../error";
import SubCategory from "../../subcategories/subcategories.model";
import { getAbsolutePath } from "../../config/paths";
import { safeDeleteFile } from "../../utils/handleFiles";

export class SubCategoryValidator extends BaseValidator {
  validateSubCategoryCreate = [
    body("name")
      .notEmpty()
      .withMessage("Sub Category Name is required")
      .bail() // Stop if previous validator fails
      .isLength({ max: 100 })
      .withMessage("Name must be less than 100 characters")
      .bail()
      .custom(async (value) => {
        const exists = await SubCategory.exists({ name: value });
        if (exists)
          throw new ValidationError("Sub Category Name already exists");
      }),
    body("categoryId")
      .notEmpty()
      .withMessage("Category ID is required")
      .bail()
      .custom(async (value) => {
        const exists = await Category.exists({ _id: value });
        if (!exists) throw new ValidationError("Category ID does not exist");
      }),
    body("description")
      .optional() // This marks the field as optional
      .isLength({ max: 500 })
      .withMessage("Description must be less than 500 characters"),

    body("isActive")
      .optional()
      .toBoolean()
      .isBoolean()
      .withMessage("Must be true or false"),

    body("productCount")
      .optional()
      .toInt() // Convert string to integer
      .isInt({ min: 0 })
      .withMessage("Product count must be a positive integer"),

    body("subCategoryImage").custom((_value, { req }: Meta) => {
      const file = req.file as Express.Multer.File;

      if (!file) {
        throw new ImageValidationError("Sub Category image is required");
      }

      if (!this.isValidImage(file)) {
        throw new ImageValidationError("Only image files are allowed");
      }
      return true;
    }),
  ];

  validateSubCategoryUpdate = [
    param("id")
      .notEmpty()
      .withMessage("Sub Category ID is required")
      .bail()
      .isMongoId()
      .withMessage("Invalid Sub Category ID format")
      .bail()
      .custom(async (value) => {
        const exists = await SubCategory.exists({ _id: value });
        if (!exists) throw new ValidationError("Sub Category not found");
      }),

    body("name")
      .optional()
      .isLength({ max: 100 })
      .withMessage("Name must be less than 100 characters")
      .bail()
      .custom(async (value, { req }: Meta) => {
        const existing = await SubCategory.findOne({ name: value });
        if (existing && existing._id.toString() !== req.params?.id) {
          throw new ValidationError("Sub Category Name already exists");
        }
      }),

    body("categoryId")
      .optional()
      .custom(async (value) => {
        const exists = await Category.exists({ _id: value });
        if (!exists) throw new ValidationError("Category ID does not exist");
      }),

    body("description")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Description must be less than 500 characters"),

    body("isActive")
      .optional()
      .toBoolean()
      .isBoolean()
      .withMessage("Must be Active or Inactive"),

    body("productCount")
      .optional()
      .toInt()
      .isInt({ min: 0 })
      .withMessage("Product count must be a positive integer"),

    body("subCategoryImage").custom((_value, { req }: Meta) => {
      const file = req.file as Express.Multer.File;

      if (!file) {
        throw new ImageValidationError("Sub Category image is required");
      }

      if (!this.isValidImage(file)) {
        throw new ImageValidationError("Only image files are allowed");
      }

      return true;
    }),
  ];

  validateSubCategoryDelete = [
    param("id")
      .notEmpty()
      .withMessage("Sub Category ID is required")
      .bail()
      .isMongoId()
      .withMessage("Invalid Sub Category ID format")
      .bail()
      .custom(async (value) => {
        const exists = await SubCategory.exists({ _id: value });
        if (!exists) throw new NotFoundError("Sub Category not found");

        const subCategory = await SubCategory.findById(value);
        if (!subCategory) throw new NotFoundError("Sub Category not found");
        if (subCategory.subCategoryImage) {
          const imagePath = await getAbsolutePath(subCategory.subCategoryImage);
          await safeDeleteFile(imagePath);
        }
      }),
  ];
}
