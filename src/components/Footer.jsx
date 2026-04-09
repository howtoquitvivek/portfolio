import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  const location = useLocation();
  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        {location.pathname === '/' && (
          <>
            <motion.h2 
              className="footer-title"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Ready to build something <br/> extraordinary?
            </motion.h2>

            <motion.div 
              className="footer-cta"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="mailto:hello@vivekbarman.com" className="btn btn-primary">Start a project with me</a>
              <a href="#" className="btn btn-secondary">Request a demo</a>
            </motion.div>
          </>
        )}



        <div className="footer-links">
          <div className="footer-col">
            <h5>Productive Solutions</h5>
            <ul>
              <li><a href="#">Custom Reporting</a></li>
              <li><a href="#">Web Applications</a></li>
              <li><a href="#">Desktop Solutions</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Case Studies</h5>
            <ul>
              <li><a href="#">6X Growth Tracking</a></li>
              <li><a href="#">Team Scaling</a></li>
              <li><a href="#">100% Adoption</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Connect</h5>
            <ul>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Vivek Barman</p>
          <p>Built with React, GSAP & Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
