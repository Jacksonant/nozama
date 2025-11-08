import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  return { product, loading, error };
}