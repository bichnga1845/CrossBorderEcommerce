import mongoose, { Schema, Document } from 'mongoose';
export interface IMultimediaResource extends Document { batch_id: mongoose.Types.ObjectId; video_url: string; pdf_url: string; image_url: string; checksum: string; }
const schema = new Schema({ batch_id: { type: Schema.Types.ObjectId, ref: 'Batch', required: true }, video_url: String, pdf_url: String, image_url: String, checksum: String }, { timestamps: true });
export default mongoose.models.MultimediaResource || mongoose.model<IMultimediaResource>('MultimediaResource', schema);