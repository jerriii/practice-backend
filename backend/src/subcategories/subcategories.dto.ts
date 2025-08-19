import mongoose from "mongoose";
import { ISubCategory } from "./subcategories.interface";
import { NamedEntity, NameValueObject } from "../types/index.types";

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

  static fromEntities(subcategories: ISubCategory[]): SubcategoriesDto[] {
    return subcategories.map((subcategory) =>
      SubcategoriesDto.fromEntity(subcategory)
    );
  }

  private isCategoryObject(obj: any): obj is NameValueObject {
    return obj && typeof obj === "object" && "name" in obj && "value" in obj;
  }

  private isPopulatedCategory(obj: any): obj is NamedEntity {
    return obj && typeof obj === "object" && "_id" in obj && "name" in obj;
  }

  private getResponseCategory(): NameValueObject | undefined {
    if (!this._categoryId) return undefined;

    if (this.isCategoryObject(this._categoryId)) {
      return this._categoryId;
    }

    if (this.isPopulatedCategory(this._categoryId)) {
      return {
        name: this._categoryId.name,
        value: this._categoryId._id,
      };
    }

    return { name: "", value: this._categoryId.toString() };
  }

  toResponse() {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      categoryId: this.getResponseCategory(),
      productCount: this._productCount,
      subCategoryImage: this._subCategoryImage,
      isActive: this._isActive,
    };
  }
}
