import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username?: string;
  email: string;
  password?: string;
  image?: string;
  role: 'customer' | 'admin' | 'staff' | 'supplier';
  phone?: string;
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
  authProvider: 'credentials' | 'google';
  membershipTier: 'silver' | 'gold' | 'platinum';
  rewardPoints: number;
  refillReminders: boolean;
  purchaseStreaks: number;
  wishlist: string[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, unique: true, sparse: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Optional for Google OAuth users
  image: { type: String },
  role: { type: String, enum: ['customer', 'admin', 'staff', 'supplier'], default: 'customer' },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  district: { type: String },
  ward: { type: String },
  authProvider: { type: String, enum: ['credentials', 'google'], default: 'credentials' },
  membershipTier: { type: String, enum: ['silver', 'gold', 'platinum'], default: 'silver' },
  rewardPoints: { type: Number, default: 0 },
  refillReminders: { type: Boolean, default: true },
  purchaseStreaks: { type: Number, default: 0 },
  wishlist: [{ type: String }]
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
