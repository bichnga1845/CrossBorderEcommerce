import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Batch from '@/models/Batch';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string; batchId: string }> }
) {
  try {
    await dbConnect();

    const { productId, batchId } = await params;
    const batch = await Batch.findOne({ productId, batchId }).populate('productId', 'name brand_name image category');

    if (!batch) {
      return NextResponse.json({ success: false, message: 'Batch not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      batch: {
        batchId: batch.batchId,
        productName: (batch.productId as any)?.name,
        brand: (batch.productId as any)?.brand_name || (batch.productId as any)?.category || 'HiAn',
        status: batch.status === 'Approved' || batch.status === 'Published' ? 'Verified Authentic' : batch.status,
        mediaType: 'image',
        mediaUrl: (batch.productId as any)?.image,
        farmInfo: batch.farmInfo,
        productionDate: batch.productionDate,
        expirationDate: batch.expirationDate,
        logisticsTimeline: batch.logisticsTimeline,
        certificates: [
          { name: 'Batch Verification Record', file: '#' },
          { name: 'Quality Assurance Log', file: '#' },
        ],
      },
    });
  } catch (error) {
    console.error('GET Verification error:', error);
    return NextResponse.json({ success: false, message: 'Error fetching verification data' }, { status: 500 });
  }
}