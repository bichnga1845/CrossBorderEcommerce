import mongoose, { Schema, Document } from 'mongoose';
export interface ICustomerBehavior extends Document { customer_id: mongoose.Types.ObjectId; event_type: string; event_value: string; created_at: Date; }
const schema = new Schema({ customer_id: { type: Schema.Types.ObjectId, ref: 'User' }, event_type: String, event_value: String, created_at: { type: Date, default: Date.now } }, { timestamps: true });
export default mongoose.models.CustomerBehavior || mongoose.model<ICustomerBehavior>('CustomerBehavior', schema);