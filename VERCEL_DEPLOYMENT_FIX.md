# 🚨 Vercel Frontend Deployment Fix

## ❌ **Error:**

```
sh: line 1: react-scripts: command not found
Error: Command "npm run build" exited with 127
```

## 🔧 **Root Cause:**

Vercel doesn't know which folder contains the frontend React app in a monorepo structure.

---

## ✅ **Solution 1: Use vercel.json (RECOMMENDED)**

I've created `vercel.json` file in the root directory with proper configuration.

### **Vercel Dashboard Settings:**

```
Framework Preset: Other
Build & Output Settings:
  Build Command: cd frontend && npm run build
  Output Directory: frontend/build
  Install Command: cd frontend && npm install
```

---

## ✅ **Solution 2: Deploy Frontend Folder Only**

### **Option A: Deploy frontend folder separately**

1. **Create new Vercel project**
2. **Import only the frontend folder** (not the entire repository)
3. **Framework:** Create React App
4. **Build Command:** `npm run build`
5. **Output Directory:** `build`

### **Option B: Use GitHub subdirectory**

1. **Vercel Dashboard** → **Import Project**
2. **Configure Project:**
   - **Framework:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

---

## 🌐 **Environment Variables for Vercel:**

### **Add these in Vercel Dashboard:**

```
REACT_APP_API_URL=https://your-backend-url.vercel.app/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_1234567890abcd
REACT_APP_NAME=PizzaHub
REACT_APP_VERSION=1.0.0
```

---

## 🔄 **Step-by-Step Fix:**

### **Method 1: Using vercel.json**

1. **Push the vercel.json** file to GitHub
2. **Redeploy** in Vercel dashboard
3. **Vercel will use** the configuration from vercel.json

### **Method 2: Project Settings**

1. **Go to Vercel Dashboard**
2. **Project Settings** → **General**
3. **Framework Preset:** Other
4. **Build & Output Settings:**
   ```
   Build Command: cd frontend && npm run build
   Output Directory: frontend/build
   Install Command: cd frontend && npm install
   ```
5. **Redeploy**

### **Method 3: New Project (Easiest)**

1. **Delete current Vercel project**
2. **Create new project**
3. **Import repository**
4. **Set Root Directory:** `frontend`
5. **Framework:** Create React App
6. **Deploy**

---

## ✅ **Expected Result:**

### **Successful Deployment:**

- ✅ Build completes without errors
- ✅ Frontend accessible at: `https://your-project.vercel.app`
- ✅ All React components load properly
- ✅ API calls work (after backend is deployed)

---

## 🚀 **Quick Commands for Local Test:**

### **Test build locally first:**

```bash
cd frontend
npm install
npm run build
```

If this works locally, then Vercel should work with proper configuration.

---

## 🔗 **Backend Deployment:**

### **For Backend on Vercel:**

Vercel is primarily for frontend. For backend, consider:

- **Render.com** (recommended for Node.js)
- **Railway.app**
- **Heroku**
- **Vercel Serverless Functions** (for API routes)

---

## 📋 **Checklist:**

- [ ] vercel.json created and pushed to GitHub
- [ ] Environment variables added in Vercel dashboard
- [ ] Root directory set to `frontend` (if using Method 3)
- [ ] Build command: `npm run build`
- [ ] Output directory: `build`
- [ ] Framework: Create React App
