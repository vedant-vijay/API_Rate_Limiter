import React from 'react';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1.5rem'
  },
  footerSection: {
    display: 'flex',
    alignItems: 'center'
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
    alignItems: 'center'
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