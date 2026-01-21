# Blockchain Selector App

A React application with Vercel serverless backend that helps users find the best blockchain for their use case based on custom priorities, regions, and stablecoin preferences.

## Features

- Multi-step form to collect user preferences (Use Case, Priorities, Region, Stablecoin)
- Email capture with Attio CRM integration
- Dynamic blockchain scoring algorithm based on real-world metrics
- Customized results for 10 major blockchains:
  - Ethereum, Tron, Solana, Polygon, Avalanche
  - Arbitrum, Optimism, Base, BNB Smart Chain, Stellar
- Personalized rankings, descriptions, strengths, and considerations

## Project Structure

```
├── api/                    # Vercel serverless functions
│   ├── results.js         # Calculate and return blockchain rankings
│   └── submit-email.js    # Submit email to Attio CRM
├── lib/                    # Shared backend code
│   ├── data/
│   │   └── chains.js      # Chain data with base scores and metadata
│   └── services/
│       ├── scoringService.js      # Scoring algorithm
│       ├── descriptionService.js  # Generate custom descriptions
│       ├── contentService.js      # Select strengths/considerations
│       └── attioService.js        # Attio CRM integration
├── src/                    # Frontend React app
│   ├── components/
│   │   ├── UseCase.jsx
│   │   ├── Priorities.jsx
│   │   ├── Region.jsx
│   │   ├── Stablecoin.jsx
│   │   ├── EmailCapture.jsx
│   │   └── Results.jsx
│   ├── App.jsx
│   └── main.jsx
├── chains/                 # Blockchain logos
├── vercel.json            # Vercel configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Install Dependencies

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root (copy from `.env.example`):

```env
# Attio CRM Configuration (for direct API integration - optional if using Zapier)
ATTIO_API_KEY=your_attio_api_key_here
ATTIO_WORKSPACE_ID=your_attio_workspace_id_here

# Frontend API URL (auto-detected in Vercel, set for local dev)
VITE_API_URL=http://localhost:3000/api

# Zapier Webhook URL for email submissions
# Get your webhook URL from Zapier: Create Zap → Webhooks by Zapier → Catch Hook
# Note: Use ZAPIER_WEBHOOK_URL for backend (Vercel serverless functions)
# VITE_ZAPIER_WEBHOOK_URL is for frontend direct calls (not recommended due to CORS)
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/
```

**Note**: The app uses Zapier webhook integration by default. If `VITE_ZAPIER_WEBHOOK_URL` is not set, it falls back to a default URL. You can get your Zapier webhook URL by:
1. Creating a Zap in Zapier
2. Using "Webhooks by Zapier" as the trigger
3. Selecting "Catch Hook"
4. Copying the generated webhook URL

### Local Development

**Option 1: Vercel CLI (Recommended for full-stack testing)**

```bash
# Install Vercel CLI globally
npm i -g vercel

# Run local development server (simulates Vercel environment)
vercel dev
```

- Frontend runs on `http://localhost:3000`
- API functions available at `http://localhost:3000/api/*`
- Automatically uses environment variables from `.env.local`

**Option 2: Vite Dev Server (Frontend only)**

```bash
npm run dev
```

- Frontend runs on `http://localhost:5173`
- API calls will fail unless proxied or using production API URL
- Good for frontend-only development

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Deployment to Vercel

### 1. Pre-Deployment Setup

- Ensure all files are committed to your Git repository
- Verify `vercel.json` is configured correctly
- Test locally with `vercel dev`

### 2. Deploy to Vercel

**Via Vercel Dashboard:**
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect the Vite framework
3. Set environment variables in Vercel dashboard:
   - `ATTIO_API_KEY`
   - `ATTIO_WORKSPACE_ID`
   - `VITE_API_URL` (optional - auto-detected)

**Via Vercel CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### 3. Environment Variables in Vercel

Set these in the Vercel dashboard under Project Settings → Environment Variables:

- `ATTIO_API_KEY` - Your Attio CRM API key (optional if using Zapier)
- `ATTIO_WORKSPACE_ID` - Your Attio workspace identifier (optional if using Zapier)
- `VITE_API_URL` - Can be auto-detected (same domain as frontend)
- `VITE_ZAPIER_WEBHOOK_URL` - Your Zapier webhook URL for email submissions

## API Endpoints

### POST `/api/results`

Calculate blockchain rankings based on user preferences.

**Request Body:**
```json
{
  "useCase": 1,
  "priorities": {
    "fees": 5,
    "speed": 5,
    "reliability": 3,
    "regulatory": 2,
    "liquidity": 4,
    "security": 3
  },
  "region": ["north-america"],
  "stablecoin": "usdc"
}
```

**Response:**
```json
[
  {
    "rank": 1,
    "name": "Solana",
    "isBestMatch": true,
    "score": 98,
    "description": "We ranked Solana highest because...",
    "keyStrengths": ["Very fast finality", "Minimal fees", ...],
    "considerations": ["Operational incident history", ...]
  },
  ...
]
```

### POST `/api/submit-email`

Submit user email and form data to Attio CRM.

**Request Body:**
```json
{
  "email": "user@example.com",
  "formData": {
    "useCase": 1,
    "priorities": {...},
    "region": ["north-america"],
    "stablecoin": "usdc"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Email submitted successfully"
}
```

## Scoring System

The scoring algorithm uses a weighted, multi-factor approach:

1. **Base Scores**: Each chain has scores (0-100) for 6 dimensions:
   - Fees and predictability
   - Speed and UX
   - Reliability under load
   - Regulatory and compliance fit
   - Liquidity and off-ramps
   - Security and decentralization

2. **Priority Weighting**: User priorities (1-5) multiply base scores

3. **Use Case Multiplier**: Adjusts scores based on selected use case

4. **Region Multiplier**: Adjusts scores based on selected regions

5. **Stablecoin Multiplier**: Boosts chains that support selected stablecoin well

6. **Normalization**: All scores normalized to 0-100 scale

7. **Ranking**: Chains sorted by final score

## Email Submission Integration

The app supports two methods for capturing email leads:

### Option 1: Zapier Webhook (Recommended - No Code)

The app sends email addresses directly to a Zapier webhook, which can then create/update contacts in Attio CRM:

1. **Setup Zapier Zap**:
   - Trigger: "Webhooks by Zapier" → "Catch Hook"
   - Action: "Attio" → "Create or Update Record"
   - Map email field from webhook to Attio

2. **Configure Webhook URL**:
   - Set `VITE_ZAPIER_WEBHOOK_URL` environment variable with your Zapier webhook URL
   - Or update the default URL in `src/components/EmailCapture.jsx`

3. **Benefits**:
   - No backend code required
   - Visual field mapping in Zapier
   - Easy to modify without code changes
   - Automatic deduplication via Zapier

### Option 2: Direct Attio API (Legacy)

The app can also integrate directly with Attio CRM via the API:

- Creates/updates contacts with email and form data
- Stores use case, priorities, regions, and stablecoin preferences
- Handles errors gracefully (continues even if Attio is unavailable)

**Note**: For direct API integration, you'll need to configure the Attio API endpoint and field mappings in `lib/services/attioService.js` based on your Attio workspace schema.

## Technologies

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Vercel Serverless Functions (Node.js)
- **CRM**: Attio API
- **Deployment**: Vercel

## License

Private project
