// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { AppError } from "../error";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error for debugging
  console.error(`[${new Date().toISOString()}] Error:`, err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.status,
      code: err.statusCode,
      message: err.message,
      details: err.details ?? null,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
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
