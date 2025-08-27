import { IError } from "@/types";

export class SubCategoryServices {
  private static readonly baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  constructor() {}
  static async getSubCategories(
    page: number,
    limit: number,
    search: string | undefined,
    isActive: string | undefined
  ) {
    const res = await fetch(
      `${this.baseUrl}/subcategories?page=${page}&limit=${limit}&search=${search}&isActive=${isActive}`
    );
    const data = await res.json();
    if (!res.ok) {
      const error: IError = new Error(
        data.message || "Failed to get subcategories"
      );
      error.status = data.status;
      error.details = data.details;
      error.message = data.message;
      error.code = data.code;
      throw error;
    }

    return data;
  }

  static async createSubCategory(payload: FormData) {
    const res = await fetch(`${this.baseUrl}/subcategories/create`, {
      method: "POST",
      body: payload,
    });
    const data = await res.json();
    if (!res.ok) {
      const error: IError = new Error(
        data.message || "Failed to create subcategory"
      );
      error.status = data.status;
      error.details = data.details;
      error.message = data.message;
      error.code = data.code;
      throw error;
    }

    return data;
  }

  static async getSubCategoryById(id: string) {
    const res = await fetch(`${this.baseUrl}/subcategories/${id}`);
    const data = await res.json();
    if (!res.ok) {
      const error: IError = new Error(
        data.message || "Failed to get subcategory"
      );
      error.status = data.status;
      error.details = data.details;
      error.message = data.message;
      error.code = data.code;
      throw error;
    }

    return data;
  }

  static async updateSubCategory(id: string, data: FormData) {
    const res = await fetch(`${this.baseUrl}/subcategories/${id}`, {
      method: "PUT",
      body: data,
    });
    const responseData = await res.json();
    if (!res.ok) {
      const error: IError = new Error(
        responseData.message || "Failed to update subcategory"
      );
      error.status = responseData.status;
      error.details = responseData.details;
      error.message = responseData.message;
      error.code = responseData.code;
      throw error;
    }

    return responseData;
  }

  static async deleteSubCategory(id: string) {
    const res = await fetch(`${this.baseUrl}/subcategories/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      const error: IError = new Error(
        data.message || "Failed to delete subcategory"
      );
      error.status = data.status;
      error.details = data.details;
      error.message = data.message;
      error.code = data.code;
      throw error;
    }

    return data;
  }
}
