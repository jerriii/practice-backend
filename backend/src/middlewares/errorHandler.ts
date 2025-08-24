// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { AppError, ValidationError } from "../error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error for debugging
  console.error(`[${new Date().toISOString()}] Error:`, err);

  if (err instanceof AppError) {
    const response: any = {
      status: err.status,
      code: err.statusCode,
      message: err.message, // Default message
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    };

    // Handle ValidationError specifically
    if (
      err instanceof ValidationError &&
      err.validationErrors &&
      err.validationErrors.length > 0
    ) {
      // Check if there's an error with field "id"
      const idError = err.validationErrors.find(
        (error: { field: string; message: string }) => error.field === "id"
      );

      if (idError) {
        // If id field error exists, use its message and set validationErrors to null
        response.message = idError.message;
        response.validationErrors = null;
      } else {
        // For other validation errors, show all validation errors
        response.validationErrors = err.validationErrors;
      }
    }

    res.status(err.statusCode).json(response);
    return;
  }

  // Handle unexpected errors
  res.status(500).json({
    status: "error",
    code: 500,
    message: "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
  return;
};
