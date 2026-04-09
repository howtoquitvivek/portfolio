import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/About.css';

import experienceImg from '../assets/about-experience.png';
import educationImg from '../assets/about-education.png';
import hobbiesImg from '../assets/about-hobbies.png';
import locationImg from '../assets/about-location.png';

const sections = [
  {
    id: 'experience',
    label: 'Experience',
    title: 'Building real-world solutions',
    description:
      'I\'ve been building real-world projects for over a year — from full-stack web apps and REST APIs to machine learning pipelines. I focus on writing clean, maintainable code and shipping products that solve actual problems.',
    image: experienceImg,
  },
  {
    id: 'education',
    label: 'Education',
    title: 'Academics & Self-Learning',
    description:
      'Currently pursuing my degree in Computer Science. I supplement academics with online courses, open-source contributions, and self-driven projects to stay ahead of the curve.',
    image: educationImg,
  },
  {
    id: 'hobbies',
    label: 'Hobbies',
    title: 'Creative Fuel',
    description:
      'When I\'m not coding, you\'ll find me gaming, listening to music, reading tech blogs, playing basketball, or experimenting with photography. I believe creativity outside of work fuels better engineering.',
    image: hobbiesImg,
  },
  {
    id: 'location',
    label: 'Based In',
    title: 'Working Globally',
    description:
      'I\'m based in India and open to remote opportunities worldwide. I thrive in async-first environments and love collaborating with global teams across different time zones.',
    image: locationImg,
  },
];

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = sections[activeIndex];

  return (
    <section className="section-container container" id="about">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">About <span>Me</span></h2>
        <p className="section-intro">
          I'm a full-stack developer and a keen learner, building real-world
          applications while improving my skills through hands-on projects.
        </p>
      </motion.div>

      <div className="about-layout">
        {/* Left Tabs */}
        <div className="about-tabs-vertical">
          {sections.map((section, i) => (
            <button
              key={section.id}
              className={`about-tab-vertical ${i === activeIndex ? 'about-tab-vertical--active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <div className="about-tab-vertical__text">
                <span className="about-tab-vertical__label">{section.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Right Content */}
        <div className="about-content-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              className="about-card-v glass-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="about-card-v__content">
                <h3 className="about-card-v__title">{current.title}</h3>
                <p className="about-card-v__description">{current.description}</p>
              </div>
              
              <div className="about-card-v__image">
                <img src={current.image} alt={current.label} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
