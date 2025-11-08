import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Product } from "@/lib/types";

export async function GET() {
  try {
    // Mock API again hehehe
    const filePath = path.join(process.cwd(), "public/data/products.json");
    const fileContents = await fs.readFile(filePath, "utf8");
    const products: Product[] = JSON.parse(fileContents);

    // Extract unique categories
    const categories = [...new Set(products
      .map(product => product.product_type)
      .filter(Boolean)
    )].sort();

    // Extract unique brands
    const brands = [...new Set(products
      .map(product => product.brand)
      .filter(Boolean)
    )].sort();

    return NextResponse.json({
      categories,
      brands,
    });
  } catch (error) {
    console.error("Error fetching filters:", error);
    return NextResponse.json(
      { error: "Failed to fetch filters" },
      { status: 500 }
    );
  }
}