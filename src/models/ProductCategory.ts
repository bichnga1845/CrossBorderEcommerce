import mongoose, { Schema, Document } from 'mongoose';
export interface IProductCategory extends Document { category_name: string; positioning: string; }
const schema = new Schema({ category_name: { type: String, required: true }, positioning: { type: String } }, { timestamps: true });
export default mongoose.models.ProductCategory || mongoose.model<IProductCategory>('ProductCategory', schema);