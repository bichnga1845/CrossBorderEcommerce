const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Minimal Schemas for Seeding
const CategorySchema = new mongoose.Schema({ name: String, slug: String });
const ProductSchema = new mongoose.Schema({ 
  name: String, desc: String, price: Number, category: String, categoryId: mongoose.Schema.Types.ObjectId, stock: Number, image: String 
});
const UserSchema = new mongoose.Schema({ 
  name: String, email: String, password: String, role: String, membershipTier: String, rewardPoints: Number 
});
const OrderSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  customer: { firstName: String, lastName: String, email: String, address: String, city: String, district: String, ward: String, phone: String },
  items: [{ productId: String, name: String, price: Number, quantity: Number, image: String }],
  paymentMethod: String,
  totalAmount: Number,
  status: String,
  pointsEarned: Number
}, { timestamps: true });

const Category = mongoose.models.ProductCategory || mongoose.model('ProductCategory', CategorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

async function seedRealisticData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/aura_db');
    console.log('Connected to aura_db');

    // 1. Clear existing data (optional but good for clean demo)
    // await Category.deleteMany({});
    // await Product.deleteMany({});
    // await User.deleteMany({ role: 'customer' });
    // await Order.deleteMany({});

    // 2. Seed Categories
    const categories = [
      { name: 'Hạt Cao Cấp', slug: 'hat-cao-cap' },
      { name: 'Mật Ong Rừng', slug: 'mat-ong-rung' },
      { name: 'Trà Tây Nguyên', slug: 'tra-tay-nguyen' },
      { name: 'Quà Tặng Sang Trọng', slug: 'qua-tang' }
    ];
    const savedCategories = await Category.insertMany(categories);
    console.log('Categories seeded');

    // 3. Seed Products
    const products = [
      { name: 'Hạt Mắc Ca VIP', desc: 'Hạt mắc ca sấy nứt vỏ, size đại.', price: 250000, category: 'Hạt Cao Cấp', categoryId: savedCategories[0]._id, stock: 50, image: '/images/products/macca.jpg' },
      { name: 'Mật Ong Hoa Cà Phê', desc: 'Mật ong nguyên chất từ hoa cà phê.', price: 320000, category: 'Mật Ong Rừng', categoryId: savedCategories[1]._id, stock: 30, image: '/images/products/honey.jpg' },
      { name: 'Trà Oolong Thượng Hạng', desc: 'Trà Oolong trồng tại Bảo Lộc.', price: 180000, category: 'Trà Tây Nguyên', categoryId: savedCategories[2]._id, stock: 100, image: '/images/products/tea.jpg' },
      { name: 'Set Quà Tết HiAn', desc: 'Bộ quà tặng nông sản cao cấp.', price: 1200000, category: 'Quà Tặng Sang Trọng', categoryId: savedCategories[3]._id, stock: 15, image: '/images/products/gift.jpg' }
    ];
    const savedProducts = await Product.insertMany(products);
    console.log('Products seeded');

    // 4. Seed Customers
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('customer123', salt);
    const customers = [
      { name: 'Nguyễn Văn An', email: 'an.nguyen@gmail.com', password: hashedPassword, role: 'customer', membershipTier: 'gold', rewardPoints: 1200 },
      { name: 'Trần Thị Bình', email: 'binh.tran@gmail.com', password: hashedPassword, role: 'customer', membershipTier: 'silver', rewardPoints: 450 },
      { name: 'Lê Hoàng Long', email: 'long.le@gmail.com', password: hashedPassword, role: 'customer', membershipTier: 'platinum', rewardPoints: 3500 }
    ];
    const savedUsers = await User.insertMany(customers);
    console.log('Customers seeded');

    // 5. Seed Orders (Linked to Users and Products)
    const orders = [
      {
        userId: savedUsers[0]._id,
        customer: { firstName: 'An', lastName: 'Nguyễn', email: 'an.nguyen@gmail.com', address: '123 Lê Lợi', city: 'TP.HCM', district: 'Quận 1', ward: 'Bến Nghé', phone: '0901234567' },
        items: [{ productId: savedProducts[0]._id.toString(), name: savedProducts[0].name, price: savedProducts[0].price, quantity: 2, image: savedProducts[0].image }],
        paymentMethod: 'momo',
        totalAmount: 500000,
        status: 'delivered',
        pointsEarned: 50,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
      },
      {
        userId: savedUsers[1]._id,
        customer: { firstName: 'Bình', lastName: 'Trần', email: 'binh.tran@gmail.com', address: '456 Nguyễn Huệ', city: 'Đà Nẵng', district: 'Hải Châu', ward: 'Thạch Thang', phone: '0908888888' },
        items: [{ productId: savedProducts[1]._id.toString(), name: savedProducts[1].name, price: savedProducts[1].price, quantity: 1, image: savedProducts[1].image }],
        paymentMethod: 'manual',
        totalAmount: 320000,
        status: 'processing',
        pointsEarned: 32,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        userId: savedUsers[2]._id,
        customer: { firstName: 'Long', lastName: 'Lê', email: 'long.le@gmail.com', address: '789 Trần Hưng Đạo', city: 'Hà Nội', district: 'Hoàn Kiếm', ward: 'Hàng Bài', phone: '0909999999' },
        items: [
          { productId: savedProducts[2]._id.toString(), name: savedProducts[2].name, price: savedProducts[2].price, quantity: 3, image: savedProducts[2].image },
          { productId: savedProducts[3]._id.toString(), name: savedProducts[3].name, price: savedProducts[3].price, quantity: 1, image: savedProducts[3].image }
        ],
        paymentMethod: 'momo',
        totalAmount: 1740000,
        status: 'pending',
        pointsEarned: 174,
        createdAt: new Date()
      }
    ];
    await Order.insertMany(orders);
    console.log('Orders seeded');

    console.log('Realistic data seeding completed successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedRealisticData();
