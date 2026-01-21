import { useState } from 'react'
import arrowRightIcon from '../img/arrow-right.svg'
import arrowLeftIcon from '../img/arrow-left.svg'
import checkIcon from '../img/check.svg'

const stablecoins = [
  { id: 'usdc', title: 'USDC', description: 'Online payments' },
  { id: 'usdt', title: 'USDT', description: 'Tether' },
  { id: 'dai', title: 'DAI', description: 'MakerDAO' },
  { id: 'usde', title: 'USDe', description: 'Ethena' },
  { id: 'pyusd', title: 'PYUSD', description: 'PayPal' },
  { id: 'flexible', title: 'Flexible', description: 'Any' },
];

export default function Stablecoin({ onBack, onContinue }) {
  const [selectedStablecoin, setSelectedStablecoin] = useState(null);

  const handleContinue = () => {
    if (selectedStablecoin && onContinue) {
      onContinue(selectedStablecoin);
    }
  };

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
        <div className="nav-item active">
          <p>④</p>
          <p>Stablecoin</p>
        </div>
        <div className="nav-item">
          <p>⑤</p>
          <p>Results</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-header">
          <h1 className="content-title">
            Which stablecoin?
          </h1>
          <p className="content-description">
            Choose your preferred stablecoin
          </p>
        </div>

        {/* Stablecoin Cards */}
        <div className="cards-container">
          <div className="card-row">
            {stablecoins.slice(0, 2).map((stablecoin) => (
              <button
                key={stablecoin.id}
                onClick={() => setSelectedStablecoin(stablecoin.id)}
                className={`use-case-card ${selectedStablecoin === stablecoin.id ? 'selected' : ''}`}
              >
                <div className="use-case-card-content">
                  <p className="use-case-title">
                    {stablecoin.title}
                  </p>
                  <p className="use-case-description">
                    {stablecoin.description}
                  </p>
                </div>
                <div className={`check-icon-container ${selectedStablecoin === stablecoin.id ? 'visible' : ''}`}>
                  <img 
                    alt="check" 
                    src={checkIcon} 
                    className="check-icon"
                  />
                </div>
              </button>
            ))}
          </div>
          <div className="card-row">
            {stablecoins.slice(2, 4).map((stablecoin) => (
              <button
                key={stablecoin.id}
                onClick={() => setSelectedStablecoin(stablecoin.id)}
                className={`use-case-card ${selectedStablecoin === stablecoin.id ? 'selected' : ''}`}
              >
                <div className="use-case-card-content">
                  <p className="use-case-title">
                    {stablecoin.title}
                  </p>
                  <p className="use-case-description">
                    {stablecoin.description}
                  </p>
                </div>
                <div className={`check-icon-container ${selectedStablecoin === stablecoin.id ? 'visible' : ''}`}>
                  <img 
                    alt="check" 
                    src={checkIcon} 
                    className="check-icon"
                  />
                </div>
              </button>
            ))}
          </div>
          <div className="card-row">
            {stablecoins.slice(4, 6).map((stablecoin) => (
              <button
                key={stablecoin.id}
                onClick={() => setSelectedStablecoin(stablecoin.id)}
                className={`use-case-card ${selectedStablecoin === stablecoin.id ? 'selected' : ''}`}
              >
                <div className="use-case-card-content">
                  <p className="use-case-title">
                    {stablecoin.title}
                  </p>
                  <p className="use-case-description">
                    {stablecoin.description}
                  </p>
                </div>
                <div className={`check-icon-container ${selectedStablecoin === stablecoin.id ? 'visible' : ''}`}>
                  <img 
                    alt="check" 
                    src={checkIcon} 
                    className="check-icon"
                  />
                </div>
              </button>
            ))}
          </div>
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
          className={`continue-button ${selectedStablecoin ? 'enabled' : ''}`}
          onClick={handleContinue}
          disabled={!selectedStablecoin}
        >
          <p className="continue-button-text">
            Continue
          </p>
          <div className="continue-button-icon">
            <img alt="" src={arrowRightIcon} />
          </div>
        </button>
      </div>
    </div>
  );
}
