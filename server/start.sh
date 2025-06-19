#!/bin/sh

echo "Starting server with admin initialization..."

# Wait for MongoDB to be ready
echo "Waiting for MongoDB connection..."
until node -e "
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/emlak')
  .then(() => { console.log('MongoDB ready'); process.exit(0); })
  .catch(() => process.exit(1));
" 2>/dev/null; do
  echo "Waiting for MongoDB..."
  sleep 2
done

# Initialize admin user
echo "Initializing admin user..."
node -e "
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for admin creation');

    const username = process.env.ADMIN_USERNAME || 'admin';
    const password = process.env.ADMIN_PASSWORD || 'admin123';

    const existing = await User.findOne({ username });
    if (existing) {
      console.log('Admin user already exists:', username);
    } else {
      const user = new User({ username, password });
      await user.save();
      console.log('Admin user created successfully:', username);
    }
  } catch (error) {
    console.log('Admin creation error (continuing anyway):', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin().then(() => process.exit(0));
"

echo "Starting main server..."
# Start the main application
node dist/index.js 