import React, { useState } from 'react';
import { TestTube, BarChart3, Play, Loader } from 'lucide-react';

export default function ApiTester() {
  const [apiKey, setApiKey] = useState('');
  const [service, setService] = useState('status');
  const [params, setParams] = useState({});
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rateLimitInfo, setRateLimitInfo] = useState(null);
  const [responseTime, setResponseTime] = useState(null);

  const services = [
    { value: 'status', label: 'API Status Check', params: [], description: 'Check if the API is running' },
    { value: 'weather', label: 'Weather Information', params: ['city'], description: 'Get weather for a city' },
    { value: 'quote', label: 'Random Quote', params: [], description: 'Get an inspirational quote' },
    { value: 'dog', label: 'Random Dog Image', params: [], description: 'Get a cute dog picture' },
    { value: 'cat-fact', label: 'Cat Fact', params: [], description: 'Learn about cats' },
    { value: 'random-user', label: 'Random User', params: [], description: 'Generate user data' },
    { value: 'joke', label: 'Random Joke', params: [], description: 'Get a funny joke' },
    { value: 'crypto', label: 'Crypto Price', params: ['coin'], description: 'Bitcoin price info' },
    { value: 'ip-info', label: 'IP Geolocation', params: ['ip'], description: 'Get IP location data' }
  ];

  const selectedService = services.find(s => s.value === service);

  const testService = async () => {
    if (!apiKey) {
      setError('Please enter your API key');
      return;
    }

    setLoading(true);
    setError('');
    setResponse(null);
    setRateLimitInfo(null);
    setResponseTime(null);

    const startTime = performance.now();

    try {
      const queryParams = new URLSearchParams(params).toString();
      const url = `http://localhost:3000/api/test/${service}${queryParams ? '?' + queryParams : ''}`;

      const res = await fetch(url, {
        headers: { 'X-API-Key': apiKey }
      });

      const endTime = performance.now();
      setResponseTime(Math.round(endTime - startTime));

      const data = await res.json();

      const rateLimitHeaders = {
        limit: res.headers.get('X-RateLimit-Limit'),
        remaining: res.headers.get('X-RateLimit-Remaining'),
        reset: res.headers.get('X-RateLimit-Reset')
      };

      if (res.ok) {
        setResponse(data);
        setRateLimitInfo(rateLimitHeaders);
      } else {
        setError(data.message || data.error || 'Request failed');
        if (res.status === 429) {
          setRateLimitInfo({
            ...rateLimitHeaders,
            resetIn: data.resetIn
          });
        }
      }

      setLoading(false);
    } catch (err) {
      setError('Network error. Make sure the backend is running on localhost:3000');
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      testService();
    }
  };

  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <div>
          <h2 style={styles.sectionTitle}>API Service Tester</h2>
          <p style={styles.sectionSubtitle}>
            Test your rate-limited API endpoints and monitor usage
          </p>
        </div>
      </div>

      <div style={styles.testerContainer}>
        {/* Left Panel - Form */}
        <div style={styles.testerForm}>
          <div style={styles.formSection}>
            <h3 style={styles.formSectionTitle}>
              <TestTube size={20} />
              Configuration
            </h3>
            
            <div style={styles.inputGroup}>
              <label style={styles.label}>API Key</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your API key"
                style={styles.input}
              />
              <span style={styles.hint}>Your rate-limited API key</span>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Select Service</label>
              <select 
                value={service} 
                onChange={(e) => {
                  setService(e.target.value);
                  setParams({});
                  setResponse(null);
                  setError('');
                  setRateLimitInfo(null);
                }}
                style={styles.select}
              >
                {services.map(s => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              {selectedService && (
                <span style={styles.hint}>{selectedService.description}</span>
              )}
            </div>

            {selectedService?.params.length > 0 && (
              <div style={styles.paramsSection}>
                <label style={styles.label}>Parameters</label>
                {selectedService.params.map(param => (
                  <div key={param} style={styles.paramInput}>
                    <input
                      type="text"
                      value={params[param] || ''}
                      onChange={(e) => setParams(prev => ({ ...prev, [param]: e.target.value }))}
                      onKeyPress={handleKeyPress}
                      placeholder={`Enter ${param}`}
                      style={styles.input}
                    />
                  </div>
                ))}
              </div>
            )}

            <button 
              onClick={testService} 
              disabled={loading || !apiKey} 
              style={{
                ...styles.testBtn,
                opacity: (loading || !apiKey) ? 0.5 : 1
              }}
            >
              {loading ? (
                <>
                  <Loader size={20} style={{animation: 'spin 1s linear infinite'}} />
                  Testing...
                </>
              ) : (
                <>
                  <Play size={20} />
                  Test Service
                </>
              )}
            </button>
          </div>
        </div>

        
        <div style={styles.resultsPanel}>
          {rateLimitInfo && (
            <div style={styles.rateLimitCard}>
              <h4 style={styles.cardTitle}>
                <BarChart3 size={20} />
                Rate Limit Status
              </h4>
              <div style={styles.rateLimitGrid}>
                <div style={styles.rateLimitItem}>
                  <span style={styles.rateLimitLabel}>Limit</span>
                  <span style={styles.rateLimitValue}>{rateLimitInfo.limit || 'N/A'}</span>
                </div>
                <div style={styles.rateLimitItem}>
                  <span style={styles.rateLimitLabel}>Remaining</span>
                  <span style={{
                    ...styles.rateLimitValue,
                    color: parseInt(rateLimitInfo.remaining) === 0 ? '#ef4444' : '#10b981'
                  }}>
                    {rateLimitInfo.remaining || '0'}
                  </span>
                </div>
                {responseTime && (
                  <div style={styles.rateLimitItem}>
                    <span style={styles.rateLimitLabel}>Response Time</span>
                    <span style={styles.rateLimitValue}>{responseTime}ms</span>
                  </div>
                )}
                {rateLimitInfo.resetIn && (
                  <div style={{ ...styles.rateLimitItem, gridColumn: '1 / -1' }}>
                    <span style={styles.rateLimitLabel}>Rate Limit Reset In</span>
                    <span style={{ ...styles.rateLimitValue, color: '#ef4444' }}>
                      {rateLimitInfo.resetIn}
                    </span>
                  </div>
                )}
              </div>
              
              {rateLimitInfo.remaining && rateLimitInfo.limit && (
                <div style={styles.rateLimitProgress}>
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        width: `${(parseInt(rateLimitInfo.remaining) / parseInt(rateLimitInfo.limit)) * 100}%`,
                        backgroundColor: parseInt(rateLimitInfo.remaining) / parseInt(rateLimitInfo.limit) < 0.2 ? '#ef4444' : '#10b981'
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {error && (
            <div style={styles.errorCard}>
              <div style={styles.errorHeader}>
                <span style={styles.errorIcon}>⚠️</span>
                <strong style={styles.errorTitle}>Error</strong>
              </div>
              <p style={styles.errorText}>{error}</p>
            </div>
          )}

          {response && (
            <div style={styles.responseCard}>
              <div style={styles.responseHeader}>
                <h4 style={styles.cardTitle}>Response Data</h4>
                <div style={styles.responseBadge}>
                  <span style={styles.statusDot}></span>
                  Success
                </div>
              </div>
              <pre style={styles.jsonResponse}>
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}

          {!response && !error && !loading && (
            <div style={styles.placeholderCard}>
              <TestTube size={64} color="#4b5563" />
              <h4 style={styles.placeholderTitle}>Ready to Test</h4>
              <p style={styles.placeholderText}>
                Enter your API key and select a service to test your rate-limited endpoints
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  section: {
    animation: 'fadeIn 0.6s ease'
  },
  sectionHeader: {
    marginBottom: '2rem'
  },
  sectionTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0',
    background: 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  sectionSubtitle: {
    color: '#6b7280',
    margin: 0,
    fontSize: '0.95rem'
  },
  testerContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
    gap: '2rem',
    alignItems: 'start'
  },
  testerForm: {
    backgroundColor: '#1a1a1a',
    border: '1px solid #2d2d2d',
    borderRadius: '16px',
    padding: '2rem',
    position: 'sticky',
    top: '100px'
  },
  formSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  formSectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#e5e7eb',
    margin: 0,
    paddingBottom: '1rem',
    borderBottom: '1px solid #2d2d2d'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  input: {
    width: '100%',
    padding: '0.875rem',
    backgroundColor: '#0a0a0a',
    border: '1px solid #2d2d2d',
    borderRadius: '8px',
    fontSize: '0.875rem',
    color: '#e5e7eb',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    outline: 'none'
  },
  select: {
    width: '100%',
    padding: '0.875rem',
    backgroundColor: '#0a0a0a',
    border: '1px solid #2d2d2d',
    borderRadius: '8px',
    fontSize: '0.875rem',
    color: '#e5e7eb',
    boxSizing: 'border-box',
    cursor: 'pointer',
    outline: 'none'
  },
  hint: {
    fontSize: '0.75rem',
    color: '#6b7280',
    fontStyle: 'italic'
  },
  paramsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  paramInput: {
    display: 'flex',
    flexDirection: 'column'
  },
  testBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '1rem',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    marginTop: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
  },
  resultsPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  rateLimitCard: {
    backgroundColor: '#1a1a1a',
    border: '1px solid rgba(99, 102, 241, 0.3)',
    borderRadius: '12px',
    padding: '1.5rem',
    animation: 'slideDown 0.3s ease'
  },
  cardTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    margin: '0 0 1rem 0',
    color: '#e5e7eb'
  },
  rateLimitGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '1rem'
  },
  rateLimitItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1rem',
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderRadius: '8px',
    border: '1px solid rgba(99, 102, 241, 0.1)'
  },
  rateLimitLabel: {
    fontSize: '0.7rem',
    color: '#9ca3af',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '0.05em'
  },
  rateLimitValue: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#6366f1',
    fontFamily: 'monospace'
  },
  rateLimitProgress: {
    marginTop: '1rem'
  },
  progressBar: {
    height: '8px',
    backgroundColor: '#0a0a0a',
    borderRadius: '4px',
    overflow: 'hidden',
    border: '1px solid #2d2d2d'
  },
  progressFill: {
    height: '100%',
    transition: 'width 0.5s ease, background-color 0.3s ease',
    borderRadius: '3px'
  },
  errorCard: {
    padding: '1.5rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '12px',
    animation: 'slideDown 0.3s ease'
  },
  errorHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.75rem'
  },
  errorIcon: {
    fontSize: '1.5rem'
  },
  errorTitle: {
    color: '#ef4444',
    fontSize: '1.1rem'
  },
  errorText: {
    margin: 0,
    fontSize: '0.875rem',
    color: '#fca5a5',
    lineHeight: 1.6
  },
  responseCard: {
    backgroundColor: '#1a1a1a',
    border: '1px solid #2d2d2d',
    borderRadius: '12px',
    padding: '1.5rem',
    animation: 'slideDown 0.3s ease'
  },
  responseHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  responseBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '600',
    border: '1px solid rgba(16, 185, 129, 0.3)'
  },
  statusDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    animation: 'pulse 2s ease-in-out infinite'
  },
  jsonResponse: {
    backgroundColor: '#0a0a0a',
    padding: '1.25rem',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontFamily: 'monospace',
    color: '#10b981',
    overflow: 'auto',
    maxHeight: '500px',
    margin: 0,
    border: '1px solid #1f1f1f',
    lineHeight: 1.6
  },
  placeholderCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem 2rem',
    textAlign: 'center',
    backgroundColor: '#1a1a1a',
    border: '2px dashed #2d2d2d',
    borderRadius: '16px',
    minHeight: '400px'
  },
  placeholderTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '1rem 0 0.5rem 0',
    color: '#e5e7eb'
  },
  placeholderText: {
    color: '#6b7280',
    margin: 0,
    maxWidth: '400px',
    lineHeight: 1.6
  }
};