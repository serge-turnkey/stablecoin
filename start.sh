#!/bin/bash

# Blockchain Selector App - Startup Script

echo "🚀 Starting Blockchain Selector App..."
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed or not in PATH"
    echo ""
    echo "Please install Node.js:"
    echo "  1. Visit https://nodejs.org/"
    echo "  2. Download and install the LTS version"
    echo "  3. Open a NEW terminal window"
    echo "  4. Run this script again"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if we should use Vercel or Vite
if command -v vercel &> /dev/null; then
    echo "🎯 Starting with Vercel CLI (full-stack with API)..."
    echo "   Frontend + API will be available at http://localhost:3000"
    echo ""
    vercel dev
else
    echo "🎯 Starting with Vite (frontend only)..."
    echo "   Frontend will be available at http://localhost:5173"
    echo "   Note: API endpoints won't work without Vercel CLI"
    echo ""
    echo "   To enable full functionality, install Vercel CLI:"
    echo "   npm i -g vercel"
    echo ""
    npm run dev
fi
