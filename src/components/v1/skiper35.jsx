import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import '../../styles/skiper35.css';
import { config } from '../../config';
import { getStaticAsset } from '../../utils/themeUtils';

export function Skiper35() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const milestones = config.achievements.map(ms => ({
    ...ms,
    image: getStaticAsset('achievement', ms.item)
  }));

  const openLightbox = (img) => setSelectedImage(img);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <>
      <div 
        className="skiper35-container"
        onMouseLeave={() => setActiveIndex(null)}
      >
        {milestones.map((ms, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              className={`skiper35-item ${isActive ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => {
                if (isActive && ms.image) {
                  openLightbox(ms.image);
                } else {
                  setActiveIndex(index);
                }
              }}
            >
              <div className="skiper35-title-container">
                <span className="skiper35-date-vert">{ms.date}</span>
                <span className="skiper35-title">{ms.title}</span>
              </div>
              
              <div className="skiper35-content-wrapper">
                {ms.image && (
                  <div className="skiper35-image-container">
                    <img
                      src={ms.image}
                      alt={ms.title}
                      className="skiper35-image"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="skiper35-details">
                  <div className="skiper35-title-inline">{ms.title}</div>
                  <div className="skiper35-desc-inline">{ms.desc}</div>
                </div>
              </div>
            </div>
          );
        })}
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
    </>
  );
}
