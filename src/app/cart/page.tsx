"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { ImageWithLoader } from "@/components/ui/image-with-loader";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/price";
import { getImageUrl } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { Trash2, X } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { items, total, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven&apos;t added any items to your cart yet.
            </p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 lg:mb-8 gap-4">
        <h1 className="text-xl lg:text-3xl font-bold">
          Shopping Cart ({items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
          items)
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-3 lg:space-y-4">
          {items.map((item, index) => (
            <Card key={`${item.product.id}-${index}`}>
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-start sm:items-center space-x-3 lg:space-x-4">
                  <Link
                    href={`/product/${item.product.id}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 relative bg-white rounded-md p-2 flex-shrink-0 hover:opacity-80 transition-opacity"
                  >
                    <ImageWithLoader
                      src={getImageUrl(
                        item.product.api_featured_image ||
                          item.product.image_link
                      )}
                      alt={item.product.name || "Product"}
                      fill
                      className="object-contain"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.product.id}`}
                      className="text-sm sm:text-lg font-medium hover:text-primary line-clamp-2 block"
                    >
                      {item.product.name || "Unnamed Product"}
                    </Link>
                    {item.product.brand && (
                      <p className="text-sm text-muted-foreground capitalize">
                        {item.product.brand}
                      </p>
                    )}
                    {item.selectedVariant?.color && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground">
                          Color:
                        </span>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{
                              backgroundColor:
                                item.selectedVariant.color.hex_value,
                            }}
                          />
                          <Badge variant="secondary" className="text-xs">
                            {item.selectedVariant.color.colour_name}
                          </Badge>
                        </div>
                      </div>
                    )}
                    {item.product.price && (
                      <p className="text-base sm:text-lg font-bold mt-1">
                        {item.product.price_sign || "$"}
                        {formatPrice(item.product.price)}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <Input
                      type="number"
                      min="1"
                      max="99"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQty = Math.max(1, Number(e.target.value));
                        updateQuantity(
                          item.product.id,
                          newQty,
                          item.selectedVariant
                        );
                      }}
                      className="w-16 sm:w-20 h-9"
                    />

                    <ConfirmDialog
                      title="Remove Item"
                      description={`Are you sure you want to remove "${item.product.name}" from your cart?`}
                      onConfirm={() =>
                        removeItem(item.product.id, item.selectedVariant)
                      }
                      confirmText="Remove"
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </ConfirmDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 lg:space-y-4">
              <div className="space-y-2">
                {items.map((item, index) => (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {(item.product.name || "Product").substring(0, 30)}...
                      <X className="w-3 h-3 mx-1 inline" />
                      {item.quantity}
                    </span>
                    <span className="font-medium">
                      {item.product.price_sign || "$"}
                      {formatPrice(
                        parseFloat(item.product.price || "0") * item.quantity
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="flex justify-between text-base lg:text-lg font-semibold">
                <span>Total:</span>
                <span>${formatPrice(total)}</span>
              </div>

              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>

              <Button variant="ghost" className="w-full" asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
