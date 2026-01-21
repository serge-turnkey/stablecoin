import { useState } from 'react'
import arrowRightIcon from '../img/arrow-right.svg'
import arrowLeftIcon from '../img/arrow-left.svg'

const useCases = [
  { id: 1, title: 'E-Commerce', description: 'Online payments' },
  { id: 2, title: 'SaaS', description: 'Subscriptions' },
  { id: 3, title: 'Remittance', description: 'Cross-border' },
  { id: 4, title: 'Payroll', description: 'Pay employees' },
  { id: 5, title: 'DeFi', description: 'Financial products' },
  { id: 6, title: 'Other', description: 'General Products' },
];

export default function UseCase({ onContinue }) {
  const [selectedUseCase, setSelectedUseCase] = useState(null);

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-item active">
          <p>①</p>
          <p><nobr>Use case</nobr></p>
        </div>
        <div className="nav-item">
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
            What is your use case?
          </h1>
          <p className="content-description">
            Select the option that best describes your project
          </p>
        </div>

        {/* Use Case Cards */}
        <div className="cards-container">
          <div className="card-row">
            {useCases.slice(0, 2).map((useCase) => (
              <button
                key={useCase.id}
                onClick={() => setSelectedUseCase(useCase.id)}
                className={`use-case-card ${selectedUseCase === useCase.id ? 'selected' : ''}`}
              >
                <div className="use-case-card-content">
                  <p className="use-case-title">
                    {useCase.title}
                  </p>
                  <p className="use-case-description">
                    {useCase.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <div className="card-row">
            {useCases.slice(2, 4).map((useCase) => (
              <button
                key={useCase.id}
                onClick={() => setSelectedUseCase(useCase.id)}
                className={`use-case-card ${selectedUseCase === useCase.id ? 'selected' : ''}`}
              >
                <div className="use-case-card-content">
                  <p className="use-case-title">
                    {useCase.title}
                  </p>
                  <p className="use-case-description">
                    {useCase.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <div className="card-row">
            {useCases.slice(4, 6).map((useCase) => (
              <button
                key={useCase.id}
                onClick={() => setSelectedUseCase(useCase.id)}
                className={`use-case-card ${selectedUseCase === useCase.id ? 'selected' : ''}`}
              >
                <div className="use-case-card-content">
                  <p className="use-case-title">
                    {useCase.title}
                  </p>
                  <p className="use-case-description">
                    {useCase.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <button className="back-button" disabled>
          <div className="back-button-icon-wrapper">
            <div className="back-button-icon-rotated">
              <div className="back-button-icon">
                <img alt="" src={arrowLeftIcon} />
              </div>
            </div>
          </div>
          <p className="back-button-text">
            Back
          </p>
        </button>
        <button 
          className={`continue-button ${selectedUseCase ? 'enabled' : ''}`}
          disabled={!selectedUseCase}
          onClick={() => selectedUseCase && onContinue && onContinue(selectedUseCase)}
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
