import mongoose from "mongoose";

export interface ICategory {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  categoryImage: string;
  productCount?: number;
  isActive: boolean;
}

export interface ICategoryKeyValue {
  name: string;
  value: string;
}
