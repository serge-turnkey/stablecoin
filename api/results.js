import { calculateScores } from '../lib/services/scoringService.js';
import { generateDescription } from '../lib/services/descriptionService.js';
import { selectKeyStrengths, selectConsiderations } from '../lib/services/contentService.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { useCase, priorities, region, stablecoin } = req.body;

    // Validate input
    if (!useCase || !priorities || !region || !stablecoin) {
      return res.status(400).json({ 
        error: 'Missing required parameters',
        required: ['useCase', 'priorities', 'region', 'stablecoin']
      });
    }

    // Validate priorities structure
    const requiredPriorities = ['fees', 'speed', 'reliability', 'regulatory', 'liquidity', 'security'];
    const hasAllPriorities = requiredPriorities.every(key => 
      priorities[key] !== undefined && priorities[key] !== null
    );

    if (!hasAllPriorities) {
      return res.status(400).json({ 
        error: 'Invalid priorities structure',
        required: requiredPriorities
      });
    }

    // Calculate scores for all chains
    const scoredChains = calculateScores({
      useCase: parseInt(useCase),
      priorities,
      region: Array.isArray(region) ? region : [region],
      stablecoin
    });

    // Generate descriptions and select content for each chain
    const results = scoredChains.map(chain => {
      const description = generateDescription(chain, chain.rank, priorities);
      const keyStrengths = selectKeyStrengths(chain, priorities, 4);
      const considerations = selectConsiderations(chain, priorities, 4);

      return {
        rank: chain.rank,
        name: chain.name,
        isBestMatch: chain.isBestMatch,
        score: chain.score,
        description,
        keyStrengths,
        considerations
      };
    });

    return res.status(200).json(results);
  } catch (error) {
    console.error('Error calculating results:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
