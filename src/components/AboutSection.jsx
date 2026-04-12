import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/About.css';

import experienceImg from '../assets/about-experience.png';
import educationImg from '../assets/about-education.png';
import hobbiesImg from '../assets/about-hobbies.png';
import locationImg from '../assets/about-location.png';

import experienceMobileImg from '../assets/about-experience-mobile.png';
import educationMobileImg from '../assets/about-education-mobile.png';
import hobbiesMobileImg from '../assets/about-hobbies-mobile.png';
import locationMobileImg from '../assets/about-location-mobile.png';

const sections = [
  {
    id: 'experience',
    label: 'Experience',
    title: 'Experience',
    description:
      'I\'ve been building real-world projects for over a year — from full-stack web apps and REST APIs to machine learning pipelines. I focus on writing clean, scaleable and maintainable code.',
    image: experienceImg,
    mobileImage: experienceMobileImg,
  },
  {
    id: 'education',
    label: 'Education',
    title: 'Education',
    description:
      'Currently pursuing my degree in B.Tech. CSE Data Science. I supplement academics with online courses, open-source contributions, and self-driven projects to stay ahead of the curve.',
    image: educationImg,
    mobileImage: educationMobileImg,
  },
  {
    id: 'hobbies',
    label: 'Hobbies',
    title: 'Creative Fuel',
    description:
      'When I\'m not coding, you\'ll find me gaming, listening to music, reading tech blogs & books, or simply chilling.  I believe creativity outside of work fuels better engineering.',
    image: hobbiesImg,
    mobileImage: hobbiesMobileImg,
  },
  {
    id: 'location',
    label: 'Based In',
    title: 'Working Globally',
    description:
      'I\'m based in India and open to remote opportunities worldwide. I thrive in async-first environments and love collaborating with teams across the globe.',
    image: locationImg,
    mobileImage: locationMobileImg,
  },
];

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = sections[activeIndex];

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
          {sections.map((section, i) => (
            <button
              key={section.id}
              className={`about-tab-vertical ${i === activeIndex ? 'about-tab-vertical--active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              {i === activeIndex && (
                <motion.div
                  layoutId="about-indicator"
                  className="about-tab-indicator"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <div className="about-tab-vertical__text">
                <h3 className="about-tab-vertical__title">{section.title}</h3>
                <p className="about-tab-vertical__description">{section.description}</p>
                {/* Mobile Image (Accordion Style) */}
                <AnimatePresence>
                  {i === activeIndex && (
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
          ))}
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
