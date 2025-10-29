#!/bin/bash

# Test Deployment Script
# This script simulates the GitHub Actions deployment workflow locally

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Portfolio Deployment Test ===${NC}\n"

# Step 1: Install dependencies
echo -e "${GREEN}[1/5] Installing dependencies...${NC}"
npm ci
echo ""

# Step 2: Build project
echo -e "${GREEN}[2/5] Building project...${NC}"
npm run build
echo ""

# Step 3: Check if standalone build exists
if [ ! -d ".next/standalone" ]; then
    echo -e "${RED}Error: .next/standalone directory not found!${NC}"
    echo "Make sure next.config.js has 'output: standalone' configured."
    exit 1
fi

# Step 4: Prepare deployment package
echo -e "${GREEN}[3/5] Preparing deployment package...${NC}"
echo "Creating deployment package..."

# Clean up previous test artifacts
rm -rf deploy-package
rm -f portfolio-build.tar.gz

# Copy standalone build output
mkdir -p deploy-package
cp -r .next/standalone/. deploy-package/

# Copy static files to standalone build
if [ -d ".next/static" ]; then
    echo "Copying static files..."
    cp -r .next/static deploy-package/.next/static
else
    echo -e "${RED}Warning: .next/static not found${NC}"
fi

# Copy public files
if [ -d "public" ]; then
    echo "Copying public files..."
    cp -r public deploy-package/public
else
    echo -e "${RED}Warning: public directory not found${NC}"
fi

# Copy PM2 ecosystem config
if [ -f "ecosystem.config.js" ]; then
    echo "Copying PM2 config..."
    cp ecosystem.config.js deploy-package/
else
    echo -e "${RED}Warning: ecosystem.config.js not found${NC}"
fi

# Create tarball
echo "Creating tarball..."
tar -czf portfolio-build.tar.gz -C deploy-package .
echo ""

# Step 5: Verify package contents
echo -e "${GREEN}[4/5] Verifying deployment package...${NC}"
echo "Package size: $(du -h portfolio-build.tar.gz | cut -f1)"
echo ""
echo "Package contents:"
tar -tzf portfolio-build.tar.gz | head -20
echo "... (showing first 20 files)"
echo ""

# Step 6: Test extraction
echo -e "${GREEN}[5/5] Testing package extraction...${NC}"
TEST_DIR="test-deploy"
rm -rf $TEST_DIR
mkdir -p $TEST_DIR
tar -xzf portfolio-build.tar.gz -C $TEST_DIR

# Verify critical files
echo "Checking critical files..."
ERRORS=0

if [ ! -f "$TEST_DIR/server.js" ]; then
    echo -e "${RED}✗ server.js not found in standalone build${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ server.js found${NC}"
fi

if [ ! -f "$TEST_DIR/ecosystem.config.js" ]; then
    echo -e "${RED}✗ ecosystem.config.js not found${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ ecosystem.config.js found${NC}"
fi

if [ ! -d "$TEST_DIR/.next/static" ]; then
    echo -e "${RED}✗ .next/static directory not found${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ .next/static directory found${NC}"
fi

if [ ! -d "$TEST_DIR/public" ]; then
    echo -e "${RED}✗ public directory not found${NC}"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✓ public directory found${NC}"
fi

# Check PM2 config
if [ -f "$TEST_DIR/ecosystem.config.js" ]; then
    if grep -q "server.js" "$TEST_DIR/ecosystem.config.js"; then
        echo -e "${GREEN}✓ PM2 config points to server.js${NC}"
    else
        echo -e "${RED}✗ PM2 config doesn't reference server.js${NC}"
        ERRORS=$((ERRORS + 1))
    fi
fi

echo ""

# Summary
echo -e "${BLUE}=== Deployment Test Summary ===${NC}"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "Deployment package is ready: portfolio-build.tar.gz"
    echo ""
    echo "To test locally:"
    echo "  1. cd $TEST_DIR"
    echo "  2. Create .env file with EMAIL_* variables"
    echo "  3. pm2 start ecosystem.config.js"
    echo ""
    echo "To clean up test artifacts:"
    echo "  rm -rf deploy-package $TEST_DIR portfolio-build.tar.gz"
else
    echo -e "${RED}✗ Found $ERRORS error(s)${NC}"
    echo "Please fix the issues before deploying."
    exit 1
fi
