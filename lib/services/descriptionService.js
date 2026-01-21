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
 * Get top contributing dimensions based on user priorities and chain scores
 */
function getTopContributingDimensions(chain, priorities, count = 3) {
  const dimensions = ['fees', 'speed', 'reliability', 'regulatory', 'liquidity', 'security'];
  
  // Calculate contribution score for each dimension
  const contributions = dimensions.map(dimension => {
    const baseScore = chain.baseScores[dimension];
    const priorityWeight = priorities[dimension] || 1;
    const contribution = baseScore * priorityWeight;
    return { dimension, contribution };
  });

  // Sort by contribution (descending) and take top N
  return contributions
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, count)
    .map(item => priorityLabels[item.dimension]);
}

/**
 * Get weakest dimensions based on user priorities and chain scores
 */
function getWeakestDimensions(chain, priorities, count = 3) {
  const dimensions = ['fees', 'speed', 'reliability', 'regulatory', 'liquidity', 'security'];
  
  // Calculate contribution score for each dimension
  const contributions = dimensions.map(dimension => {
    const baseScore = chain.baseScores[dimension];
    const priorityWeight = priorities[dimension] || 1;
    const contribution = baseScore * priorityWeight;
    return { dimension, contribution };
  });

  // Sort by contribution (ascending) and take bottom N
  return contributions
    .sort((a, b) => a.contribution - b.contribution)
    .slice(0, count)
    .map(item => priorityLabels[item.dimension]);
}

/**
 * Generate custom description for a chain based on its ranking and user priorities
 */
export function generateDescription(chain, rank, priorities) {
  if (rank <= 3) {
    // Top 3 chains: positive description
    const topDimensions = getTopContributingDimensions(chain, priorities, 3);
    const dimensionsList = topDimensions.join(', ');
    
    let rankText;
    if (rank === 1) {
      rankText = 'highest';
    } else if (rank === 2) {
      rankText = 'second';
    } else {
      rankText = 'third';
    }
    
    return `${chain.name} was ranked ${rankText} because it scored best under your selected priorities, with the strongest contribution from: ${dimensionsList}.`;
  } else {
    // Lower ranked: explain tradeoffs
    const weakestDimensions = getWeakestDimensions(chain, priorities, 3);
    const dimensionsList = weakestDimensions.join(', ');
    return `This option scored lower given your priorities, mainly due to tradeoffs across: ${dimensionsList}.`;
  }
}
