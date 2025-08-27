import { ApiError, CollectionResponse } from "@/types";
import { IProduct } from "@/types/products";

export class ProductServices {
  private static readonly baseUrl: string =
    process.env.NEXT_PUBLIC_API_BASE_URL || "";

  static async getAllProducts(
    slug?: string,
    page?: number,
    limit?: number
  ): Promise<CollectionResponse<IProduct[]>> {
    console.log("Fetching products with:", { slug, page, limit });
    const res = await fetch(`${this.baseUrl}/products`);
    const data = await res.json();
    if (!res.ok) {
      const error: ApiError = {
        name: "Product Error",
        status: data.status,
        message: data.message,
        code: data.code,
        validationErrors: data.validationErrors,
      };

      throw error;
    }
    return data;
  }
}
