import { motion } from 'framer-motion';
import '../styles/Projects.css';

const projects = [
  {
    title: "EduFinance",
    desc: "An innovative financial learning platform blending AI, real-time data, and interactive learning.",
    tags: ["React", "AI", "Fintech"],
    live: "https://edufinance-bytegg.netlify.app/",
    source: null
  },
  {
    title: "AI Crop Yield Prediction",
    desc: "Machine learning model designed to predict crop yields based on environmental data factors.",
    tags: ["Python", "Machine Learning"],
    live: null,
    source: "https://github.com/howtoquitvivek/ai-crop-yeild-prediction"
  },
  {
    title: "NASA Space Apps (Anveshak)",
    desc: "Space Apps challenge solution focused on planetary data visualization and accessibility.",
    tags: ["React", "API", "Data Vis"],
    live: null,
    source: "https://github.com/howtoquitvivek/nasa-space-apps-anveshak"
  },
  {
    title: "Deepfake Detection System",
    desc: "Computer vision application engineered to identify and flag manipulated media.",
    tags: ["Python", "Deep Learning"],
    live: null,
    source: "https://github.com/howtoquitvivek/flashivy-deepfake"
  },
  {
    title: "APK Analyzer",
    desc: "Security tool designed for the static inspection and analysis of Android app packages.",
    tags: ["Security", "Android", "Python"],
    live: null,
    source: "https://github.com/howtoquitvivek/prahari-apk-analyzer"
  }
];

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVars = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function ProjectsSection() {
  return (
    <section className="section-container container" id="projects">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">Featured <span>Projects</span></h2>
        <p className="section-intro">
          A collection of projects I've built while learning and improving as a developer. 
          Focusing on functional design and technical depth.
        </p>
      </motion.div>

      <motion.div
        className="projects-grid"
        variants={containerVars}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects.map((proj, i) => (
          <motion.div 
            className="project-card clickable-card" 
            key={i} 
            variants={itemVars}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const url = proj.live || proj.source;
              if (url) window.open(url, '_blank');
            }}
          >
            <h3>{proj.title}</h3>
            <p>{proj.desc}</p>

            <div className="project-tags">
              {proj.tags.map(tag => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>

            <div className="project-links">
              {proj.live && (
                <a 
                  href={proj.live} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="primary-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Project
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              )}
              {proj.source && (
                <a 
                  href={proj.source} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="secondary-link"
                  onClick={(e) => e.stopPropagation()}
                >
                  Source Code
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
