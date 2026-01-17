import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Copy, Trash2, Check, Calendar, TrendingUp } from 'lucide-react';

export default function ClientCard({ client, onRefresh }) {
  const [showKey, setShowKey] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prevRequestCount, setPrevRequestCount] = useState(client.requestCount || 0);
  const [isUpdating, setIsUpdating] = useState(false);
  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    console.log(`🔄 ClientCard Update - ${client.name}:`, {
      requestCount: client.requestCount,
      rateLimit: client.rateLimit,
      percentage: percentage.toFixed(1) + '%'
    });
    
    const currentCount = client.requestCount || 0;
    if (currentCount !== prevRequestCount) {
      setIsUpdating(true);
      setPrevRequestCount(currentCount);
      setTimeout(() => setIsUpdating(false), 1000);
    }
  }, [client.requestCount, prevRequestCount]);

  const used = client.requestCount || 0;
  const limit = client.rateLimit || 0;
  const remaining = Math.max(0, limit - used);
  const percentage = limit > 0 ? (used / limit) * 100 : 0;

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${client.name}"? This action cannot be undone.`)) {
      return;
    }
    
    setDeleting(true);
    try {
      const res = await fetch(`${API}/api/clients/${client._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (res.ok) {
        onRefresh();
      }
    } catch (err) {
      console.error('Error deleting client:', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(client.apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getStatusColor = () => {
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 70) return '#f59e0b';
    return '#10b981';
  };

  const getStatusLabel = () => {
    if (percentage >= 90) return 'Critical';
    if (percentage >= 70) return 'Warning';
    return 'Healthy';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div style={{
      ...styles.clientCard,
      ...(isUpdating ? styles.clientCardUpdating : {})
    }}>
      <div style={styles.cardHeader}>
        <div style={styles.headerLeft}>
          <h3 style={styles.cardTitle}>{client.name}</h3>
          <div style={styles.metaInfo}>
            <Calendar size={14} />
            <span>{formatDate(client.createdAt)}</span>
          </div>
        </div>
        <div style={styles.headerRight}>
          <div style={{...styles.statusBadge, backgroundColor: `${getStatusColor()}20`, color: getStatusColor()}}>
            <TrendingUp size={14} />
            {getStatusLabel()}
          </div>
          <button 
            onClick={handleDelete} 
            style={styles.deleteBtn} 
            disabled={deleting}
            title="Delete API key"
          >
            {deleting ? (
              <span style={styles.miniLoader}></span>
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
      </div>

      <div style={styles.keySection}>
        <label style={styles.label}>API Key</label>
        <div style={styles.keyDisplayRow}>
          <code style={styles.maskedKey}>
            {showKey ? client.apiKey : '••••••••••••••••••••••••'}
          </code>
          <button 
            onClick={() => setShowKey(!showKey)} 
            style={styles.iconBtn}
            title={showKey ? "Hide key" : "Show key"}
          >
            {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          <button 
            onClick={handleCopy}
            style={{...styles.iconBtn, ...(copied ? styles.iconBtnSuccess : {})}}
            title="Copy to clipboard"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </div>

      <div style={styles.usageSection}>
        <div style={styles.usageHeader}>
          <span style={styles.label}>Rate Limit Usage</span>
          <span style={{
            ...styles.usageText,
            ...(isUpdating ? styles.usageTextUpdating : {})
          }}>
            {used.toLocaleString()} / {limit.toLocaleString()}
          </span>
        </div>
        
        <div style={styles.progressBar}>
          <div 
            style={{
              ...styles.progressFill,
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: getStatusColor(),
              transition: 'width 0.8s ease, background-color 0.3s ease'
            }}
          >
            {percentage >= 15 && (
              <span style={styles.progressLabel}>
                {percentage.toFixed(1)}%
              </span>
            )}
          </div>
        </div>
        
        <div style={styles.usageStats}>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Remaining</span>
            <span style={{
              ...styles.statValue, 
              color: remaining === 0 ? '#ef4444' : '#10b981',
              ...(isUpdating ? styles.statValueUpdating : {})
            }}>
              {remaining.toLocaleString()}
            </span>
          </div>
          <div style={styles.stat}>
            <span style={styles.statLabel}>Utilization</span>
            <span style={{
              ...styles.statValue, 
              color: getStatusColor(),
              ...(isUpdating ? styles.statValueUpdating : {})
            }}>
              {percentage.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  clientCard: {
    backgroundColor: '#1a1a1a',
    border: '1px solid #2d2d2d',
    borderRadius: '12px',
    padding: '1.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  },
  clientCardUpdating: {
    border: '1px solid rgba(16, 185, 129, 0.5)',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1.5rem',
    gap: '1rem'
  },
  headerLeft: {
    flex: 1
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
    color: '#e5e7eb',
    wordBreak: 'break-word'
  },
  metaInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.75rem',
    color: '#6b7280'
  },
  statusBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.375rem 0.75rem',
    borderRadius: '6px',
    fontSize: '0.75rem',
    fontWeight: '600',
    border: '1px solid currentColor'
  },
  deleteBtn: {
    padding: '0.5rem',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#ef4444',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    minHeight: '36px'
  },
  miniLoader: {
    width: '16px',
    height: '16px',
    border: '2px solid rgba(239, 68, 68, 0.3)',
    borderTop: '2px solid #ef4444',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },
  keySection: {
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#0f0f0f',
    borderRadius: '8px',
    border: '1px solid #1f1f1f'
  },
  keyDisplayRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginTop: '0.5rem'
  },
  maskedKey: {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#0a0a0a',
    border: '1px solid #2d2d2d',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontFamily: 'monospace',
    color: '#9ca3af',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  iconBtn: {
    padding: '0.75rem',
    backgroundColor: '#1f1f1f',
    color: '#9ca3af',
    border: '1px solid #374151',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '42px',
    minHeight: '42px'
  },
  iconBtnSuccess: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    color: '#10b981',
    border: '1px solid rgba(16, 185, 129, 0.3)'
  },
  usageSection: {
    marginTop: '1rem'
  },
  usageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem'
  },
  usageText: {
    fontSize: '0.875rem',
    color: '#e5e7eb',
    fontWeight: '600',
    fontFamily: 'monospace',
    transition: 'all 0.3s ease'
  },
  usageTextUpdating: {
    color: '#10b981',
    transform: 'scale(1.05)'
  },
  label: {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  },
  progressBar: {
    height: '10px',
    backgroundColor: '#1f1f1f',
    borderRadius: '5px',
    overflow: 'hidden',
    marginBottom: '1rem',
    border: '1px solid #2d2d2d'
  },
  progressFill: {
    height: '100%',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  progressLabel: {
    fontSize: '0.65rem',
    fontWeight: '700',
    color: 'white',
    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
  },
  usageStats: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.375rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '6px',
    border: '1px solid #1f1f1f'
  },
  statLabel: {
    fontSize: '0.7rem',
    color: '#6b7280',
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: '0.05em'
  },
  statValue: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#e5e7eb',
    fontFamily: 'monospace',
    transition: 'all 0.3s ease'
  },
  statValueUpdating: {
    transform: 'scale(1.1)',
    color: '#10b981'
  },
  debugInfo: {
    marginTop: '1rem',
    padding: '0.5rem',
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: '6px',
    border: '1px solid rgba(99, 102, 241, 0.2)'
  },
  debugText: {
    color: '#9ca3af',
    fontSize: '0.75rem',
    fontFamily: 'monospace'
  }
};