# 🚀 Complete Render Deployment Guide with Environment Variables

## 📋 **Render Dashboard Setup Steps:**

### 🔧 **Step 1: Backend Service Setup**

#### Service Configuration:
- **Service Type:** Web Service
- **Name:** `pizzahub-backend`
- **Environment:** Node
- **Build Command:** `cd backend && npm install`
- **Start Command:** `cd backend && npm start`

#### Environment Variables (Add in Render Dashboard):
```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://pizzahub:pizzahub123@pizzacluster.vo9paoo.mongodb.net/pizzadb?retryWrites=true&w=majority
JWT_SECRET=pizzahub-super-secret-jwt-key-for-production-2024
RAZORPAY_KEY_ID=rzp_test_1234567890abcd
RAZORPAY_KEY_SECRET=1234567890abcd1234567890abcd12
EMAIL_USER=pizzahub.service@gmail.com
EMAIL_PASS=pizzahub123
FRONTEND_URL=https://pizzahub-frontend.onrender.com
```

---

### 🌐 **Step 2: Frontend Service Setup**

#### Service Configuration:
- **Service Type:** Static Site
- **Name:** `pizzahub-frontend`
- **Build Command:** `cd frontend && npm install && npm run build`
- **Publish Directory:** `frontend/build`

#### Environment Variables (Add in Render Dashboard):
```
REACT_APP_API_URL=https://pizzahub-backend.onrender.com/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_1234567890abcd
REACT_APP_NAME=PizzaHub
REACT_APP_VERSION=1.0.0
```

---

## 📝 **How to Add Environment Variables in Render:**

### For Backend Service:
1. Go to Render Dashboard
2. Click on your backend service
3. Go to "Environment" tab
4. Click "Add Environment Variable"
5. Add each variable one by one:
   - **Key:** `NODE_ENV` → **Value:** `production`
   - **Key:** `PORT` → **Value:** `5000`
   - **Key:** `MONGO_URI` → **Value:** `mongodb+srv://pizzahub:pizzahub123@pizzacluster.vo9paoo.mongodb.net/pizzadb?retryWrites=true&w=majority`
   - **Key:** `JWT_SECRET` → **Value:** `pizzahub-super-secret-jwt-key-for-production-2024`
   - And so on...

### For Frontend Service:
1. Go to your frontend static site
2. Go to "Environment" tab  
3. Add variables:
   - **Key:** `REACT_APP_API_URL` → **Value:** `https://pizzahub-backend.onrender.com/api`
   - **Key:** `REACT_APP_RAZORPAY_KEY_ID` → **Value:** `rzp_test_1234567890abcd`

---

## 🔒 **Security Notes:**

### **Important - Change These Values:**
1. **JWT_SECRET:** Generate a strong random string
2. **RAZORPAY keys:** Use your actual Razorpay test/live keys
3. **EMAIL credentials:** Use your actual email service
4. **MONGO_URI:** Use your actual MongoDB connection string

### **Generate Strong JWT Secret:**
```bash
# Run this in terminal to generate a strong secret:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## ✅ **Deployment Checklist:**

### Before Deploying:
- [ ] Update MongoDB URI with your actual database
- [ ] Get real Razorpay keys from dashboard
- [ ] Set up email service (Gmail App Password)
- [ ] Generate strong JWT secret
- [ ] Update backend URL in frontend env

### After Backend Deploys:
- [ ] Copy actual backend URL
- [ ] Update `REACT_APP_API_URL` in frontend
- [ ] Redeploy frontend with correct API URL

### Testing:
- [ ] Backend URL shows "API is running"
- [ ] Frontend URL shows complete website
- [ ] Login/Register works
- [ ] Pizza ordering works
- [ ] Payment integration works

---

## 🎯 **Final URLs:**

**Backend API:** `https://pizzahub-backend.onrender.com`  
**Frontend Website:** `https://pizzahub-frontend.onrender.com`

Users will only use the Frontend URL for the complete PizzaHub experience!
