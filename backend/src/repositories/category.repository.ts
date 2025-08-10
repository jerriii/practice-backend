import Category, { ICategory } from "../models/category.model";
import mongoose, { FilterQuery, Types } from "mongoose";

export class CategoryRepository {
  constructor() {}
  async exists(query: FilterQuery<ICategory>): Promise<boolean> {
    const count = await Category.countDocuments(query);
    return count > 0;
  }

  async getCategoriesList(): Promise<ICategory[]> {
    return await Category.find();
  }

  async getActiveCategoriesList(): Promise<ICategory[]> {
    return await Category.find({ isActive: true });
  }

  async getCategoryItemBySlug(slug: string): Promise<ICategory | null> {
    return await Category.findOne({ slug });
  }

  async getCategoryItemById(id: string): Promise<ICategory | null> {
    return await Category.findById(id).exec();
  }

  async getAllCategoriesList(query: any, page: number, limit: number) {
    const categories = await Category.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    return categories;
  }

  async getNameValueCategoriesList(
    query: any,
    limit: number,
    lastId?: mongoose.Types.ObjectId | string,
    sort: Record<string, 1 | -1> = { name: 1, _id: 1 } // ascending order by default
  ): Promise<ICategory[]> {
    if (lastId) {
      const lastObjectId =
        typeof lastId === "string"
          ? new mongoose.Types.ObjectId(lastId)
          : lastId;
      const lastCategory = await this.getCategoryItemById(
        lastObjectId.toString()
      );

      const lastName = lastCategory?.name;
      query = {
        ...query,
        $or: [
          { name: { $gt: lastName } },
          { name: lastName, _id: { $gt: lastObjectId } },
        ],
      };
    }

    return await Category.find(query)
      .sort(sort)
      .limit(limit + 1) // fetch one extra to detect if more exists
      .exec();
  }

  async countCategories(query: any): Promise<number> {
    return await Category.countDocuments(query);
  }

  async create(categoryData: ICategory): Promise<ICategory> {
    const newCategory = new Category(categoryData);
    return await newCategory.save();
  }

  async updateById(
    id: string,
    updateData: Partial<ICategory>
  ): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteById(id: string): Promise<ICategory | null> {
    return await Category.findByIdAndDelete(id);
  }
}
