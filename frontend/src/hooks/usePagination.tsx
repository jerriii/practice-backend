"use client";
import { Product } from '@/types/categories/slug';
import { useState } from 'react';

const PRODUCTS_PER_PAGE = 8; // Set your desired items per page

export function usePagination(products:Product[]) {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total pages
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  
  // Get current page's products
  const getPaginatedProducts = () => {
    return products;
  };
  
  return {
    currentPage,
    setCurrentPage,
    paginatedProducts: getPaginatedProducts(),
    totalPages,
  };
}