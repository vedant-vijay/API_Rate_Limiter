import React from 'react';
import { Zap, LogOut, User } from 'lucide-react';

export default function Header({ onLogout }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>
            <Zap size={32} color="#6366f1" />
          </div>
          <div>
            <h1 style={styles.logoText}>API Gateway</h1>
            <p style={styles.logoSubtext}>Rate-Limited API Management</p>
          </div>
        </div>
        <div style={styles.userSection}>
          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>
              <User size={18} />
            </div>
            <div style={styles.userDetails}>
              <span style={styles.userName}>Welcome back</span>
              <span style={styles.userEmail}>{user.email || 'user@example.com'}</span>
            </div>
          </div>
          <button onClick={onLogout} style={styles.logoutBtn}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    borderBottom: '1px solid rgba(99, 102, 241, 0.2)',
    padding: '1.25rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
  },
  headerContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '2rem'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  logoIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: '12px',
    border: '1px solid rgba(99, 102, 241, 0.2)'
  },
  logoText: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
    lineHeight: 1.2
  },
  logoSubtext: {
    fontSize: '0.75rem',
    color: '#6b7280',
    margin: '0.25rem 0 0 0'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.1)'
  },
  userAvatar: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    border: '2px solid rgba(99, 102, 241, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#6366f1'
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.1rem'
  },
  userName: {
    fontSize: '0.75rem',
    color: '#9ca3af',
    fontWeight: '500'
  },
  userEmail: {
    color: '#e5e7eb',
    fontSize: '0.875rem',
    fontWeight: '600'
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.625rem 1.25rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '600',
    transition: 'all 0.3s ease'
  }
};