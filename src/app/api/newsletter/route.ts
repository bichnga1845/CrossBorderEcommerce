import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';
import AuditLog from '@/models/AuditLog';
import EmailAutomation from '@/models/EmailAutomation';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

    const session = await getServerSession(authOptions);

    // Log the subscription
    try {
      await AuditLog.create({
        userId: session?.user?.id || newSubscriber._id, // If guest, use subscriber ID
        action: 'NEWSLETTER_SIGNUP',
        resource: 'Newsletter',
        resourceId: newSubscriber._id,
        details: `Đăng ký nhận bản tin với email: ${email}`
      });

      await EmailAutomation.create({
        userId: session?.user?.id || newSubscriber._id,
        triggerType: 'newsletter_signup',
        recipientEmail: email,
        subject: 'Cảm ơn bạn đã đăng ký nhận bản tin HiAn',
        content: 'Chào mừng bạn đến với cộng đồng HiAn. Chúng tôi sẽ gửi cho bạn những thông tin mới nhất về nông sản Tây Nguyên cao cấp.',
        status: 'pending'
      });
    } catch (logError) {
      console.error("Error creating newsletter logs:", logError);
    }

    // Trigger AI Agent in background
    fetch(`${process.env.NEXTAUTH_URL}/api/admin/agent/emails`, { 
      method: 'POST',
      headers: { 
        'Cookie': request.headers.get('cookie') || '',
        'x-internal-trigger': process.env.NEXTAUTH_SECRET || ''
      } 
    }).catch(e => console.error("Agent Trigger Error:", e));

    return NextResponse.json({ success: true, message: 'Đăng ký thành công' });
  } catch (error: any) {
    console.error('Newsletter API error:', error);
    if (error.code === 11000) {
      return NextResponse.json({ success: true, message: 'Email này đã đăng ký' });
    }
    return NextResponse.json({ success: false, message: 'Lỗi server, vui lòng thử lại sau' }, { status: 500 });
  }
}
