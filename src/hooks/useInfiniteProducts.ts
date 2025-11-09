import { useState, useEffect, useCallback } from 'react';
import { Product, FilterState } from '@/lib/types';

interface UseInfiniteProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  categories: string[];
  isInitialLoad: boolean;
}

export function useInfiniteProducts(filters: FilterState): UseInfiniteProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const buildQueryString = useCallback((currentPage: number) => {
    const params = new URLSearchParams();
    // TODO: Do not hardcode here
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category);
    if (filters.minPrice > 0) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice > 0) params.set('maxPrice', filters.maxPrice.toString());
    params.set('page', currentPage.toString());
    params.set('limit', '20');
    return params.toString();
  }, [filters]);

  const fetchProducts = useCallback(async (currentPage: number, reset = false) => {
    setLoading(true);
    setError(null);

    try {
      const queryString = buildQueryString(currentPage);
      const response = await fetch(`/api/products?${queryString}`);
      
      if (!response.ok) throw new Error('Failed to fetch products');
      
      const data = await response.json();
      
      if (reset) {
        setProducts(data.products);
      } else {
        setProducts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const newProducts = data.products.filter((p: Product) => !existingIds.has(p.id));
          return [...prev, ...newProducts];
        });
      }
      
      setHasMore(currentPage < data.pagination.totalPages);
      
      // Get categories from first page
      if (currentPage === 1) {
        const allCategories = [...new Set(data.products.map((p: Product) => p.product_type).filter(Boolean))] as string[];
        setCategories(allCategories);
      }
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
      if (isInitialLoad) setIsInitialLoad(false);
    }
  }, [buildQueryString]);

  // Reset and fetch when filters change
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setHasMore(true);
    fetchProducts(1, true);
  }, [filters, fetchProducts]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage, false);
    }
  }, [loading, hasMore, page, fetchProducts]);

  return {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    categories,
    isInitialLoad
  };
}