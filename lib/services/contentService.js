/**
 * Get priority dimension labels
 */
const priorityLabels = {
  fees: 'Fees and predictability',
  speed: 'Speed and UX',
  reliability: 'Reliability under load',
  regulatory: 'Regulatory and compliance fit',
  liquidity: 'Liquidity and off-ramps',
  security: 'Security and decentralization'
};

/**
 * Score a strength/consideration based on how well it aligns with user priorities
 */
function scoreContentItem(item, chain, priorities) {
  // Simple keyword matching - check if item mentions high-priority dimensions
  const itemLower = item.toLowerCase();
  let score = 0;

  // Check each priority dimension
  for (const [dimension, label] of Object.entries(priorityLabels)) {
    const priorityWeight = priorities[dimension] || 1;
    const labelWords = label.toLowerCase().split(' ');
    
    // Check if any word from the priority label appears in the item
    for (const word of labelWords) {
      if (itemLower.includes(word) && word.length > 3) {
        score += priorityWeight;
        break;
      }
    }
  }

  // Also consider the chain's base scores in relevant dimensions
  if (itemLower.includes('fee') || itemLower.includes('cost') || itemLower.includes('cheap')) {
    score += priorities.fees * (chain.baseScores.fees / 100);
  }
  if (itemLower.includes('speed') || itemLower.includes('fast') || itemLower.includes('quick')) {
    score += priorities.speed * (chain.baseScores.speed / 100);
  }
  if (itemLower.includes('security') || itemLower.includes('decentral') || itemLower.includes('validator')) {
    score += priorities.security * (chain.baseScores.security / 100);
  }
  if (itemLower.includes('reliability') || itemLower.includes('uptime') || itemLower.includes('outage')) {
    score += priorities.reliability * (chain.baseScores.reliability / 100);
  }
  if (itemLower.includes('regulatory') || itemLower.includes('complian') || itemLower.includes('regulation')) {
    score += priorities.regulatory * (chain.baseScores.regulatory / 100);
  }
  if (itemLower.includes('liquidity') || itemLower.includes('exchange') || itemLower.includes('ramp')) {
    score += priorities.liquidity * (chain.baseScores.liquidity / 100);
  }

  return score;
}

/**
 * Select key strengths based on user priorities
 */
export function selectKeyStrengths(chain, priorities, count = 4) {
  if (!chain.keyStrengths || chain.keyStrengths.length === 0) {
    return [];
  }

  // Score each strength
  const scoredStrengths = chain.keyStrengths.map(strength => ({
    text: strength,
    score: scoreContentItem(strength, chain, priorities)
  }));

  // Sort by score (descending) and take top N
  return scoredStrengths
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(item => item.text);
}

/**
 * Select considerations based on user priorities
 */
export function selectConsiderations(chain, priorities, count = 4) {
  if (!chain.considerations || chain.considerations.length === 0) {
    return [];
  }

  // Score each consideration
  const scoredConsiderations = chain.considerations.map(consideration => ({
    text: consideration,
    score: scoreContentItem(consideration, chain, priorities)
  }));

  // Sort by score (descending) and take top N
  return scoredConsiderations
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(item => item.text);
}
