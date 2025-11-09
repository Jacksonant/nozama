"use client";

import FilterSidebar from "@/components/composite/FilterSidebar";
import HeroCarousel from "@/components/composite/HeroCarousel";
import ProductCard from "@/components/atomic/ProductCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useWelcomeBack } from "@/hooks/useWelcomeBack";
import { AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function HomePageContent() {
  useWelcomeBack();
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => ({
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "",
      brand: searchParams.get("brand") || "",
      minPrice: Number(searchParams.get("minPrice")) || 0,
      maxPrice: Number(searchParams.get("maxPrice")) || 0,
    }),
    [searchParams]
  );

  const { products, loading, error, hasMore, loadMore, isInitialLoad } =
    useInfiniteProducts(filters);

  useInfiniteScroll(loading, hasMore, loadMore);

  // Show full screen loader only on initial page load
  if (isInitialLoad && loading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-4">
          <Spinner scale="lg" />
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="px-0 sm:px-4 sm:max-w-7xl sm:mx-auto mb-4 lg:mb-8">
        <HeroCarousel />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside
            className="hidden md:block w-64 flex-shrink-0"
            role="complementary"
            aria-label="Product filters"
          >
            <div className="sticky top-20">
              <FilterSidebar />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4 lg:mb-6">
              <h1
                className="text-xl lg:text-2xl font-bold"
                role="heading"
                aria-level={1}
              >
                {filters.search
                  ? `Search Results (${products.length}) for "${filters.search}"`
                  : filters.category ||
                    filters.brand ||
                    filters.minPrice ||
                    filters.maxPrice
                  ? `Filtered Products (${products.length})`
                  : `All Products`}
              </h1>
            </div>

            {loading && products.length === 0 ? (
              <div className="flex justify-center py-12">
                <Spinner />
              </div>
            ) : products.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-muted-foreground">
                    No products found matching your criteria.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
                  role="grid"
                  aria-label="Product listings"
                >
                  {products.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>

                {loading && products.length > 0 && (
                  <div className="flex justify-center py-8">
                    <Spinner />
                  </div>
                )}

                {!hasMore && products.length > 0 && (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      You&apos;ve reached the end!
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
