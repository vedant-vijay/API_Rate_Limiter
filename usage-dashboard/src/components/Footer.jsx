import React, { useState, useEffect } from 'react';
import { Github, Twitter, Mail, Heart } from 'lucide-react';
import { useResponsive } from '../utils/useResponsive';

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const styles = {
    footer: {
      backgroundColor: '#0a0a0a',
      borderTop: '1px solid #1f1f1f',
      marginTop: '4rem',
      padding: '2rem 0'
    },
    footerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: isMobile ? '0 1rem' : '0 2rem',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: isMobile ? '1rem' : '1.5rem',
      textAlign: isMobile ? 'center' : 'left'
    },
    footerSection: {
      display: 'flex',
      alignItems: 'center',
      width: isMobile ? '100%' : 'auto',
      justifyContent: isMobile ? 'center' : 'flex-start'
    },
    copyright: {
      color: '#6b7280',
      fontSize: '0.875rem',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    heartIcon: {
      color: '#ef4444',
      display: 'inline',
      animation: 'pulse 2s ease-in-out infinite'
    },
    socialLinks: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    },
    socialLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '36px',
      height: '36px',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      color: '#9ca3af',
      borderRadius: '8px',
      border: '1px solid rgba(99, 102, 241, 0.2)',
      textDecoration: 'none',
      transition: 'all 0.3s ease'
    },
    links: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'center',
      flexWrap: 'wrap',
      justifyContent: isMobile ? 'center' : 'flex-start'
    },
    link: {
      color: '#9ca3af',
      textDecoration: 'none',
      fontSize: '0.875rem',
      transition: 'color 0.3s ease',
      fontWeight: '500'
    },
    separator: {
      color: '#4b5563',
      fontSize: '0.875rem'
    }
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContent}>
        <div style={styles.footerSection}>
          <p style={styles.copyright}>
            © {currentYear} API Gateway. Built with{' '}
            <Heart size={14} style={styles.heartIcon} /> using React & Express
          </p>
        </div>
        
        <div style={styles.footerSection}>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink} title="GitHub">
              <Github size={18} />
            </a>
            <a href="#" style={styles.socialLink} title="Twitter">
              <Twitter size={18} />
            </a>
            <a href="#" style={styles.socialLink} title="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div style={styles.footerSection}>
          <div style={styles.links}>
            <a href="#" style={styles.link}>Documentation</a>
            <span style={styles.separator}>•</span>
            <a href="#" style={styles.link}>API Reference</a>
            <span style={styles.separator}>•</span>
            <a href="#" style={styles.link}>Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}