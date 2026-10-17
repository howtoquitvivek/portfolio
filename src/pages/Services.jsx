import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Globe, User, LayoutDashboard, ArrowRight, ExternalLink } from 'lucide-react';
import { PRICING_CONFIG } from '../config/pricing';
import { WORK_PROJECTS } from '../config/workProjects';
import '../styles/StudioShared.css';
import '../styles/Services.css';
import '../styles/Work.css';

export default function Services() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Services & Work — Vivek Studio';
    if (location.hash === '#work') {
      const el = document.getElementById('work');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 120);
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);

  const categories = [
    {
      ...PRICING_CONFIG.categories.business,
      icon: Globe
    },
    {
      ...PRICING_CONFIG.categories.portfolio,
      icon: User
    },
    {
      ...PRICING_CONFIG.categories.dashboard,
      icon: LayoutDashboard
    }
  ];

  return (
    <div className="studio-page">
      <div className="studio-container">
        {/* 1. Services Header */}
        <header className="studio-header">
          <div className="studio-kicker">Web Development Services</div>
          <h1 className="studio-title">
            Engineering services & <span>indicative pricing.</span>
          </h1>
          <p className="studio-description">
            Production-grade business websites, portfolios, and internal dashboards.
            Clean code, responsive layouts, and transparent pricing.
          </p>
        </header>

        {/* 3 Categories Grid */}
        <div className="services-grid" role="region" aria-label="Services List">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <article key={cat.id} className="studio-card service-card">
                {/* Header */}
                <div className="service-card-header">
                  <div className="service-meta-row">
                    <div className="service-icon-box">
                      <Icon size={18} />
                    </div>
                    <div className="service-price-tag">
                      ₹{cat.minPrice.toLocaleString('en-IN')} – ₹{cat.maxPrice.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <h2 className="service-title">{cat.title}</h2>
                  <p className="service-audience">{cat.shortDesc}</p>
                </div>

                {/* Deliverables */}
                <div className="service-section-title">Included Scope</div>
                <ul className="service-deliverables-list">
                  {cat.deliverables.map((item, i) => (
                    <li key={i} className="service-deliverable-item">
                      <span className="service-bullet">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Exclusions Note */}
                <div className="service-exclusions-note">
                  <strong>Exclusions:</strong> {cat.exclusions.join(', ')}.
                </div>

                {/* Action CTA */}
                <div className="service-action">
                  <Link 
                    to={`/get-a-quote?category=${cat.id}`}
                    className="studio-btn-primary"
                    style={{ width: '100%' }}
                  >
                    <span>Configure Estimate</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Services Bottom Row */}
        <div className="services-footer-row">
          <p className="services-footer-text">
            Need a tailored configuration or have specific technical requirements?
          </p>
          <Link to="/get-a-quote" className="studio-btn-secondary">
            <span>Open Custom Quote Builder</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* 2. Work & Case Studies (starts when scrolling past services) */}
        <div id="work" className="services-work-section">
          <header className="studio-header">
            <div className="studio-kicker">Case Studies & Demos</div>
            <h2 className="studio-title">
              Verified work. <span>Inspectable code.</span>
            </h2>
            <p className="studio-description">
              Real builds with working live deployments and open source repositories.
              No fabricated clients or artificial statistics.
            </p>
          </header>

          <div className="work-list" role="region" aria-label="Verified Work List">
            {WORK_PROJECTS.map((proj) => (
              <article key={proj.id} className="studio-card work-item-card">
                <div className="work-item-header">
                  <div className="work-item-title-group">
                    <span className="work-item-tag">{proj.category}</span>
                    <h3 className="work-item-title">{proj.title}</h3>
                  </div>

                  <div className="work-item-actions">
                    {proj.liveUrl && (
                      <a 
                        href={proj.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="studio-btn-primary"
                        aria-label={`Open live demo of ${proj.title}`}
                      >
                        <span>Live Demo</span>
                        <ExternalLink size={14} />
                      </a>
                    )}

                    {proj.repoUrl && (
                      <a 
                        href={proj.repoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="studio-btn-secondary"
                        aria-label={`View GitHub repository for ${proj.title}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="work-item-body">
                  <div className="work-item-meta">
                    <div>
                      <div className="work-meta-label">Context & Problem Solved</div>
                      <p className="work-meta-text">{proj.problemSolved}</p>
                    </div>
                    <div>
                      <div className="work-meta-label">Target Audience</div>
                      <p className="work-meta-text">{proj.audience}</p>
                    </div>
                    <div>
                      <div className="work-meta-label">Technologies</div>
                      <div className="work-tech-pills">
                        {proj.tech.map((t) => (
                          <span key={t} className="work-tech-pill">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="work-meta-label">What Was Built</div>
                    <ul className="work-deliverables-list">
                      {proj.deliverables.map((item, idx) => (
                        <li key={idx} className="work-deliverable-item">
                          <span className="work-bullet">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
