import mongoose from "mongoose";

export interface IProduct {
  _id?: string | mongoose.Types.ObjectId;
  name: string;
  categoryId: string | mongoose.Types.ObjectId; // reference to Category name or ID
  subcategoryId: string | mongoose.Types.ObjectId;
  price: number;
  productCount: number;
  isActive: boolean;
  productImages: string[];
}
