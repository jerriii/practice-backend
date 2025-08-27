import { NameValueObject } from "..";

export interface IProduct {
  id: number;
  name: string;
  categoryId: NameValueObject;
  subCategoryId: NameValueObject;
  price: string;
  productCount: number;
  status: string;
  image: string;
}
