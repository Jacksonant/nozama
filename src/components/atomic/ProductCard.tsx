import Link from "next/link";
import { Product } from "@/lib/types";
import { ImageWithLoader } from "@/components/ui/image-with-loader";
import { getImageUrl } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { sanitizeText } from "@/lib/sanitize";
import { formatPrice } from "@/lib/price";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group h-full" aria-label={`View ${product.name} details`}>
      <Card className="overflow-hidden hover:shadow-md hover:border-muted-foreground transition-all h-full flex flex-col" role="article">
        <div className="aspect-square relative bg-white p-2 sm:p-3 lg:p-4">
          <ImageWithLoader
            src={getImageUrl(product.api_featured_image || product.image_link)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain group-hover:scale-105 transition-transform"
            loading={index < 4 ? "eager" : "lazy"}
            priority={index < 4}
          />
        </div>

        <CardContent className="p-3 sm:p-3 lg:p-4 flex-1 flex flex-col">
          <h3 className="text-xs sm:text-sm font-medium line-clamp-2 mb-1 sm:mb-2" role="heading" aria-level={3}>
            {product.name}
          </h3>

          <p className="text-xs text-muted-foreground mb-1 sm:mb-2 hidden sm:block capitalize">
            {product.brand}
          </p>

          {product.rating && (
            <div className="flex items-center mb-1 sm:mb-2" role="img" aria-label={`Rating: ${product.rating} out of 5 stars`}>
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" aria-hidden="true" />
              <span className="text-xs sm:text-sm text-muted-foreground ml-1">
                {product.rating}
              </span>
            </div>
          )}

          <div className="flex flex-row items-center justify-between gap-1 gap-0 mt-auto">
            <span className="text-sm sm:text-base lg:text-lg font-bold">
              <span className="text-xs sm:text-sm">{product.price_sign || "$"}</span>
              {" "}
              <span className="text-xl lg:text-2xl">{formatPrice(product.price)}</span>
            </span>
            <Badge className="text-xs capitalize w-fit bg-red-500 hover:bg-red-600 text-white">
              {sanitizeText(product.product_type)}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
