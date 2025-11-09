"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingCartButton() {
  const { items } = useCart();
  const pathname = usePathname();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Hide on cart page
  if (pathname === "/cart") {
    return null;
  }

  return (
    <Button
      asChild
      size="lg"
      className="fixed bottom-4 right-4 z-50 md:hidden rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 shadow-lg"
    >
      <Link href="/cart" aria-label={`Cart with ${itemCount} items`}>
        <div className="relative">
          {/* Not sure why class no effect here */}
          <ShoppingCart style={{ width: "32px", height: "32px" }} />
          {itemCount > 0 && (
            <Badge className="font-bold absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 hover:bg-red-500 text-xs">
              {itemCount > 99 ? "99+" : itemCount}
            </Badge>
          )}
        </div>
      </Link>
    </Button>
  );
}
