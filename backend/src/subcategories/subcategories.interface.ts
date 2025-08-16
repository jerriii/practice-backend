import mongoose from "mongoose";

export type ISubCategory = {
  _id?: string;
  name: string;
  description: string;
  categoryId: mongoose.Schema.Types.ObjectId | string;
  productCount: number;
  subCategoryImage: string;
  isActive: boolean;
};
