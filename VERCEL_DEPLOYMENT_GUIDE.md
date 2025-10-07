# 🚀 MythoMaps - Complete Deployment Guide for Vercel

## 📋 Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- MongoDB Atlas account
- All code bugs fixed (see DEPLOYMENT_ANALYSIS.md)

---

## 🔐 STEP 1: Secure Your MongoDB Database

### A. Create Production Database

1. **Login to MongoDB Atlas** (https://cloud.mongodb.com)

2. **Create New Cluster** (or use existing):
   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to your users
   - Click "Create"

3. **Create Database User**:
   - Go to "Database Access" (left sidebar)
   - Click "+ ADD NEW DATABASE USER"
   - Choose "Password" authentication
   - Username: `mythomaps-prod` (or your choice)
   - Password: Click "Autogenerate Secure Password" - **SAVE THIS!**
   - Database User Privileges: "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**:
   - Go to "Network Access" (left sidebar)
   - Click "+ ADD IP ADDRESS"
   - Click "ALLOW ACCESS FROM ANYWHERE"
   - IP Address: `0.0.0.0/0`
   - Click "Confirm"
   
   > ⚠️ Note: This allows Vercel's dynamic IPs to connect. MongoDB will still require authentication.

5. **Get Connection String**:
   - Go to "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" driver and version 4.1 or later
   - Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
   - Replace `<username>` with your database username
   - Replace `<password>` with the password you saved
   - Add database name: `...mongodb.net/mythomaps?retryWrites=true...`

   **Final format:**
   ```
   mongodb+srv://mythomaps-prod:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mythomaps?retryWrites=true&w=majority
   ```

---

## 🔑 STEP 2: Generate Secure Secrets

### Generate JWT Secret

Run this command in terminal to generate a secure random key:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Copy the output** - this is your `JWT_SECRET`. It will look like:
```
a1b2c3d4e5f6...very long random string...
```

**Keep this secret safe!** You'll need it in Step 3.

---

## 🌐 STEP 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push Code to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to https://vercel.com/new
   - Click "Import Git Repository"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**:
   - Framework Preset: **Other** (Vercel will detect from vercel.json)
   - Root Directory: `./` (leave as is)
   - Build Command: (leave empty, vercel.json handles it)
   - Output Directory: (leave empty)
   - Click "Deploy"

4. **Wait for Initial Deployment** (will likely fail - that's ok!)
   - This creates the project
   - We need to add environment variables first

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

---

## ⚙️ STEP 4: Configure Environment Variables

1. **Go to Vercel Dashboard**:
   - Open your project
   - Click "Settings" tab
   - Click "Environment Variables" in left sidebar

2. **Add Environment Variables**:

   Click "Add New" for each variable:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `MONGO_URL` | Your MongoDB connection string from Step 1 | Production |
   | `JWT_SECRET` | Your generated secret from Step 2 | Production |
   | `NODE_ENV` | `production` | Production |
   | `PORT` | `3000` | Production |

   **Example:**
   - Name: `MONGO_URL`
   - Value: `mongodb+srv://mythomaps-prod:abc123@cluster0.xxxxx.mongodb.net/mythomaps?retryWrites=true&w=majority`
   - Environment: Production ✓

   > 💡 **Pro Tip**: Also add to Preview and Development for testing

3. **Save Variables**:
   - Click "Save" after adding all 4 variables

---

## 🔄 STEP 5: Redeploy

### Method 1: Trigger Redeploy from Dashboard

1. Go to "Deployments" tab
2. Click on the latest deployment
3. Click "..." menu → "Redeploy"
4. Check "Use existing Build Cache" 
5. Click "Redeploy"

### Method 2: Push New Commit

```bash
git commit --allow-empty -m "Trigger redeployment with env vars"
git push origin main
```

### Method 3: Vercel CLI

```bash
vercel --prod
```

---

## ✅ STEP 6: Verify Deployment

### A. Check Build Logs

1. Go to Vercel Dashboard → Deployments
2. Click on latest deployment
3. Check logs for errors
4. Look for "Build Completed" message

### B. Test Backend API

Open in browser or use curl:

```bash
# Health check
https://your-app.vercel.app/api/health

# Root endpoint
https://your-app.vercel.app/

# Tours endpoint (should return tours or empty array)
https://your-app.vercel.app/api/tour
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-10-07T...",
  "uptime": 123.456
}
```

### C. Test Frontend

1. Open `https://your-app.vercel.app`
2. Should see the home page
3. Check browser console for errors (F12)

### D. Test Full Flow

1. **Register a new user**:
   - Go to registration page
   - Fill form and submit
   - Should succeed

2. **Login**:
   - Use registered credentials
   - Should login successfully

3. **Browse Tours**:
   - Navigate to tours page
   - Tours should load

4. **Create a Review** (most critical - this was buggy):
   - Select a tour
   - Write a review
   - Submit
   - Should save successfully ✅

---

## 🐛 STEP 7: Troubleshooting

### Issue: Deployment Failed

**Check:**
1. Vercel build logs for error messages
2. Environment variables are set correctly
3. MongoDB connection string is correct
4. No typos in variable names

**Fix:**
- Correct the issue
- Redeploy

### Issue: API Returns 500 Errors

**Check:**
1. Vercel Function Logs (Dashboard → Logs)
2. MongoDB Atlas → Metrics → Check for connection errors

**Common Causes:**
- Wrong MongoDB connection string
- Database user doesn't have permissions
- IP not whitelisted (should be 0.0.0.0/0)

**Fix:**
```bash
# Test connection string locally first
MONGO_URL="your-connection-string" node -e "require('mongoose').connect(process.env.MONGO_URL).then(() => console.log('Connected!')).catch(err => console.error(err))"
```

### Issue: CORS Errors

**Symptoms:**
- Browser console shows CORS errors
- API calls fail from frontend

**Fix:**
Update `backend/index.js` CORS configuration to include your Vercel domain:
```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://your-app.vercel.app",  // Add your actual domain
  "https://your-app-*.vercel.app", // Preview deployments
];
```

### Issue: Authentication Not Working

**Check:**
1. JWT_SECRET is set in Vercel
2. Cookie settings are correct
3. Browser allows third-party cookies

**Fix:**
- Verify `JWT_SECRET` environment variable
- Check cookie settings in `authController.js`

### Issue: Reviews Not Saving

This was the critical bug - should be fixed now!

**If still failing:**
1. Check Vercel logs for error
2. Verify Review model uses `tourId` (not `productId`)
3. Check MongoDB for saved reviews

---

## 📊 STEP 8: Monitor Your Deployment

### Vercel Dashboard

**Check Regularly:**
- Analytics → See traffic and usage
- Logs → Check for errors
- Functions → Monitor API performance

### MongoDB Atlas

**Monitor:**
- Metrics → Database performance
- Activity Feed → Connection history
- Alerts → Set up alerts for issues

---

## 🔒 STEP 9: Security Checklist

- [ ] JWT_SECRET is strong (64+ characters)
- [ ] MongoDB credentials are NOT in git repository
- [ ] `.env` files are in `.gitignore`
- [ ] MongoDB requires authentication
- [ ] CORS is configured for your domain only
- [ ] HTTPS is enabled (Vercel does this automatically)
- [ ] Cookies use `secure` flag in production

---

## 🎯 STEP 10: Update Your Domain (Optional)

### Add Custom Domain

1. **Vercel Dashboard** → Settings → Domains
2. Click "Add Domain"
3. Enter your domain: `mythomaps.com`
4. Follow DNS configuration instructions
5. Wait for DNS propagation (5-60 minutes)

### Update CORS

After adding domain, update `backend/index.js`:
```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-app.vercel.app",
  "https://mythomaps.com",  // Your custom domain
  "https://www.mythomaps.com",
];
```

---

## 📝 Environment Variables Reference

| Variable | Required | Example | Purpose |
|----------|----------|---------|---------|
| `MONGO_URL` | ✅ Yes | `mongodb+srv://user:pass@...` | Database connection |
| `JWT_SECRET` | ✅ Yes | `a1b2c3d4e5f6...` | JWT token signing |
| `NODE_ENV` | ✅ Yes | `production` | Environment mode |
| `PORT` | ⚠️ Optional | `3000` | Server port (Vercel overrides) |

---

## 🚨 Important Notes

### Database Credentials Security

**⚠️ CRITICAL:** The old `.env.example` file contained REAL database credentials. If you committed this:

1. **Immediately rotate credentials:**
   - MongoDB Atlas → Database Access
   - Delete old user
   - Create new user with new password

2. **Update connection string** in Vercel environment variables

3. **Check git history:**
   ```bash
   git log --all --full-history -- "backend/.env.example"
   ```

4. **If exposed publicly**, consider:
   - Creating entirely new database
   - Migrating data to new database
   - Deleting old database

### Free Tier Limits

**Vercel Free Tier:**
- 100 GB bandwidth/month
- 100 hours serverless function execution
- Sufficient for small-medium projects

**MongoDB Atlas Free Tier (M0):**
- 512 MB storage
- Shared CPU
- Sufficient for development and small production

**Upgrade if you need:**
- More storage
- Better performance
- More bandwidth

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Deployment status is "Ready"
- [ ] API health endpoint responds
- [ ] Frontend loads without errors
- [ ] User registration works
- [ ] Login/logout works
- [ ] Tours display correctly
- [ ] Reviews can be created ✅ (was buggy)
- [ ] Bookings work
- [ ] Admin panel accessible
- [ ] Images load correctly
- [ ] No console errors
- [ ] Mobile responsive works

---

## 📞 Need Help?

### Vercel Support
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

### MongoDB Support
- Docs: https://docs.mongodb.com/
- Community: https://www.mongodb.com/community/forums/

### Common Issues
- See `DEPLOYMENT_ANALYSIS.md` for bug details
- Check Vercel logs for runtime errors
- Test locally first with production environment variables

---

## 🔄 Future Updates

When you make changes:

1. **Test locally first**
2. **Commit to git**:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
3. **Vercel auto-deploys** on push to main
4. **Check deployment status** in Vercel dashboard
5. **Verify changes** on live site

---

## 🎊 Congratulations!

Your MythoMaps application should now be live on Vercel!

**Your URLs:**
- Production: `https://your-app.vercel.app`
- API: `https://your-app.vercel.app/api`

Share your link and enjoy your deployed application! 🚀

---

*Last updated: October 7, 2025*
