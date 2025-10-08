import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import tourRoutes from "./routes/tourRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3050;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// Middleware for CORS and JSON parsing
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5178",
  // Add your actual Vercel domain here
  "https://mythomaps.vercel.app",
  "https://mytho-maps.vercel.app",
  // Allow any vercel.app subdomain for preview deployments
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      // Check if origin is allowed or is a vercel.app domain
      if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
        callback(null, true);
      } else {
        console.log('CORS blocked origin:', origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Enable credentials (cookies, authorization headers)
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/booking", bookingRoutes);

// Root route for health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "🕉️ MythoMaps API is running successfully!",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      users: "/api/user", 
      tours: "/api/tour",
      reviews: "/api/review",
      bookings: "/api/booking"
    },
    status: "active"
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `The route ${req.originalUrl} does not exist`,
    availableRoutes: ["/", "/api/health", "/api/auth", "/api/user", "/api/tour", "/api/review", "/api/booking"]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// For Vercel deployment, export the app
export default app;

// Only listen in development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
