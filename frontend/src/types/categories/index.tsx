export interface Subcategory {
  id: number;
  name: string;
  slug: string;
  productCount: number;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryImage: string | File;
  productCount: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
