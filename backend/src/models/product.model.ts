import mongoose from "mongoose";

export interface IProduct {
  name: string;
  category: string; // reference to Category name or ID
  subcategory: string;
  price: number;
  productCount: number;
  isActive: boolean;
  productImages: string[];
}

const productSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  subcategory: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  productCount: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  productImages: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
