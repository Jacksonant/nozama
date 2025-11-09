"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Star, Check } from "lucide-react";
import { Product } from "@/lib/types";
import { sanitizeText } from "@/lib/sanitize";
import { formatPrice } from "@/lib/price";

interface ProductInfoProps {
  product: Product;
  reviewCount: number;
  selectedColorIndex: number;
  setSelectedColorIndex: (index: number) => void;
}

export default function ProductInfo({
  product,
  reviewCount,
  selectedColorIndex,
  setSelectedColorIndex,
}: ProductInfoProps) {
  const [showAllColors, setShowAllColors] = useState(false);

  return (
    <div className="space-y-3 lg:space-y-4">
      {product.brand && (
        <Link
          href={`/?brand=${product.brand}`}
          className="text-primary hover:text-primary/80 hover:underline text-sm"
        >
          Visit the {sanitizeText(product.brand)} Store
        </Link>
      )}

      <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground leading-tight">
        {product.name}
      </h1>

      {product.rating && (
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating!)
                    ? "text-orange-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-primary hover:text-primary/80 cursor-pointer">
            {product.rating} out of 5
          </span>
          <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
        </div>
      )}

      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-muted-foreground">Price:</span>
          <span className="text-3xl lg:text-4xl font-bold text-foreground">
            {product.price_sign || "$"}
            {formatPrice(product.price)}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-green-600">In Stock</span>
          <span className="text-muted-foreground">FREE delivery</span>
        </div>
      </div>

      {product.product_colors && product.product_colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">
            Color:{" "}
            <span className="font-normal text-muted-foreground">
              Choose from {product.product_colors.length} options
            </span>
          </h3>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {product.product_colors.slice(0, 6).map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColorIndex(index)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 transform hover:scale-110 flex items-center justify-center ${
                    selectedColorIndex === index
                      ? "border-primary"
                      : "border-border hover:border-primary"
                  }`}
                  style={{ backgroundColor: color.hex_value }}
                  title={color.colour_name}
                >
                  {selectedColorIndex === index && (
                    <Check className="w-8 h-8 text-primary-foreground " />
                  )}
                </button>
              ))}
            </div>
            {product.product_colors.length > 6 && (
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  showAllColors ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-wrap gap-2 pt-2">
                  {product.product_colors.slice(6).map((color, index) => (
                    <button
                      key={index + 6}
                      onClick={() => setSelectedColorIndex(index + 6)}
                      className={`w-8 h-8 rounded-full border-2 transition-all duration-200 transform hover:scale-110 flex items-center justify-center ${
                        selectedColorIndex === index + 6
                          ? "border-primary"
                          : "border-border hover:border-primary"
                      }`}
                      style={{ backgroundColor: color.hex_value }}
                      title={color.colour_name}
                    >
                      {selectedColorIndex === index + 6 && (
                        <Check className="w-8 h-8 text-primary-foreground " />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {product.product_colors.length > 6 && (
              <button
                onClick={() => setShowAllColors(!showAllColors)}
                className="text-sm text-primary hover:text-primary/80 hover:underline cursor-pointer transition-colors duration-200"
              >
                {showAllColors
                  ? "Show less"
                  : `+${product.product_colors.length - 6} more colors`}
              </button>
            )}
          </div>
        </div>
      )}

      {product.tag_list && product.tag_list.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Features:</h3>
          <div className="flex flex-wrap gap-1">
            {product.tag_list.slice(0, 4).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {product.description && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h3 className="text-base font-medium mb-3 text-foreground">
            About this item
          </h3>
          <div
            className="text-sm text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}
    </div>
  );
}
