# 🔧 Render Deployment Troubleshooting Guide

## ❌ **Error: "No open HTTP ports detected"**

### **Problem:**

```
==> No open HTTP ports detected on 0.0.0.0, continuing to scan...
```

This means your application is not properly listening on the expected port.

---

## 🔍 **Common Causes & Solutions:**

### **1. Environment Variables Missing**

**Check these in Render Dashboard:**

#### Backend Service Environment Variables:

```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://pizzahub:pizzahub123@pizzacluster.vo9paoo.mongodb.net/pizzadb?retryWrites=true&w=majority
JWT_SECRET=pizzahub-super-secret-jwt-key-for-production-2024
```

#### Frontend Service Environment Variables:

```
REACT_APP_API_URL=https://your-backend-name.onrender.com/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_1234567890abcd
```

---

### **2. Backend Issues:**

#### **MongoDB Connection Problem:**

- Invalid MONGO_URI
- Database credentials wrong
- Network access not configured

#### **Port Configuration:**

- Make sure PORT environment variable is set to 5000
- Backend should listen on process.env.PORT

#### **Build Command Wrong:**

```
✅ Correct: cd backend && npm install
❌ Wrong: npm install (missing cd backend)
```

#### **Start Command Wrong:**

```
✅ Correct: cd backend && npm start
❌ Wrong: npm start (missing cd backend)
```

---

### **3. Frontend Issues:**

#### **API URL Wrong:**

- Frontend can't connect to backend
- REACT_APP_API_URL not set correctly
- Backend URL doesn't match

#### **Build Command Wrong:**

```
✅ Correct: cd frontend && npm install && npm run build
❌ Wrong: npm install && npm run build (missing cd frontend)
```

---

## 🛠️ **Quick Fixes:**

### **For Backend Service:**

1. **Check Environment Variables:**

   - Go to Render Dashboard → Backend Service → Environment
   - Verify all variables are set correctly
   - PORT must be 5000
   - MONGO_URI must be valid

2. **Check Build/Start Commands:**

   ```
   Build Command: cd backend && npm install
   Start Command: cd backend && npm start
   ```

3. **Check Service Logs:**
   - Go to Render Dashboard → Backend Service → Logs
   - Look for error messages
   - Check if MongoDB connection is successful

### **For Frontend Service:**

1. **Update API URL:**

   - Get actual backend URL from Render
   - Update REACT_APP_API_URL environment variable
   - Example: `https://pizzahub-backend-xyz.onrender.com/api`

2. **Check Build Command:**
   ```
   Build Command: cd frontend && npm install && npm run build
   Publish Directory: frontend/build
   ```

---

## 🔍 **Debugging Steps:**

### **Step 1: Check Backend Logs**

1. Go to Render Dashboard
2. Click on Backend Service
3. Go to "Logs" tab
4. Look for error messages like:
   - MongoDB connection failed
   - Port binding errors
   - Missing environment variables

### **Step 2: Test Backend URL**

1. Wait for backend to deploy successfully
2. Visit: `https://your-backend-name.onrender.com`
3. Should show: "API is running"
4. If not working, check logs for errors

### **Step 3: Update Frontend**

1. Copy actual backend URL
2. Update REACT_APP_API_URL in frontend environment
3. Redeploy frontend service

---

## ✅ **Success Indicators:**

### **Backend Working:**

- No "No open HTTP ports" errors
- Service shows "Live" status
- URL shows "API is running" message
- Logs show "Server is running on port 5000"

### **Frontend Working:**

- Build completes successfully
- Website loads properly
- Can connect to backend APIs
- All features work (login, pizza ordering)

---

## 🚨 **If Still Not Working:**

### **Try These:**

1. **Redeploy Services:**

   - Trigger manual redeploy
   - Sometimes fixes deployment issues

2. **Check Repository:**

   - Make sure all files are committed to GitHub
   - Render pulls from GitHub repository

3. **Simplify First:**

   - Deploy backend first and test
   - Only deploy frontend after backend is working

4. **Contact Support:**
   - Check Render status page
   - Contact Render support if persistent issues
