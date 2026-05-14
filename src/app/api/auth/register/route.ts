import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

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

    return NextResponse.json({ success: true, message: 'Tạo tài khoản thành công' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, message: 'Lỗi server, vui lòng thử lại sau' }, { status: 500 });
  }
}
