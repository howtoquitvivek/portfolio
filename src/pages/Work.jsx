import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Work.css';

import { config } from '../config';
import { getStaticAsset } from '../utils/themeUtils';
import ProjectsSection from '../components/ProjectsSection';

const { work } = config;
const { subtitle: workSubtitle, tabs: workTabs } = work;

export default function Work() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);
  
  // Initialize mode from URL query parameter
  const [mainMode, setMainMode] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('mode') === 'work' ? 'work' : 'with-me';
  });

  // Sync mode if URL changes while component is mounted
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    if (mode === 'work' || mode === 'with-me') {
      setMainMode(mode);
    }
  }, [location.search]);

  const tabs = workTabs.map(t => ({
    ...t,
    image: getStaticAsset('work', t.item)
  }));

  const current = tabs[activeTab];

  return (
    <div className="work-page">
      {/* ── Hero heading (Dynamic Tab Switcher) ── */}
      <motion.div layout className="dynamic-title-container" style={{ marginBottom: '1.25rem' }}>
        <h1 className="work-title dynamic-title" style={{ marginBottom: 0, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          <motion.span 
            layout 
            className={mainMode === 'work' ? "active-text" : "inactive-text"} 
            onClick={() => setMainMode('work')}
            animate={{ color: 'var(--color-text)', opacity: mainMode === 'work' ? 1 : 0.4 }}
            transition={{ duration: 0.4 }}
            style={{ cursor: 'pointer', marginRight: mainMode === 'work' ? '0.25em' : 0 }}
          >
            See my
          </motion.span>

          <AnimatePresence mode="popLayout" initial={false}>
            {mainMode === 'with-me' && (
              <motion.span 
                layout
                initial={{ opacity: 0, scale: 0, width: 0 }}
                animate={{ opacity: 0.4, scale: 1, width: 'auto' }}
                exit={{ opacity: 0, scale: 0, width: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="slash-text inactive-text"
              >
                /
              </motion.span>
            )}
          </AnimatePresence>

          <motion.span layout style={{ display: 'inline-flex', alignItems: 'center', marginRight: mainMode === 'with-me' ? '0.25em' : 0 }}>
            <motion.span 
              className="active-text" 
              style={{ cursor: 'pointer' }}
              onClick={() => setMainMode(mainMode === 'work' ? 'with-me' : 'work')}
            >
              Work
            </motion.span>
            <AnimatePresence mode="popLayout" initial={false}>
              {mainMode === 'work' && (
                <motion.span 
                  layout
                  initial={{ opacity: 0, scale: 0, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: 'auto' }}
                  exit={{ opacity: 0, scale: 0, width: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="active-text"
                >
                  .
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>

          <AnimatePresence mode="popLayout" initial={false}>
            {mainMode === 'work' && (
              <motion.span 
                layout
                initial={{ opacity: 0, scale: 0, width: 0 }}
                animate={{ opacity: 0.4, scale: 1, width: 'auto' }}
                exit={{ opacity: 0, scale: 0, width: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="slash-text inactive-text"
              >
                /
              </motion.span>
            )}
          </AnimatePresence>

          <motion.span layout style={{ display: 'inline-flex', alignItems: 'center' }}>
            <motion.span 
              className={mainMode === 'with-me' ? "active-text" : "inactive-text"} 
              onClick={() => setMainMode('with-me')}
              animate={{ color: 'var(--color-text)', opacity: mainMode === 'with-me' ? 1 : 0.4 }}
              transition={{ duration: 0.4 }}
              style={{ cursor: 'pointer' }}
            >
              with me
            </motion.span>
            <AnimatePresence mode="popLayout" initial={false}>
              {mainMode === 'with-me' && (
                <motion.span 
                  layout
                  initial={{ opacity: 0, scale: 0, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: 'auto' }}
                  exit={{ opacity: 0, scale: 0, width: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="active-text"
                >
                  .
                </motion.span>
              )}
            </AnimatePresence>
          </motion.span>
        </h1>
      </motion.div>
      <p className="work-subtitle">
        {workSubtitle}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {mainMode === 'with-me' ? (
          <motion.div
            key="with-me"
            initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.98, filter: 'blur(8px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
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
                  {i === activeTab && (
                    <motion.div
                      layoutId="active-pill"
                      className="work-tab-pill"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="work-tab-label">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* ── Content card ── */}
            <div className="work-card">
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
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="work"
            initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, scale: 0.98, filter: 'blur(8px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProjectsSection hideHeader={true} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
