import { NameValueObject } from "../types/index.types";
import { ICategory } from "./categories.interface";

export class CategoriesDto {
  private _id!: string;
  private _name!: string;
  private _slug!: string;
  private _description?: string;
  private _categoryImage!: string;
  private _productCount!: number;
  private _isActive!: boolean;

  static fromEntity(category: ICategory): CategoriesDto {
    const dto = new CategoriesDto();
    dto._id = category._id.toString();
    dto._name = category.name;
    dto._description = category.description;
    dto._slug = category.slug;
    dto._categoryImage = category.categoryImage;
    dto._productCount = category.productCount ?? 0;
    dto._isActive = category.isActive;
    return dto;
  }

  static fromEntities(categories: ICategory[]): CategoriesDto[] {
    return categories.map((category) => CategoriesDto.fromEntity(category));
  }

  toResponse() {
    return {
      id: this._id,
      name: this._name,
      slug: this._slug,
      description: this._description,
      categoryImage: this._categoryImage,
      productCount: this._productCount,
      isActive: this._isActive,
    };
  }

  static nameValueResponse(categories: ICategory[]): Array<NameValueObject> {
    return categories.map((category) => ({
      name: category.name,
      value: category._id.toString(),
    }));
  }
}
