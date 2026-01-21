# Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name it: `blockchain-selector-app` (or any name you prefer)
4. Make it **Public** or **Private** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Push Code to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
cd "/Users/serge/Documents/Cursor/Test App 2"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/blockchain-selector-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select your GitHub account and find your `blockchain-selector-app` repository
5. Click **"Import"**

### Step 4: Configure Environment Variables

**BEFORE clicking "Deploy", click "Environment Variables":**

Add this variable:
- **Name:** `VITE_ZAPIER_WEBHOOK_URL`
- **Value:** `https://hooks.zapier.com/hooks/catch/26138702/uqd6uh3/`
- **Environment:** Production, Preview, Development (select all)

(Optional - if you want to use direct Attio API as fallback):
- **Name:** `ATTIO_API_KEY`
- **Value:** `your_attio_api_key`
- **Environment:** Production, Preview, Development

- **Name:** `ATTIO_WORKSPACE_ID`
- **Value:** `your_attio_workspace_id`
- **Environment:** Production, Preview, Development

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 1-2 minutes)
3. You'll get a URL like: `https://blockchain-selector-app.vercel.app`

## Step 6: Test Your Live Site

1. Visit your Vercel URL
2. Go through the form
3. Submit an email
4. Check Zapier to confirm it received the submission

## Troubleshooting

If deployment fails:
- Check the build logs in Vercel
- Make sure all environment variables are set
- Verify `vercel.json` is in the root directory

## Updating Your Site

After making changes:
```bash
git add .
git commit -m "Your commit message"
git push
```

Vercel will automatically redeploy!
