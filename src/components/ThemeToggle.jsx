import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }, [isDark]);

  return (
    <button 
      className="theme-switch" 
      onClick={() => setIsDark(!isDark)}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
}
