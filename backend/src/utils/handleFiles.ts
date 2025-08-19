import fs from "fs";
import { promisify } from "util";
import { getRelativePath } from "../config/paths";

const unlinkAsync = promisify(fs.unlink);

export async function safeDeleteFile(filePath: string): Promise<void> {
  try {
    await unlinkAsync(filePath);
    console.log(`File deleted successfully: ${filePath}`);
  } catch (error) {
    if ((error as { code: string }).code !== "ENOENT") {
      console.error(`Failed to delete file ${filePath}:`, error);
    }
  }
}

export const handleMultipleFileUploads = (
  files: Express.Multer.File[]
): Promise<string[]> => {
  return Promise.all(
    files.map(async (file) => {
      const relativePath = await getRelativePath(file.path);
      return relativePath;
    })
  );
};
