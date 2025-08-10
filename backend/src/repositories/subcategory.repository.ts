import { Types } from "mongoose";
import SubCategory, { ISubCategory } from "../models/subcategory.model";

export class SubCategoryRepository {
  constructor() {}

  async create(
    data: Omit<ISubCategory, keyof Document>
  ): Promise<ISubCategory> {
    const categoryId =
      typeof data.categoryId === "string"
        ? new Types.ObjectId(data.categoryId)
        : data.categoryId;

    const subCategory = new SubCategory({
      ...data,
      categoryId,
    });

    return await subCategory.save();
  }

  async getSubCategoryItemById(id: string): Promise<ISubCategory | null> {
    return await SubCategory.findById(id)
      .populate("categoryId", "name _id")
      .lean()
      .exec();
  }

  async getAllSubCategoriesList(query: any, page: number, limit: number) {
    const subCategories = await SubCategory.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
        path: "categoryId",
        select: "name _id",
        transform: (category) => {
          if (!category) return null;
          return {
            name: category.name,
            value: category._id,
          };
        },
      })
      .lean();
    return subCategories;
  }

  async countSubCategories(query: any): Promise<number> {
    return await SubCategory.countDocuments(query);
  }

  async countSubCategoriesWithCategoryId(categoryId: string): Promise<number> {
    return await SubCategory.countDocuments({
      categoryId: new Types.ObjectId(categoryId),
    });
  }

  async updateById(
    id: string,
    updateData: Partial<ISubCategory>
  ): Promise<ISubCategory | null> {
    return await SubCategory.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await SubCategory.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}
