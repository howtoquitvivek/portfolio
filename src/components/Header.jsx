import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sliders } from 'lucide-react';
import '../styles/Header.css';
import ThemeToggle from './ThemeToggle';
import EyeDropperTool from './EyeDropperTool';

export default function Header() {
  const [isThemeExpanded, setIsThemeExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const timerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine if currently in the Hero section
  const isHeroSection = useCallback(() => {
    if (typeof window === 'undefined') return true;
    return location.pathname === '/' && window.scrollY < (window.innerHeight * 0.75);
  }, [location.pathname]);

  const resetAutoHideTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Do NOT auto-hide if on hero section, if user is hovering over navbar, or if toolbar expanded
    if (isHeroSection() || isHovered || isThemeExpanded) {
      return;
    }

    timerRef.current = setTimeout(() => {
      if (!isHeroSection() && !isHovered && !isThemeExpanded) {
        setIsVisible(false);
      }
    }, 4000);
  }, [isHeroSection, isHovered, isThemeExpanded]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      const onHero = location.pathname === '/' && currentScrollY < (window.innerHeight * 0.75);

      if (onHero) {
        setIsVisible(true);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      } else if (diff > 4) {
        // Scrolling DOWN -> Collapse immediately
        setIsVisible(false);
        setIsThemeExpanded(false);
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
      } else if (diff < -3) {
        // Scrolling UP -> Reveal instantly and start 4s inactivity timer
        setIsVisible(true);
        resetAutoHideTimer();
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, location.pathname, resetAutoHideTimer]);

  // Handle auto-hide timer when visibility, hover, or tools change
  useEffect(() => {
    if (isVisible && !isHeroSection()) {
      resetAutoHideTimer();
    } else if (isHeroSection()) {
      setIsVisible(true);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isVisible, isHovered, isThemeExpanded, isHeroSection, resetAutoHideTimer]);

  const handleOpenTuner = () => {
    window.dispatchEvent(new CustomEvent('toggle-curve-tuner'));
    const el = document.querySelector('#achievements');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const elHome = document.querySelector('#achievements');
        if (elHome) elHome.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const navItems = [
    { label: "Home", href: "#hero", isRoute: false },
    { label: "Projects", href: "#projects", isRoute: false },
    { label: "Achievements", href: "#achievements", isRoute: false },
    { label: "About", href: "#about", isRoute: false },
    { label: "Work", href: "/work", isRoute: true }
  ];

  const handleAnchorClick = (e, href) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      // Navigate to home first, then scroll after a short delay
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className="header"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : -100, 
        opacity: isVisible ? 1 : 0 
      }}
      transition={{ 
        duration: isVisible ? 0.18 : 0.22, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      <NavLink to="/" className="header-logo" style={{ textDecoration: 'none' }}>
        Vivek<span>.</span>
      </NavLink>

      <nav className="header-nav">
        {navItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.1, duration: 0.8 }}
          >
            {item.isRoute ? (
              <NavLink
                to={item.href}
                className={({ isActive }) => isActive ? "header-link active" : "header-link"}
                style={{ textDecoration: 'none' }}
              >
                {item.label}
              </NavLink>
            ) : (
              <a
                href={item.href}
                className="header-link"
                style={{ textDecoration: 'none' }}
                onClick={(e) => handleAnchorClick(e, item.href)}
              >
                {item.label}
              </a>
            )}
          </motion.div>
        ))}
      </nav>

      <div className="header-cta">
        <a 
          href="#contact" 
          className="header-contact-btn show-on-mobile"
          onClick={(e) => handleAnchorClick(e, '#contact')}
        >
          Let's Talk
        </a>
        
        <div className="theme-collapsible-wrapper">
          <motion.div
            initial={false}
            animate={{ 
              width: isThemeExpanded ? 'auto' : 0, 
              opacity: isThemeExpanded ? 1 : 0,
              x: isThemeExpanded ? 0 : 20 
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '8px 0' }}
          >
            <div style={{ paddingRight: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ThemeToggle onToggle={() => setTimeout(() => setIsThemeExpanded(false), 400)} />
              <EyeDropperTool />
              <button
                className="eyedropper-btn"
                onClick={handleOpenTuner}
                title="Journey Curve & Flow Tuner"
                aria-label="Tune Milestones Curve"
              >
                <Sliders size={18} />
              </button>
            </div>
          </motion.div>
          
          
          <button 
            className={`theme-expand-btn ${isThemeExpanded ? 'active' : ''}`}
            onClick={() => setIsThemeExpanded(!isThemeExpanded)}
            aria-label={isThemeExpanded ? "Collapse theme" : "Expand theme"}
          >
            {isThemeExpanded ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
