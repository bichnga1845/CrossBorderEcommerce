import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBatch extends Document {
  batchId: string;
  productId: mongoose.Types.ObjectId;
  productionDate: Date;
  expirationDate: Date;
  farmInfo: {
    name: string;
    location: string;
    farmerName?: string;
    harvestMethod?: string;
  };
  logisticsTimeline: {
    event: string;
    date: Date;
    location: string;
    description?: string;
  }[];
  multimediaUrls: string[];
  labTestPdfs: string[];
  status: 'Draft' | 'Pending Verification' | 'Approved' | 'Rejected' | 'Published';
  rejectionNotes?: string;
  origin_region?: string;
  qa_status?: string;
}

const BatchSchema: Schema = new Schema({
  batchId: { type: String, required: true, unique: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  productionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  farmInfo: {
    name: { type: String, required: true },
    location: { type: String, required: true },
    farmerName: { type: String },
    harvestMethod: { type: String }
  },
  logisticsTimeline: [{
    event: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    description: { type: String }
  }],
  multimediaUrls: [{ type: String }],
  labTestPdfs: [{ type: String }],
  status: { 
    type: String, 
    enum: ['Draft', 'Pending Verification', 'Approved', 'Rejected', 'Published'],
    default: 'Draft'
  },
  rejectionNotes: { type: String },
  origin_region: { type: String },
  qa_status: { type: String }
}, { timestamps: true });

const Batch: Model<IBatch> = mongoose.models.Batch || mongoose.model<IBatch>('Batch', BatchSchema);

export default Batch;
