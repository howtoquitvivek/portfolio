import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

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
    } else {
      root.removeAttribute('data-theme');
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
      className={buttonClass} 
      onClick={() => {
        setIsDark(!isDark);
        if (onToggle) onToggle();
      }}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
