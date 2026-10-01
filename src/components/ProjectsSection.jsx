import '../styles/Projects.css';
import { FolderProjects } from './FolderProjects';

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

export default function ProjectsSection({ hideHeader = false }) {
  return (
    <section className={`section-container container ${hideHeader ? 'projects-standalone' : ''}`} id={hideHeader ? undefined : 'projects'}>
      {!hideHeader && (
      <div className="section-header">
        <h2 className="section-title">Featured <span>Projects</span></h2>
        <p className="section-intro">
          A collection of projects I've built while learning and improving as a developer.
          Focusing on functional design and technical depth.
        </p>
      </div>
      )}

      <FolderProjects projects={projects} />
    </section>
  );
}
