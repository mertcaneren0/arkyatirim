import express from 'express';
import { auth } from '../middleware/auth';
import {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing,
} from '../controllers/listings';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Multer ayarları
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    // Sanitize filename - replace spaces and special chars
    const sanitizedName = file.originalname
      .replace(/\s+/g, '_')           // spaces to underscores
      .replace(/[^a-zA-Z0-9._-]/g, '') // remove special chars except dots, underscores, hyphens
      .toLowerCase();                 // lowercase for consistency
    cb(null, uniqueSuffix + '-' + sanitizedName);
  },
});
const upload = multer({ 
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024 // 15MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('📁 Public upload file check:', {
      originalname: file.originalname,
      mimetype: file.mimetype
    });
    
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];
    
    const isValidMimeType = allowedTypes.includes(file.mimetype);
    const isValidExtension = allowedExtensions.includes(fileExtension);
    
    if (isValidMimeType || isValidExtension) {
      console.log('✅ Public file accepted:', file.originalname);
      cb(null, true);
    } else {
      console.log('❌ Public file rejected:', file.originalname);
      cb(new Error('Sadece JPEG, JPG, PNG, WebP, HEIC ve HEIF formatları desteklenir'));
    }
  }
});

// Public routes
router.get('/', getListings);
router.get('/:id', getListing);

// Protected routes
router.post('/', auth, upload.array('images', 10), createListing);
router.put('/:id', auth, upload.array('images', 10), updateListing);
router.delete('/:id', auth, deleteListing);

export default router; 