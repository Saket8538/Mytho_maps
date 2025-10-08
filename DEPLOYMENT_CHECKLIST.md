# 🚀 Vercel Deployment Checklist

## Prerequisites Completed ✅
- [x] MongoDB connection tested and working
- [x] Backend server running locally
- [x] Frontend server running locally
- [x] Registration and login tested locally
- [x] All images loading correctly

---

## Step 1: MongoDB Atlas Setup (if not done)

1. Go to https://cloud.mongodb.com/
2. Create a free cluster
3. Create database user with password
4. Whitelist all IP addresses (0.0.0.0/0)
5. Get connection string - Your current one:
   ```
   mongodb://dr-app:uzair123@ac-knxfmic-shard-00-00.uhpk6qs.mongodb.net:27017,ac-knxfmic-shard-00-01.uhpk6qs.mongodb.net:27017,ac-knxfmic-shard-00-02.uhpk6qs.mongodb.net:27017/TripsTravel?ssl=true&replicaSet=atlas-s01o98-shard-0&authSource=admin&retryWrites=true&w=majority
   ```

---

## Step 2: Deploy Backend to Vercel

### A. Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Import from GitHub: `Saket8538/Mytho_maps`

### B. Configure Backend Project
**Framework Preset:** Other  
**Root Directory:** `backend`  
**Build Command:** (leave empty)  
**Output Directory:** (leave empty)  
**Install Command:** `npm install`

### C. Add Environment Variables
Click "Environment Variables" and add these:

| Variable | Value |
|----------|-------|
| `MONGO_URL` | `mongodb://dr-app:uzair123@ac-knxfmic-shard-00-00.uhpk6qs.mongodb.net:27017,ac-knxfmic-shard-00-01.uhpk6qs.mongodb.net:27017,ac-knxfmic-shard-00-02.uhpk6qs.mongodb.net:27017/TripsTravel?ssl=true&replicaSet=atlas-s01o98-shard-0&authSource=admin&retryWrites=true&w=majority` |
| `JWT_SECRET` | `askljdflkasdfklkasbhfkjashdlkjfha.skhfdljhfajksdbcvkbnxbvjksajfklhjklasdhfjkhsajklhdjklhf` |
| `NODE_ENV` | `production` |
| `PORT` | `3050` |
| `FRONTEND_URL` | (Add after frontend deployment) |

**Important:** Set these for Production, Preview, and Development environments.

### D. Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. **COPY YOUR BACKEND URL** (e.g., `https://mytho-maps-backend.vercel.app`)

### E. Test Backend
Visit: `https://your-backend-url.vercel.app/api/tours`  
Should see JSON response (might be empty array - that's OK!)

---

## Step 3: Deploy Frontend to Vercel

### A. Create New Project
1. Go to Vercel Dashboard
2. Click "Add New..." → "Project"
3. Import same repo: `Saket8538/Mytho_maps`

### B. Configure Frontend Project
**Framework Preset:** Vite  
**Root Directory:** `frontend`  
**Build Command:** `npm run build`  
**Output Directory:** `dist`  
**Install Command:** `npm install`

### C. Add Environment Variable
| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://your-backend-url.vercel.app/api` |

Example: `https://mytho-maps-backend.vercel.app/api`

### D. Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. **COPY YOUR FRONTEND URL** (e.g., `https://mytho-maps.vercel.app`)

---

## Step 4: Update Backend CORS

### A. Add Frontend URL to Backend
1. Go to backend project in Vercel
2. Settings → Environment Variables
3. Add or update `FRONTEND_URL`:
   - Value: `https://your-frontend-url.vercel.app`

### B. Redeploy Backend
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait for completion

---

## Step 5: Final Testing

### Test Registration
1. Visit your frontend URL
2. Click "Register"
3. Create a test account:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `Test123!`
4. Should redirect to login with success message

### Test Login
1. Login with credentials
2. Should see logged-in state

### Test Features
- [ ] All images load on homepage
- [ ] India page shows attractions with images
- [ ] India page shows itineraries with images
- [ ] Tours page works
- [ ] Search functionality works
- [ ] Booking works (if applicable)

---

## Important URLs After Deployment

**Frontend URL:** `https://_____________________.vercel.app`  
**Backend URL:** `https://_____________________.vercel.app`

---

## Troubleshooting

### Registration Still Shows Internal Server Error

**Check these in order:**

1. **Verify Backend is Running**
   - Visit: `https://your-backend-url.vercel.app/api/tours`
   - Should return JSON (even if empty)

2. **Check Backend Logs**
   - Go to backend project → Deployments
   - Click latest deployment → View Function Logs
   - Look for errors

3. **Verify Environment Variables**
   - Backend project → Settings → Environment Variables
   - Ensure all 5 variables are set correctly
   - Special attention to `MONGO_URL`

4. **Check Frontend API URL**
   - Frontend project → Settings → Environment Variables
   - `VITE_API_URL` should point to your backend

5. **CORS Issues**
   - Ensure `FRONTEND_URL` is set in backend
   - Check backend logs for CORS errors

6. **Database Connection**
   - MongoDB Atlas → Network Access
   - Ensure 0.0.0.0/0 is whitelisted

### Common Fixes

**Error: "Email already registered"**
- User already exists in database
- Try different email

**Error: "Server not responding"**
- Backend not deployed or crashed
- Check backend logs

**Error: "CORS policy"**
- Add frontend URL to backend CORS
- Redeploy backend

---

## Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables set correctly
- [ ] CORS configured with frontend URL
- [ ] Registration working
- [ ] Login working
- [ ] All images loading
- [ ] Database connected
- [ ] No console errors

---

## Success! 🎉

Once all items are checked, your MythoMaps application is live!

**Share your live URLs:**
- Frontend: ____________________
- Backend API: ____________________

---

## Monitoring

### View Logs:
- **Backend:** Vercel → Backend Project → Deployments → View Function Logs
- **Frontend:** Browser Console (F12)

### Performance:
- Enable Vercel Analytics in project settings
- Monitor response times
- Check error rates

---

**Need Help?** Check DEPLOYMENT_GUIDE.md for detailed troubleshooting steps.
