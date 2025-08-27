export interface ISubCategory {
  id: string;
  name: string;
  description: string;
  categoryId: string | { value: string; name: string };
  productCount: number;
  subCategoryImage: string | File | null;
  isActive: boolean;
}
