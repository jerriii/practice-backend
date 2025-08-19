import mongoose from "mongoose";
import { IProduct } from "./products.interface";
import { NamedEntity, NameValueObject } from "../types/index.types";

export class ProductsDto {
  private _id?: string | mongoose.Types.ObjectId;
  private _name!: string;
  private _categoryId!: string | mongoose.Types.ObjectId;
  private _subCategoryId!: string | mongoose.Types.ObjectId;
  private _price!: number;
  private _productCount!: number;
  private _isActive!: boolean;
  private _productImages!: string[];

  static fromEntity(product: IProduct): ProductsDto {
    const dto = new ProductsDto();
    dto._id = product._id;
    dto._name = product.name;
    dto._categoryId = product.categoryId;
    dto._subCategoryId = product.subcategoryId;
    dto._price = product.price;
    dto._productCount = product.productCount;
    dto._isActive = product.isActive;
    dto._productImages = product.productImages;
    return dto;
  }

  static fromEntities(products: IProduct[]): ProductsDto[] {
    return products.map((product) => ProductsDto.fromEntity(product));
  }

  private isObject(obj: any): obj is NameValueObject {
    return obj && typeof obj === "object" && "name" in obj && "value" in obj;
  }

  private isPopulated(obj: any): obj is NamedEntity {
    return obj && typeof obj === "object" && "_id" in obj && "name" in obj;
  }

  private getResponseCategory(): NameValueObject | undefined {
    if (!this._categoryId) return undefined;

    if (this.isObject(this._categoryId)) {
      return this._categoryId;
    }

    if (this.isPopulated(this._categoryId)) {
      return {
        name: this._categoryId.name,
        value: this._categoryId._id,
      };
    }

    return { name: "", value: this._categoryId.toString() };
  }

  private getResponseSubCategory(): NameValueObject | undefined {
    if (!this._subCategoryId) return undefined;

    if (this.isObject(this._subCategoryId)) {
      return this._subCategoryId;
    }

    if (this.isPopulated(this._subCategoryId)) {
      return {
        name: this._subCategoryId.name,
        value: this._subCategoryId._id,
      };
    }

    return { name: "", value: this._subCategoryId.toString() };
  }

  toResponse() {
    return {
      id: this._id,
      name: this._name,
      categoryId: this.getResponseCategory(),
      subCategoryId: this.getResponseSubCategory(),
      price: this._price,
      productCount: this._productCount,
      isActive: this._isActive,
      productImages: this._productImages,
    };
  }
}
