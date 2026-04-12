import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import '../styles/Footer.css';

export default function Footer() {
  const location = useLocation();
  
  // Detection for mobile to choose between Gmail Web (PC) and Mailto (Mobile App)
  const isMobile = typeof window !== 'undefined' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  const contactLinks = {
    cta: {
      pc: "https://mail.google.com/mail/?view=cm&fs=1&to=vivekbarman425@gmail.com&su=Project%20Inquiry&body=Hi%20Vivek,%0A%0AI'm%20interested%20in%20working%20with%20you%20on%20a%20project.%20Let's%20connect!",
      mobile: "mailto:vivekbarman425@gmail.com?subject=Project%20Inquiry&body=Hi%20Vivek,%0A%0AI'm%20interested%20in%20working%20with%20you%20on%20a%20project.%20Let's%20connect!"
    },
    icon: {
      pc: "https://mail.google.com/mail/?view=cm&fs=1&to=vivekbarman425@gmail.com&su=Hello%20Vivek&body=Hi%20there,%0A%0AI'm%20reaching%20out%20after%20visiting%20your%20portfolio.%20I'd%20love%20to%20connect!",
      mobile: "mailto:vivekbarman425@gmail.com?subject=Hello%20Vivek&body=Hi%20there,%0A%0AI'm%20reaching%20out%20after%20visiting%20your%20portfolio.%20I'd%20love%20to%20connect!"
    }
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer-content">
        {location.pathname === '/' && (
          <>
            <h2 className="footer-title">
              Ready to build something <br /> extraordinary?
            </h2>

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

        <div className="footer-connect">
          <h5>Connect</h5>
          <div className="footer-icons">
            <a href="https://github.com/howtoquitvivek" target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-tooltip="@howtoquitvivek">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
            </a>
            <a href="https://linkedin.com/in/vivek-barman" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-tooltip="vivek-barman">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
            <a href="https://instagram.com/howtoquitvivek" target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-tooltip="@howtoquitvivek">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
            </a>
            <a 
              href={isMobile ? contactLinks.icon.mobile : contactLinks.icon.pc} 
              target={isMobile ? "_self" : "_blank"} 
              rel="noopener noreferrer" 
              aria-label="Email" 
              data-tooltip="vivekbarman425@gmail.com"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Vivek Barman</p>
        </div>
      </div>
    </footer>
  );
}
