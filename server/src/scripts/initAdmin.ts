import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { User } from '../models/User';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/emlak';

async function createAdmin() {
  await mongoose.connect(MONGODB_URI);

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    console.error('ADMIN_USERNAME or ADMIN_PASSWORD is missing in .env');
    process.exit(1);
  }

  const existing = await User.findOne({ username });
  if (existing) {
    console.log('Admin user already exists');
    process.exit(0);
  }

  const user = new User({ username, password });
  await user.save();
  console.log('Admin user created successfully');
  process.exit(0);
}

createAdmin();