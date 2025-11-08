'use client';

import { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';

export function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query || query.length < 1) {
      setSuggestions([]);
      return;
    }

    const getSuggestions = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products?search=${encodeURIComponent(query)}&limit=20`);
        const data = await response.json();
        const matches = data.products
          .slice(0, 8)
          .map((product: Product) => product.name || '')
          .filter((name: string, index: number, arr: string[]) => arr.indexOf(name) === index);
        
        setSuggestions(matches);
      } catch (error) {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(getSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return { suggestions, loading };
}