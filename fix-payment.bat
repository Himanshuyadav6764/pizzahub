@echo off
title PizzaHub Payment Fix
echo ================================================
echo 🔥 FIXING PIZZAHUB PAYMENT ISSUE
echo ================================================
echo.

echo Killing any existing processes...
taskkill /F /IM node.exe >nul 2>&1

echo.
echo 🚀 Starting Backend Server...
cd /d "c:\movies\PizzaHub-Mern-Stack-Website-main\backend"
start "Backend Server" cmd /c "node server.js & pause"

timeout /t 3

echo.
echo 🍕 Starting Frontend Server...
cd /d "c:\movies\PizzaHub-Mern-Stack-Website-main\frontend"
start "Frontend Server" cmd /c "npm start & pause"

echo.
echo ✅ Both servers are starting!
echo 🌐 Main App: http://localhost:3000
echo ⚙️  Backend API: http://localhost:5000
echo 🧪 Payment Test: http://localhost:5000/api/payment/test
echo.
echo Wait for both servers to fully start, then test payment!
pause
