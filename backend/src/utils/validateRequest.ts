import { Request } from "express";
import { validationResult } from "express-validator";
import { ValidationError } from "../error";
import { safeDeleteFile } from "./handleFiles";

export async function validateRequest(req: Request): Promise<void> {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Delete uploaded file if exists
    if (req.file) await safeDeleteFile(req.file.path);

    // Format errors
    const errorDetails = errors.array().map((err) => ({
      field: err.type === "field" ? err.path : "unknown",
      message: err.msg,
    }));

    throw new ValidationError("Invalid entries", errorDetails);
  }
}
