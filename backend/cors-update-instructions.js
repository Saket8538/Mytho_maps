// After getting your frontend URL, update the backend index.js CORS section:

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174", 
  "https://your-actual-frontend-url.vercel.app", // Replace with actual URL
  process.env.FRONTEND_URL // Set this in Vercel environment variables
];