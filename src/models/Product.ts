import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  desc: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  brand_name?: string;
  status?: string;
  categoryId?: mongoose.Types.ObjectId;
  tag?: string;
  rating: number;
  reviews: number;
  benefits: string[];
  nutrition: {
    calories: string;
    fat: string;
    protein: string;
    carbs: string;
  };
  originStory?: string;
  productionProcess?: string;
  certifications: string[];
  batchIds: mongoose.Types.ObjectId[];
  stock: number;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  category: { type: String, required: true },
  brand_name: { type: String },
  status: { type: String },
  categoryId: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },
  tag: { type: String },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  benefits: [{ type: String }],
  nutrition: {
    calories: { type: String },
    fat: { type: String },
    protein: { type: String },
    carbs: { type: String },
  },
  originStory: { type: String },
  productionProcess: { type: String },
  certifications: [{ type: String }],
  batchIds: [{ type: Schema.Types.ObjectId, ref: 'Batch' }],
  stock: { type: Number, default: 0 }
}, { timestamps: true });

// Prevent mongoose from compiling the model multiple times in development
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
