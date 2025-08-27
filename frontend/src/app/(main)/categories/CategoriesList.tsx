// app/categories/CategoriesList.tsx
"use client";

import { useGetFeaturedCategories } from "@/hooks/Categories";
import FeaturedCategories from "@/components/categories/FeaturedCategories";
import { FeaturedCategoriesSkeleton } from "@/components/SkeletonLoader/Categories/FeaturedCategorySkeleton";
import { ErrorState } from "@/components/ErrorState";

interface FeaturedCategory {
  id: number;
  name: string;
  // Add other properties that your category has
}

export default function CategoriesList() {
  const { data, isLoading, error, refetch } = useGetFeaturedCategories();
  
  if (isLoading) return <FeaturedCategoriesSkeleton />;
  if (error) return <ErrorState onRetry={refetch} />;
  
  return <FeaturedCategories featuredCategories={data as FeaturedCategory[]} />;
}