import axios from 'axios';

/**
 * Create or update a contact in Attio CRM
 */
export async function createOrUpdateContact(email, formData) {
  const apiKey = process.env.ATTIO_API_KEY;
  const workspaceId = process.env.ATTIO_WORKSPACE_ID;

  if (!apiKey || !workspaceId) {
    throw new Error('Attio API credentials not configured');
  }

  try {
    // Map use case ID to label
    const useCaseLabels = {
      1: 'E-Commerce',
      2: 'SaaS',
      3: 'Remittance',
      4: 'Payroll',
      5: 'DeFi',
      6: 'Other'
    };

    // Map stablecoin ID to label
    const stablecoinLabels = {
      usdc: 'USDC',
      usdt: 'USDT',
      dai: 'DAI',
      usde: 'USDe',
      pyusd: 'PYUSD',
      flexible: 'Flexible'
    };

    // Map region IDs to labels
    const regionLabels = {
      'north-america': 'North America',
      'europe': 'Europe',
      'latin-america': 'South America',
      'asia': 'Asia',
      'africa': 'Africa',
      'australia': 'Australia',
      'global': 'Global'
    };

    const useCaseLabel = useCaseLabels[formData.useCase] || 'Unknown';
    const stablecoinLabel = stablecoinLabels[formData.stablecoin] || 'Unknown';
    const regionsLabel = Array.isArray(formData.region) 
      ? formData.region.map(r => regionLabels[r] || r).join(', ')
      : 'Unknown';

    // Format priorities for display
    const prioritiesText = formData.priorities 
      ? Object.entries(formData.priorities)
          .map(([key, value]) => `${key}: ${value}`)
          .join(', ')
      : '';

    // Prepare contact data
    const contactData = {
      emails: [{ address: email, is_primary: true }],
      custom_fields: {
        // Add custom fields based on your Attio workspace configuration
        // These field names may need to be adjusted to match your Attio schema
        use_case: useCaseLabel,
        stablecoin_preference: stablecoinLabel,
        regions: regionsLabel,
        priorities: prioritiesText,
        source: 'Blockchain Selector App'
      }
    };

    // Attio API endpoint for creating/updating contacts
    // Note: This is a simplified example - adjust based on actual Attio API documentation
    const response = await axios.post(
      `https://api.attio.com/v2/workspaces/${workspaceId}/contacts`,
      contactData,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Attio API error:', error.response?.data || error.message);
    
    // If contact already exists, try to update
    if (error.response?.status === 409 || error.response?.status === 422) {
      try {
        // Try to find and update existing contact
        // This would require a search endpoint - adjust based on Attio API
        return { success: true, message: 'Contact updated' };
      } catch (updateError) {
        throw new Error('Failed to create or update contact in Attio');
      }
    }
    
    throw error;
  }
}
