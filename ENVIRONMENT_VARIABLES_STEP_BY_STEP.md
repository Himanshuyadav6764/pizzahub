# 🔑 Render Environment Variables - Step by Step Guide

## 🎯 **How to Add Environment Variables in Render Dashboard:**

### **Step-by-Step Process:**
1. **Login** to Render.com
2. **Select your service** (Backend or Frontend)
3. **Click "Environment" tab**
4. **Click "Add Environment Variable" button**
5. **Enter Name and Value** (see tables below)
6. **Click "Save Changes"**
7. **Repeat** for all variables
8. **Redeploy** the service

---

## 🔧 **Backend Service Environment Variables:**

### **Copy these EXACT values:**

```
Name: NODE_ENV
Value: production

Name: PORT
Value: 5000

Name: MONGO_URI
Value: mongodb+srv://pizzahub:pizzahub123@pizzacluster.vo9paoo.mongodb.net/pizzadb?retryWrites=true&w=majority

Name: JWT_SECRET
Value: pizzahub-super-secret-jwt-key-for-production-2024

Name: RAZORPAY_KEY_ID
Value: rzp_test_1234567890abcd

Name: RAZORPAY_KEY_SECRET
Value: 1234567890abcd1234567890abcd12

Name: EMAIL_USER
Value: pizzahub.service@gmail.com

Name: EMAIL_PASS
Value: pizzahub123

Name: FRONTEND_URL
Value: https://pizzahub-frontend.onrender.com
```

---

## 🌐 **Frontend Service Environment Variables:**

### **Copy these EXACT values:**

```
Name: REACT_APP_API_URL
Value: https://pizzahub-backend.onrender.com/api

Name: REACT_APP_RAZORPAY_KEY_ID
Value: rzp_test_1234567890abcd

Name: REACT_APP_NAME
Value: PizzaHub

Name: REACT_APP_VERSION
Value: 1.0.0
```

---

## 📸 **Visual Guide:**

### **Render Dashboard Interface:**
```
┌─────────────────────────────────────┐
│ Environment Variables               │
├─────────────────────────────────────┤
│ [Add Environment Variable] Button   │ ← Click Here
├─────────────────────────────────────┤
│ Name: [NODE_ENV           ]         │ ← Enter Variable Name
│ Value: [production        ]         │ ← Enter Variable Value
│ [Save] [Cancel]                     │ ← Click Save
├─────────────────────────────────────┤
│ Name: [PORT               ]         │
│ Value: [5000              ]         │
│ [Save] [Cancel]                     │
└─────────────────────────────────────┘
```

---

## ⚠️ **Important Notes:**

### **Name Field:**
- Exact variable name (case-sensitive)
- No spaces around the name
- Copy exactly as shown in tables

### **Value Field:**
- Complete value including URLs, numbers, strings
- No quotes needed around strings
- Copy exactly as shown in tables

### **Common Mistakes:**
- ❌ Adding spaces around = sign
- ❌ Adding quotes around values
- ❌ Typos in variable names
- ❌ Wrong case (NODE_env instead of NODE_ENV)

---

## ✅ **Verification Steps:**

### **After Adding All Variables:**
1. **Check Environment tab** - All variables should be listed
2. **Trigger redeploy** - Changes take effect after deployment
3. **Check service logs** - Look for any environment-related errors
4. **Test functionality** - Verify that features work correctly

### **Backend Verification:**
- Visit: `https://your-backend-name.onrender.com`
- Should show: "API is running"

### **Frontend Verification:**
- Visit: `https://your-frontend-name.onrender.com`
- Should show: Complete PizzaHub website
- Test login, pizza ordering, etc.

---

## 🔄 **Update Process:**

### **To Update Backend URL in Frontend:**
1. **Deploy backend first** and get actual URL
2. **Update REACT_APP_API_URL** in frontend environment
3. **Change value** from `https://pizzahub-backend.onrender.com/api` to `https://your-actual-backend-name.onrender.com/api`
4. **Redeploy frontend** service
