import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const resolvedParams = await params;
    const product = await Product.findById(resolvedParams.id).populate('categoryId');
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("GET Product error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching product details" },
      { status: 500 }
    );
  }
}
