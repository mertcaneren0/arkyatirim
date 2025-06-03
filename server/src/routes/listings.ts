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
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Public routes
router.get('/', getListings);
router.get('/:id', getListing);

// Protected routes
router.post('/', auth, upload.array('images', 10), createListing);
router.put('/:id', auth, upload.array('images', 10), updateListing);
router.delete('/:id', auth, deleteListing);

export default router; 