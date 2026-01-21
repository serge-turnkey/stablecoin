import { useState, useEffect } from 'react'
import arrowLeftIcon from '../img/arrow-left.svg'
import checkIcon from '../img/check-18.svg'
import minusIcon from '../img/minus-18.svg'
import refreshIcon from '../img/refresh.svg'
import solanaLogo from '../../chains/solana.png'
import arbitrumLogo from '../../chains/arbitrum.png'
import optimismLogo from '../../chains/optimism.png'
import stellarLogo from '../../chains/stellar.png'
import ethereumLogo from '../../chains/ethereum.png'
import tronLogo from '../../chains/tron.png'
import polygonLogo from '../../chains/polygon.png'
import avalancheLogo from '../../chains/avalanche.png'
import baseLogo from '../../chains/base.png'
import bnbLogo from '../../chains/bnb.png'
import { chains } from '../../lib/data/chains.js'
import { calculateScores } from '../../lib/services/scoringService.js'
import { generateDescription } from '../../lib/services/descriptionService.js'
import { selectKeyStrengths, selectConsiderations } from '../../lib/services/contentService.js'

// Blockchain logo mapping
const blockchainLogos = {
  'Ethereum': ethereumLogo,
  'Tron': tronLogo,
  'Solana': solanaLogo,
  'Polygon': polygonLogo,
  'Avalanche': avalancheLogo,
  'Arbitrum': arbitrumLogo,
  'Optimism': optimismLogo,
  'Base': baseLogo,
  'BNB Smart Chain': bnbLogo,
  'Stellar': stellarLogo,
}

const API_URL = import.meta.env.VITE_API_URL || '/api';

/**
 * Generate mock results when API is not available
 * Uses the actual scoring, description, and content services for accurate results
 */
function generateMockResults(formData) {
  // Use the real scoring service
  const scoredChains = calculateScores({
    useCase: formData.useCase,
    priorities: formData.priorities || {},
    region: formData.region || [],
    stablecoin: formData.stablecoin
  });
  
  // Generate descriptions and select content using real services
  return scoredChains.map((chain) => {
    const description = generateDescription(chain, chain.rank, formData.priorities || {});
    const keyStrengths = selectKeyStrengths(chain, formData.priorities || {}, 3);
    const considerations = selectConsiderations(chain, formData.priorities || {}, 3);
    
    return {
      rank: chain.rank,
      name: chain.name,
      score: chain.score,
      isBestMatch: chain.isBestMatch,
      description,
      keyStrengths,
      considerations
    };
  });
}

export default function Results({ onBack, formData, onStartOver }) {
  const [blockchainResults, setBlockchainResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${API_URL}/results`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            useCase: formData.useCase,
            priorities: formData.priorities,
            region: formData.region,
            stablecoin: formData.stablecoin,
          }),
        });

        if (!response.ok) {
          // Try to parse error response, but handle empty/invalid JSON gracefully
          try {
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Failed to fetch results');
            } else {
              throw new Error(`Server error: ${response.status}. API endpoint may not be available.`);
            }
          } catch (parseError) {
            // If JSON parsing fails, use a generic error
            throw new Error(`API endpoint not available (${response.status}). Please deploy the backend or run 'vercel dev' for full functionality.`);
          }
        }

        // Try to parse response, handle empty/invalid JSON
        try {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const results = await response.json();
            setBlockchainResults(results);
          } else {
            throw new Error('Response was not JSON format');
          }
        } catch (parseError) {
          // If response is empty or not JSON, show helpful error
          throw new Error('API returned invalid response. Please ensure the backend is running.');
        }
      } catch (err) {
        console.error('Error fetching results:', err);
        console.log('Using mock data as fallback');
        // Use mock data as fallback when API fails
        try {
          const mockResults = generateMockResults(formData);
          setBlockchainResults(mockResults);
          setError(null); // Clear error since we have mock data
        } catch (mockError) {
          console.error('Error generating mock data:', mockError);
          setError(err.message || 'Failed to load results. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (formData.useCase && formData.priorities && formData.region && formData.stablecoin) {
      fetchResults();
    } else {
      setError('Missing form data. Please start over.');
      setIsLoading(false);
    }
  }, [formData]);

  if (isLoading) {
    return (
      <div className="app-container">
        {/* Navigation Bar */}
        <div className="nav-bar">
          <div className="nav-item completed">
            <p>①</p>
            <p><nobr>Use case</nobr></p>
          </div>
          <div className="nav-item completed">
            <p>②</p>
            <p>Priorities</p>
          </div>
          <div className="nav-item completed">
            <p>③</p>
            <p>Region</p>
          </div>
          <div className="nav-item completed">
            <p>④</p>
            <p>Stablecoin</p>
          </div>
          <div className="nav-item active">
            <p>⑤</p>
            <p>Results</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-header">
            <h1 className="content-title">
              Calculating your matches...
            </h1>
            <p className="content-description">
              Analyzing blockchain options based on your preferences
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        {/* Navigation Bar */}
        <div className="nav-bar">
          <div className="nav-item completed">
            <p>①</p>
            <p><nobr>Use case</nobr></p>
          </div>
          <div className="nav-item completed">
            <p>②</p>
            <p>Priorities</p>
          </div>
          <div className="nav-item completed">
            <p>③</p>
            <p>Region</p>
          </div>
          <div className="nav-item completed">
            <p>④</p>
            <p>Stablecoin</p>
          </div>
          <div className="nav-item active">
            <p>⑤</p>
            <p>Results</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="content-header">
            <h1 className="content-title">
              Error loading results
            </h1>
            <p className="content-description" style={{ color: '#ff4444' }}>
              {error}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <button 
            className="back-button enabled"
            onClick={onBack}
          >
            <div className="back-button-icon-wrapper">
              <div className="back-button-icon">
                <img alt="" src={arrowLeftIcon} />
              </div>
            </div>
            <p className="back-button-text">
              Back
            </p>
          </button>
          <button 
            className="start-over-button"
            onClick={onStartOver}
          >
            <img src={refreshIcon} alt="" className="start-over-button-icon" />
            <p className="start-over-button-text">
              Start Over
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-item completed">
          <p>①</p>
          <p><nobr>Use case</nobr></p>
        </div>
        <div className="nav-item completed">
          <p>②</p>
          <p>Priorities</p>
        </div>
        <div className="nav-item completed">
          <p>③</p>
          <p>Region</p>
        </div>
        <div className="nav-item completed">
          <p>④</p>
          <p>Stablecoin</p>
        </div>
        <div className="nav-item active">
          <p>⑤</p>
          <p>Results</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <h1 className="content-title">
            Your top blockchain matches
          </h1>
          <p className="content-description">
            Scored across fees, reliability, regulatory fit, liquidity and off-ramps, speed, and decentralization
          </p>
        </div>

        {/* Results Cards */}
        <div className="results-container">
          {blockchainResults.map((result) => (
            <div key={result.rank} className={`result-card ${result.isBestMatch ? 'best-match' : ''}`}>
              {/* Top Section */}
              <div className="result-header-row">
                <div className="result-header-left">
                  <div className="result-rank">{result.rank}.</div>
                  <div className="result-logo-container">
                    <div className={`result-logo ${result.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {blockchainLogos[result.name] ? (
                        <img 
                          src={blockchainLogos[result.name]} 
                          alt={`${result.name} logo`}
                          className="result-logo-img"
                        />
                      ) : (
                        result.name.charAt(0)
                      )}
                    </div>
                  </div>
                  <div className="result-name-wrapper">
                    <h2 className="result-name">{result.name}</h2>
                    {result.isBestMatch && (
                      <span className="best-match-badge">Best Match</span>
                    )}
                  </div>
                </div>
                <div className="result-score-wrapper">
                  <span className="result-score-label">Score</span>
                  <div className="result-score-circle">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Background circle */}
                      <circle cx="20" cy="20" r="19" stroke="#E0E0E0" strokeWidth="2" />
                      {/* Progress circle */}
                      <circle
                        cx="20"
                        cy="20"
                        r="19"
                        stroke="#3F3CFF"
                        strokeWidth="2"
                        strokeDasharray={`${2 * Math.PI * 19}`}
                        strokeDashoffset={`${2 * Math.PI * 19 * (1 - result.score / 100)}`}
                        strokeLinecap="round"
                        transform="rotate(-90 20 20)"
                      />
                    </svg>
                    <span className="result-score-value">{result.score}</span>
                  </div>
                </div>
              </div>
              
              {/* Separator */}
              <div className="result-separator"></div>
              
              {/* Bottom Section */}
              <div className="result-content-row">
                <div className="result-description-column">
                  <p className="result-description">{result.description}</p>
                </div>
                <div className="result-detail-column">
                  <h3 className="result-detail-title">Key strengths</h3>
                  <ul className="result-detail-list">
                    {result.keyStrengths && result.keyStrengths.map((strength, idx) => (
                      <li key={idx} className="result-strength-item">
                        <img src={checkIcon} alt="" className="result-checkmark" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="result-detail-column">
                  <h3 className="result-detail-title">Considerations</h3>
                  <ul className="result-detail-list">
                    {result.considerations && result.considerations.map((consideration, idx) => (
                      <li key={idx} className="result-consideration-item">
                        <img src={minusIcon} alt="" className="result-dash" />
                        {consideration}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <div></div>
        <button 
          className="start-over-button"
          onClick={onStartOver}
        >
          <img src={refreshIcon} alt="" className="start-over-button-icon" />
          <p className="start-over-button-text">
            Start Over
          </p>
        </button>
      </div>
    </div>
  );
}
