import multer, { Multer, StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import { ImageValidationError } from "../error";
import { getUploadPath } from "../config/paths";

interface IDynamicUploadConfig {
  fieldName: string;
  allowedMimeTypes?: string[];
  fileSizeLimit?: number;
  uploadType?: "single" | "multiple";
  uploadLimit?: number;
}

class DynamicUpload {
  private fieldName: string;
  private allowedMimeTypes: string[];
  private fileSizeLimit: number;
  private uploadType: "single" | "multiple";
  private uploadLimit: number;
  private upload: Multer;

  constructor(config: IDynamicUploadConfig) {
    this.fieldName = config.fieldName;
    this.allowedMimeTypes = config.allowedMimeTypes || ["image/*"];
    this.fileSizeLimit = config.fileSizeLimit || 5 * 1024 * 1024; // 5MB default
    this.uploadType = config.uploadType || "single";
    this.uploadLimit = config.uploadLimit || 10;
    this.upload = this.initializeUpload();
  }

  private async getUploadPath() {
    return await getUploadPath();
  }

  // Get dynamic directory
  private getDynamicDirectory(req: Request): string {
    // Priority: params > body > fieldName
    return (
      req.params.directory || req.body.directory || this.fieldName.toLowerCase()
    );
  }

  // Create storage engine
  private createStorage(): StorageEngine {
    return multer.diskStorage({
      destination: async (req: Request, file, cb) => {
        const dynamicDir = this.getDynamicDirectory(req);
        const safeDir = dynamicDir.replace(/\.\./g, '');
        const fullPath = path.join(await this.getUploadPath(), safeDir);

        if (!fs.existsSync(fullPath)) {
          fs.mkdirSync(fullPath, { recursive: true });
        }

        cb(null, fullPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${this.fieldName}-${uniqueSuffix}${ext}`);
      },
    });
  }

  // Get allowed extensions
  private getAllowedExtensions(): string[] {
    return this.allowedMimeTypes
      .map((type) => {
        switch (type) {
          case "image/jpeg":
          case "image/jpg":
            return ".jpg";
          case "image/png":
            return ".png";
          case "image/webp":
            return ".webp";
          case "image/*":
            return ".jpg, .jpeg, .png"; // or return multiple if using wildcards
          default:
            return ""; // fallback or handle other types
        }
      })
      .filter(Boolean); // Remove empty strings
  }

  // Create file filter
  private createFileFilter() {
    return (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) => {
      const isValidType = this.allowedMimeTypes.some((pattern) => {
        if (pattern.endsWith("/*")) {
          return file.mimetype.startsWith(pattern.replace("/*", ""));
        }
        return file.mimetype === pattern;
      });

      if (isValidType) {
        cb(null, true);
      } else {
        cb(
          new ImageValidationError(
            `Invalid file type. Allowed types: ${this.getAllowedExtensions().join(", ")}`
          )
        );
      }
    };
  }

  // Get single image middleware
  private getSingleImageMiddleware() {
    return this.upload.single(this.fieldName);
  }

  // Get multiple image middleware
  private getMultipleImageMiddleware(limit: number = 10) {
    return this.upload.array(this.fieldName, limit);
  }

  // Initialize multer instance
  private initializeUpload(): Multer {
    const storage = this.createStorage();
    const fileFilter = this.createFileFilter();

    return multer({
      storage,
      fileFilter,
      limits: {
        fileSize: this.fileSizeLimit,
        files: this.uploadType === "single" ? 1 : this.uploadLimit,
      },
    });
  }

  // Handle middleware
  handle() {
    if (this.uploadType === "multiple") {
      return this.getMultipleImageMiddleware(this.uploadLimit);
    }
    return this.getSingleImageMiddleware();
  }
}

export default DynamicUpload;
