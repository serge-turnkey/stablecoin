import { useState, useEffect } from 'react'
import arrowRightIcon from '../img/arrow-right.svg'
import arrowLeftIcon from '../img/arrow-left.svg'

// Zapier webhook URLs - configurable via environment variables
const ZAPIER_WEBHOOKS = [
  { name: 'Webhook 1 (uqd6uh3)', url: import.meta.env.VITE_ZAPIER_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/26138702/uqd6uh3/' },
  { name: 'Webhook 2 (ux9lul1)', url: 'https://hooks.zapier.com/hooks/catch/26138702/ux9lul1/' }
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
      console.log('Webhooks:', ZAPIER_WEBHOOKS.map(w => w.name).join(', '));
      
      // Send to all webhooks in parallel with Promise.allSettled for resilience
      const webhookPromises = ZAPIER_WEBHOOKS.map(async (webhook, index) => {
        console.log(`Starting ${webhook.name}...`);
        try {
          // Try with normal fetch first (JSON)
          const response = await fetch(webhook.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email
            }),
          });
          
          console.log(`${webhook.name} response status:`, response.status);
          
          if (response.ok) {
            try {
              const result = await response.json();
              console.log(`${webhook.name} response:`, result);
            } catch (e) {
              console.log(`${webhook.name} response was not JSON, but status was OK`);
            }
          }
          
          return { success: true, name: webhook.name };
        } catch (corsError) {
          // If CORS fails, try with form-encoded data (more compatible with Zapier)
          console.warn(`${webhook.name} CORS error, trying form-encoded data`);
          try {
            const formData = new URLSearchParams();
            formData.append('email', email);
            
            await fetch(webhook.url, {
              method: 'POST',
              mode: 'no-cors',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: formData.toString(),
            });
            console.log(`${webhook.name} sent via no-cors mode with form data`);
            return { success: true, name: webhook.name };
          } catch (noCorsError) {
            console.error(`${webhook.name} failed even with no-cors mode:`, noCorsError);
            return { success: false, name: webhook.name, error: noCorsError };
          }
        }
      });

      // Wait for all webhooks to complete (or fail)
      const results = await Promise.allSettled(webhookPromises);
      
      // Log detailed results
      console.log('All webhook results:', results);
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`✓ ${ZAPIER_WEBHOOKS[index].name}: ${result.value.success ? 'SUCCESS' : 'FAILED'}`);
        } else {
          console.error(`✗ ${ZAPIER_WEBHOOKS[index].name}: REJECTED -`, result.reason);
        }
      });
      
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
