import { useState } from 'react';
import { FilterState } from '@/lib/types';

export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 0
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 0
    });
  };

  return {
    filters,
    updateFilters,
    clearFilters
  };
}