import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

// Routes
import authRoutes from './routes/auth';
import listingRoutes from './routes/listings';
import formRoutes from './routes/forms';
import adminRoutes from './routes/admin';
import teamRoutes from './routes/team';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: true, // Tüm originlere izin ver
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400 // 24 saat
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files middleware
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/uploads/team', express.static(path.join(__dirname, '..', 'uploads', 'team')));

// Serve frontend static files with proper MIME types and cache headers
app.use(express.static(path.join(__dirname, '..', 'client', 'dist'), {
  maxAge: '1y',
  etag: false,
  setHeaders: (res, filePath) => {
    // Set correct MIME types
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filePath.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    } else if (filePath.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
    } else if (filePath.endsWith('.json')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    
    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
  }
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Ark Gayrimenkul API'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/team', teamRoutes);

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  // Don't serve index.html for API routes or static assets
  if (req.path.startsWith('/api/') || req.path.includes('.')) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/emlak')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  }); 