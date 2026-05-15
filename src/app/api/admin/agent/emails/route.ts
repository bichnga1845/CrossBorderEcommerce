import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Newsletter from '@/models/Newsletter';
import EmailAutomation from '@/models/EmailAutomation';
import { sendEmail } from '@/lib/mail';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const isInternal = request.headers.get('x-internal-trigger') === process.env.NEXTAUTH_SECRET;

    if (!isInternal && (!session?.user || (session.user as any).role !== 'admin')) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const now = new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);

    let processedCount = 0;

    // 1. Process New Registrations (1 minute delay)
    const newUsers = await User.find({
      welcomeEmailSent: { $ne: true },
      createdAt: { $lte: oneMinuteAgo },
      role: 'customer'
    });

    for (const user of newUsers) {
      const subject = `Chào mừng ${user.name} đến với HiAn Luxury`;
      const html = `
        <div style="font-family: serif; padding: 40px; background: #F8FAFC;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 24px; overflow: hidden; border: 1px solid #E2E8F0;">
            <div style="background: #0F2D24; padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">HiAn Luxury</h1>
            </div>
            <div style="padding: 40px; color: #1E293B;">
              <h2 style="font-size: 20px; margin-bottom: 20px;">Chào ${user.name},</h2>
              <p style="line-height: 1.6;">Cảm ơn bạn đã gia nhập cộng đồng nông sản cao cấp HiAn. Khám phá ngay các ưu đãi đặc quyền dành cho hạng <b>${user.membershipTier || 'silver'}</b>.</p>
              <a href="http://localhost:3000" style="display: inline-block; margin-top: 30px; padding: 16px 32px; background: #0F2D24; color: white; text-decoration: none; border-radius: 12px; font-weight: bold;">Khám phá ngay</a>
            </div>
          </div>
        </div>
      `;

      try {
        await sendEmail({ to: user.email, subject, html });
        await EmailAutomation.create({
          userId: user._id,
          email: user.email,
          type: 'welcome',
          subject,
          content: html,
          status: 'sent'
        });
      } catch (err) {
        console.error("Email send failed:", err);
        await EmailAutomation.create({
          userId: user._id,
          email: user.email,
          type: 'welcome',
          subject,
          content: html,
          status: 'failed'
        });
      }

      user.welcomeEmailSent = true;
      await user.save();
      processedCount++;
    }

    // 2. Process Newsletter Signups
    const newSubscribers = await Newsletter.find({ agentProcessed: { $ne: true } });
    for (const sub of newSubscribers) {
      const subject = 'Cảm ơn bạn đã đăng ký nhận tin từ HiAn';
      const html = `
        <div style="font-family: sans-serif; padding: 40px; text-align: center;">
          <h2 style="color: #0F2D24;">Cảm ơn bạn!</h2>
          <p>Chúng tôi sẽ gửi những cập nhật mới nhất về các dòng sản phẩm giới hạn của HiAn đến bạn sớm nhất.</p>
        </div>
      `;

      try {
        await sendEmail({ to: sub.email, subject, html });
        await EmailAutomation.create({
          email: sub.email,
          type: 'newsletter_welcome',
          subject,
          content: html,
          status: 'sent'
        });
      } catch (err) {
        console.error("Newsletter send failed:", err);
        await EmailAutomation.create({
          email: sub.email,
          type: 'newsletter_welcome',
          subject,
          content: html,
          status: 'failed'
        });
      }

      sub.agentProcessed = true;
      await sub.save();
      processedCount++;
    }

    return NextResponse.json({
      success: true,
      processedCount,
      message: `AI Agent đã xử lý xong ${processedCount} tác vụ.`
    });
  } catch (error) {
    console.error('AI Agent Auto API error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
