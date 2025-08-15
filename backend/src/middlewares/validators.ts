import { body, Meta } from "express-validator";
import { ValidationError } from "../error";
import Category from "../categories/categories.model";
import SubCategory from "../subcategories/subcategories.model";

class Validator {
  private static instance: Validator;

  private constructor() {}

  public static getInstance(): Validator {
    if (!Validator.instance) {
      Validator.instance = new Validator();
    }
    return Validator.instance;
  }

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
  ];

  validateSubCategoryUpdate = [
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
  ];
}

export default Validator.getInstance();
