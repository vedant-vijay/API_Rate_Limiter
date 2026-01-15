import React, { useState, useEffect, useRef } from 'react';
import { Key, Plus, RefreshCw } from 'lucide-react';
import CreateApiKeyForm from './CreateApiKeyForm';
import ClientCard from './ClientCard';

export default function ApiKeyManager() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(null);
  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    fetchClients();
    
    // refreshIntervalRef.current = setInterval(() => {
    //   fetchClients(true); // Silent refresh
    // }, 10000);

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, []);

  const getAuthHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  const fetchClients = async (silent = false) => {
    try {
      if (!silent) {
        setLoading(true);
      }
      
      const res = await fetch('http://localhost:3000/api/clients', {
        headers: getAuthHeader(),
        cache: 'no-store' 
      });
      
      if (res.ok) {
        const data = await res.json(); 
        setClients(data);
        setLastRefresh(new Date());
      }
    } catch (err) {
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchClients();
    setTimeout(() => setRefreshing(false), 500);
  };

  const formatLastRefresh = () => {
    if (!lastRefresh) return '';
    const now = new Date();
    const diff = Math.floor((now - lastRefresh) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return lastRefresh.toLocaleTimeString();
  };

  return (
    <div style={styles.section}>
      <div style={styles.sectionHeader}>
        <div>
          <h2 style={styles.sectionTitle}>API Keys Management</h2>
          <p style={styles.sectionSubtitle}>
            Create and manage your API keys with rate limiting
            {lastRefresh && (
              <span style={styles.lastRefreshText}> • Updated {formatLastRefresh()}</span>
            )}
          </p>
        </div>
        <div style={styles.headerActions}>
          <button 
            onClick={handleRefresh} 
            style={styles.refreshBtn}
            disabled={refreshing}
            title="Refresh usage data"
          >
            <RefreshCw size={18} style={{
              animation: refreshing ? 'spin 1s linear infinite' : 'none'
            }} />
            Refresh
          </button>
          <button 
            onClick={() => setShowCreateForm(!showCreateForm)} 
            style={styles.primaryBtn}
          >
            <Plus size={20} />
            Create New Key
          </button>
        </div>
      </div>

      {showCreateForm && (
        <CreateApiKeyForm 
          onSuccess={() => {
            fetchClients();
            setShowCreateForm(false);
          }}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      {loading ? (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading API keys...</p>
        </div>
      ) : clients.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>
            <Key size={64} color="#4b5563" />
          </div>
          <h3 style={styles.emptyTitle}>No API Keys Yet</h3>
          <p style={styles.emptyText}>
            Create your first API key to start accessing rate-limited services
          </p>
          <button 
            onClick={() => setShowCreateForm(true)} 
            style={styles.emptyButton}
          >
            <Plus size={20} />
            Create Your First Key
          </button>
        </div>
      ) : (
        <>
          <div style={styles.statsBar}>
            <div style={styles.statCard}>
              <span style={styles.statLabel}>Total Keys</span>
              <span style={styles.statValue}>{clients.length}</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statLabel}>Active</span>
              <span style={styles.statValue}>{clients.length}</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statLabel}>Total Requests</span>
              <span style={styles.statValue}>
                {clients.reduce((sum, c) => sum + (c.requestCount || 0), 0).toLocaleString()}
              </span>
            </div>
          </div>
          
          <div style={styles.clientGrid}>
            {clients.map((client) => (
              <ClientCard 
                key={client._id} 
                client={client} 
                onRefresh={fetchClients} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  section: {
    animation: 'fadeIn 0.6s ease'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1.5rem'
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
  lastRefreshText: {
    color: '#10b981',
    fontSize: '0.875rem',
    fontWeight: '600'
  },
  headerActions: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'center'
  },
  refreshBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1.25rem',
    backgroundColor: '#1f1f1f',
    color: '#9ca3af',
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
  statsBar: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1.5rem',
    backgroundColor: '#1a1a1a',
    border: '1px solid #2d2d2d',
    borderRadius: '12px'
  },
  statLabel: {
    fontSize: '0.875rem',
    color: '#6b7280',
    fontWeight: '500'
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#e5e7eb'
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4rem',
    gap: '1rem'
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid #1f1f1f',
    borderTop: '4px solid #6366f1',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    color: '#9ca3af',
    fontSize: '0.95rem'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '4rem 2rem',
    textAlign: 'center',
    backgroundColor: '#1a1a1a',
    border: '2px dashed #2d2d2d',
    borderRadius: '16px'
  },
  emptyIcon: {
    padding: '1.5rem',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: '20px',
    marginBottom: '1.5rem'
  },
  emptyTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
    color: '#e5e7eb'
  },
  emptyText: {
    color: '#6b7280',
    margin: '0 0 2rem 0',
    maxWidth: '400px'
  },
  emptyButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.875rem 1.75rem',
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
  },
  clientGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
    gap: '1.5rem'
  }
};
