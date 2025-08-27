"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CategoryHeader from "@/components/categories/slug/CategoryHeader";
import { useState, use, useEffect } from "react";
import PriceRangeFilter from "@/components/categories/slug/PriceRangeFilter";
import BrandFilter from "@/components/categories/slug/BrandFilter";
import RatingFilter from "@/components/categories/slug/RatingFilter";
import FeaturesFilter from "@/components/categories/slug/FeaturesFilter";
import { NamedEntity } from "@/types";
import { AlertTriangle, PackageSearch, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductCard from "@/components/categories/slug/ProductCard";
import useGetProductsWithQuery from "@/hooks/Products";
import { PaginationControls } from "@/components/PaginationControls";
import { ProductCardSkeleton } from "@/components/SkeletonLoader/Categories/ProductCardSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetCategoryBySlug } from "@/hooks/Categories";
import { ErrorState } from "@/components/ErrorState";
import { CategoryPageSkeleton } from "@/components/SkeletonLoader/CategoryPageSkeleton";

export interface Filters {
  priceRange: {
    min: string;
    max: string;
  };
  brand: NamedEntity[];
  rating: number[];
  features: NamedEntity[];
  searchQuery: string;
  sortItemsBy: string;
}

const initialFilters = {
  priceRange: { min: "", max: "" },
  brand: [],
  rating: [],
  features: [],
  searchQuery: "",
  sortItemsBy: "featured",
};

function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  if (!slug) {
    return null;
  }
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  // Helper function to compare current filters with defaults
  const filtersAreModified = (filters: Filters) => {
    return (
      filters.priceRange.min !== initialFilters.priceRange.min ||
      filters.priceRange.max !== initialFilters.priceRange.max ||
      filters.brand.length > 0 ||
      filters.rating.length > 0 ||
      filters.features.length > 0 ||
      filters.searchQuery !== "" ||
      filters.sortItemsBy !== initialFilters.sortItemsBy
    );
  };
  const debouncedFilters = useDebounce<Filters>(filters, 500);
  const { products, pagination, loading, error, refetch } = useGetProductsWithQuery(slug, page, debouncedFilters);
  const { data: category, isLoading: categoryLoading, error: categoryError, refetch: refetchCategory } = useGetCategoryBySlug(slug);
// Replace your current useEffects with this:
useEffect(() => {
  // Only reset page for these specific filter changes
  const searchOrSortChanged = 
    debouncedFilters.searchQuery !== filters.searchQuery ||
    debouncedFilters.sortItemsBy !== filters.sortItemsBy;
  
  if (searchOrSortChanged) {
    setPage(1);
  }
  
  refetch();
}, [debouncedFilters]);

if (categoryLoading) {
  return (
    <CategoryPageSkeleton />
  );
}

if (categoryError) {
  return (
    <div className="container mx-auto min-w-full lg:px-8 px-4 py-8">
      <ErrorState onRetry={refetchCategory} />
    </div>
  );
}

  return (
    <div className="container mx-auto min-w-full lg:px-8 px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-muted-foreground">/</span>
              <Link
                href="/categories"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Categories
              </Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <span className="mx-2 text-muted-foreground">/</span>
              <span className="text-sm font-medium">{category?.data?.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* Category Header */}
      <CategoryHeader category={category?.data} />

      {/* Subcategories */}
      {/* <SubCategory category={category} /> */}

      <div id="products" className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <div className="w-full md:w-64 space-y-6">
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Filters</h3>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => setFilters({
                priceRange: { min: "", max: "" },
                brand: [],
                rating: [],
                features: [],
                searchQuery: "",
                sortItemsBy: "featured",
              })}>
                Reset All
              </Button>
            </div>

            <div className="space-y-4">
              {/* Price Range */}
              <PriceRangeFilter
                min={filters.priceRange.min}
                max={filters.priceRange.max}
                onMinChange={(value) =>
                  setFilters({
                    ...filters,
                    priceRange: {
                      ...filters.priceRange,
                      min: value,
                    },
                  })
                }
                onMaxChange={(value) =>
                  setFilters({
                    ...filters,
                    priceRange: {
                      ...filters.priceRange,
                      max: value,
                    },
                  })
                }
              />

              {/* Brand */}
              <BrandFilter
                brands={brands}
                selectedBrands={filters.brand}
                onBrandChange={(selectedBrands) =>
                  setFilters({
                    ...filters,
                    brand: selectedBrands,
                  })
                }
              />

              {/* Ratings */}
              <RatingFilter
                ratings={filters.rating}
                onRatingChange={(ratings) =>
                  setFilters({
                    ...filters,
                    rating: ratings,
                  })
                }
              />

              {/* Features */}
              <FeaturesFilter features={features} selectedFeatures={filters.features} onFeaturesChange={(selectedFeatures) =>
                setFilters({
                  ...filters,
                  features: selectedFeatures,
                })
              } />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="bg-muted mb-6 p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={`Search in ${category?.data?.name}...`}
                  className="pl-8 w-full sm:w-[300px]"
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      searchQuery: e.target.value,
                    })
                  }
                />
              </div>
              {/* Sort */}
              <div className="flex items-center gap-2">
                <Select value={filters.sortItemsBy} // Controlled value
                  onValueChange={(value: "featured" | "low-high" | "high-low" | "newest" | "rating") =>
                    setFilters({ ...filters, sortItemsBy: value })
                  }>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="low-high">Price: Low to High</SelectItem>
                    <SelectItem value="high-low">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest Arrivals</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {error ? (
              // Error state - shows full-width error message
              <div className="col-span-full py-8">
                <Alert variant="destructive" className="max-w-md mx-auto">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error loading products</AlertTitle>
                  <AlertDescription>
                    Something went wrong. Please try again.
                  </AlertDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 min-w-fit"
                    onClick={() => refetch()}
                  >
                    Retry
                  </Button>
                </Alert>
              </div>
            ) : loading ? (
              <>
                {Array.from({ length: 12 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </>
            ) : (
              products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="flex flex-col items-center col-span-full justify-center py-12">
                  <PackageSearch className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-white mb-1">
                    {filtersAreModified(filters) ? "No products found" : "No products available"}
                  </h3>
                  {filtersAreModified(filters) && (
                    <>
                      <p className="text-sm text-gray-500 text-center max-w-md">
                        We couldn't find any products matching your filters.
                        Try adjusting your search criteria.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setFilters(initialFilters)}
                      >
                        Reset Filters
                      </Button>
                    </>
                  )}
                </div>
              )
            )}
          </div>

          {/* Pagination */}
          <PaginationControls
            currentPage={page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;

// Sample data

const brands = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "Sony" },
  { id: 4, name: "LG" },
  { id: 5, name: "Bose" },
  { id: 6, name: "Dell" },
  { id: 7, name: "HP" },
];

const features = [
  { id: 1, name: "Wireless" },
  { id: 2, name: "Bluetooth" },
  { id: 3, name: "Noise Cancelling" },
  { id: 4, name: "Waterproof" },
  { id: 5, name: "Fast Charging" },
];