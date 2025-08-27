export interface Subcategory {
    id: number;
    name: string;
    slug: string;
    productCount: number;
    image: string;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: number;
    isFeatured: boolean;
    featuredImage?: string;
    oldPrice?: number;
    discount?: number;
    rating?: number;
    reviews?: number;
    images: string[];
    categoryId: number;
    subcategoryId?: number;
    materials: string[];
    icon?: string;
    artisan: {
      name: string;
      location: string;
    };
    subcategories?: Subcategory[];
}