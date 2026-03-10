import { useState, useEffect } from 'react'
import arrowRightIcon from '../img/arrow-right.svg'
import arrowLeftIcon from '../img/arrow-left.svg'

// Zapier webhook URLs - configurable via environment variables
const ZAPIER_WEBHOOKS = [
  import.meta.env.VITE_ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/26138702/uqd6uh3/',
  'https://hooks.zapier.com/hooks/catch/26138702/ux9lul1/'
];

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
      // Submit email to multiple Zapier webhooks in parallel
      console.log('Sending email to', ZAPIER_WEBHOOKS.length, 'Zapier webhooks');
      console.log('Sending email value:', email);
      
      // Send to all webhooks in parallel with Promise.allSettled for resilience
      const webhookPromises = ZAPIER_WEBHOOKS.map(async (webhookUrl, index) => {
        try {
          // Try with normal fetch first
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email
            }),
          });
          
          console.log(`Webhook ${index + 1} response status:`, response.status);
          
          if (response.ok) {
            try {
              const result = await response.json();
              console.log(`Webhook ${index + 1} response:`, result);
            } catch (e) {
              console.log(`Webhook ${index + 1} response was not JSON, but status was OK`);
            }
          }
          
          return { success: true, webhook: index + 1 };
        } catch (corsError) {
          // If CORS fails, try with no-cors mode
          console.warn(`Webhook ${index + 1} CORS error, trying no-cors mode`);
          try {
            await fetch(webhookUrl, {
              method: 'POST',
              mode: 'no-cors',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email
              }),
            });
            console.log(`Webhook ${index + 1} sent via no-cors mode`);
            return { success: true, webhook: index + 1 };
          } catch (noCorsError) {
            console.error(`Webhook ${index + 1} failed even with no-cors mode:`, noCorsError);
            return { success: false, webhook: index + 1, error: noCorsError };
          }
        }
      });

      // Wait for all webhooks to complete (or fail)
      const results = await Promise.allSettled(webhookPromises);
      
      // Log results
      const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length;
      console.log(`Successfully sent to ${successCount}/${ZAPIER_WEBHOOKS.length} webhooks`);

      // Always continue to results (graceful degradation)
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
