"use client";

import { showToast } from "@/components/showToast";
import CategoryServices from "@/lib/api/CategoryServices";
import { ApiError, ApiSuccess, CollectionResponse } from "@/types";
import { Category } from "@/types/categories";
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FormData) => CategoryServices.createCategory(payload),
    onSuccess: (data: ApiSuccess) => {
      showToast({
        type: data.status,
        title: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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

export function useGetCategories({
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
  return useQuery({
    queryKey: ["categories", page, limit, search, isActive],
    queryFn: () =>
      CategoryServices.getCategories(page, limit, search, isActive),
    // ...Option, // <-- Option is not defined, remove or replace with valid options if needed
  });
}

export function useGetNameValueCategoriesList(
  params: {
    limit: number;
    search?: string;
    lastId?: string;
  },
  options?: Partial<
    UseInfiniteQueryOptions<
      Awaited<ReturnType<typeof CategoryServices.getNameValueCategoriesList>>,
      Error,
      Awaited<ReturnType<typeof CategoryServices.getNameValueCategoriesList>>,
      [_: string, { search?: string; limit: number }],
      string | undefined
    >
  >
) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["categories", { search: params.search, limit: params.limit }],
    queryFn: async ({ pageParam }) => {
      const response = await CategoryServices.getNameValueCategoriesList({
        lastId: pageParam, // This will be the lastId or undefined for first page
        limit: params.limit,
        search: params.search,
      });
      return response;
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => {
      return lastPage.pagination?.hasMore ? lastPage.pagination.lastId : null;
    },
    ...options,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  };
}

export function useGetCategoryById(
  id: string,
  options?: Omit<
    UseQueryOptions<CollectionResponse<Category>, Error>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => CategoryServices.getCategoryById(id),
    ...options,
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: FormData }) =>
      CategoryServices.updateCategory(id, payload),
    onSuccess: (data: ApiSuccess) => {
      showToast({
        type: data.status,
        title: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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

export function useGetFeaturedCategories() {
  return {
    data: [],
    isLoading: false,
    error: null,
    refetch: () => {},
  };
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => CategoryServices.deleteCategory(id),
    onSuccess: (data: ApiSuccess) => {
      showToast({
        type: data.status,
        title: data.message,
      });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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
