import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ValidationError } from "../../error";

export abstract class BaseValidator {
  public handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const formattedErrors = errors.array().map((error) => {
        if (error.type === "field") {
          return {
            field: (error as any).path,
            message: error.msg,
          };
        }
        return {
          field: "field",
          message: error.msg,
        };
      });

      return next(new ValidationError("Invalid entries", formattedErrors));
    }

    next();
  };

  protected isValidImage(value: Express.Multer.File | string): boolean {
    if (typeof value === "string") {
      if (value.startsWith("data:image/")) return true;
      if (/\.(jpg|jpeg|png|webp|gif)$/i.test(value)) return true;
    }
    if (value && typeof value === "object" && value.mimetype) {
      return value.mimetype.startsWith("image/");
    }
    return false;
  }
}
