import { motion } from 'framer-motion';
import '../styles/Pages.css';
import '../styles/Projects.css';

export default function Projects() {
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

  return (
    <motion.div
      className="page-container" style={{ maxWidth: '1200px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="page-title">Projects</h1>
      <p className="page-intro" style={{ maxWidth: '600px' }}>
        A collection of projects I’ve built while learning and improving as a developer.
      </p>

      <motion.div
        className="projects-grid"
        variants={containerVars}
        initial="hidden"
        animate="show"
      >
        {projects.map((proj, i) => (
          <motion.div className="project-card" key={i} variants={itemVars}>
            <h3>{proj.title}</h3>
            <p>{proj.desc}</p>

            <div className="project-tags">
              {proj.tags.map(tag => (
                <span key={tag} className="project-tag">{tag}</span>
              ))}
            </div>

            <div className="project-links">
              {proj.live && (
                <a href={proj.live} target="_blank" rel="noreferrer" className="primary-link">View Project</a>
              )}
              {proj.source && (
                <a href={proj.source} target="_blank" rel="noreferrer">Source Code</a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
