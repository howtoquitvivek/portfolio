import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import '../styles/Footer.css';
import { config } from '../config';

export default function Footer() {
  const location = useLocation();
  const { contact } = config;
  
  // Detection for mobile to choose between Gmail Web (PC) and Mailto (Mobile App)
  const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  const contactLinks = {
    cta: {
      pc: `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=Project%20Inquiry&body=Hi%20Vivek,%0A%0AI'm%20interested%20in%20working%20with%20you%20on%20a%20project.%20Let's%20connect!`,
      mobile: `mailto:${contact.email}?subject=Project%20Inquiry&body=Hi%20Vivek,%0A%0AI'm%20interested%20in%20working%20with%20you%20on%20a%20project.%20Let's%20connect!`
    },
    icon: {
      pc: `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=Hello%20Vivek&body=Hi%20there,%0A%0AI'm%20reaching%20out%20after%20visiting%20your%20portfolio.%20I'd%20love%20to%20connect!`,
      mobile: `mailto:${contact.email}?subject=Hello%20Vivek&body=Hi%20there,%0A%0AI'm%20reaching%20out%20after%20visiting%20your%20portfolio.%20I'd%20love%20to%20connect!`
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '#contact' }
  ];

  return (
    <footer className="footer" id="contact">
      {/* Top Section - CTA */}
      <div className="footer-top">
        <div className="footer-content">
          {location.pathname === '/' && (
            <>
              <motion.h2 
                className="footer-title"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Ready to build something <br /> extraordinary?
              </motion.h2>

              <div className="footer-cta">
                <a 
                  href={isMobile ? contactLinks.cta.mobile : contactLinks.cta.pc} 
                  target={isMobile ? "_self" : "_blank"} 
                  rel="noopener noreferrer" 
                  className="btn btn-primary"
                >
                  Start a project with me
                </a>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Waves Section */}
      <div className="footer-waves-container">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 20" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            {/* Flatter wave path */}
            <path id="gentle-wave" d="M-160 44c30 0 58-10 88-10s 58 10 88 10 58-10 88-10 58 10 88 10 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(229, 124, 216, 0.1)" />
            <use xlinkHref="#gentle-wave" x="48" y="1" fill="rgba(229, 124, 216, 0.2)" />
            <use xlinkHref="#gentle-wave" x="48" y="2" fill="rgba(229, 124, 216, 0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(229, 124, 216, 0.4)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(229, 124, 216, 0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="var(--color-primary)" />
          </g>
        </svg>
      </div>

      {/* Bottom Section - Wavy Base */}
      <div className="footer-bottom-section">
        <div className="footer-bottom-content">
          <div className="footer-icons">
            <a href={contact.socials.github.url} target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-tooltip={contact.socials.github.handle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
            </a>
            <a href={contact.socials.linkedin.url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-tooltip={contact.socials.linkedin.handle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href={contact.socials.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-tooltip={contact.socials.instagram.handle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a 
              href={isMobile ? contactLinks.icon.mobile : contactLinks.icon.pc} 
              target={isMobile ? "_self" : "_blank"} 
              rel="noopener noreferrer" 
              aria-label="Email" 
              data-tooltip={contact.email}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </a>
          </div>

          <div className="footer-copyright">
            <p>© 2026 {contact.userName || 'Vivek Barman'}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
