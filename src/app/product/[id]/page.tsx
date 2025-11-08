"use client";

import CustomerReviews from "@/components/CustomerReviews";
import ProductImageCarousel from "@/components/ProductImageCarousel";
import ProductInfo from "@/components/ProductInfo";
import ProductSpecifications from "@/components/ProductSpecifications";
import SimilarProducts from "@/components/SimilarProducts";
import StoreProducts from "@/components/StoreProducts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/useProduct";
import { useCart } from "@/store/cart";
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  RotateCcw,
  Shield,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { sanitizeText } from "@/lib/sanitize";
import { formatPrice } from "@/lib/price";

export default function ProductPage() {
  const params = useParams();
  const { addItem } = useCart();
  const { product, loading, error } = useProduct(Number(params.id));
  const [quantity, setQuantity] = useState(1);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  // Reset scroll position when navigating to product page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);

  // Generate stable review count based on product ID
  const reviewCount = product?.id
    ? product.id < 100
      ? product.id + 123
      : product.id
    : 150;

  // Create image array from available images
  const images = [product?.api_featured_image, product?.image_link].filter(
    Boolean
  ) as string[];

  const handleAddToCart = () => {
    if (product) {
      const selectedColor = product.product_colors?.[selectedColorIndex];
      addItem(product, selectedColor, quantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <div className="bg-card border-b">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <Card>
                <CardContent className="p-4">
                  <Skeleton className="aspect-square" />
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-4">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-8" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-1/4" />
              <div className="space-y-2">
                <Skeleton className="h-4" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className="lg:col-span-3">
              <Card>
                <CardContent className="p-4 space-y-4">
                  <Skeleton className="h-8" />
                  <Skeleton className="h-4" />
                  <Skeleton className="h-10" />
                  <Skeleton className="h-10" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="text-center">
          <CardContent className="pt-6">
            <p className="text-destructive mb-4">
              {error || "Product not found"}
            </p>
            <Button variant="link" asChild>
              <Link href="/" className="flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" />
                Back to Products
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-sm text-primary hover:text-primary/80 hover:underline"
            >
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {sanitizeText(product.product_type) || "Product"}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          <div className="lg:col-span-5">
            <ProductImageCarousel images={images} productName={product.name} />
          </div>

          <div className="lg:col-span-4">
            <ProductInfo
              product={product}
              reviewCount={reviewCount}
              selectedColorIndex={selectedColorIndex}
              setSelectedColorIndex={setSelectedColorIndex}
            />
          </div>

          {/* TODO: Componentize this section also */}
          {/* Purchase Box */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-20">
              <Card>
                <CardContent className="p-3 lg:p-4 space-y-3 lg:space-y-4">
                  {/* Price */}
                  <div>
                    <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                      {product.price_sign || "$"}
                      {formatPrice(product.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">& FREE Returns</div>
                  </div>

                  {/* Delivery */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-green-600" />
                      <span>
                        <strong>FREE delivery</strong> tomorrow, Dec 15
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span>
                        Order within <strong>2 hrs 15 mins</strong>
                      </span>
                    </div>
                  </div>

                  {/* Selected Color */}
                  {product.product_colors &&
                    product.product_colors.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Color:</span>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-12 h-12 rounded-full border border-gray-300"
                            style={{
                              backgroundColor:
                                product.product_colors[selectedColorIndex]
                                  ?.hex_value,
                            }}
                          />
                          <span className="capitalize">
                            {
                              product.product_colors[selectedColorIndex]
                                ?.colour_name
                            }
                          </span>
                        </div>
                      </div>
                    )}

                  {/* Stock */}
                  <Badge
                    variant="secondary"
                    className="text-green-700 bg-green-50"
                  >
                    In Stock
                  </Badge>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium">Qty:</label>
                    <Input
                      type="number"
                      min="1"
                      max="99"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, Number(e.target.value)))
                      }
                      className="w-20 h-9"
                    />
                  </div>

                  {/* Buttons */}
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-full"
                    size="lg"
                  >
                    Add to Cart
                  </Button>

                  {/* Trust Signals */}
                  <div className="pt-4 border-t space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3" />
                      <span>Unsecure transaction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-3 h-3" />
                      <span>30-minutes returns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-3 h-3" />
                      <span>Steal from Nozama</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-18 space-y-6">
          <ProductSpecifications />
        </div>
        <div className="mt-12 lg:mt-18 space-y-6">
          <CustomerReviews reviewCount={reviewCount} />
        </div>
        <div className="mt-12 lg:mt-18 space-y-6">
          <SimilarProducts
            category={product.product_type || ""}
            currentProductId={product.id}
          />
          {product.brand && (
            <StoreProducts
              brand={product.brand}
              currentProductId={product.id}
            />
          )}
        </div>
      </div>
    </div>
  );
}
