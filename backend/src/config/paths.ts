import path from 'path';
import fs from 'fs/promises';
import { ENV } from './env';

// Strategy 1: Use app root relative to source file location
const getAppRoot = () => {
  // For development (src/config/paths.ts -> project root)
  const devRoot = path.resolve(__dirname, '../..');
  
  // For compiled JS (dist/config/paths.js -> project root) 
  const prodRoot = path.resolve(__dirname, '../..');

  // Verify which root contains package.json
  return fs.access(path.join(devRoot, 'package.json'))
    .then(() => devRoot)
    .catch(() => prodRoot);
};

// Strategy 2: Configurable base directory
const UPLOAD_BASE_DIR = ENV.UPLOAD_BASE_DIR;

export const getUploadPath = async () => {
  const root = await getAppRoot();
  return path.resolve(root, UPLOAD_BASE_DIR);
};

export const getAbsolutePath = async (relativePath: string): Promise<string> => {
    return path.join(await getUploadPath(), relativePath);
}

export const getRelativePath = async (absolutePath: string): Promise<string> => {
    return path.relative(await getUploadPath(), absolutePath);
}