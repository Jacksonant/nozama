import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { Product } from '@/lib/types';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    // Mock query from backend api
    const filePath = path.join(process.cwd(), 'public/data/products.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const products = JSON.parse(fileContents);
    
    const product = products.find((p: Product) => p.id.toString() === id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}