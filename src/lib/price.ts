export function formatPrice(price: string | number | null | undefined): string {
  if (!price) return "0.00";
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return isNaN(numPrice) ? "0.00" : numPrice.toFixed(2);
}