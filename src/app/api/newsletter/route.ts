import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Vui lòng nhập email' }, { status: 400 });
    }

    await dbConnect();

    // Check if already subscribed
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json({ success: true, message: 'Email này đã đăng ký trước đó' });
      } else {
        // Re-activate
        existing.status = 'active';
        await existing.save();
        return NextResponse.json({ success: true, message: 'Đăng ký lại thành công' });
      }
    }

    const newSubscriber = new Newsletter({ email: email.toLowerCase() });
    await newSubscriber.save();

    return NextResponse.json({ success: true, message: 'Đăng ký thành công' });
  } catch (error: any) {
    console.error('Newsletter API error:', error);
    if (error.code === 11000) {
      return NextResponse.json({ success: true, message: 'Email này đã đăng ký' });
    }
    return NextResponse.json({ success: false, message: 'Lỗi server, vui lòng thử lại sau' }, { status: 500 });
  }
}
