import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/About.css';

import { getThemedAsset } from '../utils/themeUtils';

const sectionsData = [
  {
    id: 'experience',
    label: 'Experience',
    title: 'Experience',
    description:
      'I\'ve been building real-world projects for over a year — from full-stack web apps and REST APIs to machine learning pipelines. I focus on writing clean, scaleable and maintainable code.',
  },
  {
    id: 'education',
    label: 'Education',
    title: 'Education',
    description:
      'Currently pursuing my degree in B.Tech. CSE Data Science. I supplement academics with online courses, open-source contributions, and self-driven projects to stay ahead of the curve.',
  },
  {
    id: 'hobbies',
    label: 'Hobbies',
    title: 'Creative Fuel',
    description:
      'When I\'m not coding, you\'ll find me gaming, listening to music, reading tech blogs & books, or simply chilling.  I believe creativity outside of work fuels better engineering.',
  },
  {
    id: 'location',
    label: 'Based In',
    title: 'Working Globally',
    description:
      'I\'m based in India and open to remote opportunities worldwide. I thrive in async-first environments and love collaborating with teams across the globe.',
  },
];

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sections = sectionsData.map(s => ({
    ...s,
    image: getThemedAsset('about', 'pc', s.id),
    mobileImage: getThemedAsset('about', 'mobile', s.id)
  }));

  const current = sections[activeIndex];

  const getTabClassAndStyle = (i) => {
    if (i === activeIndex) {
      return {
        className: 'about-tab-vertical about-tab-vertical--active',
        style: {
          opacity: 1,
          WebkitMaskImage: 'none',
          maskImage: 'none',
        },
      };
    }

    const dist = Math.abs(i - activeIndex);
    const isBelow = i > activeIndex;

    let startAlpha = 0.95;
    let endAlpha = 0.6;
    let baseOpacity = 0.85;

    if (dist === 1) {
      startAlpha = 0.95;
      endAlpha = 0.55;
      baseOpacity = 0.85;
    } else if (dist === 2) {
      startAlpha = 0.85;
      endAlpha = 0.42;
      baseOpacity = 0.72;
    } else {
      startAlpha = 0.75;
      endAlpha = 0.35;
      baseOpacity = 0.62;
    }

    const maskGrad = isBelow
      ? `linear-gradient(180deg, rgba(0,0,0,${startAlpha}) 0%, rgba(0,0,0,${endAlpha}) 100%)`
      : `linear-gradient(0deg, rgba(0,0,0,${startAlpha}) 0%, rgba(0,0,0,${endAlpha}) 100%)`;

    return {
      className: `about-tab-vertical about-tab-vertical--inactive about-tab-vertical--dist-${dist}`,
      style: {
        opacity: baseOpacity,
        WebkitMaskImage: maskGrad,
        maskImage: maskGrad,
      },
    };
  };

  return (
    <section className="section-container" id="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About <span>Me</span></h2>
          <p className="section-intro">
            I'm a full-stack developer and a keen learner, building real-world
            applications while improving my skills through hands-on projects.
          </p>
        </div>
      </div>

      <div className="about-layout">
        {/* Left Options Segment */}
        <div className="about-tabs-vertical">
          {sections.map((section, i) => {
            const { className, style } = getTabClassAndStyle(i);
            const isActive = i === activeIndex;

            return (
              <button
                key={section.id}
                type="button"
                className={className}
                style={style}
                onClick={() => setActiveIndex(i)}
              >
                {isActive && (
                  <motion.div
                    layoutId="about-indicator"
                    className="about-tab-indicator"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <div className="about-tab-vertical__text">
                  <h3 className="about-tab-vertical__title">{section.title}</h3>
                  <p className="about-tab-vertical__description">{section.description}</p>
                  {/* Mobile Image (Accordion Style) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div 
                        className="about-tab-mobile-image"
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <img src={section.mobileImage} alt={section.label} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Image Display Segment */}
        <div className="about-content-area">
          <div className="about-image-display-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="about-image-display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <img src={current.image} alt={current.label} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
