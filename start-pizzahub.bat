@echo off
title PizzaHub - Start All Servers
color 0A

echo.
echo  ██████╗ ██╗███████╗███████╗ █████╗     ██╗  ██╗██╗   ██╗██████╗ 
echo  ██╔══██╗██║╚══███╔╝╚══███╔╝██╔══██╗    ██║  ██║██║   ██║██╔══██╗
echo  ██████╔╝██║  ███╔╝   ███╔╝ ███████║    ███████║██║   ██║██████╔╝
echo  ██╔═══╝ ██║ ███╔╝   ███╔╝  ██╔══██║    ██╔══██║██║   ██║██╔══██╗
echo  ██║     ██║███████╗███████╗██║  ██║    ██║  ██║╚██████╔╝██████╔╝
echo  ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ 
echo.
echo  🍕 Starting PizzaHub MERN Application...
echo.

echo [1/3] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found! Please install Node.js first.
    pause
    exit /b 1
)
echo ✅ Node.js is installed

echo.
echo [2/3] Starting Backend Server (Port 5000)...
start "PizzaHub Backend" cmd /k "cd /d %~dp0backend && echo 🚀 Starting Backend Server... && node server.js"

echo.
echo [3/3] Waiting 3 seconds then starting Frontend...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server (Port 3000)...
start "PizzaHub Frontend" cmd /k "cd /d %~dp0frontend && echo 🎨 Starting Frontend Server... && npm start"

echo.
echo ✅ Both servers are starting!
echo.
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:5000
echo 👤 Test Login: test@pizzahub.com / password123
echo.
echo Press any key to exit...
pause >nul
