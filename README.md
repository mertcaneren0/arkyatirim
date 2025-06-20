# 🏠 ARK Real Estate Platform

> A modern, full-stack real estate website built with React and Node.js

ARK is a comprehensive real estate platform that helps users browse property listings and enables administrators to manage content efficiently. Built with modern web technologies, it features a responsive design that works seamlessly across all devices.

🚀 Wanna see it in action? → [arkyatirim.com](https://arkyatirim.com)

## ✨ Features

### 🌐 Public Website
- **Property Listings**: Browse available properties with detailed information
- **Advanced Search**: Filter properties by type, location, price range, and features
- **Property Details**: High-quality image galleries and comprehensive property information
- **Team Section**: Meet our real estate professionals
- **Contact Forms**: Easy ways to get in touch with our team
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔧 Admin Panel
- **Property Management**: Add, edit, and delete property listings
- **Image Upload**: Multiple image support for each property
- **Form Management**: Handle contact and career form submissions
- **Team Management**: Manage team member profiles and photos
- **Dashboard**: Overview of all platform activities
- **Secure Authentication**: JWT-based admin login system

### 📱 Mobile-First Design
- Responsive layout that adapts to any screen size
- Touch-friendly navigation and interactions
- Optimized loading times for mobile networks
- Progressive Web App (PWA) features

## 🛠️ Technology Stack

**Frontend:**
- React 18 with TypeScript
- Material-UI (MUI) for modern UI components
- Vite for fast development and building
- React Router for navigation
- Responsive design with mobile-first approach

**Backend:**
- Node.js with Express.js
- MongoDB for data storage
- JWT for authentication
- Multer for file uploads
- RESTful API architecture

**Deployment:**
- Docker containerization
- Multi-platform support (AMD64/ARM64)
- Production-ready configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB
- Docker (optional, for containerized deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/mertcaneren0/arkyatirim.git
   cd arkyatirim
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the application at:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

### Docker Deployment

```bash
# Build and run with Docker
docker build -t ark-app .
docker run -p 3000:3000 ark-app
```

## 🔧 Configuration

Create a `.env` file in the server directory:

```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/ark_db
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

## 📁 Project Structure

```
ark/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API calls
│   │   └── types/       # TypeScript definitions
│   └── public/      # Static assets
├── server/          # Node.js backend
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   └── middleware/  # Custom middleware
│   └── uploads/     # File uploads (not in git)
└── docker/          # Docker configuration
```

## 🤝 Contributing

Contributions are welcome! Here's how you can get involved:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📞 Contact

For questions or support, please reach out:
- Email: mertcan@21collectıve.co
- Website: [21collective.co](https://21collective.co/)

---

Made by (mostly) by Mertcan Eren. The rest? Well… thanks, AI.
