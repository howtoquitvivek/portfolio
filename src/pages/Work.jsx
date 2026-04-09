import { motion } from 'framer-motion';
import '../styles/Pages.css';

export default function Work() {
  return (
    <motion.div 
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="page-title">Work With Me</h1>
      
      <p className="page-intro">
        I’m open to working on real-world projects, collaborations, and learning opportunities where I can build and improve as a developer.
      </p>

      <div className="page-section">
        <ul className="page-list">
          <li>Full-stack web development</li>
          <li>Backend/API development</li>
          <li>Project collaboration</li>
        </ul>
      </div>

      <div style={{ marginTop: '4rem' }}>
        <a href="#contact" className="btn btn-primary">Contact Me</a>
      </div>
    </motion.div>
  );
}
