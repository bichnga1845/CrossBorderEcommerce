import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ProductCategory from '@/models/ProductCategory';

export async function GET() {
  try {
    await dbConnect();

    const categories = await ProductCategory.find({}).sort({ positioning: 1, category_name: 1 });

    return NextResponse.json({ success: true, categories });
  } catch (error) {
    console.error('GET Categories error:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching categories' },
      { status: 500 }
    );
  }
}
