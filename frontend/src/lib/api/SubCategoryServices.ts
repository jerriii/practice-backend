import { ApiError } from "@/types";

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
      const error: ApiError = {
        name: "SubCategory Error",
        status: data.status,
        message: data.message,
        code: data.code,
        validationErrors: data.validationErrors,
      };
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
      const error: ApiError = {
        name: "SubCategory Error",
        status: data.status,
        message: data.message,
        code: data.code,
        validationErrors: data.validationErrors,
      };
      error.code = data.code;
      throw error;
    }

    return data;
  }

  static async getSubCategoryById(id: string) {
    const res = await fetch(`${this.baseUrl}/subcategories/${id}`);
    const data = await res.json();
    if (!res.ok) {
      const error: ApiError = {
        name: "SubCategory Error",
        status: data.status,
        message: data.message,
        code: data.code,
        validationErrors: data.validationErrors,
      };
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
      const error: ApiError = {
        name: "SubCategory Error",
        status: responseData.status,
        message: responseData.message,
        code: responseData.code,
        validationErrors: responseData.validationErrors,
      };
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
      const error: ApiError = {
        name: "SubCategory Error",
        status: data.status,
        message: data.message,
        code: data.code,
        validationErrors: data.validationErrors,
      };
      error.code = data.code;
      throw error;
    }

    return data;
  }
}
