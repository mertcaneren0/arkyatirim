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
import { getListings, getListing } from '../controllers/listings';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember, upload } from '../controllers/team';

const router = express.Router();

// Dashboard stats
router.get('/dashboard', auth, async (req, res) => {
  try {
    const { Listing } = require('../models/Listing');
    const { ListingForm } = require('../models/Form');
    const { CareerForm } = require('../models/Form');
    const { Team } = require('../models/Team');
    
    const totalListings = await Listing.countDocuments();
    const totalListingForms = await ListingForm.countDocuments();
    const totalCareerForms = await CareerForm.countDocuments();
    const totalTeamMembers = await Team.countDocuments();
    
    res.json({
      totalListings,
      totalListingForms,
      totalCareerForms,
      totalTeamMembers,
      totalForms: totalListingForms + totalCareerForms
    });
  } catch (error) {
    res.status(500).json({ error: 'Dashboard verileri alınamadı' });
  }
});

// Admin kullanıcı işlemleri
router.post('/create-admin', auth, createAdmin);
router.post('/update-password', auth, updateAdminPassword);

// İlan işlemleri
router.get('/listings', auth, getListings);
router.get('/listing/:id', auth, getListing);
router.post('/listings', auth, createListing);
router.put('/listings/:id', auth, updateListing);
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