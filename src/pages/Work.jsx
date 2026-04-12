import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Work.css';

import { config } from '../config';
import { getStaticAsset } from '../utils/themeUtils';

const { work } = config;
const { title: workTitle, subtitle: workSubtitle, tabs: workTabs } = work;

export default function Work() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = workTabs.map(t => ({
    ...t,
    image: getStaticAsset('work', t.item)
  }));

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
      <h1 className="work-title">{workTitle}</h1>
      <p className="work-subtitle">
        {workSubtitle}
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
  );
}
