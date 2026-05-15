import mongoose, { Schema, Document } from 'mongoose';

export interface IPromotion extends Document {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  usageLimit?: number;
  usageCount: number;
}

const PromotionSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  description: { type: String },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true },
  minOrderAmount: { type: Number, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  usageLimit: { type: Number },
  usageCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Promotion || mongoose.model<IPromotion>('Promotion', PromotionSchema);
