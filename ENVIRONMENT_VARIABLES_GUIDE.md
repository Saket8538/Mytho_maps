# 🔐 Environment Variables & Secrets Management Guide

## Overview
This guide explains how to securely manage database credentials and secret keys for MythoMaps deployment.

---

## 🚨 CRITICAL SECURITY ISSUE RESOLVED

### What Happened:
The file `backend/.env.example` previously contained **REAL production credentials**:
- ❌ Real MongoDB username and password
- ❌ Real JWT secret key
- ❌ Full database connection string

**This is a serious security risk!** Anyone with repository access had full database access.

### What Was Done:
✅ Removed all real credentials from `.env.example`  
✅ Replaced with placeholder values  
✅ Added instructions for generating secure secrets  
✅ Updated documentation  

### What You Must Do:

**If you've already pushed the old `.env.example` to GitHub:**

1. **Rotate ALL credentials immediately:**
   - [ ] Change MongoDB password
   - [ ] Generate new JWT secret
   - [ ] Update Vercel environment variables
   - [ ] Consider creating new database entirely

2. **Check git history:**
   ```bash
   git log --all --full-history -- "backend/.env.example"
   ```

3. **If repository is public:**
   - Your database is potentially compromised
   - Create new database ASAP
   - Migrate data if needed
   - Delete old database

---

## 📋 Required Environment Variables

### Development (.env file locally)
Create `backend/.env` file (never commit this!):

```bash
# MongoDB Connection - Development Database
MONGO_URL=mongodb+srv://dev-user:dev-password@dev-cluster.mongodb.net/mythomaps-dev?retryWrites=true&w=majority

# JWT Secret - Use different key for development
JWT_SECRET=development-secret-key-at-least-32-characters-long

# Environment
NODE_ENV=development

# Port
PORT=3050
```

### Production (Vercel Environment Variables)
Set in Vercel Dashboard → Settings → Environment Variables:

```bash
# MongoDB Connection - Production Database
MONGO_URL=mongodb+srv://prod-user:STRONG-PASSWORD@prod-cluster.mongodb.net/mythomaps?retryWrites=true&w=majority

# JWT Secret - Strong random string
JWT_SECRET=<64-character-random-string-from-crypto>

# Environment
NODE_ENV=production

# Port
PORT=3000
```

---

## 🔑 How to Generate Secure Secrets

### 1. JWT Secret (Recommended Method)

**Using Node.js crypto module:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Output (example):**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6k7l8m9n0o1p2q3r4s5t6u7v8w9x0y1z2a3b4c5d6e7f8
```

**Copy this entire string** - This is your `JWT_SECRET`

### 2. MongoDB Password

**Option A: Auto-generate in MongoDB Atlas (Recommended)**
1. Go to Database Access → Add New User
2. Click "Autogenerate Secure Password"
3. Copy and save the password immediately
4. Use this in your connection string

**Option B: Generate manually**
```bash
# Generate 32-character password
node -e "console.log(require('crypto').randomBytes(24).toString('base64'))"
```

---

## 🗄️ MongoDB Connection Strings

### Understanding the Connection String

**Format:**
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?OPTIONS
```

**Parts:**
- `USERNAME`: Database user (not your Atlas account)
- `PASSWORD`: Database user password (URL-encoded if special chars)
- `CLUSTER`: Your cluster hostname
- `DATABASE`: Database name (e.g., `mythomaps`)
- `OPTIONS`: Query parameters (retryWrites, w, etc.)

### Development vs Production

**Development:**
```bash
# Use separate database or cluster
MONGO_URL=mongodb+srv://dev-user:dev-pass@dev-cluster.mongodb.net/mythomaps-dev?retryWrites=true&w=majority
```

**Production:**
```bash
# Use production cluster with strong credentials
MONGO_URL=mongodb+srv://prod-user:STRONG-PASS@prod-cluster.mongodb.net/mythomaps?retryWrites=true&w=majority
```

### Special Characters in Password

If password contains special characters (`@`, `:`, `/`, etc.), URL-encode them:

| Character | Encoded |
|-----------|---------|
| @ | %40 |
| : | %3A |
| / | %2F |
| ? | %3F |
| # | %23 |
| [ | %5B |
| ] | %5D |

**Example:**
```
Password: p@ss:word/123
Encoded:  p%40ss%3Aword%2F123

Connection String:
mongodb+srv://user:p%40ss%3Aword%2F123@cluster.mongodb.net/db
```

---

## 🔐 Secure Secrets Management

### Local Development

**Create `.env` file:**
```bash
cd backend
touch .env
```

**Add to `.env`:**
```bash
MONGO_URL=your-dev-mongodb-url
JWT_SECRET=your-dev-jwt-secret
NODE_ENV=development
PORT=3050
```

**Verify `.gitignore` includes:**
```
.env
.env.local
.env.*.local
backend/.env
```

**Test it's ignored:**
```bash
git status
# Should NOT show .env file
```

### Production (Vercel)

**Never hardcode secrets in code!**

**✅ Correct Way:**
```javascript
// In code
const dbUrl = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;
```

**❌ Wrong Way:**
```javascript
// NEVER do this!
const dbUrl = "mongodb+srv://user:password@...";
const jwtSecret = "my-secret-key";
```

### Setting in Vercel

**Step-by-step:**

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Settings → Environment Variables**
4. **Add each variable:**
   - Click "Add New"
   - Name: `MONGO_URL`
   - Value: `mongodb+srv://...` (paste full connection string)
   - Environment: Check "Production", "Preview", "Development"
   - Click "Save"

5. **Repeat for all variables:**
   - `MONGO_URL`
   - `JWT_SECRET`
   - `NODE_ENV`
   - `PORT`

6. **Redeploy** to apply changes:
   - Deployments → Latest → ... → Redeploy

---

## 🔒 MongoDB Security Setup

### 1. Create Database Users (Not Atlas Users!)

**Atlas Account vs Database User:**
- **Atlas Account**: Your login to MongoDB website (YOU)
- **Database User**: Application login to database (YOUR APP)

**Create Database User:**
1. MongoDB Atlas → Database Access
2. Add New Database User
3. Authentication: Password
4. Username: `mythomaps-prod`
5. Password: Autogenerate Secure Password
6. Privileges: "Read and write to any database" or custom

### 2. Network Access

**For Vercel (Dynamic IPs):**
1. MongoDB Atlas → Network Access
2. Add IP Address
3. Select "Allow Access From Anywhere"
4. IP: `0.0.0.0/0`
5. Comment: "Vercel serverless functions"

**Security Note:**
- This allows any IP but still requires authentication
- MongoDB validates username/password
- Use strong passwords!
- Monitor access logs

**Alternative (More Secure):**
- Use MongoDB Atlas Data API
- Use MongoDB Realm
- Set up VPN/Private Endpoint (requires paid tier)

### 3. Database Permissions

**Recommended Permissions:**
- Production user: Read/Write to specific database
- Development user: Read/Write to dev database
- Admin user: Separate credentials, rarely used

**Create Custom Role:**
```javascript
// MongoDB Shell
use admin
db.createRole({
  role: "mythomapsAppRole",
  privileges: [
    {
      resource: { db: "mythomaps", collection: "" },
      actions: ["find", "insert", "update", "remove"]
    }
  ],
  roles: []
})
```

---

## 🔍 Testing Connections

### Test MongoDB Connection Locally

**Create test script:**
```javascript
// test-connection.js
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('✅ MongoDB connected successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });
```

**Run test:**
```bash
cd backend
node test-connection.js
```

### Test JWT Secret

**Create test script:**
```javascript
// test-jwt.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

const payload = { id: '12345', role: 'user' };

try {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  console.log('✅ Token generated:', token.substring(0, 20) + '...');
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('✅ Token verified:', decoded);
} catch (error) {
  console.error('❌ JWT error:', error.message);
}
```

**Run test:**
```bash
cd backend
node test-jwt.js
```

---

## 🚫 Common Mistakes to Avoid

### ❌ Don't Do This:

1. **Committing `.env` files**
   ```bash
   git add .env  # NEVER!
   ```

2. **Hardcoding secrets**
   ```javascript
   const secret = "my-secret-123";  // NEVER!
   ```

3. **Sharing secrets in chat/email**
   - Use secure password managers
   - Use encrypted communication

4. **Using weak passwords**
   ```
   password123  # Too weak!
   ```

5. **Same credentials for dev and prod**
   - Always separate environments

6. **Logging secrets**
   ```javascript
   console.log(process.env.JWT_SECRET);  // NEVER!
   ```

### ✅ Do This Instead:

1. **Use environment variables**
   ```javascript
   const secret = process.env.JWT_SECRET;  // Good!
   ```

2. **Generate strong random secrets**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

3. **Separate dev and prod credentials**
   ```
   Dev:  mythomaps-dev database
   Prod: mythomaps database
   ```

4. **Use `.gitignore`**
   ```
   .env
   *.env
   ```

5. **Use password managers**
   - 1Password
   - LastPass
   - Bitwarden

---

## 📊 Environment Variable Checklist

### Before Deployment:

- [ ] `.env` file created locally with dev credentials
- [ ] `.env` file is in `.gitignore`
- [ ] No `.env` files committed to git
- [ ] Production MongoDB database created
- [ ] Production MongoDB user created with strong password
- [ ] JWT secret generated (64+ characters)
- [ ] All 4 environment variables ready for Vercel

### In Vercel:

- [ ] `MONGO_URL` set (production connection string)
- [ ] `JWT_SECRET` set (strong random string)
- [ ] `NODE_ENV` set to `production`
- [ ] `PORT` set to `3000`
- [ ] All variables applied to "Production" environment
- [ ] Deployment redeployed after adding variables

### After Deployment:

- [ ] Test API connection to MongoDB
- [ ] Test JWT authentication
- [ ] No secrets in logs
- [ ] No secrets in error messages
- [ ] Connection successful

---

## 🔄 Rotating Credentials

### When to Rotate:

- Credentials exposed in git history
- Team member leaves
- Security breach suspected
- Regular security maintenance (every 90 days)
- Moving from development to production

### How to Rotate:

**MongoDB Password:**
1. Create new database user with new password
2. Update connection string in Vercel
3. Redeploy application
4. Test new connection works
5. Delete old database user

**JWT Secret:**
1. Generate new secret
2. Update in Vercel
3. Redeploy application
4. All users will need to login again (tokens invalidated)

---

## 📞 Need Help?

### Issues:

**"Authentication failed"**
- Check username/password in connection string
- Verify user exists in Database Access
- Check user has correct permissions

**"IP not whitelisted"**
- Add 0.0.0.0/0 to Network Access
- Wait 1-2 minutes for changes to apply

**"Invalid JWT"**
- Verify JWT_SECRET is set in Vercel
- Check variable name is exactly `JWT_SECRET`
- Generate new secret if needed

### Resources:

- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Vercel Environment Variables: https://vercel.com/docs/environment-variables
- JWT Best Practices: https://tools.ietf.org/html/rfc8725

---

## ✅ Summary

**Key Points:**
1. ✅ Never commit real credentials to git
2. ✅ Use strong randomly generated secrets
3. ✅ Separate dev and production credentials
4. ✅ Store secrets in Vercel environment variables
5. ✅ Test connections before deployment
6. ✅ Rotate credentials if compromised
7. ✅ Monitor access logs regularly

**Your credentials are secure when:**
- Not in git repository
- Strong and random
- Properly stored in Vercel
- MongoDB properly configured
- Regular monitoring enabled

---

*Stay secure! 🔐*
