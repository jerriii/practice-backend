import fs from "fs";
import { promisify } from "util";

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