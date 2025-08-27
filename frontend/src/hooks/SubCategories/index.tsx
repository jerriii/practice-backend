"use client";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { SubCategoryServices } from "@/lib/api/SubCategoryServices";
import { ApiError, ApiSuccess, CollectionResponse } from "@/types";
import { ISubCategory } from "@/types/subcategories";
import { showToast } from "@/components/showToast";

export function useGetSubCategories({
  page,
  limit,
  search,
  isActive,
}: {
  page: number;
  limit: number;
  search?: string;
  isActive?: string;
}) {
  return useQuery<CollectionResponse<ISubCategory[]>>({
    queryKey: ["subcategories", page, limit, search, isActive],
    queryFn: () =>
      SubCategoryServices.getSubCategories(page, limit, search, isActive),
    enabled: true,
  });
}

export function useCreateSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FormData) =>
      SubCategoryServices.createSubCategory(payload),
    onSuccess: (data: ApiSuccess) => {
      showToast({
        type: data.status,
        title: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
    onError: (error: ApiError) => {
      showToast({
        type: error.status,
        title: error?.message,
      });
      return error;
    },
  });
}

export function useGetSubCategoryById(
  id: string,
  options?: Omit<
    UseQueryOptions<CollectionResponse<ISubCategory>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<CollectionResponse<ISubCategory>>({
    queryKey: ["subcategories", id],
    queryFn: () => SubCategoryServices.getSubCategoryById(id),
    ...options,
  });
}

export function useUpdateSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FormData }) =>
      SubCategoryServices.updateSubCategory(id, payload),
    onSuccess: (data: ApiSuccess) => {
      showToast({
        type: data.status,
        title: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
    onError: (error: ApiError) => {
      showToast({
        type: error.status,
        title: error?.message,
      });
      return error;
    },
  });
}

export function useDeleteSubCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => SubCategoryServices.deleteSubCategory(id),
    onSuccess: (data: ApiSuccess) => {
      showToast({
        type: data.status,
        title: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
    onError: (error: ApiError) => {
      showToast({
        type: error.status,
        title: error?.message,
      });
      return error;
    },
  });
}
