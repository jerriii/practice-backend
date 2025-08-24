import { body, Meta, param } from "express-validator";
import Category from "../../categories/categories.model";
import {
  ImageValidationError,
  NotFoundError,
  ValidationError,
} from "../../error";
import { BaseValidator } from "./base.validator";
import { getAbsolutePath } from "../../config/paths";
import fs from "fs";
import SubCategory from "../../subcategories/subcategories.model";

export class CategoryValidator extends BaseValidator {
  validateCategoryCreate = [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .bail() // Stop if previous validator fails
      .isLength({ max: 100 })
      .withMessage("Name must be less than 100 characters")
      .bail()
      .custom(async (value) => {
        const exists = await Category.exists({ name: value });
        if (exists) throw new ValidationError("Category Name already exists");
      }),

    body("categoryImage").custom((_value, { req }: Meta) => {
      const file = req.file as Express.Multer.File;

      if (!file) {
        throw new ImageValidationError("Category image is required");
      }

      if (!this.isValidImage(file)) {
        throw new ImageValidationError("Only image files are allowed");
      }

      return true;
    }),

    body("slug")
      .notEmpty()
      .withMessage("Slug is required")
      .bail()
      .matches(/^[a-z0-9\-]+$/)
      .withMessage("Only lowercase letters, numbers and hyphens allowed")
      .bail()
      .custom(async (value) => {
        const exists = await Category.exists({ slug: value });
        if (exists) throw new ValidationError("Slug already exists");
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
  ];

  validateCategoryUpdate = [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Name must be less than 100 characters")
      .bail()
      .custom(async (value, { req }: Meta) => {
        const existing = await Category.findOne({ name: value });
        if (existing && existing._id.toString() !== req.params?.id) {
          throw new ValidationError("Category Name already exists");
        }
      }),

    body("categoryImage")
      .optional()
      .custom((_value, { req }: Meta) => {
        const file = req.file as Express.Multer.File;

        if (!file) {
          throw new ImageValidationError("Category image is required");
        }

        if (!this.isValidImage(file)) {
          throw new ImageValidationError("Only image files are allowed");
        }

        return true;
      }),

    body("slug")
      .optional()
      .notEmpty()
      .withMessage("Slug is required")
      .bail()
      .matches(/^[a-z0-9\-]+$/)
      .withMessage("Only lowercase letters, numbers and hyphens allowed")
      .bail()
      .custom(async (value, { req }: Meta) => {
        const existing = await Category.findOne({ slug: value });
        if (existing && existing._id.toString() !== req.params?.id) {
          throw new ValidationError("Slug already exists");
        }
      }),

    body("description")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Description must be less than 500 characters"),

    body("isActive")
      .optional()
      .toBoolean()
      .isBoolean()
      .withMessage("Must be true or false"),

    body("productCount")
      .optional()
      .toInt()
      .isInt({ min: 0 })
      .withMessage("Product count must be a positive integer"),
  ];

  validateCategoryDelete = [
    param("id")
      .notEmpty()
      .withMessage("Category ID is required")
      .bail()
      .isMongoId()
      .withMessage("Invalid Category ID format")
      .bail()
      .custom(async (value) => {
        const exists = await Category.exists({ _id: value });
        if (!exists) throw new ValidationError("Category not found");
        const subCategoriesCount = await SubCategory.countDocuments({
          categoryId: value,
        });
        if (subCategoriesCount > 0) {
          throw new ValidationError(
            `Cannot delete. One or more subcategories linked.`
          );
        }
        const category = await Category.findById(value);
        if (!category) {
          throw new NotFoundError("Category not found");
        }

        // Delete the image file if it exists
        if (category.categoryImage) {
          const imagePath = await getAbsolutePath(category.categoryImage);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
      }),
  ];
}
