import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import '../styles/Achievements.css';

import cloudImg from '../assets/achievement-cloud.png';
import hackathonCS from '../assets/achievement-cybersheild25.png';
import hackathonHH from '../assets/achievement-hackhazard25.png';
import internStock8 from '../assets/achievement-stock8.png'

const milestones = [
  {
    title: "AWS Certified Cloud Practitioner",
    desc: "Earned my first global certification! (CLF-02)",
    date: "Apr 2026",
    image: cloudImg
  },
  {
    title: "App Development Intern @Stock8",
    desc: "Started working on live application to build real-world mobile solutions and improve my programming practices.",
    date: "Jan 2026",
    image: internStock8
  },
  {
    title: "CyberShield 2025 Winner",
    desc: "Secured first place at the National CyberShield Hackathon at JEC Jabalpur, competing against a massive pool of talented developers.",
    date: "Nov 2025",
    image: hackathonCS
  },
  {
    title: "HackHazard 2025 Top 100",
    desc: "Built EduFinance with Team Bytegg and secured a Top 100 spot globally out of thousands of participating teams.",
    date: "Jul 2025",
    image: hackathonHH
  }
];

export default function AchievementsSection() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (img) => setSelectedImage(img);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <section className="section-container container" id="achievements">
      <div className="section-header">
        <h2 className="section-title">Key <span>Milestones</span></h2>
        <p className="section-intro">
          A timeline tracking my key achievements, hackathon wins, and certifications.
          Each step represents a leap in my journey as a developer.
        </p>
      </div>

      <div className="timeline-container">
        {milestones.map((ms, i) => (
          <div
            key={i}
            className="timeline-item"
          >
            <div className="timeline-marker"></div>
            <div className="timeline-content">
              <span className="timeline-date">{ms.date}</span>
              <h3>{ms.title}</h3>
              <p>{ms.desc}</p>

              {ms.image && (
                <div className="timeline-media-container">
                  <img 
                    src={ms.image} 
                    alt={ms.title} 
                    loading="lazy" 
                    onClick={() => openLightbox(ms.image)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox}>
                <X size={24} />
              </button>
              <img src={selectedImage} alt="Large Achievement View" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
