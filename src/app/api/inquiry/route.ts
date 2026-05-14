import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Inquiry from '@/models/Inquiry';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, name, email, phone, company, address, message, budget, quantity } = body;

    if (!type || !name || !email) {
      return NextResponse.json({ success: false, message: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    await dbConnect();

    const newInquiry = new Inquiry({
      type,
      name,
      email,
      phone,
      company,
      address,
      message,
      budget,
      quantity,
      status: 'new'
    });

    await newInquiry.save();

    return NextResponse.json({ success: true, message: 'Gửi thành công' });
  } catch (error) {
    console.error('Inquiry API error:', error);
    return NextResponse.json({ success: false, message: 'Lỗi server, vui lòng thử lại sau' }, { status: 500 });
  }
}
