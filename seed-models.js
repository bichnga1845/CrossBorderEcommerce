/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');
const URI = 'mongodb://127.0.0.1:27017/aura_db';

// Define Product Schema directly in seed script
const productSchema = new mongoose.Schema({
  name: String,
  desc: String,
  price: Number,
  image: String,
  images: [String],
  tag: String,
  category: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' },
  rating: Number,
  reviews: Number,
  benefits: [String],
  nutrition: {
    calories: String,
    fat: String,
    protein: String,
    carbs: String,
  },
  createdAt: { type: Date, default: Date.now }
});

const categorySchema = new mongoose.Schema({
  category_name: String,
  positioning: String,
});

const batchSchema = new mongoose.Schema({
  batchId: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  productionDate: Date,
  expirationDate: Date,
  farmInfo: {
    name: String,
    location: String,
    farmerName: String,
    harvestMethod: String,
  },
  logisticsTimeline: [{
    event: String,
    date: Date,
    location: String,
    description: String,
  }],
  multimediaUrls: [String],
  labTestPdfs: [String],
  status: String,
  rejectionNotes: String,
  origin_region: String,
  qa_status: String,
});

async function seed() {
  try {
    await mongoose.connect(URI);
    console.log('Connected to DB');

    const Product = mongoose.model('Product', productSchema);
    const ProductCategory = mongoose.model('ProductCategory', categorySchema);
    const Batch = mongoose.model('Batch', batchSchema);

    const categories = [
      { category_name: 'Hạt Mắc Ca', positioning: '1' },
      { category_name: 'Mật Ong', positioning: '2' },
      { category_name: 'Trái Cây Sấy', positioning: '3' },
      { category_name: 'Quà Tặng', positioning: '4' },
    ];

    // Clear existing categories and products
    await ProductCategory.deleteMany({});
    console.log('Cleared existing categories');

    await Batch.deleteMany({});
    console.log('Cleared existing batches');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    const insertedCategories = await ProductCategory.insertMany(categories);
    const categoryMap = new Map(insertedCategories.map((category) => [category.category_name, category._id]));

    // Create sample products
    const products = [
      {
        name: "Hạt Mắc Ca Tây Nguyên",
        desc: "Hạt mắc ca nguyên chất từ Tây Nguyên, giàu vitamin E và omega-3",
        price: 450000,
        image: "/images/macadamia.png",
        images: ["/images/macadamia.png"],
        category: "Hạt Mắc Ca",
        categoryId: categoryMap.get('Hạt Mắc Ca'),
        tag: "bestseller",
        rating: 5,
        reviews: 128
      },
      {
        name: "Mật Ong Hoa Rừng",
        desc: "Mật ong hoa rừng 100% tự nhiên, không pha tạp",
        price: 350000,
        image: "/images/honey.png",
        images: ["/images/honey.png"],
        category: "Mật Ong",
        categoryId: categoryMap.get('Mật Ong'),
        tag: "bestseller",
        rating: 4.8,
        reviews: 95
      },
      {
        name: "Trái Cây Sấy Khô",
        desc: "Hỗn hợp trái cây sấy khô giàu chất xơ và vitamin",
        price: 280000,
        image: "/images/dried_fruits.png",
        images: ["/images/dried_fruits.png"],
        category: "Trái Cây Sấy",
        categoryId: categoryMap.get('Trái Cây Sấy'),
        tag: "bestseller",
        rating: 4.7,
        reviews: 82
      },
      {
        name: "Quà Tặng Tết Cao Cấp",
        desc: "Bộ quà tặng Tết đặc biệt với các sản phẩm cao cấp",
        price: 890000,
        image: "/images/tet_box.png",
        images: ["/images/tet_box.png"],
        category: "Quà Tặng",
        categoryId: categoryMap.get('Quà Tặng'),
        tag: "gift",
        rating: 4.9,
        reviews: 156
      },
      {
        name: "Hạt Mắc Ca Rang Muối",
        desc: "Hạt mắc ca rang muối thơm ngon",
        price: 520000,
        image: "/images/macadamia.png",
        images: ["/images/macadamia.png"],
        category: "Hạt Mắc Ca",
        categoryId: categoryMap.get('Hạt Mắc Ca'),
        rating: 4.6,
        reviews: 67
      },
      {
        name: "Mật Ong Rừng Sâu",
        desc: "Mật ong đặc biệt từ rừng sâu Tây Nguyên",
        price: 680000,
        image: "/images/honey.png",
        images: ["/images/honey.png"],
        category: "Mật Ong",
        categoryId: categoryMap.get('Mật Ong'),
        tag: "premium",
        rating: 5,
        reviews: 143
      },
      {
        name: "Mix Hạt Dinh Dưỡng",
        desc: "Hỗn hợp hạt dinh dưỡng cân bằng",
        price: 390000,
        image: "/images/macadamia.png",
        images: ["/images/macadamia.png"],
        category: "Hạt Mắc Ca",
        categoryId: categoryMap.get('Hạt Mắc Ca'),
        rating: 4.7,
        reviews: 89
      },
      {
        name: "Bánh Quà Tặng Cao Cấp",
        desc: "Bộ bánh quà tặng được bao gói sang trọng",
        price: 720000,
        image: "/images/tet_box.png",
        images: ["/images/tet_box.png"],
        category: "Quà Tặng",
        categoryId: categoryMap.get('Quà Tặng'),
        rating: 4.8,
        reviews: 112
      },
      {
        name: "Hộp Quà Tặng Phú Quý",
        desc: "Bộ quà tặng phú quý với các sản phẩm cao cấp nhất",
        price: 1200000,
        image: "/images/tet_box.png",
        images: ["/images/tet_box.png"],
        category: "Quà Tặng",
        categoryId: categoryMap.get('Quà Tặng'),
        tag: "premium",
        rating: 5,
        reviews: 78
      }
    ];

    const result = await Product.insertMany(products);
    console.log(`✓ Seeded ${result.length} products successfully!`);

    const productMap = new Map(result.map((product) => [product.name, product]));
    const batchSeeds = [
      {
        productName: 'Hạt Mắc Ca Tây Nguyên',
        batchId: 'B-2025-05-MAC',
      },
      {
        productName: 'Mật Ong Hoa Rừng',
        batchId: 'B-2025-05-HNY',
      },
      {
        productName: 'Trái Cây Sấy Khô',
        batchId: 'B-2025-05-FRT',
      },
      {
        productName: 'Quà Tặng Tết Cao Cấp',
        batchId: 'B-2025-05-GFT',
      },
      {
        productName: 'Hạt Mắc Ca Rang Muối',
        batchId: 'B-2025-05-MAC-02',
      },
      {
        productName: 'Mật Ong Rừng Sâu',
        batchId: 'B-2025-05-HNY-02',
      },
      {
        productName: 'Mix Hạt Dinh Dưỡng',
        batchId: 'B-2025-05-MIX',
      },
      {
        productName: 'Bánh Quà Tặng Cao Cấp',
        batchId: 'B-2025-05-GFT-02',
      },
      {
        productName: 'Hộp Quà Tặng Phú Quý',
        batchId: 'B-2025-05-GFT-03',
      },
    ];

    const batchDocs = batchSeeds
      .map((batch, index) => {
        const product = productMap.get(batch.productName);
        if (!product) return null;
        const productionDate = new Date(2025, 4, 1 + index);
        const expirationDate = new Date(2026, 4, 1 + index);

        return {
          batchId: batch.batchId,
          productId: product._id,
          productionDate,
          expirationDate,
          farmInfo: {
            name: `${product.category} Farm`,
            location: 'Đắk Lắk / Lâm Đồng',
            farmerName: 'HiAn Cooperative',
            harvestMethod: 'Hand-selected and quality graded',
          },
          logisticsTimeline: [
            { event: 'Harvest', date: productionDate, location: 'Farm', description: 'Harvested and sorted' },
            { event: 'Processing', date: productionDate, location: 'Facility', description: 'Processed and packed' },
            { event: 'QA', date: productionDate, location: 'Lab', description: 'Final verification completed' },
          ],
          multimediaUrls: [product.image],
          labTestPdfs: [],
          status: 'Approved',
          qa_status: 'Passed',
          origin_region: product.category,
        };
      })
      .filter(Boolean);

    const insertedBatches = await Batch.insertMany(batchDocs);
    await Promise.all(
      insertedBatches.map((batch) => Product.updateOne({ _id: batch.productId }, { $set: { batchIds: [batch._id] } }))
    );
    console.log(`✓ Seeded ${insertedBatches.length} batches successfully!`);
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
