import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Product from '@/models/Product';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(session.user.id);
    
    if (!user || !user.wishlist) {
      return NextResponse.json({ success: true, items: [] });
    }

    // Fetch full product details for each ID in wishlist
    const items = await Product.find({ _id: { $in: user.wishlist } });

    return NextResponse.json({ success: true, items });
  } catch (error) {
    console.error('Fetch wishlist error:', error);
    return NextResponse.json({ success: false, message: 'Error fetching wishlist' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await request.json();
    if (!productId) {
      return NextResponse.json({ success: false, message: 'Product ID required' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findById(session.user.id);
    if (!user) return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });

    const wishlist = user.wishlist || [];
    const index = wishlist.indexOf(productId);

    if (index > -1) {
      // Remove if exists
      wishlist.splice(index, 1);
    } else {
      // Add if not exists
      wishlist.push(productId);
    }

    user.wishlist = wishlist;
    await user.save();

    return NextResponse.json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error('Update wishlist error:', error);
    return NextResponse.json({ success: false, message: 'Error updating wishlist' }, { status: 500 });
  }
}
