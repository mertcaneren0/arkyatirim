# 🚀 Coolify Deployment Guide

## Environment Variables

### Required Environment Variables:
```bash
# MongoDB
MONGODB_URI=mongodb://your-mongo-connection-string

# JWT
JWT_SECRET=your-super-secret-jwt-key-minimum-32-chars

# Server
PORT=5001
NODE_ENV=production

# CORS (your frontend domain)
FRONTEND_URL=https://your-domain.com
```

## Coolify Setup Steps:

### 1. Create New Application
- Go to Coolify Dashboard
- Click "Create New Application"
- Select "GitHub Repository"
- Connect: `mertcaneren0/arkyatirim`

### 2. Build Configuration
**Build Command:**
```bash
# Build both client and server
cd client && npm ci && npm run build && cd ../server && npm ci && npm run build
```

**Start Command:**
```bash
cd server && npm start
```

**Publish Directory:** `client/dist` (for static files)

### 3. Environment Variables
Add all the environment variables listed above in Coolify dashboard.

### 4. Port Configuration
- **Port:** 5001
- **Health Check:** `/api/health` (if implemented)

### 5. Static Files
Configure Coolify to serve static files from `client/dist` and uploads from `server/uploads`

## Database Setup (MongoDB)

### Option 1: MongoDB Atlas (Recommended)
1. Create account at mongodb.com
2. Create free cluster
3. Get connection string
4. Add to MONGODB_URI

### Option 2: Self-hosted MongoDB on VPS
```bash
# Install MongoDB on your VPS
docker run --name mongodb -d -p 27017:27017 -v mongodb_data:/data/db mongo:latest
```

## SSL & Domain
Coolify will automatically handle SSL certificates for your custom domain.

## File Uploads
Make sure your VPS has enough storage for file uploads in `/app/server/uploads` 