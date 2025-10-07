# 🕉️ MythoMaps - India's Sacred Heritage Explorer

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.16.0-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://mongodb.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black.svg)](https://vercel.com/)

**MythoMaps** is a comprehensive full-stack web application that brings India's rich mythological heritage to life. Explore sacred destinations, discover ancient stories, and embark on spiritual journeys through India's most revered temples, pilgrimage sites, and mythological landmarks.

## 🌟 Live Demo
- **Frontend**: [https://mythomaps.vercel.app](https://mythomaps.vercel.app)
- **Backend API**: [https://mythomaps-backend.vercel.app](https://mythomaps-backend.vercel.app)

---

## ✨ Key Features

### 🎥 **Immersive Video Experience**
- Auto-playing video hero section with sound
- 6 curated video categories: India 360, Spiritual, Heritage, Adventure, Nature, Wildlife
- Interactive video controls and category navigation

### 🏛️ **Sacred Tour Management**
- **Regional Sacred Tours**: North, South, East, West India + International destinations
- **Featured Attractions**: 25+ horizontal scrolling attraction cards with modal details
- **Detailed Itineraries**: Auto-scrolling journey plans with booking integration
- **Uncover India**: Interactive destination explorer with comprehensive information

### 🔐 **Authentication & User Management**
- Secure JWT-based authentication system
- Role-based access control (User/Admin)
- Personalized user accounts and booking history
- Admin dashboard for complete tour and booking management

### 🎨 **Modern Design System**
- **Incredible India** inspired color palette (Saffron, White, Green, Gold)
- Fully responsive design optimized for all devices
- Advanced animations and hover effects
- Professional gallery with filtering capabilities

### 📱 **Advanced User Interface**
- Interactive search and filtering system
- Horizontal scrolling carousels with auto-navigation
- Modal-based detailed views
- Toast notifications for user feedback
- Newsletter subscription system

---

## 🛠️ Tech Stack

### **Frontend**
| Technology | Purpose | Version |
|------------|---------|---------|
| **React.js** | Frontend framework | 18.2.0 |
| **Vite** | Build tool and dev server | Latest |
| **Tailwind CSS** | Utility-first styling | 3.x |
| **React Router DOM** | Client-side routing | 6.21.1 |
| **Axios** | HTTP client | 1.6.5 |
| **React Icons** | Icon library | 5.0.0 |
| **React Toastify** | Notifications | 9.1.3 |

### **Backend**
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime environment | 20.16.0 |
| **Express.js** | Web framework | 4.18.2 |
| **MongoDB** | Database | Atlas Cloud |
| **Mongoose** | ODM | 8.0.4 |
| **JWT** | Authentication | 9.0.2 |
| **bcryptjs** | Password hashing | 2.4.3 |
| **CORS** | Cross-origin requests | 2.8.5 |

---

## � Project Structure

```
MythoMaps/
├── frontend/                    # React.js Frontend
│   ├── public/
│   │   ├── icon.png
│   │   └── logo3.png
│   ├── src/
│   │   ├── assets/
│   │   │   ├── data/           # Static data files
│   │   │   │   ├── tours.js
│   │   │   │   ├── attractions.js
│   │   │   │   ├── itineraries.js
│   │   │   │   ├── uncoverIndia.js
│   │   │   │   └── faqs.js
│   │   │   ├── images/         # Image assets
│   │   │   │   ├── Attractions/
│   │   │   │   ├── itineraries/
│   │   │   │   ├── uncover_india/
│   │   │   │   └── gallery/
│   │   │   └── videos/         # Hero section videos
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Gallery/
│   │   │   └── Layout/
│   │   ├── pages/
│   │   │   ├── Home.jsx        # Video hero + attractions
│   │   │   ├── India.jsx       # Itineraries + uncover destinations
│   │   │   ├── Tours.jsx       # Sacred tours listing
│   │   │   ├── Contact.jsx     # Vibrant contact form
│   │   │   └── About.jsx
│   │   ├── context/            # Authentication context
│   │   ├── utils/              # Configuration files
│   │   └── router/             # Route definitions
│   ├── vercel.json             # Frontend deployment config
│   └── package.json
│
├── backend/                     # Node.js Backend
│   ├── controllers/            # Business logic
│   │   ├── authController.js
│   │   ├── tourController.js
│   │   ├── bookingController.js
│   │   ├── userController.js
│   │   └── reviewController.js
│   ├── models/                 # Database schemas
│   │   ├── User.js
│   │   ├── Tour.js
│   │   ├── Booking.js
│   │   └── Review.js
│   ├── routes/                 # API routes
│   │   ├── authRoutes.js
│   │   ├── tourRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── userRoutes.js
│   │   └── reviewRoutes.js
│   ├── middleware/             # Authentication middleware
│   ├── vercel.json             # Backend deployment config
│   ├── .env.example            # Environment variables template
│   └── index.js                # Server entry point
│
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/harshitammu95-coder/MythoMaps.git
cd MythoMaps
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your configurations:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/mythomaps
# JWT_SECRET=your-super-secret-jwt-key
# PORT=3050

# Start backend server
npm run dev
```
Backend will run on `http://localhost:3050`

### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
Frontend will run on `http://localhost:5174`

---

## 🌐 Deployment Guide

### **Vercel Deployment (Recommended)**

This project is configured for separate frontend and backend deployment on Vercel:

#### Backend Deployment:
1. Create a new Vercel project for the backend
2. Set environment variables in Vercel dashboard:
   - `MONGO_URL`
   - `JWT_SECRET`
   - `NODE_ENV=production`
3. Deploy from the `/backend` directory

#### Frontend Deployment:
1. Update `frontend/src/utils/config.js` with production backend URL
2. Create a new Vercel project for the frontend
3. Deploy from the `/frontend` directory
4. Update CORS origins in backend with frontend URL

### **Local Development Setup**
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

---

## 🎯 Key Highlights

- **🎥 Rich Media**: Auto-playing videos with sound controls
- **🗺️ Interactive Maps**: Comprehensive destination information
- **📱 Mobile First**: Responsive design for all screen sizes
- **🔒 Secure**: JWT authentication with role-based access
- **⚡ Fast**: Optimized with Vite for lightning-fast development
- **🎨 Beautiful**: Professional UI with Indian cultural themes
- **🚀 Scalable**: Microservices architecture ready for growth

---

## � Contact & Support

- **Email**: harshithammu95@gmail.com
- **GitHub**: [Your GitHub Profile](https://github.com/harshithammu95-coder)
- **Project Repository**: [MythoMaps on GitHub](https://github.com/harshithammu95-coder/MythoMaps)

---

## � Acknowledgments

- **Google Fonts** for typography
- **React Icons** for comprehensive icon library  
- **Tailwind CSS** for utility-first styling
- **MongoDB Atlas** for cloud database hosting
- **Vercel** for seamless deployment
- **Incredible India** campaign for design inspiration

---

**Made with ❤️ for India's Sacred Heritage**
