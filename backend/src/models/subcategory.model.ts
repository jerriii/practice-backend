import mongoose from "mongoose";

export type ISubCategory = {
  name: string;
  description: string;
  categoryId: mongoose.Schema.Types.ObjectId | string;
  productCount: number;
  subCategoryImage: string;
  isActive: boolean;
};

const subCategorySchema = new mongoose.Schema(
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
