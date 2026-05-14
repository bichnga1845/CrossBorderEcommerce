import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { createMomoPaymentUrl } from '@/lib/momo';

function normalizeCustomer(customer: any) {
  const fullName = String(customer?.name || '').trim();
  const nameParts = fullName.split(/\s+/).filter(Boolean);
  const lastName = nameParts.pop() || fullName || 'Khách hàng';
  const firstName = nameParts.join(' ') || fullName || 'Khách hàng';

  return {
    email: customer?.email || '',
    firstName,
    lastName,
    address: customer?.address || '',
    apartment: customer?.apartment || '',
    city: customer?.city || '',
    district: customer?.district || '',
    ward: customer?.ward || '',
    phone: customer?.phone || '',
    newsletter: Boolean(customer?.newsletter),
  };
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const rawBody = await request.text();

    if (!rawBody.trim()) {
      return NextResponse.json({ success: false, message: 'Request body is empty' }, { status: 400 });
    }

    let body: any;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid JSON body' }, { status: 400 });
    }

    const { customer, items } = body;
    const normalizedCustomer = normalizeCustomer(customer);

    if (!customer || !items || items.length === 0) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 });
    }

    const requiredCustomerFields = ['email', 'firstName', 'lastName', 'address', 'city', 'district', 'ward', 'phone'];
    const missingField = requiredCustomerFields.find((field) => !String((normalizedCustomer as any)[field] || '').trim());

    if (missingField) {
      return NextResponse.json(
        { success: false, message: `Thiếu thông tin bắt buộc: ${missingField}` },
        { status: 400 }
      );
    }

    let totalAmount = 0;
    const orderItems = [] as Array<{
      productId: string;
      name: string;
      price: number;
      quantity: number;
      image: string;
    }>;

    for (const item of items) {
      let product = await Product.findById(item.productId);

      if (!product && item.name) {
        product = await Product.findOne({ name: item.name });
      }

      if (!product) {
        return NextResponse.json({ success: false, message: `Sản phẩm "${item.name}" không còn tồn tại trong giỏ. Vui lòng tải lại trang giỏ hàng.` }, { status: 400 });
      }

      totalAmount += product.price * item.quantity;

      orderItems.push({
        productId: product._id.toString(),
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      });
    }

    const order = await new Order({
      userId: session.user.id,
      customer: normalizedCustomer,
      items: orderItems,
      paymentMethod: 'momo',
      totalAmount,
      status: 'pending',
    }).save();

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
    const redirectUrl = process.env.MOMO_REDIRECT_URL || `${siteUrl}/payment/momo/callback`;
    const ipnUrl = process.env.MOMO_IPN_URL || `${siteUrl}/api/v1/payment/momo/ipn`;

    try {
      const momo = await createMomoPaymentUrl({
        orderId: order._id.toString(),
        amount: totalAmount,
        orderInfo: `Thanh toan don hang ${order._id.toString()}`,
        redirectUrl,
        ipnUrl,
      });

      return NextResponse.json({
        success: true,
        orderId: order._id,
        paymentUrl: momo.paymentUrl,
      });
    } catch (momoError) {
      console.error('MoMo payment link error:', momoError);

      return NextResponse.json({
        success: true,
        orderId: order._id,
        paymentUrl: null,
        paymentWarning: true,
        message: 'Không tạo được link thanh toán MoMo, nhưng đơn hàng đã được lưu.',
      });
    }
  } catch (error) {
    console.error('MoMo create payment error:', error);
    return NextResponse.json({ success: false, message: 'Error creating MoMo payment' }, { status: 500 });
  }
}
