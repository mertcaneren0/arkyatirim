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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files middleware with URL decoding and enhanced file existence check
app.use('/uploads', (req, res, next) => {
  const requestedFile = decodeURIComponent(req.url.split('?')[0]); // URL decode + remove query params
  const filePath = path.join(__dirname, '..', 'uploads', requestedFile);
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  const fs = require('fs');
  
  console.log(`🔍 File request (original): ${req.url.split('?')[0]}`);
  console.log(`🔍 File request (decoded): ${requestedFile}`);
  console.log(`📍 Full path: ${filePath}`);
  
  if (fs.existsSync(filePath)) {
    console.log(`✅ File exists and serving: ${filePath}`);
    express.static(path.join(__dirname, '..', 'uploads'))(req, res, next);
  } else {
    console.log(`❌ File NOT found: ${filePath}`);
    console.log(`📁 Upload dir exists: ${fs.existsSync(uploadsDir)}`);
    
    if (fs.existsSync(uploadsDir)) {
      const allFiles = fs.readdirSync(uploadsDir);
      console.log(`📁 Available files (${allFiles.length}):`, allFiles.slice(0, 10)); // Show first 10
      
      // Check for similar filenames (case sensitivity, encoding issues)
      const requestedFileName = path.basename(requestedFile);
      const similarFiles = allFiles.filter(file => 
        file.toLowerCase().includes(requestedFileName.toLowerCase().substring(0, 10))
      );
      
      if (similarFiles.length > 0) {
        console.log(`🔍 Similar files found:`, similarFiles);
      }
    }
    
    res.status(404).json({ 
      error: 'File not found', 
      requested: requestedFile,
      fullPath: filePath,
      uploadsDir,
      dirExists: fs.existsSync(uploadsDir),
      availableFiles: fs.existsSync(uploadsDir) ? fs.readdirSync(uploadsDir).length : 0
    });
  }
});
app.use('/uploads/team', express.static(path.join(__dirname, '..', 'uploads', 'team')));

// Ensure uploads directories exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, '..', 'uploads');
const teamUploadsDir = path.join(__dirname, '..', 'uploads', 'team');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log('📁 Created uploads directory:', uploadsDir);
}

if (!fs.existsSync(teamUploadsDir)) {
  fs.mkdirSync(teamUploadsDir, { recursive: true });
  console.log('📁 Created team uploads directory:', teamUploadsDir);
}

// Debug log for static file paths
console.log('Static uploads path:', uploadsDir);
console.log('Static team uploads path:', teamUploadsDir);
console.log('Directory exists:', fs.existsSync(uploadsDir));
console.log('Team directory exists:', fs.existsSync(teamUploadsDir));

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

// Debug endpoint for uploads - Enhanced
app.get('/api/debug/uploads', (req, res) => {
  const uploadsPath = path.join(__dirname, '..', 'uploads');
  const teamUploadsPath = path.join(__dirname, '..', 'uploads', 'team');
  
  try {
    const fs = require('fs');
    const uploads = fs.existsSync(uploadsPath) ? fs.readdirSync(uploadsPath) : [];
    const teamUploads = fs.existsSync(teamUploadsPath) ? fs.readdirSync(teamUploadsPath) : [];
    
    // Get file details with sizes and dates
    const uploadDetails = uploads.map(file => {
      const filePath = path.join(uploadsPath, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        created: stats.ctime,
        modified: stats.mtime,
        url: `/uploads/${file}`
      };
    });
    
    res.json({
      uploadsPath,
      teamUploadsPath,
      uploadsExists: fs.existsSync(uploadsPath),
      teamUploadsExists: fs.existsSync(teamUploadsPath),
      uploads: uploadDetails,
      teamUploads,
      totalFiles: uploads.length,
      __dirname,
      cwd: process.cwd(),
      NODE_ENV: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      uploadsPath,
      teamUploadsPath,
      __dirname,
      cwd: process.cwd()
    });
  }
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