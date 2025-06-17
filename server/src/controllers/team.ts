import { Request, Response } from 'express';
import TeamMember, { ITeamMember } from '../models/Team';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';

// Multer configuration for profile image uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/team');
    try {
      await fs.mkdir(uploadPath, { recursive: true });
      cb(null, uploadPath);
    } catch (error) {
      cb(error, uploadPath);
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = `team_${Date.now()}_${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Sadece JPEG, JPG, PNG ve WebP formatları desteklenir'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Get all team members
export const getTeamMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const teamMembers = await TeamMember.find()
      .sort({ order: 1, createdAt: 1 });
    
    res.json(teamMembers);
  } catch (error) {
    console.error('Team members fetch error:', error);
    res.status(500).json({ 
      message: 'Ekip üyeleri yüklenirken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
};

// Get active team members only (for public use)
export const getActiveTeamMembers = async (req: Request, res: Response): Promise<void> => {
  try {
    const teamMembers = await TeamMember.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 });
    
    res.json(teamMembers);
  } catch (error) {
    console.error('Active team members fetch error:', error);
    res.status(500).json({ 
      message: 'Aktif ekip üyeleri yüklenirken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
};

// Create new team member
export const createTeamMember = async (req: Request, res: Response) => {
  try {
    console.log('=== CREATE TEAM MEMBER DEBUG ===');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('Request headers:', req.headers);
    console.log('Content-Type:', req.headers['content-type']);
    
    const { fullName, position, bio, specialties, order = 0, isActive = true } = req.body;
    
    // Parse specialties if it's a string
    let parsedSpecialties = specialties;
    if (typeof specialties === 'string') {
      try {
        parsedSpecialties = JSON.parse(specialties);
      } catch {
        parsedSpecialties = specialties.split(',').map((s: string) => s.trim());
      }
    }

    const teamMemberData: Partial<ITeamMember> = {
      fullName,
      position,
      bio,
      specialties: parsedSpecialties || [],
      order: parseInt(order) || 0,
      isActive: isActive === 'true' || isActive === true
    };

    // Add profile image if uploaded
    if (req.file) {
      teamMemberData.profileImage = `/uploads/team/${req.file.filename}`;
    }

    const teamMember = new TeamMember(teamMemberData);
    console.log('Team member data to save:', teamMemberData);
    
    await teamMember.save();
    console.log('Team member saved successfully:', teamMember);

    res.status(201).json({
      message: 'Ekip üyesi başarıyla oluşturuldu',
      teamMember
    });
  } catch (error) {
    console.error('Team member creation error:', error);
    
    // Delete uploaded file if team member creation failed
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (deleteError) {
        console.error('Error deleting file:', deleteError);
      }
    }

    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Geçersiz veri',
        error: error.message
      });
    }

    res.status(500).json({
      message: 'Ekip üyesi oluşturulurken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
};

// Update team member
export const updateTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fullName, position, bio, specialties, order, isActive } = req.body;

    const teamMember = await TeamMember.findById(id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Ekip üyesi bulunamadı' });
    }

    // Parse specialties if it's a string
    let parsedSpecialties = specialties;
    if (typeof specialties === 'string') {
      try {
        parsedSpecialties = JSON.parse(specialties);
      } catch {
        parsedSpecialties = specialties.split(',').map((s: string) => s.trim());
      }
    }

    // Update fields
    if (fullName) teamMember.fullName = fullName;
    if (position) teamMember.position = position;
    if (bio) teamMember.bio = bio;
    if (parsedSpecialties) teamMember.specialties = parsedSpecialties;
    if (order !== undefined) teamMember.order = parseInt(order) || 0;
    if (isActive !== undefined) teamMember.isActive = isActive === 'true' || isActive === true;

    // Handle profile image update
    if (req.file) {
      // Delete old image if exists
      if (teamMember.profileImage) {
        const oldImagePath = path.join(__dirname, '..', teamMember.profileImage);
        try {
          await fs.unlink(oldImagePath);
        } catch (error) {
          console.warn('Could not delete old image:', error);
        }
      }
      teamMember.profileImage = `/uploads/team/${req.file.filename}`;
    }

    await teamMember.save();

    res.json({
      message: 'Ekip üyesi başarıyla güncellendi',
      teamMember
    });
  } catch (error) {
    console.error('Team member update error:', error);

    // Delete uploaded file if update failed
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (deleteError) {
        console.error('Error deleting file:', deleteError);
      }
    }

    if (error instanceof Error && error.name === 'ValidationError') {
      return res.status(400).json({
        message: 'Geçersiz veri',
        error: error.message
      });
    }

    res.status(500).json({
      message: 'Ekip üyesi güncellenirken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
};

// Delete team member
export const deleteTeamMember = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const teamMember = await TeamMember.findById(id);
    if (!teamMember) {
      return res.status(404).json({ message: 'Ekip üyesi bulunamadı' });
    }

    // Delete profile image if exists
    if (teamMember.profileImage) {
      const imagePath = path.join(__dirname, '..', teamMember.profileImage);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.warn('Could not delete image:', error);
      }
    }

    await TeamMember.findByIdAndDelete(id);

    res.json({ message: 'Ekip üyesi başarıyla silindi' });
  } catch (error) {
    console.error('Team member deletion error:', error);
    res.status(500).json({
      message: 'Ekip üyesi silinirken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
};

// Update team member order
export const updateTeamOrder = async (req: Request, res: Response) => {
  try {
    const { teamMembers } = req.body; // Array of { id, order }

    if (!Array.isArray(teamMembers)) {
      return res.status(400).json({ message: 'Geçersiz veri formatı' });
    }

    // Update each team member's order
    const updatePromises = teamMembers.map(({ id, order }) =>
      TeamMember.findByIdAndUpdate(id, { order }, { new: true })
    );

    await Promise.all(updatePromises);

    res.json({ message: 'Ekip sıralaması başarıyla güncellendi' });
  } catch (error) {
    console.error('Team order update error:', error);
    res.status(500).json({
      message: 'Ekip sıralaması güncellenirken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
}; 