import express from 'express';
import { auth } from '../middleware/auth';
import {
  getListingForms,
  getCareerForms,
  deleteListingForm,
  deleteCareerForm,
  createAdmin,
  updateAdminPassword,
} from '../controllers/admin';
import { 
  createListing, 
  updateListing, 
  deleteListing, 
  getListings, 
  getListing 
} from '../controllers/listings';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember, upload } from '../controllers/team';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Multer setup for listings
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    try {
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    } catch (error) {
      console.error('Upload directory creation error:', error);
      cb(error, uploadPath);
    }
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

const uploadListingImages = multer({ 
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024 // 15MB limit (HEIC dosyalar için artırıldı)
  },
  fileFilter: (req, file, cb) => {
    console.log('📁 Upload file check:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    });
    
    // HEIC dosyaları için özel kontrol (mimetype bazen application/octet-stream olabiliyor)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'];
    
    const isValidMimeType = allowedTypes.includes(file.mimetype);
    const isValidExtension = allowedExtensions.includes(fileExtension);
    
    if (isValidMimeType || isValidExtension) {
      console.log('✅ File accepted:', file.originalname);
      cb(null, true);
    } else {
      console.log('❌ File rejected:', file.originalname, 'Type:', file.mimetype, 'Extension:', fileExtension);
      cb(new Error('Sadece JPEG, JPG, PNG, WebP, HEIC ve HEIF formatları desteklenir'));
    }
  }
});

// Dashboard stats
router.get('/dashboard', auth, async (req, res) => {
  try {
    const { Listing } = require('../models/Listing');
    const { ListingForm } = require('../models/Form');
    const { CareerForm } = require('../models/Form');
    const TeamMember = require('../models/Team').default;
    
    const totalListings = await Listing.countDocuments();
    const totalListingForms = await ListingForm.countDocuments();
    const totalCareerForms = await CareerForm.countDocuments();
    const totalTeamMembers = await TeamMember.countDocuments();
    
    res.json({
      totalListings,
      totalListingForms,
      totalCareerForms,
      totalTeamMembers,
      totalForms: totalListingForms + totalCareerForms
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Dashboard verileri alınamadı' });
  }
});

// Debug endpoint
router.post('/test-listing', auth, (req, res) => {
  console.log('=== TEST LISTING ENDPOINT ===');
  console.log('Request body:', req.body);
  console.log('Request files:', req.files);
  console.log('Request headers:', req.headers);
  res.json({ message: 'Test successful', body: req.body });
});

// Admin kullanıcı işlemleri
router.post('/create-admin', auth, createAdmin);
router.post('/update-password', auth, updateAdminPassword);

// İlan işlemleri
router.get('/listings', auth, getListings);
router.get('/listing/:id', auth, getListing);
router.post('/listings', auth, uploadListingImages.array('images', 10), createListing);
router.put('/listings/:id', auth, uploadListingImages.array('images', 10), updateListing);
router.delete('/listings/:id', auth, deleteListing);

// Team işlemleri
router.get('/team', auth, getTeamMembers);
router.post('/team', auth, upload.single('profileImage'), createTeamMember);
router.put('/team/:id', auth, upload.single('profileImage'), updateTeamMember);
router.delete('/team/:id', auth, deleteTeamMember);

// Form işlemleri
router.get('/forms/listing', auth, getListingForms);
router.get('/forms/career', auth, getCareerForms);
router.delete('/forms/listing/:id', auth, deleteListingForm);
router.delete('/forms/career/:id', auth, deleteCareerForm);

// Career endpoint (alias for career forms)
router.get('/career', auth, getCareerForms);

export default router; 