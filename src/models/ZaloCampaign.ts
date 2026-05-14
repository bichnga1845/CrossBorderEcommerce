import mongoose, { Schema, Document } from 'mongoose';
export interface IZaloCampaign extends Document { customer_id: mongoose.Types.ObjectId; message_type: string; status: string; sent_at: Date; }
const schema = new Schema({ customer_id: { type: Schema.Types.ObjectId, ref: 'User' }, message_type: String, status: String, sent_at: Date }, { timestamps: true });
export default mongoose.models.ZaloCampaign || mongoose.model<IZaloCampaign>('ZaloCampaign', schema);