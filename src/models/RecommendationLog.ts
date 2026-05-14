import mongoose, { Schema, Document } from 'mongoose';
export interface IRecommendationLog extends Document { customer_id: mongoose.Types.ObjectId; product_id: mongoose.Types.ObjectId; reason: string; created_at: Date; }
const schema = new Schema({ customer_id: { type: Schema.Types.ObjectId, ref: 'User' }, product_id: { type: Schema.Types.ObjectId, ref: 'Product' }, reason: String, created_at: { type: Date, default: Date.now } }, { timestamps: true });
export default mongoose.models.RecommendationLog || mongoose.model<IRecommendationLog>('RecommendationLog', schema);