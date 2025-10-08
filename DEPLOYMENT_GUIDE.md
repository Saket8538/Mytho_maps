# 🚀 MythoMaps - Complete Deployment Guide for Vercel

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [MongoDB Setup](#mongodb-setup)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Post-Deployment Testing](#post-deployment-testing)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

- [x] GitHub account
- [x] Vercel account (sign up at [vercel.com](https://vercel.com))
- [x] MongoDB Atlas account (sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))
- [x] Repository: `https://github.com/Saket8538/Mytho_maps.git`

---

## 🍃 MongoDB Setup

### Step 1: Create MongoDB Atlas Cluster

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click "Create a New Cluster" (Free tier is sufficient)
3. Choose a cloud provider and region (preferably close to your users)
4. Click "Create Cluster" and wait for it to deploy (~5 minutes)

### Step 2: Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a user:
   - Username: `mythomaps_user`
   - Password: Generate a secure password (save this!)
   - User Privileges: "Atlas admin" or "Read and write to any database"
4. Click "Add User"

### Step 3: Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
   - This is needed for Vercel deployments
4. Click "Confirm"

### Step 4: Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (it looks like):
   ```
   mongodb+srv://mythomaps_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual database user password
6. Add database name after `.net/`: 
   ```
   mongodb+srv://mythomaps_user:yourpassword@cluster0.xxxxx.mongodb.net/mythomaps?retryWrites=true&w=majority
   ```

---

## 🔧 Backend Deployment

### Step 1: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import the GitHub repository: `Saket8538/Mytho_maps`
4. Configure the project:

   **Project Settings:**
   - Project Name: `mythomaps-backend` (or your choice)
   - Framework Preset: `Other`
   - Root Directory: `backend`
   
   **Build & Output Settings:**
   - Build Command: Leave empty or `npm install`
   - Output Directory: Leave empty
   - Install Command: `npm install`

### Step 2: Configure Environment Variables

Click on "Environment Variables" and add the following:

| Variable Name | Value | Notes |
|--------------|-------|-------|
| `MONGO_URL` | `mongodb+srv://...` | Your MongoDB connection string from above |
| `JWT_SECRET` | Generate random string | Use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `PORT` | `3050` | Server port |
| `NODE_ENV` | `production` | Production environment |
| `FRONTEND_URL` | Will add after frontend deployment | Your frontend URL |

**Important:** Make sure all variables are set for "Production", "Preview", and "Development" environments.

### Step 3: Deploy

1. Click "Deploy"
2. Wait for deployment to complete (~2-3 minutes)
3. Copy your backend URL (e.g., `https://mythomaps-backend.vercel.app`)

### Step 4: Test Backend

Open the following URL in your browser:
```
https://your-backend-url.vercel.app/api/tours
```

You should see a JSON response (might be empty array initially, that's fine).

---

## 🎨 Frontend Deployment

### Step 1: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import the same GitHub repository: `Saket8538/Mytho_maps`
4. Configure the project:

   **Project Settings:**
   - Project Name: `mythomaps` or `mythomaps-frontend`
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   
   **Build & Output Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Step 2: Configure Environment Variables

Click on "Environment Variables" and add:

| Variable Name | Value | Example |
|--------------|-------|---------|
| `VITE_API_URL` | `https://your-backend-url.vercel.app/api` | `https://mythomaps-backend.vercel.app/api` |

### Step 3: Deploy

1. Click "Deploy"
2. Wait for deployment to complete (~2-3 minutes)
3. Copy your frontend URL (e.g., `https://mythomaps.vercel.app`)

### Step 4: Update Backend CORS

1. Go back to your backend project in Vercel
2. Go to Settings → Environment Variables
3. Update or add `FRONTEND_URL`:
   - Value: Your frontend URL (e.g., `https://mythomaps.vercel.app`)
4. Go to Deployments tab
5. Click "..." on the latest deployment → "Redeploy"

---

## ✅ Post-Deployment Testing

### 1. Test Homepage
- Visit your frontend URL
- Check if all images load (attractions, itineraries)
- Verify navigation works

### 2. Test Registration
1. Click on "Register" or "Sign Up"
2. Fill in the form:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Test123!`
3. Submit the form
4. Should redirect to login page with success message

### 3. Test Login
1. Click on "Login"
2. Enter the credentials you just registered
3. Should log in successfully

### 4. Test Tours/Attractions
1. Navigate to different pages
2. Verify all images load
3. Check if data is displaying correctly

### 5. Test Booking (if applicable)
1. Select a tour
2. Try to make a booking
3. Verify it works end-to-end

---

## 🔍 Troubleshooting

### Images Not Loading

**Symptom:** Attraction or itinerary images show broken image icon

**Solution:**
1. Check if images exist in `frontend/public/assets/images/`
2. Verify paths in `attractions.js` and `itineraries.js` use `/assets/images/...`
3. Clear browser cache and hard reload (Ctrl+Shift+R)
4. Check browser console for 404 errors

### Registration Not Working

**Symptom:** "Server not responding" or error message

**Solution:**
1. Check if backend is deployed and running
2. Verify `VITE_API_URL` in frontend environment variables
3. Check backend logs in Vercel:
   - Go to backend project → Deployments → Click latest → View Function Logs
4. Verify MongoDB connection string is correct
5. Check CORS settings allow your frontend domain

### CORS Errors

**Symptom:** "Access to XMLHttpRequest has been blocked by CORS policy"

**Solution:**
1. Verify backend `FRONTEND_URL` includes your frontend domain
2. Check `backend/index.js` CORS configuration
3. Redeploy backend after updating CORS settings
4. Frontend domain should be added to `allowedOrigins` array

### Database Connection Error

**Symptom:** "DB not connected" in logs

**Solution:**
1. Verify MongoDB Atlas is running
2. Check `MONGO_URL` environment variable
3. Ensure password doesn't contain special characters (or is URL-encoded)
4. Verify Network Access allows 0.0.0.0/0
5. Check database user has proper permissions

### Build Failed

**Frontend Build Failed:**
```bash
# Check package.json exists in frontend folder
# Verify all dependencies are listed
# Check for syntax errors in code
```

**Backend Build Failed:**
```bash
# Verify package.json exists in backend folder
# Check Node.js version compatibility
# Ensure all imports use .js extensions
```

---

## 📊 Monitoring & Logs

### View Logs in Vercel:

1. **Frontend Logs:**
   - Vercel Dashboard → Your Frontend Project → Deployments
   - Click on latest deployment → "View Function Logs"

2. **Backend Logs:**
   - Vercel Dashboard → Your Backend Project → Deployments
   - Click on latest deployment → "View Function Logs"

3. **Real-time Logs:**
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel logs <your-project-url>`

---

## 🔐 Security Checklist

- [ ] JWT_SECRET is a strong random string (min 64 characters)
- [ ] MongoDB user has strong password
- [ ] CORS is configured to allow only your domains
- [ ] Environment variables are set correctly
- [ ] .env files are in .gitignore (not committed to repo)
- [ ] API rate limiting is configured (optional but recommended)

---

## 🎯 Performance Optimization

### After Successful Deployment:

1. **Enable Vercel Analytics:**
   - Go to your project → Analytics → Enable

2. **Add Custom Domain (Optional):**
   - Go to Settings → Domains
   - Add your custom domain

3. **Enable Edge Caching:**
   - Vercel automatically caches static assets
   - API responses can be cached with proper headers

4. **Image Optimization:**
   - Consider using Vercel Image Optimization
   - Or pre-optimize images before deployment

---

## 📝 Deployment Checklist Summary

### Before Deployment:
- [x] All code pushed to GitHub
- [x] Images in `frontend/public/assets/`
- [x] Environment variable examples created
- [x] All bugs fixed

### MongoDB:
- [ ] Cluster created
- [ ] Database user created
- [ ] Network access configured
- [ ] Connection string copied

### Backend:
- [ ] Deployed to Vercel
- [ ] Environment variables set
- [ ] Tested API endpoint
- [ ] Logs checked for errors

### Frontend:
- [ ] Deployed to Vercel
- [ ] Environment variables set
- [ ] Website accessible
- [ ] All features working

### Final:
- [ ] Registration tested
- [ ] Login tested
- [ ] Images loading
- [ ] Backend CORS updated with frontend URL
- [ ] All functionalities working

---

## 🆘 Need Help?

- **Vercel Documentation:** https://vercel.com/docs
- **MongoDB Atlas Documentation:** https://docs.atlas.mongodb.com/
- **GitHub Issues:** https://github.com/Saket8538/Mytho_maps/issues

---

**🎉 Congratulations! Your MythoMaps application should now be live!**

Frontend URL: `https://your-frontend.vercel.app`  
Backend URL: `https://your-backend.vercel.app`

Share your deployment URLs and enjoy your fully functional mythology tour booking platform!
