@echo off
echo ===============================================
echo 🍕 PIZZAHUB MERN STACK APPLICATION
echo ===============================================
echo.
echo 🚀 Starting Backend Server...
echo 📍 Backend URL: http://localhost:5000
echo.
start "PizzaHub Backend" cmd /k "cd /d c:\movies\PizzaHub-Mern-Stack-Website-main\backend && node server.js"

timeout /t 3

echo 🍕 Starting Frontend Server...  
echo 📍 Frontend URL: http://localhost:3000
echo.
start "PizzaHub Frontend" cmd /k "cd /d c:\movies\PizzaHub-Mern-Stack-Website-main\frontend && npm start"

timeout /t 5

echo.
echo ✅ Both servers are starting!
echo 🌐 Open your browser and visit: http://localhost:3000
echo.
echo 🧪 Test Credentials:
echo 📧 Email: test@pizzahub.com
echo 🔑 Password: password123
echo.
pause
