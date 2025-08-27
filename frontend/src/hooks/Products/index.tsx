"use client";
import { useQuery } from "@tanstack/react-query";
import ProductServices from "@/lib/api/ProductServices";
import { Product } from "@/types/categories/slug";
// import { Filters } from "@/app/categories/[slug]/page";
import { CollectionResponse } from "@/types";
import { Filters } from "@/app/(main)/categories/[slug]/page";

export default function useGetProductsWithQuery(slug: string, page = 1, filters: Filters, limit = 12) {
    const getQueryString = () => {
        const params = new URLSearchParams();

        // Price Range
        if (filters.priceRange?.min !== undefined && filters.priceRange?.max !== undefined) {
            params.append("minPrice", filters.priceRange.min.toString());
            params.append("maxPrice", filters.priceRange.max.toString());
        }

        // Brand (array to comma-separated string)
        if (filters.brand?.length) {
            params.append("brand", filters.brand.map((brand) => brand.name).join(","));
        }

        // Rating (array to comma-separated string)
        if (filters.rating?.length) {
            params.append("rating", filters.rating.map((rating) => rating).join(","));
        }

        // Features (array to comma-separated string)
        if (filters.features?.length) {
            params.append("features", filters.features.map((feature) => feature.name).join(","));
        }

        // Search Query
        if (filters.searchQuery) {
            params.append("search", filters.searchQuery);
        }

        // Sorting
        if (filters.sortItemsBy) {
            params.append("sortBy", filters.sortItemsBy);
        }

        return params.toString();
    };
    const queryString = getQueryString();

    const { data, isLoading, error, refetch } = useQuery<CollectionResponse<Product[]>, Error>({
        queryKey: ["products", slug, page, limit, filters],
        queryFn: async () => {
            try {
                const response = await ProductServices.getProductsBySlugAndQuery<CollectionResponse<Product[]>>(slug, page, limit, queryString);
                return response;
            } catch (err) {
                throw new Error(err instanceof Error ? err.message : "Unknown error occurred");
            }
        },
    });

    return {
        products: data?.data || [],
        pagination: data?.pagination || { page, limit, totalData: 0, totalPages: 1 },
        loading: isLoading,
        error,
        refetch
    };
}