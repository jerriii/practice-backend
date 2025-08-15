export interface IProduct {
  name: string;
  category: string; // reference to Category name or ID
  subcategory: string;
  price: number;
  productCount: number;
  isActive: boolean;
  productImages: string[];
}
