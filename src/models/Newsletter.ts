import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  status: 'active' | 'unsubscribed';
  subscribedAt: Date;
  agentProcessed: boolean;
}

const NewsletterSchema: Schema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  status: { 
    type: String, 
    enum: ['active', 'unsubscribed'], 
    default: 'active' 
  },
  subscribedAt: { 
    type: Date, 
    default: Date.now 
  },
  agentProcessed: { type: Boolean, default: false }
}, { timestamps: true });

const Newsletter: Model<INewsletter> = mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema);

export default Newsletter;
