import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Hero.css';

import { config } from '../config';

export default function Hero() {
  const { hero } = config;
  const { title, subtitle, description, ctaPrimary, ctaSecondary } = hero;

  const renderWord = (word, index, arrLength, delayOffset) => (
    <motion.span
      key={index}
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        delay: delayOffset + index * 0.1
      }}
      style={{ display: "inline-block", marginRight: index === arrLength - 1 ? "0" : "0.25em" }}
      className={title.highlight === word ? "highlight" : ""}
    >
      {word}
    </motion.span>
  );

  return (
    <section className="hero" id="hero">
      <div className="hero-bg"></div>
      <div className="hero-content">
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
        
        <h1 className="hero-title">
          <div style={{ overflow: "hidden", display: "block" }}>
            {title.line1.map((word, i) => renderWord(word, i, title.line1.length, 0.3))}
          </div>
          <div style={{ overflow: "hidden", display: "block", marginTop: "-0.1em" }}>
            {title.line2.map((word, i) => renderWord(word, i, title.line2.length, 0.6))}
          </div>
        </h1>

        <motion.p 
          className="hero-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
        >
          {description}
        </motion.p>

        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <a href={ctaPrimary.href} download={ctaPrimary.download} className="btn btn-primary">{ctaPrimary.label}</a>
          <Link to={ctaSecondary.href} className="btn btn-secondary">{ctaSecondary.label}</Link>
        </motion.div>
      </div>
    </section>
  );
}
