import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { toast } from "sonner";
import { Cart, Product, ProductColor } from "@/lib/types";

interface CartStore extends Cart {
  addItem: (
    product: Product,
    selectedColor?: ProductColor,
    quantity?: number
  ) => void;
  removeItem: (
    productId: number,
    selectedVariant?: { color?: ProductColor }
  ) => void;
  updateQuantity: (
    productId: number,
    quantity: number,
    selectedVariant?: { color?: ProductColor }
  ) => void;
  clearCart: () => void;
}

const calculateTotal = (items: Cart["items"]) =>
  items.reduce(
    (sum, item) => sum + parseFloat(item.product.price || "0") * item.quantity,
    0
  );

export const useCart = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        total: 0,

        addItem: (product, selectedColor, quantity = 1) => {
          const { items } = get();
          const existingItem = items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedVariant?.color?.hex_value ===
                selectedColor?.hex_value
          );

          if (existingItem) {
            const updatedItems = items.map((item) =>
              item.product.id === product.id &&
              item.selectedVariant?.color?.hex_value ===
                selectedColor?.hex_value
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            set({ items: updatedItems, total: calculateTotal(updatedItems) });
            const newQuantity = existingItem.quantity + quantity;
            toast.success(
              `Updated ${product.name} quantity to ${newQuantity}`,
              { duration: 3000 }
            );
          } else {
            const newItems = [
              ...items,
              {
                product,
                quantity,
                selectedVariant: selectedColor
                  ? { color: selectedColor }
                  : undefined,
              },
            ];
            set({ items: newItems, total: calculateTotal(newItems) });
            toast.success(
              `Added ${quantity > 1 ? quantity + " " : ""}${
                product.name
              } to cart`,
              { duration: 3000 }
            );
          }
        },

        removeItem: (productId, selectedVariant) => {
          const { items } = get();
          const removedItem = items.find(
            (item) =>
              item.product.id === productId &&
              item.selectedVariant?.color?.hex_value ===
                selectedVariant?.color?.hex_value
          );
          const newItems = items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedVariant?.color?.hex_value ===
                  selectedVariant?.color?.hex_value
              )
          );
          set({ items: newItems, total: calculateTotal(newItems) });
          if (removedItem) {
            toast.error(`Removed ${removedItem.product.name} from cart`, {
              duration: 3000,
            });
          }
        },

        updateQuantity: (productId, quantity, selectedVariant) => {
          if (quantity <= 0) {
            get().removeItem(productId, selectedVariant);
            return;
          }

          const { items } = get();
          const newItems = items.map((item) =>
            item.product.id === productId &&
            item.selectedVariant?.color?.hex_value ===
              selectedVariant?.color?.hex_value
              ? { ...item, quantity }
              : item
          );
          set({ items: newItems, total: calculateTotal(newItems) });
        },

        clearCart: () => set({ items: [], total: 0 }),
      }),
      {
        name: "nozama_cart",
      }
    )
  )
);
