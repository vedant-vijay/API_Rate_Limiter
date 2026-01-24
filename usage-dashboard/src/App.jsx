import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Auth from './components/Auth';
import ApiKeyManager from './components/ApiKeyManager';
import ApiTester from './components/ApiTester';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('keys');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogin = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const getPadding = () => {
    if (windowWidth < 480) return '1rem';
    if (windowWidth < 768) return '1.5rem';
    return '2rem';
  };

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      color: '#e5e7eb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    main: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: getPadding(),
      animation: 'fadeIn 0.5s ease'
    }
  };

  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div style={styles.app}>
      <Header onLogout={handleLogout} />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={styles.main}>
        {activeTab === 'keys' && <ApiKeyManager />}
        {activeTab === 'test' && <ApiTester />}
      </main>
      <Footer />
    </div>
  );
}