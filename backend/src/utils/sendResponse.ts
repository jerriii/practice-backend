import { Response } from "express";

type StandardResponse<T> = {
  status: "success" | "error" | "warning" | "info";
  code: number;
  message: string;
  data?: T;
};

type PaginatedResponse<T> = StandardResponse<T> & {
  pagination?: {
    page?: number;
    limit: number;
    totalData?: number;
    totalPages?: number;
    hasMore?: boolean;
    lastId?: string;
  };
};

export function sendResponse<T>(
  res: Response,
  { status = "success", code, message, data, pagination }: PaginatedResponse<T>
) {
  const response: PaginatedResponse<T> = {
    status,
    code,
    message,
  };

  if (data !== undefined) {
    response.data = data;
  }

  if (pagination) {
    response.pagination = pagination;
  }

  return res.status(code).json(response);
}
