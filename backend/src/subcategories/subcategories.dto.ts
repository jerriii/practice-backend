import mongoose from "mongoose";
import { ISubCategory } from "./subcategories.interface";

export class SubcategoriesDto {
  private _id?: string;
  private _name!: string;
  private _description!: string;
  private _categoryId!: string | mongoose.Schema.Types.ObjectId;
  private _productCount!: number;
  private _subCategoryImage?: string;
  private _isActive!: boolean;

  static fromEntity(subcategory: ISubCategory): SubcategoriesDto {
    const dto = new SubcategoriesDto();
    dto._id = subcategory._id;
    dto._name = subcategory.name;
    dto._description = subcategory.description;
    dto._categoryId = subcategory.categoryId;
    dto._productCount = subcategory.productCount;
    dto._subCategoryImage = subcategory.subCategoryImage;
    dto._isActive = subcategory.isActive;
    return dto;
  }

  static fromEntities(subcategories: any[]): SubcategoriesDto[] {
    return subcategories.map((subcategory) =>
      SubcategoriesDto.fromEntity(subcategory)
    );
  }

  toResponse() {
    let category = undefined;

    // If categoryId exists
    if (this._categoryId) {
      // If it already has name and value, use it as is
      if (
        typeof this._categoryId === "object" &&
        "name" in this._categoryId &&
        "value" in this._categoryId
      ) {
        category = this._categoryId;
      }
      // If it's a populated object with _id and name
      else if (
        typeof this._categoryId === "object" &&
        "_id" in this._categoryId &&
        "name" in this._categoryId
      ) {
        category = {
          name: (this._categoryId as any).name,
          value: (this._categoryId as any)._id,
        };
      }
      // If it's just a string/objectId
      else {
        category = { name: "", value: this._categoryId };
      }
    }

    return {
      id: this._id,
      name: this._name,
      description: this._description,
      categoryId: category,
      productCount: this._productCount,
      subCategoryImage: this._subCategoryImage,
      isActive: this._isActive,
    };
  }
}
