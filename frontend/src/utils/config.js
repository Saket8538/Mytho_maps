// Base URL configuration for different environments
const BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'development' 
    ? "http://localhost:3050/api"
    : "/api"); // Use environment variable or fallback

export default BASE_URL;
