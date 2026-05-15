import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import AuditLog from '@/models/AuditLog';
import EmailAutomation from '@/models/EmailAutomation';

export async function POST(request: Request) {
  try {
    const { name, username, email, password, phone, address, city, district, ward } = await request.json();

    if (!name || !email || !password || !phone || !address || !city || !district || !ward) {
      return NextResponse.json({ success: false, message: 'Vui lòng nhập đầy đủ thông tin' }, { status: 400 });
    }

    await dbConnect();

    // Check if user exists by email or username
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({ success: false, message: 'Email này đã được sử dụng' }, { status: 400 });
    }

    if (username) {
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return NextResponse.json({ success: false, message: 'Tên đăng nhập đã được sử dụng' }, { status: 400 });
      }
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      district,
      ward,
      authProvider: 'credentials'
    });

    await newUser.save();

    // Log the registration
    try {
      await AuditLog.create({
        userId: newUser._id,
        action: 'USER_REGISTRATION',
        resource: 'User',
        resourceId: newUser._id,
        details: `Người dùng mới đăng ký tài khoản với email: ${email}`
      });

      await EmailAutomation.create({
        userId: newUser._id,
        triggerType: 'registration_welcome',
        recipientEmail: email,
        subject: 'Chào mừng bạn đến với HiAn - Nông Sản Cao Cấp',
        status: 'pending'
      });
    } catch (logError) {
      console.error("Error creating registration logs:", logError);
    }

    // Trigger AI Agent in background
    fetch(`${process.env.NEXTAUTH_URL}/api/admin/agent/emails`, { 
      method: 'POST',
      headers: { 
        'Cookie': request.headers.get('cookie') || '',
        'x-internal-trigger': process.env.NEXTAUTH_SECRET || ''
      } 
    }).catch(e => console.error("Agent Trigger Error:", e));

    return NextResponse.json({ success: true, message: 'Tạo tài khoản thành công' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, message: 'Lỗi server, vui lòng thử lại sau' }, { status: 500 });
  }
}
