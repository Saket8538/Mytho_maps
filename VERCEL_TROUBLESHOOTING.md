# 🚀 Vercel Deployment - Final Configuration Guide

## ✅ What I Just Fixed:

### Problem:
- Backend was building but frontend wasn't
- Vercel couldn't find the frontend build output
- Website showed 404 error

### Solution:
1. ✅ Simplified `vercel.json` configuration
2. ✅ Added `vercel-build` script to frontend/package.json
3. ✅ Configured proper routing for API and static files

---

## 📋 Environment Variables You MUST Set in Vercel

Go to **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these **4 variables** exactly as shown:

| Variable Name | Value | Where to Get |
|---------------|-------|--------------|
| `MONGO_URL` | Your MongoDB connection string | MongoDB Atlas → Connect → Connection String |
| `JWT_SECRET` | A 64+ character random string | Run: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| `NODE_ENV` | `production` | Just type: `production` |
| `PORT` | `3000` | Just type: `3000` |

### ⚠️ CRITICAL: Variable Names Must Be EXACT!
- ❌ NOT `SECRET_KEY` 
- ✅ YES `JWT_SECRET`

---

## 🔐 Security Warning - You're Using Exposed Credentials!

Your current MongoDB credentials were committed to GitHub and are **compromised**:
```
Username: dr-app
Password: uzair123
```

### You MUST Do This:

1. **Create New MongoDB User:**
   - MongoDB Atlas → Database Access
   - Add New Database User
   - Username: `mythomaps-production` (or anything new)
   - Password: Click "Autogenerate Secure Password" → **Save it!**
   - Privileges: "Read and write to any database"

2. **Delete Old User:**
   - Delete the `dr-app` user

3. **Get New Connection String:**
   - Database → Connect → Connect your application
   - Copy the new connection string
   - Replace `<username>` and `<password>` with your new credentials

4. **Update Vercel:**
   - Settings → Environment Variables
   - Edit `MONGO_URL` 
   - Paste new connection string
   - Save

5. **Generate New JWT Secret:**
   ```powershell
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```
   - Copy the output
   - Update `JWT_SECRET` in Vercel

---

## 📊 Current Deployment Status:

### What Just Happened:
1. ✅ Updated vercel.json with correct configuration
2. ✅ Added vercel-build script to frontend
3. ✅ Pushed to GitHub
4. 🔄 Vercel is now auto-deploying...

### Wait 2-5 Minutes:
- Vercel will detect the push
- Run the build
- Deploy both backend and frontend

---

## ✅ How to Verify Deployment:

### 1. Check Vercel Dashboard:
- Go to **Deployments** tab
- Wait for "Building..." to change to "Ready"
- Should show green checkmark ✅

### 2. Visit Your Website:
```
https://your-project-name.vercel.app
```
- Should show your homepage (not 404)

### 3. Test API:
```
https://your-project-name.vercel.app/api/health
```
- Should return: `{"status":"OK",...}`

### 4. Test Full Application:
- Click around the website
- Try to register a user
- Try to login
- Browse tours
- Create a review

---

## 🐛 If Still Getting 404:

### Check Build Logs:
1. Vercel Dashboard → Deployments
2. Click on latest deployment
3. Check logs for errors

### Common Issues:

**Issue: "Frontend build failed"**
- Solution: Check that all dependencies installed
- Look for error messages in build logs

**Issue: "Cannot find module"**
- Solution: Missing dependency
- Check package.json has all required packages

**Issue: "API returns 500"**
- Solution: Environment variables not set
- Go to Settings → Environment Variables
- Make sure all 4 are set correctly

**Issue: "CORS errors"**
- Solution: Update backend/index.js allowed origins
- Add your Vercel domain to the allowedOrigins array

---

## 📝 Correct vercel.json (Current):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/index.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ]
}
```

This tells Vercel:
- Build backend using Node.js
- Build frontend using static-build (Vite)
- Route /api/* to backend
- Route everything else to frontend

---

## 🎯 Next Steps:

### Immediate (Now):
- [ ] Wait for current deployment to finish (2-5 mins)
- [ ] Check if website is live
- [ ] Test basic functionality

### Important (Today):
- [ ] Rotate MongoDB credentials (security!)
- [ ] Generate new JWT secret
- [ ] Update Vercel environment variables
- [ ] Redeploy after updating credentials

### Testing (After Live):
- [ ] Test user registration
- [ ] Test login/logout
- [ ] Test tours page
- [ ] Test creating reviews
- [ ] Test creating bookings
- [ ] Test on mobile

---

## 📞 Troubleshooting Commands:

### Check if website is live:
```powershell
curl https://your-app.vercel.app
```

### Test API health:
```powershell
curl https://your-app.vercel.app/api/health
```

### Check environment variables are set:
- Vercel Dashboard → Settings → Environment Variables
- Should see all 4 variables listed

---

## ✨ Success Indicators:

You'll know it's working when:
- ✅ Website loads (no 404)
- ✅ Homepage displays correctly
- ✅ Navigation works
- ✅ Images load
- ✅ API health check returns 200 OK
- ✅ Can register and login
- ✅ Tours display correctly

---

## 🎊 After Successful Deployment:

1. **Update CORS in backend/index.js:**
   ```javascript
   const allowedOrigins = [
     "http://localhost:5173",
     "https://your-actual-vercel-domain.vercel.app"  // Add this
   ];
   ```

2. **Set up custom domain (optional):**
   - Vercel Dashboard → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

3. **Monitor performance:**
   - Analytics tab to see traffic
   - Logs tab to check for errors

---

## 🔒 Final Security Checklist:

- [ ] Rotated MongoDB credentials (delete dr-app user)
- [ ] Generated new JWT secret
- [ ] Updated all environment variables in Vercel
- [ ] Verified .env is in .gitignore (never commit it!)
- [ ] No secrets in code (all in environment variables)
- [ ] HTTPS enabled (Vercel does this automatically)

---

**Your deployment should be live in a few minutes!** 🚀

Check your Vercel dashboard and watch the deployment progress.

*Good luck!*
