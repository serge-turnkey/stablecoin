import { useState, useEffect } from 'react'
import arrowRightIcon from '../img/arrow-right.svg'
import arrowLeftIcon from '../img/arrow-left.svg'

// Zapier webhook URL - configurable via environment variable
const ZAPIER_WEBHOOK_URL = import.meta.env.VITE_ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/26138702/uqd6uh3/';

export default function EmailCapture({ onBack, onContinue, formData }) {
  // Initialize email from formData (which is loaded from localStorage) or localStorage directly
  const [email, setEmail] = useState(() => {
    return formData.email || localStorage.getItem('userEmail') || '';
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Update email if formData.email changes (e.g., user goes back and forth)
  useEffect(() => {
    if (formData.email && formData.email !== email) {
      setEmail(formData.email);
    }
  }, [formData.email]);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleContinue = async () => {
    if (!isValidEmail(email) || !onContinue) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Submit email directly to Zapier webhook
      // Using no-cors mode to avoid CORS issues (we can't read response, but request will be sent)
      console.log('Sending email to Zapier webhook:', ZAPIER_WEBHOOK_URL);
      console.log('Sending email value:', email);
      
      let emailSent = false;
      
      // Try with normal fetch first
      try {
        const response = await fetch(ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email
          }),
        });
        
        console.log('Zapier webhook response status:', response.status);
        emailSent = true;
        
        if (response.ok) {
          try {
            const result = await response.json();
            console.log('Zapier webhook response:', result);
          } catch (e) {
            console.log('Response was not JSON, but status was OK');
          }
        } else {
          console.warn('Zapier webhook returned non-OK status:', response.status);
        }
      } catch (corsError) {
        // If CORS fails, try with no-cors mode (request will be sent but we can't read response)
        console.warn('CORS error, trying no-cors mode:', corsError);
        try {
          await fetch(ZAPIER_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email
            }),
          });
          console.log('Email sent via no-cors mode (response not readable, but request was sent)');
          emailSent = true;
        } catch (noCorsError) {
          console.error('Failed to send email even with no-cors mode:', noCorsError);
        }
      }

      // Always continue to results (graceful degradation)
      // Even if email submission failed, allow user to proceed
      if (emailSent) {
        console.log('Email submission attempted successfully');
      } else {
        console.warn('Email submission may have failed, but continuing anyway');
      }
      
      // Save email to localStorage
      localStorage.setItem('userEmail', email);
      onContinue(email);
    } catch (err) {
      console.error('Error submitting email:', err);
      setError(err.message || 'Failed to submit email. You can still continue.');
      // Always allow continuing even if email submission fails
      onContinue(email);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
        <div className="nav-item completed">
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
            Enter email to continue
          </h1>
          <p className="content-description">
            Share your work email to get the results
          </p>
        </div>

        {/* Email Input */}
        <div className="email-input-container">
          <input
            type="email"
            className="email-input"
            placeholder="Work email address*"
            value={email}
            onChange={handleEmailChange}
            disabled={isSubmitting}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && isValidEmail(email) && !isSubmitting) {
                handleContinue();
              }
            }}
          />
          {error && (
            <p className="email-error-message" style={{ color: '#ff4444', marginTop: '8px', fontSize: '14px' }}>
              {error}
            </p>
          )}
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
          className={`continue-button ${isValidEmail(email) && !isSubmitting ? 'enabled' : ''}`}
          onClick={handleContinue}
          disabled={!isValidEmail(email) || isSubmitting}
        >
          <p className="continue-button-text">
            {isSubmitting ? 'Submitting...' : 'Continue'}
          </p>
          {!isSubmitting && (
            <div className="continue-button-icon">
              <img alt="" src={arrowRightIcon} />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
