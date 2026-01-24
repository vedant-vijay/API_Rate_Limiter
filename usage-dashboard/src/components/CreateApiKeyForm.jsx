import React, { useState, useEffect } from 'react';
import { Copy, Check, X, Sparkles } from 'lucide-react';

export default function CreateApiKeyForm({ onSuccess, onCancel }) {
  const [name, setName] = useState('');
  const [rateLimit, setRateLimit] = useState('100');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const API = import.meta.env.VITE_API_BASE_URL;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    createForm: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #2d2d2d',
      borderRadius: '16px',
      marginBottom: '2rem',
      overflow: 'hidden',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      animation: 'slideDown 0.3s ease'
    },
    formHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #2d2d2d',
      background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      padding: isMobile ? '1rem' : '1.5rem 2rem'
    },
    formTitle: {
      fontSize: isMobile ? '1.1rem' : '1.5rem',
      fontWeight: '600',
      margin: 0,
      color: '#e5e7eb'
    },
    cancelIconBtn: {
      padding: '0.5rem',
      backgroundColor: 'transparent',
      color: '#9ca3af',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center'
    },
    formBody: {
      padding: isMobile ? '1rem' : '2rem'
    },
    inputGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#9ca3af'
    },
    required: {
      color: '#ef4444',
      marginLeft: '0.25rem'
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
    hint: {
      display: 'block',
      marginTop: '0.5rem',
      fontSize: '0.75rem',
      color: '#6b7280'
    },
    rateLimitPresets: {
      marginBottom: '1.5rem'
    },
    presetsLabel: {
      display: 'block',
      fontSize: '0.875rem',
      color: '#9ca3af',
      marginBottom: '0.75rem',
      fontWeight: '500'
    },
    presetButtons: {
      display: 'flex',
      gap: '0.5rem',
      flexWrap: 'wrap'
    },
    presetBtn: {
      padding: '0.5rem 1rem',
      backgroundColor: '#1f1f1f',
      color: '#9ca3af',
      border: '1px solid #374151',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    presetBtnActive: {
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      color: '#6366f1',
      border: '1px solid rgba(99, 102, 241, 0.5)'
    },
    errorBox: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.875rem 1rem',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      borderRadius: '8px',
      color: '#ef4444',
      fontSize: '0.875rem',
      marginBottom: '1.5rem'
    },
    errorIcon: {
      fontSize: '1.1rem'
    },
    formActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '2rem',
      flexDirection: isMobile ? 'column-reverse' : 'row',
      gap: isMobile ? '0.5rem' : '1rem'
    },
    secondaryBtn: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#1f1f1f',
      color: '#e5e7eb',
      border: '1px solid #374151',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      transition: 'all 0.3s ease'
    },
    primaryBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
    },
    loader: {
      width: '18px',
      height: '18px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTop: '3px solid white',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    },
    successCard: {
      position: 'relative',
      backgroundColor: '#1a1a1a',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '16px',
      padding: isMobile ? '1.5rem' : '2.5rem',
      marginBottom: '2rem',
      boxShadow: '0 8px 24px rgba(16, 185, 129, 0.1)',
      animation: 'slideDown 0.3s ease'
    },
    closeBtn: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      padding: '0.5rem',
      backgroundColor: 'transparent',
      color: '#9ca3af',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center'
    },
    successHeader: {
      textAlign: 'center',
      marginBottom: '2rem'
    },
    successIcon: {
      display: 'inline-flex',
      padding: '1.5rem',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderRadius: '50%',
      color: '#10b981',
      marginBottom: '1rem'
    },
    successTitle: {
      fontSize: '1.75rem',
      fontWeight: '600',
      margin: '0 0 0.5rem 0',
      color: '#10b981'
    },
    successSubtitle: {
      color: '#9ca3af',
      margin: 0,
      fontSize: '0.95rem'
    },
    keyDisplay: {
      marginBottom: '1.5rem'
    },
    keyBox: {
      display: 'flex',
      gap: '0.5rem',
      marginTop: '0.5rem',
      marginBottom: '1.5rem'
    },
    keyCode: {
      flex: 1,
      padding: '1rem',
      backgroundColor: '#0a0a0a',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '8px',
      fontSize: '0.875rem',
      fontFamily: 'monospace',
      color: '#10b981',
      wordBreak: 'break-all',
      lineHeight: 1.6
    },
    copyBtn: {
      padding: '1rem',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      color: '#10b981',
      border: '1px solid rgba(16, 185, 129, 0.3)',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      minWidth: '52px'
    },
    copyBtnSuccess: {
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      border: '1px solid rgba(16, 185, 129, 0.5)'
    },
    keyInfo: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: 'rgba(99, 102, 241, 0.05)',
      borderRadius: '8px',
      border: '1px solid rgba(99, 102, 241, 0.1)'
    },
    infoItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem'
    },
    infoLabel: {
      fontSize: '0.75rem',
      color: '#6b7280',
      fontWeight: '500'
    },
    infoValue: {
      fontSize: '0.875rem',
      color: '#e5e7eb',
      fontWeight: '600'
    },
    warningBox: {
      display: 'flex',
      gap: '1rem',
      padding: '1rem 1.25rem',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      border: '1px solid rgba(245, 158, 11, 0.3)',
      borderRadius: '8px',
      marginBottom: '1.5rem'
    },
    warningIcon: {
      fontSize: '1.5rem',
      flexShrink: 0
    },
    warningTitle: {
      display: 'block',
      color: '#f59e0b',
      fontSize: '0.875rem',
      fontWeight: '600',
      marginBottom: '0.25rem'
    },
    warningText: {
      color: '#d97706',
      fontSize: '0.875rem',
      margin: 0,
      lineHeight: 1.5
    },
    doneBtn: {
      width: '100%',
      padding: '1rem',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
    }
  };

  const handleSubmit = async () => {
    if (!name || !rateLimit) {
      setError('Please fill in all fields');
      return;
    }

    if (parseInt(rateLimit) < 1) {
      setError('Rate limit must be at least 1');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, rateLimit: parseInt(rateLimit) })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to create API key');
        setLoading(false);
        return;
      }

      setApiKey(data.apiKey);
      setLoading(false);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }

  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  
  if (apiKey) {
    return (
      <div style={styles.successCard}>
        <button onClick={onCancel} style={styles.closeBtn}>
          <X size={20} />
        </button>
        
        <div style={styles.successHeader}>
          <div style={styles.successIcon}>
            <Sparkles size={32} />
          </div>
          <h3 style={styles.successTitle}>API Key Created Successfully!</h3>
          <p style={styles.successSubtitle}>
            Save this key securely - you won't be able to see it again
          </p>
        </div>
        
        <div style={styles.keyDisplay}>
          <label style={styles.label}>Your API Key</label>
          <div style={styles.keyBox}>
            <code style={styles.keyCode}>{apiKey}</code>
            <button 
              onClick={handleCopy}
              style={{...styles.copyBtn, ...(copied ? styles.copyBtnSuccess : {})}}
              title="Copy to clipboard"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <div style={styles.keyInfo}>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Name:</span>
              <span style={styles.infoValue}>{name}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoLabel}>Rate Limit:</span>
              <span style={styles.infoValue}>{rateLimit} requests/window</span>
            </div>
          </div>
        </div>

        <div style={styles.warningBox}>
          <span style={styles.warningIcon}>⚠️</span>
          <div>
            <strong style={styles.warningTitle}>Important Security Notice</strong>
            <p style={styles.warningText}>
              Store this key securely. Anyone with this key can access your rate-limited APIs.
            </p>
          </div>
        </div>

        <button onClick={onSuccess} style={styles.doneBtn}>
          Done
        </button>
      </div>
    );
  }

  return (
    <div style={styles.createForm}>
      <div style={styles.formHeader}>
        <h3 style={styles.formTitle}>Create New API Key</h3>
        <button onClick={onCancel} style={styles.cancelIconBtn}>
          <X size={20} />
        </button>
      </div>

      <div style={styles.formBody}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Client Name
            <span style={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder="e.g., My Mobile App"
            maxLength={50}
          />
          <span style={styles.hint}>A descriptive name for your application</span>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Rate Limit (requests per window)
            <span style={styles.required}>*</span>
          </label>
          <input
            type="number"
            value={rateLimit}
            onChange={(e) => setRateLimit(e.target.value)}
            min="1"
            max="10000"
            style={styles.input}
            placeholder="e.g., 100"
          />
          <span style={styles.hint}>Maximum requests allowed per rate limit window</span>
        </div>

        <div style={styles.rateLimitPresets}>
          <span style={styles.presetsLabel}>Quick presets:</span>
          <div style={styles.presetButtons}>
            {[50, 100, 500, 1000].map(preset => (
              <button
                key={preset}
                onClick={() => setRateLimit(preset.toString())}
                style={{
                  ...styles.presetBtn,
                  ...(rateLimit === preset.toString() ? styles.presetBtnActive : {})
                }}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <span style={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div style={styles.formActions}>
          <button onClick={onCancel} style={styles.secondaryBtn}>
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={loading || !name || !rateLimit} 
            style={{
              ...styles.primaryBtn,
              opacity: (loading || !name || !rateLimit) ? 0.5 : 1
            }}
          >
            {loading ? (
              <span style={styles.loader}></span>
            ) : (
              <>
                <Sparkles size={18} />
                Generate Key
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

