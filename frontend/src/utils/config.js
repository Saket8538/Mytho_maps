// Base URL configuration for different environments
const isDevelopment = import.meta.env.MODE === 'development';

const BASE_URL = isDevelopment 
  ? "http://localhost:3050/api"
  : "/api"; // Same domain for monorepo deployment

export default BASE_URL;
