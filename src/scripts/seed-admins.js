const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  membershipTier: { type: String, default: 'silver' },
  rewardPoints: { type: Number, default: 0 }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seedAdmins() {
  try {
    // Correct database name: aura_db
    await mongoose.connect('mongodb://localhost:27017/aura_db');
    console.log('Connected to aura_db');

    const admins = [
      {
        name: 'Nhật Đỗ Admin',
        email: 'nhatdo@admin.gmail.com',
        password: 'nhatnhatnheo',
        role: 'admin'
      },
      {
        name: 'HiAn Admin 1',
        email: 'admin1@hian.vn',
        password: 'admin123@hian',
        role: 'admin'
      },
      {
        name: 'HiAn Manager',
        email: 'manager@hian.vn',
        password: 'manager123@hian',
        role: 'admin'
      }
    ];

    for (const adminData of admins) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminData.password, salt);
      
      await User.findOneAndUpdate(
        { email: adminData.email },
        { 
          name: adminData.name,
          password: hashedPassword,
          role: adminData.role,
          status: 'active'
        },
        { upsert: true, new: true }
      );
      console.log(`Admin ${adminData.email} seeded/updated in aura_db`);
    }

    console.log('Admin seeding completed');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedAdmins();
