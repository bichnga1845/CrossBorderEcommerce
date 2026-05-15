import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await request.json();
    const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, message: 'Invalid status' }, { status: 400 });
    }

    await dbConnect();
    
    // Fetch order first to get userId and pointsEarned
    const orderBefore = await Order.findById(params.id);
    if (!orderBefore) {
      return NextResponse.json({ success: false, message: 'Order not found' }, { status: 404 });
    }

    const order = await Order.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    // If order is delivered, award points to user
    if (status === 'delivered' && orderBefore.status !== 'delivered' && order?.userId) {
      const points = order.pointsEarned || Math.round(order.totalAmount / 10000); // Default 1 point per 10k
      await User.findByIdAndUpdate(order.userId, {
        $inc: { rewardPoints: points }
      });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Update Order API error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
