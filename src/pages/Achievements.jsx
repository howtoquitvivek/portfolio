import { motion } from 'framer-motion';
import '../styles/Pages.css';
import '../styles/Achievements.css';

export default function Achievements() {
  const milestones = [
    {
      title: "AWS Certified Cloud Practitioner",
      desc: "Earned my first global certification, establishing a strong foundation in cloud concepts and AWS use cases.",
      date: "2026",
      mediaType: "image-placeholder"
    },
    {
      title: "App Development Intern @ Stock8",
      desc: "Started working on live applications to build real-world mobile solutions and improve my programming practices.",
      date: "2025",
      mediaType: "image-placeholder"
    },
    {
      title: "CyberShield 2025 Winner",
      desc: "Secured first place at the National CyberShield Hackathon at JEC Jabalpur, competing against a massive pool of talented developers.",
      date: "2025",
      mediaType: "image-placeholder"
    },
    {
      title: "HackHazard 2025 Top 100",
      desc: "Built EduFinance with Team Bytegg and secured a Top 100 spot globally out of thousands of participating teams.",
      date: "2025",
      mediaType: "image-placeholder"
    }
  ];

  return (
    <motion.div 
      className="page-container" style={{ maxWidth: '900px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="page-title">Milestones</h1>
      <p className="page-intro">
        A timeline tracking my key achievements, hackathon wins, and certifications.
      </p>

      <div className="timeline-container">
        {milestones.map((ms, i) => (
          <motion.div 
            key={i}
            className="timeline-item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <span className="timeline-date">{ms.date}</span>
              <h3>{ms.title}</h3>
              <p>{ms.desc}</p>
              <div className="timeline-media-placeholder">
                <span>[ Insert Media Placeholder Here ]</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
