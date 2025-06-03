import express from 'express';
import { auth } from '../middleware/auth';
import {
  createListing,
  updateListing,
  deleteListing,
  getListingForms,
  getCareerForms,
  deleteListingForm,
  deleteCareerForm,
  createAdmin,
  updateAdminPassword,
} from '../controllers/admin';

const router = express.Router();

// Admin kullanıcı işlemleri
router.post('/create-admin', auth, createAdmin);
router.post('/update-password', auth, updateAdminPassword);

// İlan işlemleri
router.post('/listings', auth, createListing);
router.put('/listings/:id', auth, updateListing);
router.delete('/listings/:id', auth, deleteListing);

// Form işlemleri
router.get('/forms/listing', auth, getListingForms);
router.get('/forms/career', auth, getCareerForms);
router.delete('/forms/listing/:id', auth, deleteListingForm);
router.delete('/forms/career/:id', auth, deleteCareerForm);

export default router; 