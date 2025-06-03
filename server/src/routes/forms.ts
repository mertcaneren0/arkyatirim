import express from 'express';
import { auth } from '../middleware/auth';
import {
  submitListingForm,
  submitCareerForm,
  getListingForms,
  getCareerForms,
} from '../controllers/forms';

const router = express.Router();

// Public routes
router.post('/listing', submitListingForm);
router.post('/career', submitCareerForm);

// Protected routes
router.get('/listing', auth, getListingForms);
router.get('/career', auth, getCareerForms);

export default router; 