import { useState, useEffect } from 'react';
import { config } from '../config';

/**
 * Hook to get the current theme mode (light/dark)
 */
export const useThemeMode = () => {
  const [isDark, setIsDark] = useState(() => 
    document.documentElement.getAttribute('data-theme') === 'dark' ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    const handleSync = (e) => setIsDark(e.detail);
    window.addEventListener('theme-sync', handleSync);
    return () => window.removeEventListener('theme-sync', handleSync);
  }, []);

  return isDark;
};

/**
 * Resolves themed asset paths based on the global configuration.
 */
export const getThemedAsset = (section, type, item, isDark) => {
  const mode = isDark ? 'dark' : 'light';
  const theme = config.activeThemeName || 'pink';
  return `/src/assets/${section}/${theme}/${mode}/${mode}-${type}-${section}-${item}.png`;
};

/**
 * Resolves static asset paths that do NOT change with themes or modes.
 */
export const getStaticAsset = (section, item) => {
  return `/src/assets/${section}/${section}-${item}.png`;
};
