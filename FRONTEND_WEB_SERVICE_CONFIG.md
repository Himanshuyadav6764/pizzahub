# 🌐 Frontend as Web Service Configuration

## 🔧 **If you want to deploy Frontend as Web Service:**

### **Service Settings:**
```
Service Type: Web Service (NOT Static Site)
Name: pizzahub-frontend
Environment: Node
Repository: your-github-repo
Branch: master
```

### **Build & Start Commands:**
```
Build Command: cd frontend && npm install
Start Command: cd frontend && npm start
```

### **Environment Variables:**
```
PORT=3000
REACT_APP_API_URL=https://pizzahub-backend.onrender.com/api
REACT_APP_RAZORPAY_KEY_ID=rzp_test_1234567890abcd
REACT_APP_NAME=PizzaHub
REACT_APP_VERSION=1.0.0
```

---

## ⚡ **Web Service vs Static Site Comparison:**

### **🌐 Web Service (with Start Command):**
```
✅ Pros:
- Runs React development server
- Hot reload capabilities
- Real-time updates
- Environment variables work normally

❌ Cons:
- Uses more resources (costs more)
- Slower than static files
- Development server in production
```

### **📁 Static Site (Recommended):**
```
✅ Pros:
- Faster loading
- Optimized production build
- Lower resource usage (cheaper)
- Better performance
- CDN caching

❌ Cons:
- No hot reload
- Build step required
```

---

## 🎯 **For Production - Both Configurations:**

### **Configuration A: Web Service**
```
Service Type: Web Service
Build Command: cd frontend && npm install
Start Command: cd frontend && npm start
Environment Variables:
  PORT=3000
  REACT_APP_API_URL=https://pizzahub-backend.onrender.com/api
  REACT_APP_RAZORPAY_KEY_ID=rzp_test_1234567890abcd
```

### **Configuration B: Static Site (Better)**
```
Service Type: Static Site  
Build Command: cd frontend && npm install && npm run build
Publish Directory: frontend/build
Environment Variables:
  REACT_APP_API_URL=https://pizzahub-backend.onrender.com/api
  REACT_APP_RAZORPAY_KEY_ID=rzp_test_1234567890abcd
```

---

## 🔥 **My Recommendation:**

**Use Static Site** for better performance and cost efficiency, but if you specifically need Web Service, use the start command configuration above.

**Start Command for Web Service:** `cd frontend && npm start`
