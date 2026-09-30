import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Globe, Code2, Eye, Shield, Cpu, ExternalLink, ChevronRight } from 'lucide-react';
import { FaGithub as Github } from 'react-icons/fa';
import '../../styles/FolderCard.css';
import '../../styles/Projects.css';

const FILE_ICONS = [
  <Globe key="globe" className="file-icon" />,
  <Cpu key="cpu" className="file-icon" />,
  <Code2 key="code" className="file-icon" />,
  <Eye key="eye" className="file-icon" />,
  <Shield key="shield" className="file-icon" />
];

export const FolderProjects = ({ projects = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const animTimer = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
    p.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayProjects = projects.slice(0, 5);
  const currentIndex = selectedProject 
    ? displayProjects.findIndex(p => p.title === selectedProject.title) 
    : 0;
  
  const currentProjectCount = String(currentIndex + 1).padStart(2, '0');
  const totalProjectCount = String(displayProjects.length).padStart(2, '0');

  const handleNextProject = (e) => {
    e.stopPropagation();
    if (!isOpen) {
      setIsOpen(true);
    }
    const nextIndex = (currentIndex + 1) % displayProjects.length;
    setSelectedProject(displayProjects[nextIndex]);
  };

  const handleFolderClick = () => {
    clearTimeout(animTimer.current);
    setIsAnimating(true);
    setIsOpen(prev => {
      const nextOpen = !prev;
      if (nextOpen && !selectedProject) {
        setSelectedProject(displayProjects[0] || projects[0] || null);
      }
      return nextOpen;
    });
    animTimer.current = setTimeout(() => setIsAnimating(false), 700);
  };

  const handleFileClick = (e, project) => {
    e.stopPropagation();
    if (!isOpen) {
      setIsOpen(true);
    }
    setSelectedProject(project);
  };

  return (
    <div className="folder-section-wrapper">
      {/* Use a div, NOT a label — avoids the double-toggle checkbox bug */}
      <div
        className={`folder-card ${isOpen ? 'is-open' : ''} ${isAnimating ? 'is-animating' : ''}`}
        onClick={handleFolderClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleFolderClick(); } }}
      >
        {/* Hint text & arrow */}
        <div className="hint-wrapper">
          <span className="hint-text">Click to explore</span>
          <svg
            className="hint-arrow"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M 35 5 C 35 5, 15 5, 10 25 M 10 25 L 3 18 M 10 25 L 18 22"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="folder-container">
          {/* FOLDER BACK */}
          <svg className="folder-back" viewBox="0 0 50 40" fill="none">
            <path
              d="M0 4C0 1.79086 1.79086 0 4 0H16.524C17.721 0 18.8415 0.54051 19.574 1.4673L22.426 5.0654C23.1585 5.99219 24.279 6.5327 25.476 6.5327H46C48.2091 6.5327 50 8.32356 50 10.5327V36C50 38.2091 48.2091 40 46 40H4C1.79086 40 0 38.2091 0 36V4Z"
              fill="#16181F"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="0.5"
            />
          </svg>

          {/* SEARCH BAR */}
          <div
            className="folder-search"
            onClick={(e) => e.stopPropagation()}
          >
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* PROJECT FILES */}
          {projects.slice(0, 5).map((project, index) => {
            const positionIndex = (index - currentIndex + 5) % 5;
            const fileClass = `file file-${positionIndex + 1} color-${index + 1}`;
            const isMatch = filteredProjects.some(fp => fp.title === project.title);
            const tagPreview = project.tags.slice(0, 2).join(' \u2022 ').toUpperCase();

            return (
              <div
                key={project.title}
                className={fileClass}
                style={{
                  opacity: searchQuery && !isMatch ? 0.25 : 1,
                  pointerEvents: positionIndex === 0 ? 'auto' : 'none', // Optional: Only front card is clickable, though handleFileClick manages it
                }}
                onClick={(e) => handleFileClick(e, project)}
                title={`Click to view ${project.title}`}
              >
                <div className="shine" />
                {FILE_ICONS[index % FILE_ICONS.length]}
                <div className="file-text">{project.title}</div>
                <div className="file-tag">{tagPreview}</div>
              </div>
            );
          })}

          {/* FOLDER FRONT FLAP & COUNTER */}
          <div className="folder-front-wrapper">
            <svg className="folder-front" viewBox="0 0 50 34" fill="none">
              <path
                d="M0 4C0 1.79086 1.79086 0 4 0H46C48.2091 0 50 1.79086 50 4V30C50 32.2091 48.2091 34 46 34H4C1.79086 34 0 32.2091 0 30V4Z"
                fill="rgba(28, 31, 40, 0.96)"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="0.5"
              />
            </svg>
            <div className="folder-label" />
            <div className="counter" onClick={handleNextProject} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="counter-label">PROJECTS</span>
              <span className="counter-number">{currentProjectCount}/{totalProjectCount}</span>
              <ChevronRight size={14} style={{ color: 'var(--color-text)', opacity: 0.7 }} />
            </div>
          </div>
        </div>
      </div>


      {/* PROJECT PRESENTATION SIDE PANEL */}
      <AnimatePresence>
        {selectedProject && isOpen && (
          <motion.div
            className="folder-project-presentation code-editor"
            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="code-editor-header">
              <div className="code-editor-dots">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green" />
              </div>
              <span className="code-editor-title">{selectedProject.title.toLowerCase().replace(/\s+/g, '-')}.ts</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="code-editor-icon" onClick={() => setIsOpen(false)}>
                <path strokeLinecap="round" strokeWidth="2" stroke="currentColor" d="M6 6L18 18" />
                <path strokeLinecap="round" strokeWidth="2" stroke="currentColor" d="M18 6L6 18" />
              </svg>
            </div>
            <div className="code-editor-content">
              <code className="code">
                <p className="syn-comment">// Project {currentProjectCount}/{totalProjectCount}</p>
                <p>
                  <span className="syn-keyword">const </span>
                  <span className="syn-var">project</span>
                  <span className="syn-punc">: </span>
                  <span className="syn-type">ProjectConfig</span>
                  <span className="syn-punc"> = </span>
                  <span className="syn-bracket">{"{"}</span>
                </p>

                <p className="property">
                  <span className="syn-key">title</span>
                  <span className="syn-punc">: </span>
                  <span className="syn-str">"{selectedProject.title}"</span>
                  <span className="syn-punc">,</span>
                </p>
                <p className="property">
                  <span className="syn-key">description</span>
                  <span className="syn-punc">: </span>
                  <span className="syn-str">"{selectedProject.desc}"</span>
                  <span className="syn-punc">,</span>
                </p>
                <p className="property">
                  <span className="syn-key">techStack</span>
                  <span className="syn-punc">: </span>
                  <span className="syn-bracket">[</span>
                  {selectedProject.tags.map((tag, i) => (
                    <React.Fragment key={tag}>
                      <span className="syn-tag">"{tag}"</span>
                      {i < selectedProject.tags.length - 1 && <span className="syn-punc">, </span>}
                    </React.Fragment>
                  ))}
                  <span className="syn-bracket">]</span>
                  <span className="syn-punc">,</span>
                </p>
                {selectedProject.live && (
                  <p className="property">
                    <span className="syn-key">liveDemo</span>
                    <span className="syn-punc">: </span>
                    <a href={selectedProject.live} target="_blank" rel="noopener noreferrer" className="syn-link">
                      "Launch App ↗"
                    </a>
                    <span className="syn-punc">,</span>
                  </p>
                )}
                {selectedProject.source && (
                  <p className="property">
                    <span className="syn-key">repository</span>
                    <span className="syn-punc">: </span>
                    <a href={selectedProject.source} target="_blank" rel="noopener noreferrer" className="syn-link">
                      "GitHub ↗"
                    </a>
                    <span className="syn-punc">,</span>
                  </p>
                )}
                <p><span className="syn-bracket">{"}"}</span><span className="syn-punc">;</span></p>
                <p style={{ marginTop: '8px' }}>
                  <span className="syn-keyword">export default </span>
                  <span className="syn-var">project</span>
                  <span className="syn-punc">;</span>
                </p>
              </code>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FolderProjects;
