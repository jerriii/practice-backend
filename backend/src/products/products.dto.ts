import mongoose from "mongoose";
import { IProduct } from "./products.interface";
import { NamedEntity, NameValueObject } from "../types/index.types";

export class ProductsDto {
  private _id?: string | mongoose.Types.ObjectId;
  private _name!: string;
  private _slug!: string;
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
    dto._slug = product.slug;
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

  private getResponseCategory(): NameValueObject | string | undefined {
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

    return this._categoryId.toString();
  }

  private getResponseSubCategory(): NameValueObject | string | undefined {
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

    return this._subCategoryId.toString();
  }
  private getProductStatus(isActive: boolean, productCount: number): string {
    if (!isActive) return "Inactive";
    if (productCount === 0) return "Out of Stock";
    if (productCount <= 10) return "Low Stock";
    return "Active";
  }

  toResponse() {
    return {
      id: this._id,
      name: this._name,
      categoryId: this.getResponseCategory(),
      subCategoryId: this.getResponseSubCategory(),
      price: this._price,
      productCount: this._productCount,
      status: this.getProductStatus(this._isActive, this._productCount),
      productImages: this._productImages,
    };
  }
}
