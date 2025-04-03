#!/bin/bash

# Deployment script for portfolio website
echo "Starting deployment process..."

# Navigate to project directory (modify this to your actual path)
cd "$(dirname "$0")"

# Pull latest changes from git
echo "Pulling latest changes from repository..."
git pull origin main

# Install dependencies
echo "Installing dependencies..."
npm ci --production

# Build the project
echo "Building the project..."
npm run build

# Reload the PM2 process
echo "Restarting application with PM2..."
pm2 reload portfolio

echo "Deployment completed successfully!"