import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  productId: mongoose.Types.ObjectId | string;
  name: string;
  price: number;
  quantity: number;
  batch_id?: mongoose.Types.ObjectId | string;
  image: string;
}

export interface ICustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  district: string;
  ward: string;
  phone: string;
  newsletter: boolean;
}

export interface IOrder extends Document {
  userId?: mongoose.Types.ObjectId | string;
  customer: ICustomerInfo;
  items: IOrderItem[];
  paymentMethod: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  pointsEarned: number;
}

const OrderSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customer: {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    phone: { type: String, required: true },
    newsletter: { type: Boolean, default: false }
  },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    batch_id: { type: String },
    image: { type: String, required: true },
  }],
  paymentMethod: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  pointsEarned: { type: Number, default: 0 }
}, { timestamps: true });

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
