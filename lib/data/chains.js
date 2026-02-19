// Chain data with real-world base scores based on 2024-2025 metrics
export const chains = [
  {
    name: "Ethereum",
    baseScores: {
      fees: 25,        // High fees ($2-$50+), unpredictable during congestion
      speed: 30,       // Slow (15-30 TPS, 12s blocks, minutes to finality)
      reliability: 95, // Very high (mature, battle-tested, 500k+ validators)
      regulatory: 95,  // Highest (MiCA compliant, GENIUS Act, USDC native)
      liquidity: 100, // Highest (largest ecosystem, most DeFi, all stablecoins)
      security: 100   // Highest (500k-1M validators, most decentralized)
    },
    useCaseMultipliers: {
      1: 0.85,  // E-Commerce: High fees hurt
      2: 0.9,   // SaaS: Moderate fit
      3: 0.8,   // Remittance: Too expensive
      4: 0.85,  // Payroll: High fees problematic
      5: 1.15,  // DeFi: Best ecosystem
      6: 0.95   // Other: General purpose
    },
    regionMultipliers: {
      "north-america": 1.05,  // Strong US/EU regulatory clarity
      "europe": 1.05,         // MiCA compliant
      "latin-america": 0.95,
      "asia": 1.0,
      "africa": 0.9,
      "australia": 1.05,      // Strong regulatory framework
      "global": 1.0
    },
    stablecoinSupport: {
      "usdc": 1.1,    // Native USDC, most compliant
      "usdt": 1.0,    // Well-supported on Ethereum
      "dai": 1.05,    // Native DAI, MakerDAO protocol on Ethereum
      "usde": 1.0,    // Available on Ethereum (24 chains)
      "pyusd": 1.15,  // Native PYUSD on Ethereum (PayPal USD)
      "flexible": 1.0
    },
    keyStrengths: [
      "Highest security",
      "Most mature and battle-tested",
      "Largest DeFi ecosystem",
      "Best regulatory compliance",
      "Full stablecoin support",
      "Large validator set"
    ],
    considerations: [
      "High and unpredictable fees",
      "Slow transaction finality",
      "Not ideal for high-frequency",
      "Mainnet congestion affects UX"
    ]
  },
  {
    name: "Solana",
    baseScores: {
      fees: 95,        // Very low (~$0.001-$0.01), highly predictable
      speed: 95,       // Very fast (1000-3000 TPS, 400ms blocks, 5-8s finality)
      reliability: 70, // Moderate (has had outages, improving)
      regulatory: 75,  // Moderate-High (USDC growing, regulatory clarity improving)
      liquidity: 85,  // Strong (growing DeFi, USDC adoption)
      security: 70     // Moderate (1.4k validators, some centralization concerns)
    },
    useCaseMultipliers: {
      1: 1.15,  // E-Commerce: Excellent (fast, cheap)
      2: 1.1,   // SaaS: Great fit
      3: 1.05,  // Remittance: Good speed/cost
      4: 1.1,   // Payroll: Fast and cheap
      5: 1.0,   // DeFi: Growing ecosystem
      6: 1.05   // Other: General purpose
    },
    regionMultipliers: {
      "north-america": 1.0,
      "europe": 0.95,  // USDC compliance helps
      "latin-america": 1.0,
      "asia": 1.0,
      "africa": 0.95,
      "australia": 1.0,  // Good market for fast/cheap chains
      "global": 1.0
    },
    stablecoinSupport: {
      "usdc": 1.1,    // Native USDC on Solana, growing rapidly
      "usdt": 1.0,    // Well-supported on Solana
      "dai": 0.75,    // Not available on Solana (non-EVM)
      "usde": 1.0,    // Available on Solana (24 chains)
      "pyusd": 1.0,   // Available on Solana (May 2024)
      "flexible": 1.0
    },
    keyStrengths: [
      "Very fast finality",
      "Minimal fees",
      "Strong throughput",
      "Growing USDC adoption",
      "Excellent for high-frequency"
    ],
    considerations: [
      "Operational incident history",
      "Non-EVM architecture",
      "Validator centralization",
      "Ecosystem fit varies by stack"
    ]
  },
  {
    name: "Polygon",
    baseScores: {
      fees: 85,        // Low (~$0.01-$0.10), predictable
      speed: 80,       // Fast (hundreds-thousands TPS, ~5s finality)
      reliability: 80, // Good (fewer documented outages)
      regulatory: 75,  // Moderate (EVM-compatible, depends on stablecoin)
      liquidity: 80,   // Good (EVM compatibility, good DeFi)
      security: 65     // Moderate (100 validators, some centralization)
    },
    useCaseMultipliers: {
      1: 1.1,   // E-Commerce: Good balance
      2: 1.05,  // SaaS: Solid fit
      3: 1.0,   // Remittance: Decent
      4: 1.05,  // Payroll: Good
      5: 1.0,   // DeFi: Good ecosystem
      6: 1.0    // Other: Balanced
    },
    regionMultipliers: {
      "north-america": 1.0,
      "europe": 0.95,
      "latin-america": 1.0,
      "asia": 1.0,
      "africa": 0.95,
      "australia": 1.0,  // Good EVM compatibility
      "global": 1.0
    },
    stablecoinSupport: {
      "usdc": 1.0,    // Native USDC on Polygon PoS
      "usdt": 1.0,    // Well-supported on Polygon
      "dai": 0.85,    // Not native, limited support
      "usde": 0.9,    // Available on Polygon (24 chains)
      "pyusd": 0.85,  // Limited support
      "flexible": 1.0
    },
    keyStrengths: [
      "Low fees",
      "Fast transactions",
      "EVM compatibility",
      "Good DeFi ecosystem",
      "Roadmap targeting high TPS"
    ],
    considerations: [
      "Limited validator set",
      "Security trade-offs",
      "zkEVM lower than PoS"
    ]
  },
  {
    name: "Arbitrum",
    baseScores: {
      fees: 90,        // Very low (~$0.02-$1), predictable
      speed: 75,       // Fast (25-30 TPS, 1-2s blocks, but fraud proof delay)
      reliability: 75, // Moderate (multiple sequencer outages documented)
      regulatory: 90,  // High (Ethereum L2, inherits compliance)
      liquidity: 95,   // Excellent (Ethereum ecosystem access)
      security: 90     // High (inherits Ethereum security)
    },
    useCaseMultipliers: {
      1: 1.05,  // E-Commerce: Good
      2: 1.0,   // SaaS: Solid
      3: 0.95,  // Remittance: Fraud proof delay
      4: 1.0,   // Payroll: Good
      5: 1.1,   // DeFi: Excellent (largest L2 DeFi)
      6: 1.0    // Other: General
    },
    regionMultipliers: {
      "north-america": 1.0,
      "europe": 1.0,
      "latin-america": 0.95,
      "asia": 1.0,
      "africa": 0.95,
      "australia": 1.0,  // Strong regulatory environment
      "global": 1.0
    },
    stablecoinSupport: {
      "usdc": 1.05,   // Native USDC on Arbitrum, CCTP V2
      "usdt": 1.0,    // Well-supported on Arbitrum
      "dai": 1.05,    // Canonical bridged DAI on Arbitrum
      "usde": 1.0,    // Available on Arbitrum (24 chains)
      "pyusd": 1.05,  // Available on Arbitrum
      "flexible": 1.0
    },
    keyStrengths: [
      "Very low fees",
      "Ethereum security",
      "Largest layer 2 DeFi ecosystem",
      "Full EVM compatibility",
      "Strong compliance"
    ],
    considerations: [
      "Sequencer centralization",
      "Sequencer outages",
      "Fraud proof delays",
      "Layer 2 complexity"
    ]
  },
  {
    name: "Optimism",
    baseScores: {
      fees: 85,        // Low (~$0.05-$0.70), predictable
      speed: 80,       // Fast (100-130 TPS, seconds to confirm)
      reliability: 75, // Moderate (periodic stalls, unsafe head issues)
      regulatory: 90,  // High (Ethereum L2, inherits compliance)
      liquidity: 90,   // Excellent (Ethereum ecosystem)
      security: 90     // High (inherits Ethereum security)
    },
    useCaseMultipliers: {
      1: 1.05,  // E-Commerce: Good
      2: 1.0,   // SaaS: Solid
      3: 0.95,  // Remittance: Some delays
      4: 1.0,   // Payroll: Good
      5: 1.05,  // DeFi: Strong ecosystem
      6: 1.0    // Other: General
    },
    regionMultipliers: {
      "north-america": 1.0,
      "europe": 1.0,
      "latin-america": 0.95,
      "asia": 1.0,
      "africa": 0.95,
      "australia": 1.0,  // Good L2 market
      "global": 1.0
    },
    stablecoinSupport: {
      "usdc": 1.05,   // Native USDC on Optimism
      "usdt": 1.0,    // Well-supported on Optimism
      "dai": 1.0,     // Canonical bridged DAI on Optimism
      "usde": 1.0,    // Available on Optimism (24 chains)
      "pyusd": 0.95,  // Available on Optimism
      "flexible": 1.0
    },
    keyStrengths: [
      "Strong Ethereum alignment",
      "Lower fees than mainnet",
      "Growing app ecosystem",
      "Public goods funding model",
      "Good regulatory compliance"
    ],
    considerations: [
      "Layer 2 complexity",
      "Sequencer assumptions",
      "Periodic performance stalls",
      "App liquidity can be uneven"
    ]
  },
  {
    name: "Base",
    baseScores: {
      fees: 92,        // Very low (~$0.006-$0.02), highly predictable
      speed: 80,       // Fast (~85 TPS, 1-2s blocks)
      reliability: 80, // Good (few outages, short duration)
      regulatory: 90,  // High (Coinbase backing, Ethereum L2)
      liquidity: 85,   // Good (Coinbase integration, growing)
      security: 90     // High (inherits Ethereum security)
    },
    useCaseMultipliers: {
      1: 1.1,   // E-Commerce: Excellent (Coinbase integration)
      2: 1.05,  // SaaS: Great
      3: 1.0,   // Remittance: Good
      4: 1.05,  // Payroll: Great
      5: 1.0,   // DeFi: Growing
      6: 1.0    // Other: General
    },
    regionMultipliers: {
      "north-america": 1.1,  // Coinbase strong in US
      "europe": 1.0,
      "latin-america": 0.95,
      "asia": 0.95,
      "africa": 0.9,
      "australia": 1.05,  // Coinbase presence, good for consumer apps
      "global": 1.0
    },
    stablecoinSupport: {
      "usdc": 1.05,   // Native USDC on Base
      "usdt": 1.0,    // Available via USDT0/Superchain
      "dai": 0.85,    // Limited support
      "usde": 0.95,   // Available on Base
      "pyusd": 0.85,  // Limited support
      "flexible": 1.0
    },
    keyStrengths: [
      "Extremely low fees",
      "Coinbase integration and backing",
      "Fast confirmation times",
      "Ethereum security",
      "Consumer-friendly"
    ],
    considerations: [
      "Sequencer centralization",
      "Relatively new",
      "Layer 2 complexity",
      "Dependent on Coinbase"
    ]
  },
  {
    name: "BNB Smart Chain",
    baseScores: {
      fees: 70,        // Moderate (~$0.30-$0.40), predictable
      speed: 85,       // Fast (2000-2500 TPS, 3s blocks)
      reliability: 80, // Good
      regulatory: 60,  // Moderate (centralization concerns, Binance issues)
      liquidity: 85,   // Good (high volume, good DeFi)
      security: 50     // Lower (21-45 validators, high centralization)
    },
    useCaseMultipliers: {
      1: 1.0,   // E-Commerce: Good
      2: 0.95,  // SaaS: Moderate
      3: 1.0,   // Remittance: Good speed/cost
      4: 1.0,   // Payroll: Good
      5: 1.0,   // DeFi: Good ecosystem
      6: 1.0    // Other: General
    },
    regionMultipliers: {
      "north-america": 0.9,  // Regulatory concerns
      "europe": 0.85,        // Regulatory concerns
      "latin-america": 1.0,
      "asia": 1.05,          // Strong in Asia
      "africa": 1.0,
      "australia": 0.9,      // Regulatory concerns
      "global": 1.0
    },
    stablecoinSupport: {
      "usdc": 0.85,   // USDC not native on BNB (deprecated elsewhere)
      "usdt": 1.05,   // High USDT volume on BNB
      "dai": 0.85,    // Limited support on BNB
      "usde": 0.85,   // Limited support
      "pyusd": 0.85,  // Limited support
      "flexible": 1.0
    },
    keyStrengths: [
      "High throughput",
      "Lower fees",
      "EVM compatibility",
      "Good DeFi ecosystem",
      "Fast block times"
    ],
    considerations: [
      "High validator centralization",
      "Regulatory concerns",
      "Security trade-offs",
      "Limited decentralization"
    ]
  },
  {
    name: "Tron",
    baseScores: {
      fees: 95,        // Very low (~$0.01 or less), predictable
      speed: 90,       // Very fast (2000+ TPS, few seconds)
      reliability: 80, // Good
      regulatory: 50,  // Lower (less regulatory clarity, USDT focus)
      liquidity: 80,   // Strong (high USDT volume)
      security: 45     // Lower (27 validators, high centralization)
    },
    useCaseMultipliers: {
      1: 1.05,  // E-Commerce: Good speed/cost
      2: 1.0,   // SaaS: Moderate
      3: 1.1,   // Remittance: Excellent (USDT, low cost)
      4: 1.05,  // Payroll: Good
      5: 0.95,  // DeFi: Smaller ecosystem
      6: 1.0    // Other: General
    },
    regionMultipliers: {
      "north-america": 0.85,  // Regulatory concerns
      "europe": 0.8,          // Regulatory concerns
      "latin-america": 1.1,   // Strong USDT adoption
      "asia": 1.05,           // Strong adoption
      "africa": 1.05,         // Strong adoption
      "australia": 0.85,      // Regulatory concerns
      "global": 1.0
    },
    stablecoinSupport: {
      "usdc": 0.85,   // USDC deprecated on Tron (Feb 2024)
      "usdt": 1.15,   // Dominant USDT chain, highest volume
      "dai": 0.75,    // Not available on Tron
      "usde": 0.75,   // Not available on Tron
      "pyusd": 0.75,  // Not available on Tron
      "flexible": 1.0
    },
    keyStrengths: [
      "Extremely low fees",
      "Very fast transactions",
      "High USDT volume",
      "Good for remittances",
      "High throughput"
    ],
    considerations: [
      "High validator centralization",
      "Regulatory concerns",
      "Limited DeFi ecosystem",
      "Security trade-offs"
    ]
  },
  {
    name: "Avalanche",
    baseScores: {
      fees: 75,        // Low (~$0.10-$0.30), predictable
      speed: 80,       // Fast (tens TPS, 1-2s blocks, sub-second finality)
      reliability: 90, // Very good (robust consensus, handles failures well)
      regulatory: 75,  // Moderate
      liquidity: 75,   // Moderate (growing ecosystem)
      security: 80     // Good (robust consensus, less centralization than some)
    },
    useCaseMultipliers: {
      1: 1.0,   // E-Commerce: Good
      2: 1.0,   // SaaS: Good
      3: 1.0,   // Remittance: Good
      4: 1.0,   // Payroll: Good
      5: 1.05,  // DeFi: Growing
      6: 1.0    // Other: General
    },
    regionMultipliers: {
      "north-america": 1.0,
      "europe": 1.0,
      "latin-america": 0.95,
      "asia": 1.0,
      "africa": 0.95,
      "global": 1.0
    },
    stablecoinSupport: {
      "usdc": 1.0,    // Native USDC on Avalanche
      "usdt": 1.0,    // Well-supported on Avalanche
      "dai": 0.85,    // Not native, limited support
      "usde": 0.9,    // Available on Avalanche (24 chains)
      "pyusd": 0.85,  // Limited support
      "flexible": 1.0
    },
    keyStrengths: [
      "Robust consensus mechanism",
      "Fast finality (sub-second)",
      "Good reliability",
      "Subnet architecture for scaling",
      "Balanced performance"
    ],
    considerations: [
      "Smaller ecosystem",
      "Subnet complexity",
      "Moderate liquidity",
      "Less battle-tested than Ethereum"
    ]
  },
  {
    name: "Stellar",
    baseScores: {
      fees: 100,       // Extremely low (fractions of cent), highly predictable
      speed: 75,       // Moderate (200 TPS, 5s blocks, fast finality)
      reliability: 90, // Very good
      regulatory: 85,  // High (strong for remittances, compliant)
      liquidity: 85,   // Strong (remittance focus, exchange support, anchors)
      security: 75      // Good (decentralized, good consensus)
    },
    useCaseMultipliers: {
      1: 0.95,  // E-Commerce: Good but slower
      2: 0.9,   // SaaS: Moderate
      3: 1.2,   // Remittance: Excellent (designed for this)
      4: 1.0,   // Payroll: Good
      5: 0.85,  // DeFi: Limited
      6: 1.0    // Other: General
    },
    regionMultipliers: {
      "north-america": 1.0,
      "europe": 1.0,
      "latin-america": 1.1,   // Strong remittance corridors
      "asia": 1.05,
      "africa": 1.1,          // Strong remittance corridors
      "australia": 1.0,       // Good for remittance/payments
      "global": 1.0
    },
    stablecoinSupport: {
      "usdc": 1.1,    // Native USDC on Stellar, CCTP V2
      "usdt": 0.95,   // Available on Stellar
      "dai": 0.75,    // Not available on Stellar (non-EVM)
      "usde": 0.75,   // Not available on Stellar
      "pyusd": 0.95,  // Available on Stellar (Sept 2025)
      "flexible": 1.0
    },
    keyStrengths: [
      "Extremely low fees",
      "Designed for remittances",
      "Strong exchange adjacency",
      "Anchor network for fiat ramps",
      "Fast UX for consumer apps",
      "Regulatory compliance"
    ],
    considerations: [
      "Limited DeFi ecosystem",
      "Anchor coverage gaps",
      "Moderate throughput",
      "Less suitable for complex contracts"
    ]
  }
];
