#!/bin/bash

# Server Setup Script for Ubuntu/Debian

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Clone your project
git clone https://github.com/yourusername/pizzahub-project.git
cd pizzahub-project

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies and build
cd ../frontend
npm install
npm run build

# Copy built files to nginx
sudo cp -r build/* /var/www/html/

echo "✅ Server setup complete!"
echo "🔧 Next steps:"
echo "1. Configure environment variables"
echo "2. Setup Nginx reverse proxy"
echo "3. Setup SSL certificate"
echo "4. Start PM2 processes"
