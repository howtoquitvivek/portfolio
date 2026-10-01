import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ variant = 'header', className = '', onToggle }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = document.documentElement.getAttribute('data-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    
    // Sync other instances
    window.dispatchEvent(new CustomEvent('theme-sync', { detail: isDark }));
  }, [isDark]);

  useEffect(() => {
    const handleSync = (e) => {
      if (e.detail !== isDark) setIsDark(e.detail);
    };
    window.addEventListener('theme-sync', handleSync);
    return () => window.removeEventListener('theme-sync', handleSync);
  }, [isDark]);

  const buttonClass = variant === 'floating' ? `btn-floating circle ${className}` : `theme-switch ${className}`;

  return (
    <button
      onClick={() => {
        setIsDark(!isDark);
        if (onToggle) onToggle();
      }}
      className={buttonClass}
      aria-label="Toggle Theme"
      style={{ 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      <div style={{ position: 'relative', width: 24, height: 24 }}>
        {/* Moon Icon (shows when light mode) */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 0 : 1,
            scale: isDark ? 0.5 : 1,
            rotate: isDark ? 90 : 0
          }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </motion.div>
        
        {/* Sun Icon (shows when dark mode) */}
        <motion.div
          initial={false}
          animate={{
            opacity: isDark ? 1 : 0,
            scale: isDark ? 1 : 0.5,
            rotate: isDark ? 0 : -90
          }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </motion.div>
      </div>
    </button>
  );
}
