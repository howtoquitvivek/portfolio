import { motion } from 'framer-motion';
import '../styles/Hero.css';

export default function Hero() {
  const line1 = ["I", "build", "scalable"];
  const line2 = ["full-stack", "applications"];

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
      className={word === "scalable" ? "highlight" : ""}
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
          VIVEK BARMAN — FULL-STACK DEVELOPER
        </motion.p>
        
        <h1 className="hero-title">
          <div style={{ overflow: "hidden", display: "block" }}>
            {line1.map((word, i) => renderWord(word, i, line1.length, 0.3))}
          </div>
          <div style={{ overflow: "hidden", display: "block", marginTop: "-0.1em" }}>
            {line2.map((word, i) => renderWord(word, i, line2.length, 0.6))}
          </div>
        </h1>

        <motion.p 
          className="hero-desc"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
        >
          I’m a full-stack developer learning by building scalable applications and improving my backend and system design skills through real projects.
        </motion.p>

        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <a href="/resume.pdf" download="Vivek_Barman_Resume.pdf" className="btn btn-primary">Download Resume</a>
          <a href="#demo" className="btn btn-secondary">See My Work</a>
        </motion.div>
      </div>
    </section>
  );
}
