import { motion } from 'framer-motion';
import '../styles/Projects.css';

const projects = [
  {
    title: "Hackhazard 2025 (EduFinance)",
    desc: "An innovative financial learning platform blending course based learning, AI, real-time data, and interactive learning.",
    tags: ["MERN", "AI", "Fintech", "Data Streaming"],
    live: "https://edufinance-bytegg.netlify.app/",
    source: "https://github.com/parshadk/hackhazard_hackathon"
  },
  {
    title: "AI Crop Yield Prediction (AICYP)",
    desc: "Machine learning system designed to predict crop yields, irrigation patterns and more based on environmental data factors.",
    tags: ["Java", "Python", "Machine Learning"],
    live: null,
    source: "https://github.com/howtoquitvivek/ai-crop-yeild-prediction"
  },
  {
    title: "NASA Space Apps (Anveshak)",
    desc: "Planetary data visualization and analysis using AI Features in map like interface.",
    tags: ["Deep Learning", "CNN", "Data Vis", "QGIS", "Python"],
    live: null,
    source: "https://github.com/howtoquitvivek/nasa-space-apps-anveshak"
  },
  {
    title: "Deepfake Detection System (Flashivy)",
    desc: "Computer vision application engineered to identify and flag manipulated images.",
    tags: ["Python", "Deep Learning", "Data Science"],
    live: null,
    source: "https://github.com/howtoquitvivek/flashivy-deepfake"
  },
  {
    title: "Static APK Analyzer (Prahari)",
    desc: "Static inspection and analysis of Android app packages using ML for malicious flagging of APK components.",
    tags: ["Security", "Android", "ML", "Python"],
    live: null,
    source: "https://github.com/howtoquitvivek/prahari-apk-analyzer"
  }
];

export default function ProjectsSection() {
  return (
    <section className="section-container container" id="projects">
      <div className="section-header">
        <h2 className="section-title">Featured <span>Projects</span></h2>
        <p className="section-intro">
          A collection of projects I've built while learning and improving as a developer.
          Focusing on functional design and technical depth.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((proj, i) => (
          <motion.div
            className="project-card clickable-card"
            key={i}
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
                  See Live
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
      </div>
    </section>
  );
}
