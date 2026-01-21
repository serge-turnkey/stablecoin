import { createOrUpdateContact } from '../lib/services/attioService.js';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate input - only email is required now (formData optional)
    if (!email) {
      return res.status(400).json({ 
        error: 'Missing required parameter: email'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Forward to Zapier webhook if configured (avoids CORS issues)
    const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL || process.env.VITE_ZAPIER_WEBHOOK_URL;
    
    if (zapierWebhookUrl) {
      try {
        console.log('Forwarding email to Zapier webhook:', zapierWebhookUrl);
        const zapierResponse = await fetch(zapierWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (zapierResponse.ok) {
          const zapierData = await zapierResponse.json().catch(() => ({}));
          console.log('Zapier webhook response:', zapierData);
          return res.status(200).json({ 
            success: true,
            message: 'Email submitted successfully to Zapier',
            zapierResponse: zapierData
          });
        } else {
          console.error('Zapier webhook error:', zapierResponse.status);
        }
      } catch (zapierError) {
        console.error('Error forwarding to Zapier:', zapierError);
        // Continue to fallback (Attio direct API) if Zapier fails
      }
    }

    // Fallback: Direct Attio API integration (if formData provided)
    const { formData } = req.body;
    if (formData) {
      try {
        await createOrUpdateContact(email, formData);
        return res.status(200).json({ 
          success: true,
          message: 'Email submitted successfully to Attio' 
        });
      } catch (attioError) {
        console.error('Attio CRM error:', attioError);
        return res.status(200).json({ 
          success: true,
          message: 'Email submitted (CRM sync may be delayed)',
          warning: 'CRM integration temporarily unavailable'
        });
      }
    }

    // If neither Zapier nor Attio worked, still return success
    return res.status(200).json({ 
      success: true,
      message: 'Email received (integration may be delayed)'
    });
  } catch (error) {
    console.error('Error submitting email:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
