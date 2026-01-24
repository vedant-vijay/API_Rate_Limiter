import React, { useState, useEffect } from 'react';
import { Key, TestTube } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 480);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = [
    { id: 'keys', label: 'API Keys', icon: Key, description: 'Manage your keys' },
    { id: 'test', label: 'Test Services', icon: TestTube, description: 'Try your APIs' }
  ];

  const styles = {
    nav: {
      backgroundColor: '#111111',
      borderBottom: '1px solid #1f1f1f',
      padding: '0.75rem 0'
    },
    navContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: isMobile ? '0 1rem' : '0 2rem',
      display: 'flex',
      gap: '0.5rem',
      justifyContent: isMobile ? 'space-between' : 'flex-start'
    },
    navTab: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '0.5rem' : '0.75rem',
      padding: isMobile ? '0.75rem 1rem' : '0.875rem 1.5rem',
      backgroundColor: 'transparent',
      color: '#9ca3af',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      position: 'relative',
      minWidth: isMobile ? 'auto' : '180px',
      flex: isMobile ? '1' : 'none'
    },
    navTabActive: {
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      color: '#6366f1',
      border: '1px solid rgba(99, 102, 241, 0.2)'
    },
    tabIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    tabContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '0.1rem'
    },
    tabLabel: {
      fontWeight: '600',
      fontSize: isMobile ? '0.8rem' : '0.875rem'
    },
    tabDescription: {
      fontSize: isMobile ? '0.65rem' : '0.7rem',
      color: '#6b7280',
      fontWeight: '400',
      display: isMobile ? 'none' : 'block'
    },
    tabDescriptionActive: {
      color: '#8b9cf6'
    },
    activeIndicator: {
      position: 'absolute',
      bottom: '-0.75rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '40%',
      height: '2px',
      background: 'linear-gradient(90deg, transparent, #6366f1, transparent)',
      borderRadius: '2px'
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navContent}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.navTab,
                ...(isActive ? styles.navTabActive : {})
              }}
            >
              <div style={styles.tabIcon}>
                <Icon size={isMobile ? 18 : 20} />
              </div>
              <div style={styles.tabContent}>
                <span style={styles.tabLabel}>{tab.label}</span>
                <span style={{...styles.tabDescription, ...(isActive ? styles.tabDescriptionActive : {})}}>
                  {tab.description}
                </span>
              </div>
              {isActive && <div style={styles.activeIndicator}></div>}
            </button>
          );
        })}
      </div>
    </nav>
  );
}