# 🚨 Bad Gateway Error - Quick Fix Guide

## ❌ **Error: Bad Gateway (502)**
```
Bad Gateway
Request ID: 97631f29ad9dca57-PDX
This service is currently unavailable. Please try again in a few minutes.
```

**Meaning:** Your backend service has crashed or failed to start properly.

---

## 🔍 **Check Service Logs First:**

### **How to Check Logs:**
1. Go to **Render Dashboard**
2. Click on your **Backend Service**
3. Go to **"Logs" tab**
4. Look for error messages in the latest logs

---

## 🛠️ **Common Errors & Quick Fixes:**

### **Error 1: MongoDB Connection Failed**
```
Logs show: "MongoNetworkError" or "ENOTFOUND"
```
**Fix:** Check MONGO_URI environment variable
```
MONGO_URI=mongodb+srv://pizzahub:pizzahub123@pizzacluster.vo9paoo.mongodb.net/pizzadb?retryWrites=true&w=majority
```

### **Error 2: Missing Environment Variables**
```
Logs show: "Cannot read property of undefined"
```
**Fix:** Add all required environment variables:
```
NODE_ENV=production
PORT=5000
MONGO_URI=[your-mongodb-uri]
JWT_SECRET=pizzahub-super-secret-jwt-key-for-production-2024
```

### **Error 3: Port Not Listening**
```
Logs show: "EADDRINUSE" or no port listening message
```
**Fix:** Ensure PORT environment variable is set to 5000

### **Error 4: Build Failed**
```
Logs show: "npm install failed" or "Module not found"
```
**Fix:** Check build command:
```
Build Command: cd backend && npm install
Start Command: cd backend && npm start
```

### **Error 5: Package.json Issues**
```
Logs show: "Cannot find module" or "npm ERR!"
```
**Fix:** Verify package.json has all dependencies

---

## ⚡ **Quick Fix Steps:**

### **Step 1: Verify Environment Variables**
Go to Render Dashboard → Backend Service → Environment tab

**Required Variables:**
```
NODE_ENV = production
PORT = 5000
MONGO_URI = mongodb+srv://pizzahub:pizzahub123@pizzacluster.vo9paoo.mongodb.net/pizzadb?retryWrites=true&w=majority
JWT_SECRET = pizzahub-super-secret-jwt-key-for-production-2024
RAZORPAY_KEY_ID = rzp_test_1234567890abcd
RAZORPAY_KEY_SECRET = 1234567890abcd1234567890abcd12
EMAIL_USER = pizzahub.service@gmail.com
EMAIL_PASS = pizzahub123
```

### **Step 2: Check Build/Start Commands**
```
Build Command: cd backend && npm install
Start Command: cd backend && npm start
```

### **Step 3: Manual Redeploy**
1. Go to Render Dashboard
2. Click on Backend Service
3. Click **"Manual Deploy"** button
4. Select latest commit
5. Click **"Deploy"**

### **Step 4: Wait and Test**
1. Wait for deployment to complete (5-10 minutes)
2. Check logs for success messages
3. Test URL: `https://your-backend-name.onrender.com`
4. Should show: "API is running"

---

## 🔍 **Debugging Process:**

### **If Still Getting Bad Gateway:**

1. **Check Service Status:**
   - Service should show "Live" (green)
   - If showing "Build Failed" or "Deploy Failed", check logs

2. **Test MongoDB Connection:**
   - Make sure MongoDB Atlas cluster is running
   - Check database user permissions
   - Verify network access (allow all IPs: 0.0.0.0/0)

3. **Verify GitHub Repository:**
   - All files committed and pushed
   - Render pulls from GitHub, so code must be there

4. **Try Different Region:**
   - Sometimes specific Render regions have issues
   - Try deploying to different region

---

## ✅ **Success Indicators:**

### **Working Backend:**
- Service status shows **"Live"** (green)
- Logs show: **"Server is running on port 5000"**
- Logs show: **"MongoDB connected successfully"**
- URL responds with: **"API is running"**

### **Working Frontend (after backend is fixed):**
- Update REACT_APP_API_URL with actual backend URL
- Redeploy frontend service
- Website should load properly

---

## 🚨 **Emergency Backup Plan:**

### **If Still Not Working:**

1. **Create New Service:**
   - Sometimes easier than debugging
   - Use same GitHub repository
   - Fresh environment variables

2. **Use Different MongoDB:**
   - Create new MongoDB Atlas cluster
   - Update MONGO_URI

3. **Check Render Status:**
   - Visit: status.render.com
   - Check if Render itself has issues

4. **Local Testing:**
   - Test locally first: `npm start` in backend
   - Make sure code works locally before deploying
