import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEmailAutomation extends Document {
  userId: mongoose.Types.ObjectId | string;
  triggerType: 'order_confirmation' | 'registration_welcome' | 'newsletter_signup';
  recipientEmail: string;
  subject: string;
  content?: string;
  status: 'pending' | 'processing' | 'ready_to_send' | 'sent' | 'failed';
  aiAnalysis?: string;
  aiSuggestedPersonalization?: string;
  orderId?: mongoose.Types.ObjectId | string;
  sentAt?: Date;
}

const EmailAutomationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  triggerType: { 
    type: String, 
    enum: ['order_confirmation', 'registration_welcome', 'newsletter_signup'],
    required: true 
  },
  recipientEmail: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'ready_to_send', 'sent', 'failed'], 
    default: 'pending' 
  },
  aiAnalysis: { type: String },
  aiSuggestedPersonalization: { type: String },
  orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
  sentAt: { type: Date }
}, { timestamps: true });

const EmailAutomation: Model<IEmailAutomation> = mongoose.models.EmailAutomation || mongoose.model<IEmailAutomation>('EmailAutomation', EmailAutomationSchema);

export default EmailAutomation;