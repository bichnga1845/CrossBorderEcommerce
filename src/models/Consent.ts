import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IConsent extends Document {
  userId: mongoose.Types.ObjectId;
  marketingConsent: boolean;
  dataProcessingConsent: boolean;
  notificationPreferences: {
    email: boolean;
    zalo: boolean;
    inApp: boolean;
  };
}

const ConsentSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  marketingConsent: { type: Boolean, default: false },
  dataProcessingConsent: { type: Boolean, default: false },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    zalo: { type: Boolean, default: false },
    inApp: { type: Boolean, default: true }
  }
}, { timestamps: true });

const Consent: Model<IConsent> = mongoose.models.Consent || mongoose.model<IConsent>('Consent', ConsentSchema);

export default Consent;
