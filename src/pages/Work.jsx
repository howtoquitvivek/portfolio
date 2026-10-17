import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { WORK_PROJECTS } from '../config/workProjects';
import '../styles/StudioShared.css';
import '../styles/Work.css';

export default function Work() {
  useEffect(() => {
    document.title = 'Verified Work & Demos — Vivek Studio';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="studio-page">
      <div className="studio-container">
        {/* Header */}
        <header className="studio-header">
          <div className="studio-kicker">Case Studies & Demos</div>
          <h1 className="studio-title">
            Verified work. <span>Inspectable code.</span>
          </h1>
          <p className="studio-description">
            Real builds with working live deployments and open source repositories.
            No fabricated clients or artificial statistics.
          </p>
        </header>

        {/* Project List */}
        <section className="work-list" aria-label="Work List">
          {WORK_PROJECTS.map((proj) => (
            <article key={proj.id} className="studio-card work-item-card">
              <div className="work-item-header">
                <div className="work-item-title-group">
                  <span className="work-item-tag">{proj.category}</span>
                  <h2 className="work-item-title">{proj.title}</h2>
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
        </section>
      </div>
    </div>
  );
}
