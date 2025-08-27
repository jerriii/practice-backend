"use client";

import BreadcrumbsSkeleton from "./Categories/BreadcrumbsSkeleton";
import CategoryHeaderSkeleton from "./Categories/CategoryHeaderSkeleton";
import FiltersSidebarSkeleton from "./Categories/FiltersSidebarSkeleton";
import { ProductCardSkeleton } from "./Categories/ProductCardSkeleton";
import SortAndFilterSkeleton from "./Categories/SortAndFilterSkeleton";

export function CategoryPageSkeleton() {
  return (
    <div className="container mx-auto min-w-full lg:px-8 px-4 py-8">
      {/* Breadcrumb Skeleton */}
      <BreadcrumbsSkeleton />

      {/* Category Header Skeleton */}
      <CategoryHeaderSkeleton />

      {/* Main Content Skeleton */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar Skeleton */}
        <FiltersSidebarSkeleton />

        {/* Product Grid Skeleton */}
        <div className="flex-1">
          {/* Search and Sort Skeleton */}
          <SortAndFilterSkeleton />

          {/* Product Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center mt-8">
            <div className="h-10 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}