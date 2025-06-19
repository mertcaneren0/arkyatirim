import { Request, Response } from 'express';
import { Listing } from '../models/Listing';
import { ListingForm } from '../models/Form';
import { CareerForm } from '../models/Form';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

// İlan işlemleri artık listings controller'da yapılıyor

// Form işlemleri
export const getListingForms = async (req: Request, res: Response) => {
  try {
    const forms = await ListingForm.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Formlar getirilirken bir hata oluştu' });
  }
};

export const getCareerForms = async (req: Request, res: Response) => {
  try {
    const forms = await CareerForm.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Formlar getirilirken bir hata oluştu' });
  }
};

export const deleteListingForm = async (req: Request, res: Response) => {
  try {
    const form = await ListingForm.findByIdAndDelete(req.params.id);
    if (!form) {
      res.status(404).json({ error: 'Form bulunamadı' });
    }
    res.json({ message: 'Form başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ error: 'Form silinirken bir hata oluştu' });
  }
};

export const deleteCareerForm = async (req: Request, res: Response) => {
  try {
    const form = await CareerForm.findByIdAndDelete(req.params.id);
    if (!form) {
      res.status(404).json({ error: 'Form bulunamadı' });
    }
    res.json({ message: 'Form başarıyla silindi' });
  } catch (error) {
    res.status(500).json({ error: 'Form silinirken bir hata oluştu' });
  }
};

// Admin kullanıcı işlemleri
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Kullanıcı adı kontrolü
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ error: 'Bu kullanıcı adı zaten kullanılıyor' });
    }

    // Yeni admin kullanıcısı oluştur
    const user = new User({
      username,
      password,
    });

    await user.save();
    res.status(201).json({ message: 'Admin kullanıcısı başarıyla oluşturuldu' });
  } catch (error) {
    res.status(400).json({ error: 'Admin kullanıcısı oluşturulurken bir hata oluştu' });
  }
};

export const updateAdminPassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = (req as any).user.id;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'Kullanıcı bulunamadı' });
      return;
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      res.status(401).json({ error: 'Mevcut şifre yanlış' });
      return;
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Şifre başarıyla güncellendi' });
  } catch (error) {
    res.status(400).json({ error: 'Şifre güncellenirken bir hata oluştu' });
  }
}; 