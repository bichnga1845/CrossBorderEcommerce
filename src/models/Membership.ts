import mongoose, { Schema, Document } from 'mongoose';
export interface IMembership extends Document { customer_id: mongoose.Types.ObjectId; tier: string; points: number; refill_enabled: boolean; }
const schema = new Schema({ customer_id: { type: Schema.Types.ObjectId, ref: 'User' }, tier: String, points: Number, refill_enabled: Boolean }, { timestamps: true });
export default mongoose.models.Membership || mongoose.model<IMembership>('Membership', schema);