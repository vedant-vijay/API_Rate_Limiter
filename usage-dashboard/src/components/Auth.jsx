import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { useResponsive } from '../utils/useResponsive';

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        setLoading(false);
        return;
      }

      onLogin(data.token, data.user);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const styles = {
    authContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
      padding: isMobile ? '1rem' : '2rem'
    },
    authCard: {
      width: '100%',
      maxWidth: '450px',
      backgroundColor: '#1a1a1a',
      border: '1px solid #2d2d2d',
      borderRadius: isMobile ? '12px' : '16px',
      padding: isMobile ? '2rem 1.5rem' : '3rem',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
      animation: 'slideUp 0.5s ease'
    },
    authHeader: {
      textAlign: 'center',
      marginBottom: '2.5rem'
    },
    iconWrapper: {
      display: 'inline-flex',
      padding: '1rem',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      borderRadius: '16px',
      marginBottom: '1rem'
    },
    authTitle: {
      fontSize: isMobile ? '1.75rem' : '2rem',
      fontWeight: 'bold',
      margin: '1rem 0 0.5rem 0',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    authSubtitle: {
      color: '#9ca3af',
      margin: 0,
      fontSize: '0.9rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column'
    },
    inputGroup: {
      marginBottom: '1.25rem'
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
      fontWeight: '600',
      color: '#9ca3af'
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
      marginBottom: '1rem'
    },
    errorIcon: {
      fontSize: '1.1rem'
    },
    submitBtn: {
      width: '100%',
      padding: '1rem',
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '0.5rem',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '48px',
      boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '1.5rem 0',
      gap: '0.75rem'
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      backgroundColor: '#2d2d2d'
    },
    dividerText: {
      color: '#6b7280',
      fontSize: '0.75rem',
      fontWeight: '600'
    },
    toggle: {
      textAlign: 'center',
      marginTop: '1.5rem',
      color: '#6b7280',
      fontSize: '0.875rem'
    },
    link: {
      color: '#6366f1',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'color 0.3s ease'
    },
    loader: {
      width: '20px',
      height: '20px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTop: '3px solid white',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite'
    }
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        <div style={styles.authHeader}>
          <div style={styles.iconWrapper}>
            <Zap size={48} color="#6366f1" />
          </div>
          <h2 style={styles.authTitle}>API Gateway</h2>
          <p style={styles.authSubtitle}>
            {isLogin ? 'Welcome back! Sign in to continue' : 'Create your account to get started'}
          </p>
        </div>
        
        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
              placeholder="your@email.com"
              autoComplete="email"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
              placeholder="Min 6 characters"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <div style={styles.errorBox}>
              <span style={styles.errorIcon}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button 
            onClick={handleSubmit} 
            style={{...styles.submitBtn, opacity: loading ? 0.7 : 1}} 
            disabled={loading}
          >
            {loading ? (
              <span style={styles.loader}></span>
            ) : (
              isLogin ? 'Sign In' : 'Create Account'
            )}
          </button>
        </div>

        <div style={styles.divider}>
          <span style={styles.dividerLine}></span>
          <span style={styles.dividerText}>OR</span>
          <span style={styles.dividerLine}></span>
        </div>

        <p style={styles.toggle}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => { 
              setIsLogin(!isLogin); 
              setError(''); 
            }} 
            style={styles.link}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </span>
        </p>
      </div>
    </div>
  );
}