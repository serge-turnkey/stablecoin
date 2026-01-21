# How to Check Browser Console for Errors

## Steps:

1. **Open Developer Tools:**
   - **Mac:** Press `Cmd + Option + I`
   - **Windows/Linux:** Press `F12`
   - Or right-click on the page → "Inspect" or "Inspect Element"

2. **Go to Console Tab:**
   - Click on the "Console" tab in Developer Tools

3. **Look for Red Errors:**
   - Any red text indicates an error
   - Common errors you might see:
     - `Failed to resolve module`
     - `Cannot find module`
     - `Unexpected token`
     - `ReferenceError`
     - `TypeError`

4. **Copy the Error:**
   - Right-click on the error message
   - Select "Copy" or "Copy message"
   - Share it with me

## What to Look For:

- **Red error messages** (these prevent the app from loading)
- **Yellow warnings** (these are usually okay, but worth noting)
- **Network errors** (check the Network tab if console is empty)

## Quick Test:

In the browser console, type this and press Enter:
```javascript
document.getElementById('root')
```

- If it returns `null` → HTML isn't loading
- If it returns an element → React should be rendering there
- If the element is empty → React isn't rendering (check for JS errors)
