"use client";


import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "@/components/atomic/ProductCard";
import { useSimilarProducts } from "@/hooks/useSimilarProducts";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sanitizeText } from "@/lib/sanitize";

interface SimilarProductsProps {
  category: string;
  currentProductId: number;
}

export default function SimilarProducts({ category, currentProductId }: SimilarProductsProps) {
  const { products, loading } = useSimilarProducts(category, currentProductId);

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-bold mb-4">Similar Products</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {[...Array(4)].map((_, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/4">
                <div className="aspect-square bg-muted animate-pulse rounded-lg" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Similar Products</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
              <ProductCard product={product} />
            </CarouselItem>
          ))}
          <CarouselItem className="md:basis-1/2 lg:basis-1/4">
            <Link href={`/?category=${category}`}>
              <div className="h-full cursor-pointer hover:shadow-md transition-shadow bg-card border rounded-lg">
                <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                  <ArrowRight className="w-8 h-8 mb-2 text-primary" />
                  <h3 className="font-medium mb-1">View More</h3>
                  <p className="text-sm text-muted-foreground">{sanitizeText(category)} Products</p>
                </div>
              </div>
            </Link>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </div>
  );
}