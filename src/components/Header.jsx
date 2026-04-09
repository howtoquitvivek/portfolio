import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Header.css';

export default function Header() {
  const navItems = [
    { label: "Work", path: "/work" },
    { label: "Projects", path: "/projects" },
    { label: "Achievements", path: "/achievements" },
    { label: "About", path: "/about" }
  ];

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
            <NavLink 
              to={item.path}
              className={({ isActive }) => isActive ? "header-link active" : "header-link"}
              style={{ textDecoration: 'none' }}
            >
              {item.label}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="header-cta">
        <a href="#contact" className="btn" style={{ textDecoration: 'none' }}>Let's Talk</a>
      </div>
    </motion.header>
  );
}
