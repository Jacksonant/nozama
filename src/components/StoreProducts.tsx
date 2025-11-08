"use client";


import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "@/components/ProductCard";
import { useStoreProducts } from "@/hooks/useStoreProducts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sanitizeText } from "@/lib/sanitize";

interface StoreProductsProps {
  brand: string;
  currentProductId: number;
}

export default function StoreProducts({ brand, currentProductId }: StoreProductsProps) {
  const { products, loading } = useStoreProducts(brand, currentProductId);

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">More from {sanitizeText(brand)}</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {[...Array(4)].map((_, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
                <div className="aspect-square bg-muted animate-pulse rounded-lg" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">More from {sanitizeText(brand)}</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <Link href={`/?brand=${brand}`}>
              <div className="h-full cursor-pointer hover:shadow-md transition-shadow bg-card border rounded-lg">
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <ArrowRight className="w-8 h-8 mb-2 text-primary" />
                  <h3 className="font-medium mb-1">View More</h3>
                  <p className="text-sm text-muted-foreground">More from {sanitizeText(brand)}</p>
                </div>
              </div>
            </Link>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}