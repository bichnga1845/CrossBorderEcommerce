import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const cart = await Cart.findOne({ userId: session.user.id });
    
    return NextResponse.json({ success: true, cart: cart?.items || [] });
  } catch (error) {
    console.error('Fetch cart error:', error);
    return NextResponse.json({ success: false, message: 'Error fetching cart' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { cart: items } = await request.json();

    await dbConnect();
    const cart = await Cart.findOneAndUpdate(
      { userId: session.user.id },
      { items },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, cart: cart.items || [] });
  } catch (error) {
    console.error('Update cart error:', error);
    return NextResponse.json({ success: false, message: 'Error updating cart' }, { status: 500 });
  }
}
