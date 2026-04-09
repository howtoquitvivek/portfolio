import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Work.css';

import webdevImg from '../assets/work-webdev.png';
import mlImg from '../assets/work-ml.png';
import opensourceImg from '../assets/work-opensource.png';
import hiremeImg from '../assets/work-hireme.png';
import androidImg from '../assets/work-android.png';

const tabs = [
  {
    id: 'webdev',
    label: 'Web Development',
    heading: 'Full-stack web applications',
    description:
      'Building modern, responsive web applications from concept to deployment. I work across the entire stack — React frontends, Node/Express backends, databases, and cloud deployment.',
    features: [
      'React & Next.js SPAs',
      'REST & GraphQL APIs',
      'Database design & optimization',
      'CI/CD & cloud deployment',
    ],
    cta: 'Start a project',
    ctaHref: 'mailto:vivekbarman425@gmail.com?subject=Web Development Project',
    image: webdevImg,
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    heading: 'Intelligent solutions with ML',
    description:
      'Applying machine learning to solve real-world problems — from data preprocessing and model training to evaluation and deployment of predictive systems.',
    features: [
      'Data analysis & visualization',
      'Model training & evaluation',
      'NLP & computer vision',
      'ML pipeline development',
    ],
    cta: 'Discuss an ML project',
    ctaHref: 'mailto:vivekbarman425@gmail.com?subject=Machine Learning Project',
    image: mlImg,
  },
  {
    id: 'opensource',
    label: 'Open Source',
    heading: 'Contributing to open source',
    description:
      'I actively contribute to open-source projects and am always looking for impactful repositories to collaborate on. Let\'s build something the community can use.',
    features: [
      'Bug fixes & feature PRs',
      'Documentation improvements',
      'Code reviews & mentoring',
      'Community-driven projects',
    ],
    cta: 'View my GitHub',
    ctaHref: 'https://github.com/howtoquitvivek',
    image: opensourceImg,
  },
  {
    id: 'hireme',
    label: 'Hire Me',
    heading: 'Available for opportunities',
    description:
      'I\'m open to internships, freelance work, and full-time roles where I can grow and deliver value. I bring strong fundamentals, fast learning, and genuine passion.',
    features: [
      'Internships & co-ops',
      'Freelance contracts',
      'Full-time positions',
      'Remote or on-site',
    ],
    cta: 'Get in touch',
    ctaHref: 'mailto:vivekbarman425@gmail.com?subject=Job Opportunity',
    image: hiremeImg,
  },
  {
    id: 'android',
    label: 'Android Apps',
    heading: 'Native Android development',
    description:
      'Crafting performant Android applications with Kotlin and Jetpack Compose. From idea through Play Store publishing — clean architecture, smooth UX.',
    features: [
      'Kotlin & Jetpack Compose',
      'Material Design 3',
      'Room, Retrofit & Hilt',
      'Play Store deployment',
    ],
    cta: 'Build an app together',
    ctaHref: 'mailto:vivekbarman425@gmail.com?subject=Android App Project',
    image: androidImg,
  },
];

export default function Work() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab];

  return (
    <motion.div
      className="work-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Hero heading ── */}
      <h1 className="work-title">Work With Me</h1>
      <p className="work-subtitle">
        I'm open to real-world projects, collaborations, and learning
        opportunities where I can build and improve as a developer.
      </p>

      {/* ── Pill tabs ── */}
      <div className="work-tabs" role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={i === activeTab}
            className={`work-tab ${i === activeTab ? 'work-tab--active' : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Content card ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          className="work-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="work-card__body">
            <h2 className="work-card__heading">{current.heading}</h2>
            <p className="work-card__desc">{current.description}</p>

            <div className="work-card__features">
              <span className="work-card__features-label">What I bring:</span>
              <ul className="work-card__features-list">
                {current.features.map((f, i) => (
                  <li key={i}>
                    <span className="feature-diamond">✦</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={current.ctaHref}
              className="btn btn-secondary work-card__cta"
              target={current.ctaHref.startsWith('http') ? '_blank' : undefined}
              rel={current.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {current.cta}
            </a>
          </div>

          <div className="work-card__image">
            <img src={current.image} alt={current.label} />
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
