import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
  type: 'corporate_quote' | 'corporate_profile' | 'innovation_lab';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  message?: string;
  budget?: string;
  quantity?: string;
  status: 'new' | 'contacted' | 'resolved';
}

const InquirySchema: Schema = new Schema({
  type: { 
    type: String, 
    required: true, 
    enum: ['corporate_quote', 'corporate_profile', 'innovation_lab'] 
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  company: { type: String },
  address: { type: String },
  message: { type: String },
  budget: { type: String },
  quantity: { type: String },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'resolved'], 
    default: 'new' 
  }
}, { timestamps: true });

const Inquiry: Model<IInquiry> = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);

export default Inquiry;
