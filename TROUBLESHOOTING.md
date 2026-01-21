# Troubleshooting Empty Page

## If you see a completely empty/white page at http://localhost:5173:

### Step 1: Check Browser Console
1. Press **F12** (or **Cmd+Option+I** on Mac) to open Developer Tools
2. Click the **Console** tab
3. Look for **red error messages**
4. Copy and share any errors you see

### Step 2: Verify Server is Running
In your terminal, you should see:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

If you don't see this, the server isn't running. Restart it with:
```bash
npm run dev
```

### Step 3: Test with Simple Version
If the console shows errors, try testing with a simple version:

1. Edit `src/main.jsx`
2. Temporarily change:
   ```javascript
   import App from './App.jsx'
   ```
   to:
   ```javascript
   import App from './App.simple.jsx'
   ```
3. Save and refresh the browser
4. If the simple version works, the issue is in one of the components

### Step 4: Common Issues

**"Cannot find module" errors:**
- Run `npm install` again
- Delete `node_modules` and `package-lock.json`, then run `npm install`

**"Failed to resolve import" errors:**
- Check that all image files exist in `chains/` and `img/` directories
- Verify file paths are correct

**Network/CORS errors:**
- These are normal for API calls without backend running
- The frontend should still display, just API calls will fail

### Step 5: Verify Dependencies
```bash
npm list react react-dom
```

Should show versions installed. If not, run:
```bash
npm install react react-dom
```

## Still Not Working?

Share the exact error messages from the browser console, and I can help fix the specific issue!
