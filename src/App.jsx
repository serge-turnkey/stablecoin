import { useState } from 'react'
import UseCase from './components/UseCase'
import Priorities from './components/Priorities'
import Region from './components/Region'
import Stablecoin from './components/Stablecoin'
import EmailCapture from './components/EmailCapture'
import Results from './components/Results'

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    useCase: null,
    priorities: null,
    region: null,
    stablecoin: null,
    email: null,
  });

  const handleUseCaseContinue = (useCase) => {
    setFormData(prev => ({ ...prev, useCase }));
    setCurrentStep(2);
  };

  const handlePrioritiesContinue = (priorities) => {
    setFormData(prev => ({ ...prev, priorities }));
    setCurrentStep(3); // Go to Region
  };

  const handleRegionContinue = (region) => {
    setFormData(prev => ({ ...prev, region }));
    setCurrentStep(4); // Go to Stablecoin
  };

  const handleStablecoinContinue = (stablecoin) => {
    setFormData(prev => ({ ...prev, stablecoin }));
    setCurrentStep(5); // Go to EmailCapture
  };

  const handleEmailContinue = (email) => {
    setFormData(prev => ({ ...prev, email }));
    setCurrentStep(6); // Go to Results
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setFormData({
      useCase: null,
      priorities: null,
      region: null,
      stablecoin: null,
      email: null,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {currentStep === 1 && (
        <UseCase 
          onContinue={handleUseCaseContinue}
        />
      )}
      {currentStep === 2 && (
        <Priorities 
          onBack={handleBack}
          onContinue={handlePrioritiesContinue}
        />
      )}
      {currentStep === 3 && (
        <Region 
          onBack={handleBack}
          onContinue={handleRegionContinue}
        />
      )}
      {currentStep === 4 && (
        <Stablecoin 
          onBack={handleBack}
          onContinue={handleStablecoinContinue}
        />
      )}
      {currentStep === 5 && (
        <EmailCapture 
          onBack={handleBack}
          onContinue={handleEmailContinue}
          formData={formData}
        />
      )}
      {currentStep === 6 && (
        <Results 
          onBack={handleBack}
          formData={formData}
          onStartOver={handleStartOver}
        />
      )}
    </div>
  )
}

export default App
