const fs = require('fs');
const path = require('path');

const modelsDir = path.join(process.cwd(), 'src/models');

// Update Product.ts
let productTs = fs.readFileSync(path.join(modelsDir, 'Product.ts'), 'utf-8');
if (!productTs.includes('brand_name')) {
    productTs = productTs.replace('category: string;', 'category: string;\n  brand_name?: string;\n  status?: string;\n  categoryId?: mongoose.Types.ObjectId;');
    productTs = productTs.replace('category: { type: String, required: true },', "category: { type: String, required: true },\n  brand_name: { type: String },\n  status: { type: String },\n  categoryId: { type: Schema.Types.ObjectId, ref: 'ProductCategory' },");
    fs.writeFileSync(path.join(modelsDir, 'Product.ts'), productTs);
}

// Update User.ts
let userTs = fs.readFileSync(path.join(modelsDir, 'User.ts'), 'utf-8');
if (!userTs.includes('city')) {
    userTs = userTs.replace('address?: string;', 'address?: string;\n  city?: string;\n  consent_status?: string;');
    userTs = userTs.replace('address: { type: String },', 'address: { type: String },\n  city: { type: String },\n  consent_status: { type: String },');
    fs.writeFileSync(path.join(modelsDir, 'User.ts'), userTs);
}

// Update Batch.ts
let batchTs = fs.readFileSync(path.join(modelsDir, 'Batch.ts'), 'utf-8');
if (!batchTs.includes('origin_region')) {
    batchTs = batchTs.replace('rejectionNotes?: string;', 'rejectionNotes?: string;\n  origin_region?: string;\n  qa_status?: string;');
    batchTs = batchTs.replace('rejectionNotes: { type: String }', 'rejectionNotes: { type: String },\n  origin_region: { type: String },\n  qa_status: { type: String }');
    fs.writeFileSync(path.join(modelsDir, 'Batch.ts'), batchTs);
}

// Update Order.ts
let orderTs = fs.readFileSync(path.join(modelsDir, 'Order.ts'), 'utf-8');
if (!orderTs.includes('batch_id')) {
    orderTs = orderTs.replace('quantity: number;', 'quantity: number;\n  batch_id?: mongoose.Types.ObjectId | string;');
    orderTs = orderTs.replace('quantity: { type: Number, required: true },', 'quantity: { type: Number, required: true },\n    batch_id: { type: String },');
    fs.writeFileSync(path.join(modelsDir, 'Order.ts'), orderTs);
}

console.log('Update Complete!');
