import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const user = await User.findById(session.user.id).select('-password');
    
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Fetch profile error:', error);
    return NextResponse.json({ success: false, message: 'Error fetching profile' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone, address, city, district, ward } = body;

    await dbConnect();
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { name, phone, address, city, district, ward },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Record Audit Log
    try {
      const AuditLog = (await import('@/models/AuditLog')).default;
      await AuditLog.create({
        userId: user._id,
        action: 'UPDATE_PROFILE',
        resource: 'User',
        resourceId: user._id,
        details: `Người dùng ${user.name} đã cập nhật thông tin cá nhân.`
      });
    } catch (logError) {
      console.error("Log error:", logError);
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ success: false, message: 'Error updating profile' }, { status: 500 });
  }
}
