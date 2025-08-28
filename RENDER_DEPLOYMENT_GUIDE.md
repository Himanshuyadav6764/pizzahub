# 🚀 Render Deployment Guide - PizzaHub MERN App

## 🎯 Overview:

आपको दो अलग services बनानी होंगी Render पर:

## 1. 🔧 Backend Service (API Server)

### Service Settings:

- **Name:** `pizzahub-backend`
- **Type:** Web Service
- **Environment:** Node
- **Repository:** Connect your GitHub repo
- **Branch:** master
- **Root Directory:** Leave empty

### Build & Deploy Settings:

```bash
Build Command: cd backend && npm install
Start Command: cd backend && npm start
```

### Environment Variables:

```
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/pizzadb
JWT_SECRET=your-super-secret-jwt-key-here
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
PORT=5000
```

### Expected URL:

`https://pizzahub-backend.onrender.com`

---

## 2. 🌐 Frontend Service (Live Website)

### Service Settings:

- **Name:** `pizzahub-frontend`
- **Type:** Static Site
- **Environment:** Static Site
- **Repository:** Same GitHub repo
- **Branch:** master
- **Root Directory:** Leave empty

### Build Settings:

```bash
Build Command: cd frontend && npm install && npm run build
Publish Directory: frontend/build
```

### Environment Variables:

```
REACT_APP_API_URL=https://pizzahub-backend.onrender.com/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_your_key_id
```

### Expected URL:

`https://pizzahub-frontend.onrender.com`

---

## 🔗 URLs की जानकारी:

### 👥 **Users के लिए (Live Website):**

- **Main Website:** `https://pizzahub-frontend.onrender.com`
- यहाँ complete PizzaHub website दिखेगी
- Pizza ordering, login, registration, dashboard

### 🛠️ **Developers के लिए (API Testing):**

- **API Base:** `https://pizzahub-backend.onrender.com/api`
- यहाँ JSON responses दिखेंगे
- API endpoints test कर सकते हैं

### 🧪 **API Endpoints Test करने के लिए:**

- `GET https://pizzahub-backend.onrender.com/api/bases` - Get all bases
- `GET https://pizzahub-backend.onrender.com/api/cheeses` - Get all cheeses
- `POST https://pizzahub-backend.onrender.com/api/auth/login` - Login
- `POST https://pizzahub-backend.onrender.com/api/pizzas/add` - Add pizza

---

## ⚠️ Important Notes:

1. **Backend पहले deploy करें** - Frontend को backend URL की जरूरत होती है
2. **Environment variables** properly set करें
3. **CORS configuration** backend में already fixed है
4. **Free tier** पर services sleep mode में जा सकती हैं
5. **First request** slow हो सकती है (cold start)

---

## 🎉 Success Indicators:

### Backend Service ✅

- Health check: `https://pizzahub-backend.onrender.com/api/bases`
- Should return JSON array of pizza bases

### Frontend Service ✅

- Website loads: `https://pizzahub-frontend.onrender.com`
- Should show complete PizzaHub homepage
- Login/Registration should work
- Pizza ordering should work

---

## 🔍 Troubleshooting:

### If Backend shows "API is running":

- ✅ **This is CORRECT!** Backend सिर्फ API serve करता है
- Browser में visit करने पर यही message दिखना चाहिए

### If Frontend doesn't load:

- Check build logs for errors
- Verify environment variables
- Ensure backend URL is correct

### If Pizza ordering fails:

- Check backend logs
- Verify MongoDB connection
- Test API endpoints manually
