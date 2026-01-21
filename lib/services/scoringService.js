import { chains } from '../data/chains.js';

/**
 * Calculate weighted score for a chain based on user priorities
 */
function calculateWeightedScore(chain, priorities) {
  const dimensions = ['fees', 'speed', 'reliability', 'regulatory', 'liquidity', 'security'];
  let weightedScore = 0;

  for (const dimension of dimensions) {
    const baseScore = chain.baseScores[dimension];
    const priorityWeight = priorities[dimension] || 1;
    weightedScore += baseScore * priorityWeight;
  }

  return weightedScore;
}

/**
 * Calculate average region multiplier for selected regions
 */
function calculateRegionMultiplier(chain, selectedRegions) {
  if (!selectedRegions || selectedRegions.length === 0) {
    return 1.0;
  }

  const multipliers = selectedRegions.map(region => {
    return chain.regionMultipliers[region] || 1.0;
  });

  const sum = multipliers.reduce((acc, val) => acc + val, 0);
  return sum / multipliers.length;
}

/**
 * Get stablecoin multiplier
 */
function getStablecoinMultiplier(chain, stablecoin) {
  if (!stablecoin || stablecoin === 'flexible') {
    return 1.0;
  }
  return chain.stablecoinSupport[stablecoin] || 1.0;
}

/**
 * Calculate final scores for all chains based on user parameters
 */
export function calculateScores(userParams) {
  const { useCase, priorities, region, stablecoin } = userParams;

  // Calculate raw scores for all chains
  const chainScores = chains.map(chain => {
    // Step 1: Calculate weighted score from base scores and priorities
    const weightedScore = calculateWeightedScore(chain, priorities);

    // Step 2: Apply use case multiplier
    const useCaseMultiplier = chain.useCaseMultipliers[useCase] || 1.0;
    let adjustedScore = weightedScore * useCaseMultiplier;

    // Step 3: Apply region multiplier (average if multiple regions)
    const regionMultiplier = calculateRegionMultiplier(chain, region);
    adjustedScore = adjustedScore * regionMultiplier;

    // Step 4: Apply stablecoin multiplier
    const stablecoinMultiplier = getStablecoinMultiplier(chain, stablecoin);
    adjustedScore = adjustedScore * stablecoinMultiplier;

    return {
      chain,
      rawScore: adjustedScore
    };
  });

  // Step 5: Find maximum raw score for normalization
  const maxScore = Math.max(...chainScores.map(cs => cs.rawScore));

  // Step 6: Normalize to 0-100 scale and sort
  const scoredChains = chainScores
    .map(({ chain, rawScore }) => ({
      chain,
      score: Math.round((rawScore / maxScore) * 100)
    }))
    .sort((a, b) => b.score - a.score);

  // Step 7: Assign ranks
  return scoredChains.map((item, index) => ({
    ...item.chain,
    rank: index + 1,
    score: item.score,
    isBestMatch: index === 0
  }));
}
