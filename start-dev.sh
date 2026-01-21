#!/bin/bash

# Start Vercel dev server in background (for API)
echo "Starting Vercel dev server on port 3000..."
vercel dev --listen 3000 > vercel.log 2>&1 &
VERCEL_PID=$!

# Wait a bit for Vercel to start
sleep 3

# Start Vite dev server (for frontend)
echo "Starting Vite dev server on port 5173..."
npm run dev

# Cleanup on exit
trap "kill $VERCEL_PID 2>/dev/null" EXIT
