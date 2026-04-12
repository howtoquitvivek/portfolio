import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Header.css';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "#hero", isRoute: false },
    { label: "Projects", href: "#projects", isRoute: false },
    { label: "Achievements", href: "#achievements", isRoute: false },
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
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
        <ThemeToggle className="hide-on-mobile" />
        <a 
          href="#contact" 
          className="header-contact-btn show-on-mobile"
          onClick={(e) => handleAnchorClick(e, '#contact')}
        >
          Let's Talk
        </a>
      </div>
    </motion.header>
  );
}
