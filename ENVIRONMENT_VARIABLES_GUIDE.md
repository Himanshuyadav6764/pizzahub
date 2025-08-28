# 🔑 Environment Variables Setup Instructions

## 📋 **Copy-Paste Ready Environment Variables**

### 🔧 **Backend Environment Variables**
Copy these exact values to Render Dashboard → Backend Service → Environment tab:

```
NODE_ENV
production

PORT  
5000

MONGO_URI
mongodb+srv://pizzahub:pizzahub123@pizzacluster.vo9paoo.mongodb.net/pizzadb?retryWrites=true&w=majority

JWT_SECRET
pizzahub-super-secret-jwt-key-for-production-2024

RAZORPAY_KEY_ID
rzp_test_1234567890abcd

RAZORPAY_KEY_SECRET  
1234567890abcd1234567890abcd12

EMAIL_USER
pizzahub.service@gmail.com

EMAIL_PASS
pizzahub123

FRONTEND_URL
https://pizzahub-frontend.onrender.com
```

---

### 🌐 **Frontend Environment Variables**  
Copy these exact values to Render Dashboard → Frontend Service → Environment tab:

```
REACT_APP_API_URL
https://pizzahub-backend.onrender.com/api

REACT_APP_RAZORPAY_KEY_ID
rzp_test_1234567890abcd

REACT_APP_NAME
PizzaHub

REACT_APP_VERSION
1.0.0
```

---

## 🎯 **How to Add in Render Dashboard:**

### Step-by-Step Process:

1. **Login to Render.com**
2. **Go to your service** (Backend or Frontend)
3. **Click "Environment" tab**
4. **Click "Add Environment Variable"**
5. **Enter Key and Value** (from above list)
6. **Click "Save"**
7. **Repeat for all variables**
8. **Deploy/Redeploy** the service

### Visual Guide:
```
Render Dashboard
├── Your Service Name
├── Environment Tab ← Click Here
├── Add Environment Variable ← Click Here  
├── Key: NODE_ENV | Value: production ← Enter These
└── Save Changes ← Click Here
```

---

## ⚡ **Quick Copy Commands:**

### For Backend (copy one by one):
- `NODE_ENV` = `production`
- `PORT` = `5000`  
- `MONGO_URI` = `mongodb+srv://pizzahub:pizzahub123@pizzacluster.vo9paoo.mongodb.net/pizzadb?retryWrites=true&w=majority`
- `JWT_SECRET` = `pizzahub-super-secret-jwt-key-for-production-2024`
- `RAZORPAY_KEY_ID` = `rzp_test_1234567890abcd`
- `RAZORPAY_KEY_SECRET` = `1234567890abcd1234567890abcd12`
- `EMAIL_USER` = `pizzahub.service@gmail.com`
- `EMAIL_PASS` = `pizzahub123`
- `FRONTEND_URL` = `https://pizzahub-frontend.onrender.com`

### For Frontend (copy one by one):
- `REACT_APP_API_URL` = `https://pizzahub-backend.onrender.com/api`
- `REACT_APP_RAZORPAY_KEY_ID` = `rzp_test_1234567890abcd`
- `REACT_APP_NAME` = `PizzaHub`  
- `REACT_APP_VERSION` = `1.0.0`

---

## 🔒 **Important Notes:**

1. **Backend First:** Deploy backend service first to get the actual URL
2. **Update Frontend:** Replace `pizzahub-backend` with your actual backend service name
3. **Case Sensitive:** Environment variable names are case sensitive
4. **No Spaces:** Don't add spaces around = sign
5. **Redeploy:** After adding env vars, trigger a redeploy

## ✅ **Verification:**

After deployment, test these URLs:
- **Backend:** `https://your-backend-name.onrender.com` → Should show "API is running"
- **Frontend:** `https://your-frontend-name.onrender.com` → Should show PizzaHub website
