import { ApiError } from "@/types";

class CategoryServices {
  static async createCategory(payload: FormData) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/create`,
      {
        method: "POST",
        body: payload,
      }
    );
    const data = await res.json();
    if (!res.ok) {
      const error: ApiError = {
        name: "Category Error",
        status: data.status,
        message: data.message,
        code: data.code,
        validationErrors: data.validationErrors,
      };
      throw error;
    }

    return data;
  }

  static async getNameValueCategoriesList({
    lastId,
    limit,
    search,
  }: {
    lastId?: string;
    limit: number;
    search?: string;
  }) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/name-value-list?lastId=${lastId}&limit=${limit}&search=${search}`
    );
    const data = await res.json();
    if (!res.ok) {
      const error: ApiError = {
        name: "Category Error",
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

  static async getCategories(
    page: number,
    limit: number,
    search: string | undefined,
    isActive: string | undefined
  ) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories?page=${page}&limit=${limit}&search=${search}&isActive=${isActive}`
    );
    const data = await res.json();
    if (!res.ok) {
      const error: ApiError = {
        name: "Category Error",
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

  static async getCategoryById(id: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}`
    );
    const data = await res.json();
    if (!res.ok) {
      const error: ApiError = {
        name: "Category Error",
        status: data.status,
        message: data.message,
        code: data.code,
        validationErrors: data.validationErrors,
      };
      throw error;
    }

    return data;
  }

  static async updateCategory(id: string, payload: FormData) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}`,
      {
        method: "PUT",
        body: payload,
      }
    );
    const data = await res.json();
    if (!res.ok) {
      const error: ApiError = {
        name: "Category Error",
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

  static async deleteCategory(id: string) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      const error: ApiError = {
        name: "Category Error",
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
export default CategoryServices;
