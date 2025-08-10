import { Request, Response } from "express";
import { AppError, ValidationError } from "../error";
import { validationResult } from "express-validator";
import { safeDeleteFile } from "./handleFiles";

type ErrorResponse = {
  status: "error";
  code: number;
  message: string;
  details?: any;
  debug?: string;
};

interface MongoError extends Error {
  name: string;
  code: number;
  stack?: string;
  keyValue: Record<string, any>;
}

class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() {}

  public static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  private isMongoDuplicateError(error: unknown): error is MongoError {
    return (
      error instanceof Object &&
      "name" in error &&
      error.name === "MongoServerError" &&
      "code" in error &&
      error.code === 11000
    );
  }

  private formatFieldName(field: string): string {
    const specialCases: Record<string, string> = {
      id: "ID",
      url: "URL",
      sku: "SKU",
      ui: "UI",
      api: "API",
      image: "Image",
      icon: "Icon",
    };

    if (specialCases[field.toLowerCase()]) {
      return specialCases[field.toLowerCase()];
    }

    return field
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/_/g, " ")
      .replace(/(^|\s)\S/g, (match) => match.toUpperCase())
      .trim();
  }

  public handle(res: Response, error: unknown): Response<ErrorResponse> {
    if (this.isMongoDuplicateError(error)) {
      const { keyValue } = error;
      const field = Object.keys(keyValue)[0];
      const value = keyValue[field];
      const formattedField = this.formatFieldName(field);

      return res.status(409).json({
        status: "error",
        code: 409,
        message: `${formattedField} '${value}' already exists`,
        ...(process.env.NODE_ENV === "development" && { debug: error.message }),
      });
    }

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: "error",
        code: error.statusCode,
        message: error.message,
        ...(error.details && { details: error.details }),
        ...(process.env.NODE_ENV === "development" && { debug: error.stack }),
      });
    }

    if (error instanceof Error) {
      console.error("Uncaught error:", error);
      return res.status(500).json({
        status: "error",
        code: 500,
        message: error.message,
        ...(process.env.NODE_ENV === "development" && { debug: error.stack }),
      });
    }

    console.error("Unknown error type:", error);
    return res.status(500).json({
      status: "error",
      code: 500,
      message: "An unknown error occurred",
    });
  }

  public async handleValidationErrors(req: Request): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (req.file) await safeDeleteFile(req.file.path);
      const errorDetails = errors.array().map((err) => ({
        field: err.type === "field" ? err.path : "unknown",
        message: err.msg,
      }));
      throw new ValidationError("Invalid entries", errorDetails);
    }
  }
}

export const handleError = ErrorHandler.getInstance();
