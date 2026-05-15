import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth/next';
import User from '@/models/User';
import AuditLog from '@/models/AuditLog';
import EmailAutomation from '@/models/EmailAutomation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
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
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const rawBody = await request.text();

    if (!rawBody.trim()) {
      return NextResponse.json(
        { success: false, message: 'Request body is empty' },
        { status: 400 }
      );
    }

    let body: any;

    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON body' },
        { status: 400 }
      );
    }

    const { customer, items, paymentMethod } = body;
    const normalizedCustomer = normalizeCustomer(customer);
    
    if (!customer || !items || items.length === 0 || !paymentMethod) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const requiredCustomerFields = ['email', 'firstName', 'lastName', 'address', 'city', 'district', 'ward', 'phone'];
    const missingField = requiredCustomerFields.find((field) => !String((normalizedCustomer as any)[field] || '').trim());

    if (missingField) {
      return NextResponse.json(
        { success: false, message: `Thiếu thông tin bắt buộc: ${missingField}` },
        { status: 400 }
      );
    }
    
    // Calculate total amount securely
    let totalAmount = 0;
    const orderItems = [];
    
    for (const item of items) {
      // Find product to ensure price is accurate
      let product = await Product.findById(item.productId);

      if (!product && item.name) {
        product = await Product.findOne({ name: item.name });
      }
      
      if (!product) {
        return NextResponse.json(
          { success: false, message: `Sản phẩm "${item.name}" không còn tồn tại trong giỏ. Vui lòng tải lại trang giỏ hàng.` },
          { status: 400 }
        );
      }
      
      totalAmount += product.price * item.quantity;
      
      orderItems.push({
        productId: product._id.toString(),
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image
      });
    }
    
    // Calculate points earned (1 point per 10,000 VND)
    const pointsEarned = Math.floor(totalAmount / 10000);
    
    // Create new order
    const order = new Order({
      userId: session.user.id,
      customer: normalizedCustomer,
      items: orderItems,
      paymentMethod,
      totalAmount,
      status: 'pending', // Can be updated by a webhook later
      pointsEarned
    });
    
    await order.save();

    // Update user points and tier
    try {
      const user = await User.findById(session.user.id);
      if (user) {
        user.rewardPoints = (user.rewardPoints || 0) + pointsEarned;
        user.purchaseStreaks = (user.purchaseStreaks || 0) + 1;

        // Update membership tier based on points
        if (user.rewardPoints >= 10000) {
          user.membershipTier = 'elite';
        } else if (user.rewardPoints >= 5000) {
          user.membershipTier = 'platinum';
        } else if (user.rewardPoints >= 1000) {
          user.membershipTier = 'gold';
        }
        
        await user.save();
      }
    } catch (userUpdateError) {
      console.error("Error updating user points:", userUpdateError);
    }

    // Log the purchase in AuditLog and EmailAutomation
    try {
      await AuditLog.create({
        userId: session.user.id,
        action: 'CREATE_ORDER',
        resource: 'Order',
        resourceId: order._id,
        details: `Người dùng đã đặt đơn hàng mới với giá trị ${totalAmount} VNĐ. Nhận được ${pointsEarned} điểm.`
      });

      await EmailAutomation.create({
        userId: session.user.id,
        triggerType: 'order_confirmation',
        recipientEmail: session.user.email,
        subject: `Xác nhận đơn hàng HiAn #${order._id.toString().slice(-8).toUpperCase()}`,
        content: `Cảm ơn bạn đã tin tưởng HiAn. Đơn hàng trị giá ${totalAmount.toLocaleString()} VNĐ của bạn đang được xử lý. Bạn đã tích lũy được ${pointsEarned} điểm từ đơn hàng này.`,
        status: 'pending',
        orderId: order._id
      });
    } catch (logError) {
      console.error("Error creating logs:", logError);
    }

    if (paymentMethod === 'momo') {
      try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
        const redirectUrl = process.env.MOMO_REDIRECT_URL || `${siteUrl}/payment/momo/callback`;
        const ipnUrl = process.env.MOMO_IPN_URL || `${siteUrl}/api/v1/payment/momo/ipn`;

        const momo = await createMomoPaymentUrl({
          orderId: order._id.toString(),
          amount: totalAmount,
          orderInfo: `Thanh toan don hang ${order._id.toString()}`,
          redirectUrl,
          ipnUrl,
        });

        return NextResponse.json({
          success: true,
          message: 'MoMo payment created successfully',
          orderId: order._id,
          paymentUrl: momo.paymentUrl,
        });
      } catch (momoError) {
        console.error('MoMo payment link error:', momoError);

        return NextResponse.json({
          success: true,
          message: 'Đơn hàng đã được tạo, nhưng không tạo được link thanh toán MoMo. Vui lòng thử lại hoặc thanh toán sau.',
          orderId: order._id,
          paymentUrl: null,
          paymentWarning: true,
        });
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Order created successfully",
      orderId: order._id
    });
    
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { success: false, message: "Error processing checkout" },
      { status: 500 }
    );
  }
}
