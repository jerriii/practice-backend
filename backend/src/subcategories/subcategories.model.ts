import mongoose from "mongoose";
import { ISubCategory } from "./subcategories.interface";

const subCategorySchema = new mongoose.Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    productCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    subCategoryImage: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const SubCategory = mongoose.model<ISubCategory>(
  "SubCategory",
  subCategorySchema
);
export default SubCategory;
