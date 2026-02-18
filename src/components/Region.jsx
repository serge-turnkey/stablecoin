import { useState } from 'react'
import arrowRightIcon from '../img/arrow-right.svg'
import arrowLeftIcon from '../img/arrow-left.svg'
import checkIcon from '../img/check.svg'

const regions = [
  { id: 'north-america', label: 'North America' },
  { id: 'europe', label: 'Europe' },
  { id: 'latin-america', label: 'South America' },
  { id: 'asia', label: 'Asia' },
  { id: 'africa', label: 'Africa' },
  { id: 'australia', label: 'Australia' },
  { id: 'global', label: 'Global' },
];

export default function Region({ onBack, onContinue }) {
  const [selectedRegions, setSelectedRegions] = useState([]); // No regions preselected

  const handleRegionToggle = (regionId) => {
    setSelectedRegions(prev => {
      if (prev.includes(regionId)) {
        return prev.filter(id => id !== regionId);
      } else {
        return [...prev, regionId];
      }
    });
  };

  const handleContinue = () => {
    if (selectedRegions.length > 0 && onContinue) {
      onContinue(selectedRegions);
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
        <div className="nav-item active">
          <p>③</p>
          <p>Region</p>
        </div>
        <div className="nav-item">
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
            Where will you operate?
          </h1>
          <p className="content-description">
            Select all regions where you plan to serve customers
          </p>
        </div>

        {/* Region Cards */}
        <div className="cards-container">
          <div className="card-row">
            {regions.slice(0, 2).map((region) => (
              <button
                key={region.id}
                onClick={() => handleRegionToggle(region.id)}
                className={`region-card ${selectedRegions.includes(region.id) ? 'selected' : ''}`}
              >
                <div className="region-card-content">
                  <p className="region-card-title">
                    {region.label}
                  </p>
                </div>
                {selectedRegions.includes(region.id) && (
                  <div className="check-icon-container visible">
                    <img alt="" src={checkIcon} className="check-icon" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="card-row">
            {regions.slice(2, 4).map((region) => (
              <button
                key={region.id}
                onClick={() => handleRegionToggle(region.id)}
                className={`region-card ${selectedRegions.includes(region.id) ? 'selected' : ''}`}
              >
                <div className="region-card-content">
                  <p className="region-card-title">
                    {region.label}
                  </p>
                </div>
                {selectedRegions.includes(region.id) && (
                  <div className="check-icon-container visible">
                    <img alt="" src={checkIcon} className="check-icon" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="card-row">
            {regions.slice(4, 6).map((region) => (
              <button
                key={region.id}
                onClick={() => handleRegionToggle(region.id)}
                className={`region-card ${selectedRegions.includes(region.id) ? 'selected' : ''}`}
              >
                <div className="region-card-content">
                  <p className="region-card-title">
                    {region.label}
                  </p>
                </div>
                {selectedRegions.includes(region.id) && (
                  <div className="check-icon-container visible">
                    <img alt="" src={checkIcon} className="check-icon" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="card-row">
            {regions.slice(6, 7).map((region) => (
              <button
                key={region.id}
                onClick={() => handleRegionToggle(region.id)}
                className={`region-card ${selectedRegions.includes(region.id) ? 'selected' : ''}`}
              >
                <div className="region-card-content">
                  <p className="region-card-title">
                    {region.label}
                  </p>
                </div>
                {selectedRegions.includes(region.id) && (
                  <div className="check-icon-container visible">
                    <img alt="" src={checkIcon} className="check-icon" />
                  </div>
                )}
              </button>
            ))}
            {/* Transparent placeholder to even out the row */}
            <div className="region-card region-card-placeholder"></div>
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
          className={`continue-button ${selectedRegions.length > 0 ? 'enabled' : ''}`}
          onClick={handleContinue}
          disabled={selectedRegions.length === 0}
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
