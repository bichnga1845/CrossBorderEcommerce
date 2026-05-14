import mongoose, { Schema, Document } from 'mongoose';
export interface IEmailAutomation extends Document { customer_id: mongoose.Types.ObjectId; trigger_type: string; subject: string; sent_at: Date; }
const schema = new Schema({ customer_id: { type: Schema.Types.ObjectId, ref: 'User' }, trigger_type: String, subject: String, sent_at: Date }, { timestamps: true });
export default mongoose.models.EmailAutomation || mongoose.model<IEmailAutomation>('EmailAutomation', schema);