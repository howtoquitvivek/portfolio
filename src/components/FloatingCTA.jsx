import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import ThemeToggle from './ThemeToggle';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Always show on sub-pages (except Work page)
    if (location.pathname !== '/') {
      setIsVisible(location.pathname !== '/work');
      return;
    }

    let heroVisible = true;
    let contactVisible = false;

    const updateVisibility = () => {
      setIsVisible(!heroVisible && !contactVisible);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target.id === 'hero') {
          heroVisible = entry.isIntersecting;
        }
        if (entry.target.id === 'contact') {
          contactVisible = entry.isIntersecting;
        }
      });
      updateVisibility();
    }, { 
      threshold: 0,
      rootMargin: '-80px 0px 0px 0px' // Offset for header/scrolling
    });

    const hero = document.querySelector('#hero');
    const contact = document.querySelector('#contact');

    if (hero) observer.observe(hero);
    if (contact) observer.observe(contact);

    // Initial check
    updateVisibility();

    return () => {
      if (hero) observer.unobserve(hero);
      if (contact) observer.unobserve(contact);
    };
  }, [location.pathname]);

  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector('#contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.a
            href="#contact"
            className="btn-floating hide-on-mobile"
            onClick={handleContactClick}
            initial={{ y: 100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.4, 
              type: 'spring',
              stiffness: 260,
              damping: 20
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </motion.a>
        )}
      </AnimatePresence>
      
    </>
  );
}
