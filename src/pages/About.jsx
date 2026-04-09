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
    title: 'Experience',
    description:
      'I\'ve been building real-world projects for over a year — from full-stack web apps and REST APIs to machine learning pipelines. I focus on writing clean, maintainable code and shipping products that solve actual problems.',
    image: experienceImg,
  },
  {
    id: 'education',
    title: 'Education',
    description:
      'Currently pursuing my degree in Computer Science. I supplement academics with online courses, open-source contributions, and self-driven projects to stay ahead of the curve.',
    image: educationImg,
  },
  {
    id: 'hobbies',
    title: 'Hobbies',
    description:
      'When I\'m not coding, you\'ll find me gaming, listening to music, reading tech blogs, playing basketball, or experimenting with photography. I believe creativity outside of work fuels better engineering.',
    image: hobbiesImg,
  },
  {
    id: 'based-in',
    title: 'Based In',
    description:
      'I\'m based in India and open to remote opportunities worldwide. I thrive in async-first environments and love collaborating with global teams across different time zones.',
    image: locationImg,
  },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      className="about-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Heading ── */}
      <h1 className="about-title">About Me</h1>

      <p className="about-intro">
        I'm a full-stack developer and a keen learner, building real-world
        applications while improving my skills through hands-on projects. I
        focus on backend systems, scalable applications, and practical
        problem-solving.
      </p>

      {/* ── Feature section (Toggl-style) ── */}
      <div className="about-features">
        {/* Left — clickable list */}
        <div className="about-features__nav">
          {sections.map((section, i) => (
            <button
              key={section.id}
              className={`about-features__item ${i === activeIndex ? 'about-features__item--active' : ''}`}
              onClick={() => setActiveIndex(i)}
            >
              <span className="about-features__accent" />
              <div className="about-features__text">
                <h3 className="about-features__heading">{section.title}</h3>
                <p className="about-features__desc">{section.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right — image */}
        <div className="about-features__media">
          <AnimatePresence mode="wait">
            <motion.img
              key={sections[activeIndex].id}
              src={sections[activeIndex].image}
              alt={sections[activeIndex].title}
              className="about-features__image"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            />
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
