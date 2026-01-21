# Debugging Empty Page Issue

If you're seeing an empty page at http://localhost:5173, follow these steps:

## Step 1: Check Browser Console

1. Open Developer Tools (F12 or Cmd+Option+I on Mac)
2. Go to the "Console" tab
3. Look for any red error messages
4. Share the error messages you see

## Step 2: Check Network Tab

1. In Developer Tools, go to "Network" tab
2. Refresh the page
3. Look for any failed requests (red entries)
4. Check if `/src/main.jsx` is loading

## Step 3: Common Issues

### Issue: "Cannot find module" or import errors
**Solution:** Run `npm install` again

### Issue: "Failed to fetch" or CORS errors
**Solution:** This is normal for API calls without backend - the frontend will still work

### Issue: White screen with no errors
**Solution:** Check if React is loading:
- Look for `<div id="root"></div>` in Elements tab
- Check if it has any content

## Step 4: Quick Test

Open browser console and type:
```javascript
document.getElementById('root')
```

If it returns `null`, the HTML isn't loading properly.
If it returns an element but it's empty, React isn't rendering.

## Step 5: Verify Server is Running

In your terminal where you ran `npm run dev`, you should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

If you don't see this, the server isn't running properly.
