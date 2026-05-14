import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCategory from '@/models/ProductCategory';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit');
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort');
    
    let queryObj: any = {};
    
    if (q) {
      queryObj.name = { $regex: q, $options: 'i' };
    }
    
    if (category && category !== 'Tất Cả') {
      const categoryDocument = await ProductCategory.findOne({ category_name: category });

      if (categoryDocument) {
        queryObj.categoryId = categoryDocument._id;
      } else {
        queryObj.category = category;
      }
    }
    
    if (minPrice || maxPrice) {
      queryObj.price = {};
      if (minPrice) queryObj.price.$gte = parseInt(minPrice);
      if (maxPrice) queryObj.price.$lte = parseInt(maxPrice);
    }

    let query = Product.find(queryObj).populate('categoryId');
    
    // Default sort by newest
    let sortObj: any = { createdAt: -1 };
    
    if (sort === 'price-asc') {
      sortObj = { price: 1 };
    } else if (sort === 'price-desc') {
      sortObj = { price: -1 };
    } else if (sort === 'name-asc') {
      sortObj = { name: 1 };
    } else if (sort === 'name-desc') {
      sortObj = { name: -1 };
    }
    
    query = query.sort(sortObj);
    
    if (limit) {
      query = query.limit(parseInt(limit));
    }
    
    const products = await query.exec();
    
    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("GET Products error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching products" },
      { status: 500 }
    );
  }
}
