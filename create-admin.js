const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// MongoDB connection
const MONGODB_URI = 'mongodb://arkadmin:ArkGayrimenkul2024mcn@188.245.232.63:27017/emlak?authSource=admin';

// User Schema (basit versiyon)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB\'ye bağlandı');

    // Mevcut admin kullanıcısını kontrol et
    const existing = await User.findOne({ username: 'admin' });
    if (existing) {
      console.log('Admin kullanıcısı zaten var');
      console.log('Mevcut kullanıcı:', existing.username);
      process.exit(0);
    }

    // Yeni admin kullanıcısı oluştur
    const admin = new User({
      username: 'admin',
      password: 'ArkAdmin2024!'
    });

    await admin.save();
    console.log('Admin kullanıcısı başarıyla oluşturuldu!');
    console.log('Username: admin');
    console.log('Password: ArkAdmin2024!');

  } catch (error) {
    console.error('Hata:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

createAdmin(); 