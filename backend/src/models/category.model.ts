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

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    categoryImage: {
      type: String,
      required: true,
    },
    productCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;
