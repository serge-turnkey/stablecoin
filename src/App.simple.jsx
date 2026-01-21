// Simplified App for testing - uncomment this in main.jsx if the full app doesn't work
import { useState } from 'react'

function SimpleApp() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Blockchain Selector App</h1>
      <p style={{ color: '#666' }}>If you see this, React is working correctly!</p>
      <p style={{ color: '#666' }}>The issue is likely in one of the components.</p>
      <div style={{ marginTop: '30px', padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h2>Next Steps:</h2>
        <ol>
          <li>Check browser console for errors (F12)</li>
          <li>Verify all dependencies are installed: <code>npm install</code></li>
          <li>Check if the dev server is running properly</li>
        </ol>
      </div>
    </div>
  )
}

export default SimpleApp
