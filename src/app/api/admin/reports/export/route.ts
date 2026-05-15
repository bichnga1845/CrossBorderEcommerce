import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const orders = await Order.find().sort({ createdAt: -1 });

    // Generate CSV Content
    let csv = 'OrderID,Customer,Email,Amount,Status,Date\n';
    orders.forEach(order => {
      csv += `${order._id},${order.customer.firstName} ${order.customer.lastName},${order.customer.email},${order.totalAmount},${order.status},${order.createdAt.toISOString()}\n`;
    });

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=hian_orders_report.csv'
      }
    });
  } catch (error) {
    console.error('Export Report API error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
