export interface Product {
  id: number;
  brand: string | null;
  name: string;
  price: string | null;
  price_sign: string | null;
  currency: string | null;
  image_link: string | null;
  product_link: string | null;
  website_link: string | null;
  description: string | null;
  rating: number | null;
  category: string | null;
  product_type: string | null;
  tag_list: string[];
  created_at: string;
  updated_at: string;
  product_api_url: string;
  api_featured_image: string | null;
  product_colors: ProductColor[];
}

export interface ProductColor {
  hex_value: string;
  colour_name: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: {
    color?: ProductColor;
  };
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface FilterState {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
}

export interface PaginatedResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export type Theme = 'light' | 'dark';