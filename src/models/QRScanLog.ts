import mongoose, { Schema, Document } from 'mongoose';

export interface IQRScanLog extends Document {
  batchId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  scannedAt: Date;
  deviceInfo?: string;
  location?: string;
}

const schema = new Schema({
  batchId: { type: Schema.Types.ObjectId, ref: 'Batch', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  scannedAt: { type: Date, default: Date.now },
  deviceInfo: { type: String },
  location: { type: String },
});

export default mongoose.models.QRScanLog || mongoose.model<IQRScanLog>('QRScanLog', schema);
