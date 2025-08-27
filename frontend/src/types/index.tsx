import { ToastType } from "@/components/showToast";
import { Category } from "./categories";

export interface NamedEntity {
  id: number;
  name: string;
}

export interface NameValueObject {
  name: string;
  value: string | number | boolean;
}

export interface IError {
  status?: number;
  details?: unknown;
  message?: string;
  code?: string;
}

export interface CollectionResponse<T> {
  status: string;
  message: string;
  code: number;
  data: T;
  pagination?: {
    page?: number;
    limit: number;
    totalData?: number;
    totalPages?: number;
    lastId?: string;
    hasMore?: boolean;
  };
}

// Define a custom error type that includes Axios-like response
export interface ApiError extends Error {
  status: Exclude<ToastType, "success" | "info">;
  message: string;
  code?: number;
  details?: {
    field: string;
    message: string;
  }[];
}

// Define a custom success type that includes Axios-like response
export interface ApiSuccess {
  status: Exclude<ToastType, "warning" | "error">;
  code?: number;
  message: string;
  data?: Category[];
}
