import { Request, Response } from 'express';
import { Listing } from '../models/Listing';

export const createListing = async (req: Request, res: Response) => {
  try {
    // Fotoğraf yollarını al
    let imagePaths: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      imagePaths = req.files.map((file: any) => '/uploads/' + file.filename);
    }

    // FormData ile gelen alanları parse et
    let data = req.body;
    if (typeof data.features === 'string') {
      data.features = JSON.parse(data.features);
    }

    // images alanını ekle
    data.images = imagePaths;

    const listing = new Listing(data);
    const savedListing = await listing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(400).json({ 
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