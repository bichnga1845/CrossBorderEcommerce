import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import Batch from '@/models/Batch';
import AuditLog from '@/models/AuditLog';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'staff'].includes((session.user as any)?.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    let query = {};
    if (status) query = { status };

    const batches = await Batch.find(query).populate('productId', 'name category').sort({ createdAt: -1 });
    
    return NextResponse.json(batches);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch batches' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !['admin', 'staff'].includes((session.user as any)?.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { batchId, status, rejectionNotes } = body;

    if (!batchId || !status) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate Status State Machine
    const validStatuses = ['Draft', 'Pending Verification', 'Approved', 'Rejected', 'Published'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return NextResponse.json({ error: 'Batch not found' }, { status: 404 });
    }

    batch.status = status;
    batch.qa_status = status === 'Approved' || status === 'Published' ? 'Passed' : 'Reviewing';
    
    if (status === 'Rejected') {
      batch.rejectionNotes = rejectionNotes;
    }

    await batch.save();

    // Create Audit Log
    await AuditLog.create({
      userId: (session.user as any)?.id,
      action: `BATCH_STATUS_UPDATED`,
      resource: 'Batch',
      resourceId: batch._id,
      details: `Status changed to ${status}`,
    });

    return NextResponse.json({ message: 'Batch updated successfully', batch });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update batch' }, { status: 500 });
  }
}
