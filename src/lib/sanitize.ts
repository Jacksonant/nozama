export function sanitizeText(text: string | undefined | null): string {
  if (!text) return "";
  
  return text
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}