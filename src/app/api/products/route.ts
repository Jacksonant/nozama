import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Product } from "@/lib/types";

export async function GET(request: { url: string | URL }) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const brand = searchParams.get("brand") || "";
    const minPrice = parseFloat(searchParams.get("minPrice") || "0");
    const maxPrice = parseFloat(searchParams.get("maxPrice") || "0");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    // Mock query from backend api
    const filePath = path.join(process.cwd(), "public/data/products.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    let products = JSON.parse(fileContents);

    // Apply filters
    if (search) {
      products = products.filter(
        (product: Product) =>
          (product.name || "").toLowerCase().includes(search.toLowerCase()) ||
          (product.brand || "").toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      products = products.filter(
        (product: Product) => product.product_type === category
      );
    }

    if (brand) {
      products = products.filter(
        (product: Product) => (product.brand || "").toLowerCase() === brand.toLowerCase()
      );
    }

    if (minPrice > 0) {
      products = products.filter(
        (product: Product) => parseFloat(product.price || "0") >= minPrice
      );
    }

    if (maxPrice > 0) {
      products = products.filter(
        (product: Product) => parseFloat(product.price || "0") <= maxPrice
      );
    }

    // Apply pagination
    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const paginatedProducts = products.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      products: paginatedProducts,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
