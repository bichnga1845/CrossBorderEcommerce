import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { orderId, resultCode } = payload;

    if (!orderId) {
      return NextResponse.json({ success: false, message: 'Missing orderId' }, { status: 400 });
    }

    await dbConnect();

    const nextStatus = Number(resultCode) === 0 ? 'processing' : 'cancelled';
    await Order.findByIdAndUpdate(orderId, { status: nextStatus });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('MoMo IPN error:', error);
    return NextResponse.json({ success: false, message: 'IPN processing failed' }, { status: 500 });
  }
}
