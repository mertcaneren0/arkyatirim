import { Router } from 'express';
import { 
  getTeamMembers, 
  getActiveTeamMembers, 
  createTeamMember, 
  updateTeamMember, 
  deleteTeamMember, 
  updateTeamOrder,
  upload 
} from '../controllers/team';
import { auth } from '../middleware/auth';

const router = Router();

// Public routes (no auth required)
router.get('/active', getActiveTeamMembers);

// Protected routes (admin only)
router.get('/', auth, getTeamMembers);
router.post('/', auth, upload.single('profileImage'), createTeamMember);
router.put('/order', auth, updateTeamOrder);
router.put('/:id', auth, upload.single('profileImage'), updateTeamMember);
router.delete('/:id', auth, deleteTeamMember);

export default router; 