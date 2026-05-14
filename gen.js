/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-env node */
const fs = require('fs');
const path = require('path');
const modelsDir = path.join(process.cwd(), 'src/models');
if (!fs.existsSync(modelsDir)) fs.mkdirSync(modelsDir, { recursive: true });

function writeModel(name, content) {
    fs.writeFileSync(path.join(modelsDir, name + '.ts'), content);
}

writeModel('ProductCategory', `import mongoose, { Schema, Document } from 'mongoose';
export interface IProductCategory extends Document { category_name: string; positioning: string; }
const schema = new Schema({ category_name: { type: String, required: true }, positioning: { type: String } }, { timestamps: true });
export default mongoose.models.ProductCategory || mongoose.model<IProductCategory>('ProductCategory', schema);`);

writeModel('MultimediaResource', `import mongoose, { Schema, Document } from 'mongoose';
export interface IMultimediaResource extends Document { batch_id: mongoose.Types.ObjectId; video_url: string; pdf_url: string; image_url: string; checksum: string; }
const schema = new Schema({ batch_id: { type: Schema.Types.ObjectId, ref: 'Batch', required: true }, video_url: String, pdf_url: String, image_url: String, checksum: String }, { timestamps: true });
export default mongoose.models.MultimediaResource || mongoose.model<IMultimediaResource>('MultimediaResource', schema);`);

writeModel('HealthRecommendation', `import mongoose, { Schema, Document } from 'mongoose';
export interface IHealthRecommendation extends Document { product_id: mongoose.Types.ObjectId; health_goal: string; persona: string; }
const schema = new Schema({ product_id: { type: Schema.Types.ObjectId, ref: 'Product' }, health_goal: String, persona: String }, { timestamps: true });
export default mongoose.models.HealthRecommendation || mongoose.model<IHealthRecommendation>('HealthRecommendation', schema);`);

writeModel('Membership', `import mongoose, { Schema, Document } from 'mongoose';
export interface IMembership extends Document { customer_id: mongoose.Types.ObjectId; tier: string; points: number; refill_enabled: boolean; }
const schema = new Schema({ customer_id: { type: Schema.Types.ObjectId, ref: 'User' }, tier: String, points: Number, refill_enabled: Boolean }, { timestamps: true });
export default mongoose.models.Membership || mongoose.model<IMembership>('Membership', schema);`);

writeModel('CustomerBehavior', `import mongoose, { Schema, Document } from 'mongoose';
export interface ICustomerBehavior extends Document { customer_id: mongoose.Types.ObjectId; event_type: string; event_value: string; created_at: Date; }
const schema = new Schema({ customer_id: { type: Schema.Types.ObjectId, ref: 'User' }, event_type: String, event_value: String, created_at: { type: Date, default: Date.now } }, { timestamps: true });
export default mongoose.models.CustomerBehavior || mongoose.model<ICustomerBehavior>('CustomerBehavior', schema);`);

writeModel('EmailAutomation', `import mongoose, { Schema, Document } from 'mongoose';
export interface IEmailAutomation extends Document { customer_id: mongoose.Types.ObjectId; trigger_type: string; subject: string; sent_at: Date; }
const schema = new Schema({ customer_id: { type: Schema.Types.ObjectId, ref: 'User' }, trigger_type: String, subject: String, sent_at: Date }, { timestamps: true });
export default mongoose.models.EmailAutomation || mongoose.model<IEmailAutomation>('EmailAutomation', schema);`);

writeModel('ZaloCampaign', `import mongoose, { Schema, Document } from 'mongoose';
export interface IZaloCampaign extends Document { customer_id: mongoose.Types.ObjectId; message_type: string; status: string; sent_at: Date; }
const schema = new Schema({ customer_id: { type: Schema.Types.ObjectId, ref: 'User' }, message_type: String, status: String, sent_at: Date }, { timestamps: true });
export default mongoose.models.ZaloCampaign || mongoose.model<IZaloCampaign>('ZaloCampaign', schema);`);

writeModel('RecommendationLog', `import mongoose, { Schema, Document } from 'mongoose';
export interface IRecommendationLog extends Document { customer_id: mongoose.Types.ObjectId; product_id: mongoose.Types.ObjectId; reason: string; created_at: Date; }
const schema = new Schema({ customer_id: { type: Schema.Types.ObjectId, ref: 'User' }, product_id: { type: Schema.Types.ObjectId, ref: 'Product' }, reason: String, created_at: { type: Date, default: Date.now } }, { timestamps: true });
export default mongoose.models.RecommendationLog || mongoose.model<IRecommendationLog>('RecommendationLog', schema);`);

console.log('done');