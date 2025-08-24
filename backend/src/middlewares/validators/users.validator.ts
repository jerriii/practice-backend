import { body, Meta } from "express-validator";
import User from "../../users/users.model";
import { ValidationError } from "../../error";
import { BaseValidator } from "./base.validator";

export class UserValidator extends BaseValidator {
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
}
