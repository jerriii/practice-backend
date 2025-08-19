import { body, Meta } from "express-validator";
import { ValidationError } from "../error";
import Category from "../categories/categories.model";
import SubCategory from "../subcategories/subcategories.model";
import User from "../users/users.model";
import { NextFunction, Request, Response } from "express";

class Validator {
  private static instance: Validator;

  private constructor() {}

  public static getInstance(): Validator {
    if (!Validator.instance) {
      Validator.instance = new Validator();
    }
    return Validator.instance;
  }

  validateMultipleImages = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.files || !(req.files as Express.Multer.File[]).length) {
      res.status(400).json({
        status: "error",
        details: [
          { field: "productImages", message: "Product Images are required" },
        ],
      });
    }
    next();
  };

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

  validateUsersCreate = [
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Username must be less than 100 characters")
      .bail()
      .custom(async (value) => {
        const exists = await User.exists({ username: value });
        if (exists) throw new ValidationError("Username already exists");
      }),

    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email format")
      .bail()
      .custom(async (value) => {
        const exists = await User.exists({ email: value });
        if (exists) throw new ValidationError("Email already exists");
      }),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("role")
      .optional()
      .isIn(["admin", "author", "reader"])
      .withMessage("Invalid role. Allowed Roles: admin, author, reader"),
  ];

  validateUsersLogin = [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Invalid email format"),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];

  validateUsersUpdate = [
    body("email")
      .optional() // allow email to be skipped
      .isEmail()
      .withMessage("Invalid email format")
      .bail()
      .custom(async (value, { req }: Meta) => {
        const userId = req.params?.userId; // id of the user being updated
        const exists = await User.findOne({ email: value });
        if (exists && userId && exists._id.toString() !== userId) {
          throw new ValidationError("Email already exists");
        }
      }),

    body("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),

    body("role")
      .optional()
      .isIn(["admin", "author", "reader"])
      .withMessage("Invalid role. Allowed Roles: admin, author, reader"),
  ];

  validateProductsCreate = [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .bail()
      .isLength({ max: 100 })
      .withMessage("Name must be less than 100 characters"),

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
  ];
}

export default Validator.getInstance();
