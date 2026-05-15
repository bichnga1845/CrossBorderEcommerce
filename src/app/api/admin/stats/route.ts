import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import Product from '@/models/Product';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'all';

    let dateFilter = {};
    const now = new Date();
    if (range === 'today') {
      const today = new Date(now.setHours(0, 0, 0, 0));
      dateFilter = { createdAt: { $gte: today } };
    } else if (range === 'week') {
      const weekAgo = new Date(now.setDate(now.getDate() - 7));
      dateFilter = { createdAt: { $gte: weekAgo } };
    } else if (range === 'month') {
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      dateFilter = { createdAt: { $gte: monthAgo } };
    }

    // 1. Get Stats
    const totalRevenueResult = await Order.aggregate([
      { $match: { ...dateFilter, status: { $ne: 'cancelled' } } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = totalRevenueResult[0]?.total || 0;

    const ordersCount = await Order.countDocuments(dateFilter);
    const usersCount = await User.countDocuments({ role: 'customer', ...dateFilter });
    const productsCount = await Product.countDocuments();

    // 2. Get Recent Orders
    const recentOrders = await Order.find(dateFilter)
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // 3. Get Low Stock Products
    const lowStockProducts = await Product.find({ stock: { $lt: 10 } }).limit(5);

    return NextResponse.json({
      success: true,
      stats: {
        totalRevenue,
        ordersCount,
        usersCount,
        productsCount
      },
      recentOrders,
      lowStockProducts
    });
  } catch (error) {
    console.error('Admin Stats API error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
