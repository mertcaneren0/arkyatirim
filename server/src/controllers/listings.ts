import { Request, Response } from 'express';
import { Listing } from '../models/Listing';

export const createListing = async (req: Request, res: Response) => {
  try {
    console.log('=== CREATE LISTING DEBUG ===');
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    console.log('Request headers:', req.headers);
    
    // Fotoğraf yollarını al
    let imagePaths: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      console.log('📁 Files received:', req.files.length);
      req.files.forEach((file: any, index: number) => {
        console.log(`📁 File ${index + 1}:`, {
          originalname: file.originalname,
          filename: file.filename,
          path: file.path,
          size: file.size,
          mimetype: file.mimetype
        });
      });
      
      imagePaths = req.files.map((file: any) => '/uploads/' + file.filename);
      console.log('🖼️ Generated image paths:', imagePaths);
      
      // Verify files exist on disk
      const fs = require('fs');
      const path = require('path');
      imagePaths.forEach((imagePath, index) => {
        const fullPath = path.join(__dirname, '../../uploads', path.basename(imagePath));
        const exists = fs.existsSync(fullPath);
        console.log(`🔍 File ${index + 1} exists on disk:`, exists, fullPath);
      });
    }

    // FormData ile gelen alanları parse et
    let data = req.body;
    if (typeof data.features === 'string') {
      try {
        data.features = JSON.parse(data.features);
      } catch (parseError) {
        console.error('Features parse error:', parseError);
        data.features = {};
      }
    }

    // Veri validasyonu
    if (!data.title || !data.type || !data.price || !data.area || !data.city || !data.district || !data.address || !data.description) {
      return res.status(400).json({ 
        message: 'Gerekli alanlar eksik',
        error: 'title, type, price, area, city, district, address, description alanları zorunludur'
      });
    }

    // Numeric field validation
    if (isNaN(Number(data.price)) || isNaN(Number(data.area))) {
      return res.status(400).json({ 
        message: 'Geçersiz sayısal değer',
        error: 'price ve area alanları sayısal olmalıdır'
      });
    }

    // Type validation
    const validTypes = ['Daire', 'İşyeri', 'Arsa', 'Tarla', 'Çiftlik', 'Fabrika'];
    if (!validTypes.includes(data.type)) {
      return res.status(400).json({ 
        message: 'Geçersiz tip',
        error: `type alanı şunlardan biri olmalıdır: ${validTypes.join(', ')}`
      });
    }

    // Convert numeric strings to numbers
    data.price = Number(data.price);
    data.area = Number(data.area);

    // images alanını ekle
    data.images = imagePaths;

    console.log('Final listing data:', data);

    const listing = new Listing(data);
    const savedListing = await listing.save();
    
    console.log('Listing saved successfully:', savedListing);
    res.status(201).json(savedListing);
  } catch (error) {
    console.error('Create listing error:', error);
    
    // MongoDB validation error handling
    if (error && typeof error === 'object' && 'name' in error) {
      if (error.name === 'ValidationError') {
        return res.status(400).json({ 
          message: 'Geçersiz veri girişi',
          error: error.message,
          validationErrors: error.errors || {}
        });
      }
      
      if (error.name === 'MongoServerError' || error.name === 'MongoError') {
        return res.status(500).json({ 
          message: 'Veritabanı hatası',
          error: 'Database connection issue'
        });
      }
    }
    
    res.status(500).json({ 
      message: 'İlan oluşturulurken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
};

export const getListings = async (req: Request, res: Response) => {
  try {
    console.log('İlanlar için gelen query:', req.query); // Debug için

    const { type, minPrice, maxPrice, minArea, maxArea, city, district, features } = req.query;
    const query: any = {};

    if (type) query.type = type;
    if (city) query.city = city;
    if (district) query.district = district;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (minArea || maxArea) {
      query.area = {};
      if (minArea) query.area.$gte = Number(minArea);
      if (maxArea) query.area.$lte = Number(maxArea);
    }
    if (features) {
      const featureArray = (features as string).split(',');
      featureArray.forEach((feature) => {
        query[`features.${feature}`] = true;
      });
    }

    console.log('MongoDB sorgusu:', query); // Debug için

    const listings = await Listing.find(query).sort({ createdAt: -1 });
    console.log('Bulunan ilan sayısı:', listings.length); // Debug için
    
    res.json(listings);
  } catch (error) {
    console.error('İlanları getirme hatası:', error); // Debug için
    res.status(500).json({ 
      message: 'İlanlar getirilirken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
};

export const getListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching listing' });
  }
};

export const updateListing = async (req: Request, res: Response) => {
  try {
    let imagePaths: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      imagePaths = req.files.map((file: any) => '/uploads/' + file.filename);
    }

    let data = req.body;
    if (typeof data.features === 'string') {
      data.features = JSON.parse(data.features);
    }

    // Eğer yeni fotoğraf yüklendiyse, eski images ile birleştir
    if (imagePaths.length > 0) {
      if (data.images && typeof data.images === 'string') {
        try {
          const oldImages = JSON.parse(data.images);
          data.images = Array.isArray(oldImages) ? [...oldImages, ...imagePaths] : imagePaths;
        } catch {
          data.images = imagePaths;
        }
      } else {
        data.images = imagePaths;
      }
    }

    const listing = await Listing.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!listing) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }
    res.json(listing);
  } catch (error) {
    res.status(400).json({ 
      message: 'İlan güncellenirken bir hata oluştu',
      error: error instanceof Error ? error.message : 'Bilinmeyen hata'
    });
  }
};

export const deleteListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      res.status(404).json({ error: 'Listing not found' });
      return;
    }
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting listing' });
  }
}; 