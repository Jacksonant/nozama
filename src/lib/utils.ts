import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl || imageUrl.trim() === "") {
    return "/placeholder.jpg";
  }

  const trimmed = imageUrl.trim();

  // If it already starts with "http://" or "https://", return as-is
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  // If it starts with "//", prefix with "https:"
  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }

  // Otherwise, assume it's a relative path and return as-is or fix it
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}
