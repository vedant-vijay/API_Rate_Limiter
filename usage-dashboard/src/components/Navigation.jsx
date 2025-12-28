import React from 'react';
import { Key, TestTube } from 'lucide-react';

export default function Navigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'keys', label: 'API Keys', icon: Key, description: 'Manage your keys' },
    { id: 'test', label: 'Test Services', icon: TestTube, description: 'Try your APIs' }
  ];

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
                <Icon size={20} />
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

const styles = {
  nav: {
    backgroundColor: '#111111',
    borderBottom: '1px solid #1f1f1f',
    padding: '0.75rem 0'
  },
  navContent: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    gap: '0.5rem'
  },
  navTab: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.875rem 1.5rem',
    backgroundColor: 'transparent',
    color: '#9ca3af',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    position: 'relative',
    minWidth: '180px'
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
    fontSize: '0.875rem'
  },
  tabDescription: {
    fontSize: '0.7rem',
    color: '#6b7280',
    fontWeight: '400'
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