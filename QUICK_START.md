# Quick Start Guide

## To See the Full App Working:

### Option 1: Use the Startup Script (Easiest)

```bash
cd "/Users/serge/Documents/Cursor/Test App 2"
./start.sh
```

This script will:
- Check if Node.js is installed
- Install dependencies if needed
- Start the dev server

### Option 2: Manual Start

**Step 1: Install Node.js** (if not already installed)
- Visit https://nodejs.org/
- Download and install the LTS version
- **Important:** Open a NEW terminal window after installation

**Step 2: Install Dependencies**
```bash
cd "/Users/serge/Documents/Cursor/Test App 2"
npm install
```

**Step 3: Start the Dev Server**

**For Frontend Only:**
```bash
npm run dev
```
Then open: http://localhost:5173

**For Full Stack (Frontend + API):**
```bash
npm i -g vercel
vercel dev
```
Then open: http://localhost:3000

## Why the Standalone HTML Doesn't Work

The `index-standalone.html` file is just a static demo. The full app requires:
- React components that need to be transpiled
- API endpoints that need a server
- Dynamic data fetching
- The new EmailCapture step

All of this requires a development server to work properly.

## Troubleshooting

**"node: command not found"**
- Node.js isn't installed or not in your PATH
- Install from nodejs.org and restart your terminal

**"npm: command not found"**
- npm comes with Node.js, so if this fails, Node.js isn't properly installed

**Port already in use**
- Another app is using port 5173 or 3000
- Kill the process or use a different port
