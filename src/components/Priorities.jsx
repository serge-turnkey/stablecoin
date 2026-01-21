import { useState } from 'react'
import arrowRightIcon from '../img/arrow-right.svg'
import arrowLeftIcon from '../img/arrow-left.svg'
import circleIcon from '../img/circle.svg'
import circleFilledIcon from '../img/circle-filled.svg'
import checkCircleIcon from '../img/check-circle.svg'

const priorities = [
  { id: 'fees', label: 'Fees and predictability' },
  { id: 'speed', label: 'Speed and UX' },
  { id: 'reliability', label: 'Reliability under load' },
  { id: 'regulatory', label: 'Regulatory and compliance fit' },
  { id: 'liquidity', label: 'Liquidity and off-ramps' },
  { id: 'security', label: 'Security and decentralization' },
];

export default function Priorities({ onBack, onContinue }) {
  const [prioritiesState, setPrioritiesState] = useState({
    fees: null,
    speed: null,
    reliability: null,
    regulatory: null,
    liquidity: null,
    security: null,
  });

  const handlePriorityChange = (priorityId, value) => {
    setPrioritiesState(prev => ({
      ...prev,
      [priorityId]: value
    }));
  };

  const allPrioritiesSet = Object.values(prioritiesState).every(val => val !== null);

  const handleContinue = () => {
    if (allPrioritiesSet && onContinue) {
      onContinue(prioritiesState);
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
        <div className="nav-item active">
          <p>②</p>
          <p>Priorities</p>
        </div>
        <div className="nav-item">
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
            Tune your priorities
          </h1>
          <p className="content-description">
            Set how important each factor is for your evaluation
          </p>
        </div>

        {/* Priorities List */}
        <div className="priorities-container">
          {priorities.map((priority) => (
            <div key={priority.id} className="priority-item">
              <div className="priority-label">
                {priority.label}
              </div>
              <div className="priority-scale">
                <span className="scale-label scale-label-left">Low</span>
                <div className="priority-options">
                  {[1, 2, 3, 4, 5].map((value) => {
                    const selectedValue = prioritiesState[priority.id];
                    let iconSrc;
                    if (value === selectedValue) {
                      iconSrc = checkCircleIcon;
                    } else if (selectedValue !== null && value < selectedValue) {
                      iconSrc = circleFilledIcon;
                    } else {
                      iconSrc = circleIcon;
                    }
                    
                    return (
                      <button
                        key={value}
                        type="button"
                        className={`priority-option ${selectedValue === value ? 'selected' : ''}`}
                        onClick={() => handlePriorityChange(priority.id, value)}
                        aria-label={`Priority ${value}`}
                      >
                        <img 
                          alt="" 
                          src={iconSrc}
                          width="32"
                          height="32"
                        />
                      </button>
                    );
                  })}
                </div>
                <span className="scale-label scale-label-right">High</span>
              </div>
            </div>
          ))}
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
          className={`continue-button ${allPrioritiesSet ? 'enabled' : ''}`}
          onClick={handleContinue}
          disabled={!allPrioritiesSet}
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
