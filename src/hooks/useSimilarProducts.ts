import { useEffect, useState } from "react";
import { Product } from "@/lib/types";

export function useSimilarProducts(category: string, currentProductId: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch(`/api/products?category=${category}&limit=4`);
        const data = await response.json();
        const filtered = data.products?.filter((p: Product) => p.id !== currentProductId) || [];
        setProducts(filtered.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch similar products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchSimilarProducts();
    }
  }, [category, currentProductId]);

  return { products, loading };
}