# Installing Node.js on macOS

## Option 1: Direct Download (Easiest)

1. **Visit:** https://nodejs.org/
2. **Download:** Click the "LTS" (Long Term Support) button - this will download the installer
3. **Install:** 
   - Open the downloaded `.pkg` file
   - Follow the installation wizard
   - Accept the defaults
4. **Verify:** Open a NEW terminal window and run:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers (e.g., `v20.11.0` and `10.2.4`)

## Option 2: Using Homebrew (If you have it)

If you have Homebrew installed, run:
```bash
brew install node
```

Then verify:
```bash
node --version
npm --version
```

## After Installation

**IMPORTANT:** You MUST open a NEW terminal window after installing Node.js for the changes to take effect.

Then run:
```bash
cd "/Users/serge/Documents/Cursor/Test App 2"
npm install
npm run dev
```

## Troubleshooting

**"Still says command not found"**
- Make sure you opened a NEW terminal window (don't use the old one)
- Try restarting your terminal app completely
- Check if Node.js is installed: `which node` (should show a path like `/usr/local/bin/node`)

**"Permission denied" errors**
- You may need to run: `sudo npm install` (not recommended, but works)
- Better: Fix npm permissions: https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally
