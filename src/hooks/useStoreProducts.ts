import { useEffect, useState } from "react";
import { Product } from "@/lib/types";

export function useStoreProducts(brand: string, currentProductId: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreProducts = async () => {
      try {
        const response = await fetch(`/api/products?brand=${brand}&limit=4`);
        const data = await response.json();
        const filtered = data.products?.filter((p: Product) => p.id !== currentProductId) || [];
        setProducts(filtered.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch store products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (brand) {
      fetchStoreProducts();
    }
  }, [brand, currentProductId]);

  return { products, loading };
}