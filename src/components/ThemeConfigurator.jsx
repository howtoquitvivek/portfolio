import { useEffect } from 'react';
import { config } from '../config';

/**
 * ThemeConfigurator handles injecting the centralized configuration
 * into the DOM (CSS variables and Dynamic Favicons).
 */
export default function ThemeConfigurator() {
  useEffect(() => {
    // 1. Inject CSS Variables for both themes
    const root = document.documentElement;

    // Helper to set variables for a specific theme mode
    const applyThemeVariables = (mode, variables) => {
      Object.entries(variables).forEach(([key, value]) => {
        // Set variables with a prefix, e.g., --config-light-primary
        root.style.setProperty(`--config-${mode}-${key}`, value);
      });
    };

    applyThemeVariables('light', config.theme.light);
    applyThemeVariables('dark', config.theme.dark);

    // 2. Manage Dynamic Favicons
    const head = document.head;
    const path = config.faviconPath.endsWith('/') ? config.faviconPath : `${config.faviconPath}/`;

    // Remove existing config-managed favicon tags to avoid duplicates on HMR
    const existingTags = head.querySelectorAll('.managed-favicon');
    existingTags.forEach(tag => tag.remove());

    const faviconLinks = [
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${path}favicon-32x32.png` },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${path}favicon-16x16.png` },
      { rel: 'apple-touch-icon', sizes: '180x180', href: `${path}apple-touch-icon.png` },
      { rel: 'manifest', href: `${path}site.webmanifest` },
      { rel: 'icon', type: 'image/x-icon', href: `${path}favicon.ico` }
    ];

    faviconLinks.forEach(linkInfo => {
      const link = document.createElement('link');
      Object.entries(linkInfo).forEach(([attr, value]) => link.setAttribute(attr, value));
      link.classList.add('managed-favicon');
      head.appendChild(link);
    });

  }, []);

  return null; // Headless component
}
