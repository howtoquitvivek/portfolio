import { motion } from 'framer-motion';
import '../styles/Pages.css';

export default function About() {
  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="page-title">About Me</h1>
      
      <p className="page-intro">
        I’m a full-stack developer and a keen learner, building real-world applications while improving my skills through hands-on projects. I focus on backend systems, scalable applications, and practical problem-solving.
      </p>

      <div className="page-section">
        <h3>What I Do</h3>
        <ul className="page-list">
          <li>Full-stack web development</li>
          <li>Backend & APIs</li>
          <li>Learning by building real projects</li>
        </ul>
      </div>

      <div className="page-section" style={{ marginTop: '4rem' }}>
        <h3>Contact</h3>
        <div className="page-links">
          <a href="mailto:contact@example.com">Email</a>
          <a href="https://github.com/howtoquitvivek" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </div>
    </motion.div>
  );
}
