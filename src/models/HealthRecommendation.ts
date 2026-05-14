import mongoose, { Schema, Document } from 'mongoose';
export interface IHealthRecommendation extends Document { product_id: mongoose.Types.ObjectId; health_goal: string; persona: string; }
const schema = new Schema({ product_id: { type: Schema.Types.ObjectId, ref: 'Product' }, health_goal: String, persona: String }, { timestamps: true });
export default mongoose.models.HealthRecommendation || mongoose.model<IHealthRecommendation>('HealthRecommendation', schema);