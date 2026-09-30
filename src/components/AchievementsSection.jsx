import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { X, ExternalLink, Image as ImageIcon } from 'lucide-react';
import '../styles/Achievements.css';
import { config } from '../config';
import { getStaticAsset } from '../utils/themeUtils';

const STEP_COLORS = [
  { text: '#F4F4F5', dot: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.25)' }, // Step 01: Silver White
  { text: '#D4D4D8', dot: '#E4E4E7', glow: 'rgba(228, 228, 231, 0.25)' }, // Step 02: Frosted Steel
  { text: '#A1A1AA', dot: '#CBD5E1', glow: 'rgba(161, 161, 170, 0.25)' }, // Step 03: Muted Titanium
  { text: '#E2E8F0', dot: '#F1F5F9', glow: 'rgba(241, 245, 249, 0.25)' }  // Step 04: Slate Platinum
];

export default function AchievementsSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);

  const milestones = config.achievements.map((ms, index) => ({
    ...ms,
    image: getStaticAsset('achievement', ms.item),
    color: STEP_COLORS[index % STEP_COLORS.length]
  }));

  // Initial curve coordinates tuned by user
  const DEFAULT_CURVE = {
    start: { x: 50, y: 0 },
    c1: { cp1x: 50, cp1y: 70, cp2x: 65, cp2y: 140, endx: 50, endy: 229 },
    c2: { cp1x: 28, cp1y: 360, cp2x: 28, cp2y: 440, endx: 50, endy: 475 },
    c3: { cp1x: 95, cp1y: 560, cp2x: 95, cp2y: 690, endx: 50, endy: 753 },
    c4: { cp1x: 20, cp1y: 810, cp2x: 51, cp2y: 910, endx: 50, endy: 1000 }
  };

  // Flow, completion speed & tail erasing defaults
  const DEFAULT_FLOW = {
    leadSpeed: 1.0,   // Completion speed
    tailErase: 0.35,  // Erases 35% of tail from behind as you scroll
    tailDelay: 0.0,   // Erasing begins immediately (0%)
    strokeWidth: 2.5, // Line thickness
    glowBlur: 5.5,    // Glow radius
    s1: 0.7,          // Step 1 light opacity
    s2: 0.9,          // Step 2 light opacity
    s3: 0.9,          // Step 3 light opacity
    s4: 1.0           // Step 4 light opacity
  };

  // State for live visual tweaking (persists to localStorage)
  const [curve, setCurve] = useState(() => {
    try {
      const saved = localStorage.getItem('milestone_curve_config');
      return saved ? JSON.parse(saved) : DEFAULT_CURVE;
    } catch {
      return DEFAULT_CURVE;
    }
  });

  const [flow, setFlow] = useState(() => {
    try {
      const saved = localStorage.getItem('milestone_flow_config');
      return saved ? JSON.parse(saved) : DEFAULT_FLOW;
    } catch {
      return DEFAULT_FLOW;
    }
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('curve'); // 'curve' or 'flow'
  const [copied, setCopied] = useState(false);

  // Listen for trigger from Header toolbar
  useEffect(() => {
    const handleToggle = () => setIsEditorOpen(prev => !prev);
    window.addEventListener('toggle-curve-tuner', handleToggle);
    return () => window.removeEventListener('toggle-curve-tuner', handleToggle);
  }, []);

  // Scroll tracking across the journey container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 30%"]
  });

  // Dynamic front completion calculation
  const rawLead = useTransform(scrollYProgress, v => Math.min(1, Math.max(0, v * flow.leadSpeed)));
  const pathLength = useSpring(rawLead, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001
  });

  // Dynamic back erasing (pathOffset) calculation
  const rawOffset = useTransform(scrollYProgress, v => {
    if (flow.tailErase <= 0 || v <= flow.tailDelay) return 0;
    const prog = (v - flow.tailDelay) / (1 - flow.tailDelay);
    return Math.min(1, Math.max(0, prog * flow.tailErase));
  });
  const pathOffset = useSpring(rawOffset, {
    stiffness: 300,
    damping: 40,
    restDelta: 0.001
  });

  // Generate pathD dynamically from curve state
  const pathD = `
    M ${curve.start.x} ${curve.start.y} 
    C ${curve.c1.cp1x} ${curve.c1.cp1y}, ${curve.c1.cp2x} ${curve.c1.cp2y}, ${curve.c1.endx} ${curve.c1.endy} 
    C ${curve.c2.cp1x} ${curve.c2.cp1y}, ${curve.c2.cp2x} ${curve.c2.cp2y}, ${curve.c2.endx} ${curve.c2.endy} 
    C ${curve.c3.cp1x} ${curve.c3.cp1y}, ${curve.c3.cp2x} ${curve.c3.cp2y}, ${curve.c3.endx} ${curve.c3.endy} 
    C ${curve.c4.cp1x} ${curve.c4.cp1y}, ${curve.c4.cp2x} ${curve.c4.cp2y}, ${curve.c4.endx} ${curve.c4.endy}
  `;

  const updateCurve = (segment, param, value) => {
    setCurve(prev => {
      const updated = {
        ...prev,
        [segment]: {
          ...prev[segment],
          [param]: Number(value)
        }
      };
      try {
        localStorage.setItem('milestone_curve_config', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const updateFlow = (param, value) => {
    setFlow(prev => {
      const updated = {
        ...prev,
        [param]: Number(value)
      };
      try {
        localStorage.setItem('milestone_flow_config', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const copyCode = () => {
    const code = `  // Tuned Path Definition
  const pathD = \`
    M ${curve.start.x} ${curve.start.y} 
    C ${curve.c1.cp1x} ${curve.c1.cp1y}, ${curve.c1.cp2x} ${curve.c1.cp2y}, ${curve.c1.endx} ${curve.c1.endy} 
    C ${curve.c2.cp1x} ${curve.c2.cp1y}, ${curve.c2.cp2x} ${curve.c2.cp2y}, ${curve.c2.endx} ${curve.c2.endy} 
    C ${curve.c3.cp1x} ${curve.c3.cp1y}, ${curve.c3.cp2x} ${curve.c3.cp2y}, ${curve.c3.endx} ${curve.c3.endy} 
    C ${curve.c4.cp1x} ${curve.c4.cp1y}, ${curve.c4.cp2x} ${curve.c4.cp2y}, ${curve.c4.endx} ${curve.c4.endy}
  \`;

  // Flow & Erasing settings:
  // Lead Speed: ${flow.leadSpeed}x, Tail Erase: ${Math.round(flow.tailErase * 100)}%, Delay: ${Math.round(flow.tailDelay * 100)}%
  // Stroke: ${flow.strokeWidth}px, Glow: ${flow.glowBlur}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAll = () => {
    setCurve(DEFAULT_CURVE);
    setFlow(DEFAULT_FLOW);
    localStorage.removeItem('milestone_curve_config');
    localStorage.removeItem('milestone_flow_config');
  };

  const openLightbox = (img) => setSelectedImage(img);
  const closeLightbox = () => setSelectedImage(null);

  return (
    <section className="section-container container journey-section-root" id="achievements">
      <div className="section-header">
        <h2 className="section-title">Key <span>Milestones</span></h2>
        <p className="section-intro">
          A timeline tracking my key achievements, hackathon wins, and certifications.
          Each step represents a leap in my journey as a developer.
        </p>
      </div>

      <div className="superdesign-journey-container" ref={containerRef}>
        {/* Full background SVG Journey Line */}
        <div className="superdesign-svg-wrapper" aria-hidden="true">
          <svg
            className="superdesign-svg"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="journey-flow-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity={flow.s1} />
                <stop offset="35%" stopColor="#E4E4E7" stopOpacity={flow.s2} />
                <stop offset="70%" stopColor="#A1A1AA" stopOpacity={flow.s3} />
                <stop offset="100%" stopColor="#FAFAFA" stopOpacity={flow.s4} />
              </linearGradient>
              <filter id="journey-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={flow.glowBlur} result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Vibrant scroll-drawn line with dynamic length & back-erase */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#journey-flow-grad)"
              strokeWidth={flow.strokeWidth}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength, pathOffset }}
              filter="url(#journey-soft-glow)"
            />
          </svg>
        </div>

        {/* Milestone Steps with Clean Typography & Alternating Layout */}
        <div className="superdesign-steps">
          {milestones.map((ms, index) => {
            const isEven = index % 2 === 0;
            const stepNum = String(index + 1).padStart(2, '0');
            const stepColor = ms.color;

            return (
              <div key={index} className="superdesign-step-item">
                <div className="superdesign-grid">
                  {/* Left Column */}
                  <div className="superdesign-col superdesign-col-left">
                    {isEven ? (
                      <motion.div
                        className="superdesign-content text-right"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span
                          className="superdesign-step-label"
                          style={{ color: stepColor.text }}
                        >
                          Step {stepNum} &bull; {ms.date}
                        </span>
                        <h3 className="superdesign-title">{ms.title}</h3>
                        <p className="superdesign-desc">{ms.desc}</p>

                        {ms.image && (
                          <button
                            className="superdesign-preview-btn"
                            onClick={() => openLightbox(ms.image)}
                          >
                            <ImageIcon size={14} />
                            <span>View Credential Preview</span>
                          </button>
                        )}
                      </motion.div>
                    ) : (
                      <div className="superdesign-spacer" />
                    )}
                  </div>

                  {/* Right Column */}
                  <div className="superdesign-col superdesign-col-right">
                    {!isEven ? (
                      <motion.div
                        className="superdesign-content text-left"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-15%" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <span
                          className="superdesign-step-label"
                          style={{ color: stepColor.text }}
                        >
                          Step {stepNum} &bull; {ms.date}
                        </span>
                        <h3 className="superdesign-title">{ms.title}</h3>
                        <p className="superdesign-desc">{ms.desc}</p>

                        {ms.image && (
                          <button
                            className="superdesign-preview-btn"
                            onClick={() => openLightbox(ms.image)}
                          >
                            <ImageIcon size={14} />
                            <span>View Credential Preview</span>
                          </button>
                        )}
                      </motion.div>
                    ) : (
                      <div className="superdesign-spacer" />
                    )}
                  </div>
                </div>

                {/* Glowing Node Dot on the SVG Line */}
                <div
                  className="superdesign-node-dot"
                  style={{
                    backgroundColor: stepColor.dot,
                    boxShadow: `0 0 0 6px ${stepColor.glow}, 0 0 14px ${stepColor.dot}`
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual Tuner Drawer with Curve & Flow Tabs (Dev-only) */}
      <AnimatePresence>
        {import.meta.env.DEV && isEditorOpen && (
          <motion.div
            className="curve-editor-drawer"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
          >
            <div className="curve-editor-header">
              <div className="curve-editor-title">
                <span>⚡ Live Curve & Flow Tuner</span>
                <span className="curve-editor-subtitle">Real-time path & erase controls</span>
              </div>
              <button className="curve-editor-close" onClick={() => setIsEditorOpen(false)}>
                <X size={16} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="curve-editor-tabs">
              <button
                className={`curve-tab-btn ${activeTab === 'curve' ? 'active' : ''}`}
                onClick={() => setActiveTab('curve')}
              >
                📐 Curve Path
              </button>
              <button
                className={`curve-tab-btn ${activeTab === 'flow' ? 'active' : ''}`}
                onClick={() => setActiveTab('flow')}
              >
                🌊 Flow & Erase
              </button>
            </div>

            <div className="curve-editor-body">
              {activeTab === 'curve' ? (
                <>
                  {/* Step 1 Curve Controls */}
                  <div className="curve-control-group">
                    <span className="group-title">Step 01 Curve</span>
                    <div className="slider-row">
                      <label>Bend X (Width)</label>
                      <input
                        type="range"
                        min="40"
                        max="90"
                        value={curve.c1.cp2x}
                        onChange={(e) => updateCurve('c1', 'cp2x', e.target.value)}
                      />
                      <span className="slider-val">{curve.c1.cp2x}</span>
                    </div>
                    <div className="slider-row">
                      <label>Landing Y</label>
                      <input
                        type="range"
                        min="150"
                        max="350"
                        value={curve.c1.endy}
                        onChange={(e) => updateCurve('c1', 'endy', e.target.value)}
                      />
                      <span className="slider-val">{curve.c1.endy}</span>
                    </div>
                  </div>

                  {/* Step 2 Curve Controls */}
                  <div className="curve-control-group">
                    <span className="group-title">Step 02 Curve</span>
                    <div className="slider-row">
                      <label>Bend X (Width)</label>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={curve.c2.cp1x}
                        onChange={(e) => {
                          updateCurve('c2', 'cp1x', e.target.value);
                          updateCurve('c2', 'cp2x', e.target.value);
                        }}
                      />
                      <span className="slider-val">{curve.c2.cp1x}</span>
                    </div>
                    <div className="slider-row">
                      <label>Landing Y</label>
                      <input
                        type="range"
                        min="350"
                        max="600"
                        value={curve.c2.endy}
                        onChange={(e) => updateCurve('c2', 'endy', e.target.value)}
                      />
                      <span className="slider-val">{curve.c2.endy}</span>
                    </div>
                  </div>

                  {/* Step 3 Curve Controls */}
                  <div className="curve-control-group">
                    <span className="group-title">Step 03 Curve</span>
                    <div className="slider-row">
                      <label>Bend X (Width)</label>
                      <input
                        type="range"
                        min="50"
                        max="95"
                        value={curve.c3.cp1x}
                        onChange={(e) => {
                          updateCurve('c3', 'cp1x', e.target.value);
                          updateCurve('c3', 'cp2x', e.target.value);
                        }}
                      />
                      <span className="slider-val">{curve.c3.cp1x}</span>
                    </div>
                    <div className="slider-row">
                      <label>Landing Y</label>
                      <input
                        type="range"
                        min="650"
                        max="850"
                        value={curve.c3.endy}
                        onChange={(e) => updateCurve('c3', 'endy', e.target.value)}
                      />
                      <span className="slider-val">{curve.c3.endy}</span>
                    </div>
                  </div>

                  {/* Step 4 Curve Controls */}
                  <div className="curve-control-group">
                    <span className="group-title">Step 04 / Bottom Tail</span>
                    <div className="slider-row">
                      <label>Tail Bend X</label>
                      <input
                        type="range"
                        min="10"
                        max="60"
                        value={curve.c4.cp1x}
                        onChange={(e) => updateCurve('c4', 'cp1x', e.target.value)}
                      />
                      <span className="slider-val">{curve.c4.cp1x}</span>
                    </div>
                    <div className="slider-row">
                      <label>Taper Flow X</label>
                      <input
                        type="range"
                        min="30"
                        max="70"
                        value={curve.c4.cp2x}
                        onChange={(e) => updateCurve('c4', 'cp2x', e.target.value)}
                      />
                      <span className="slider-val">{curve.c4.cp2x}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Flow, Lead & Back Erase Controls */}
                  <div className="curve-control-group">
                    <span className="group-title">🌊 Line Completion & Back Erase</span>
                    <div className="slider-row">
                      <label>Completion Speed</label>
                      <input
                        type="range"
                        min="0.5"
                        max="2.5"
                        step="0.05"
                        value={flow.leadSpeed}
                        onChange={(e) => updateFlow('leadSpeed', e.target.value)}
                      />
                      <span className="slider-val">{flow.leadSpeed}x</span>
                    </div>
                    <div className="slider-row">
                      <label>Tail Erase (Back)</label>
                      <input
                        type="range"
                        min="0"
                        max="0.9"
                        step="0.05"
                        value={flow.tailErase}
                        onChange={(e) => updateFlow('tailErase', e.target.value)}
                      />
                      <span className="slider-val">{Math.round(flow.tailErase * 100)}%</span>
                    </div>
                    <div className="slider-row">
                      <label>Erase Delay</label>
                      <input
                        type="range"
                        min="0"
                        max="0.4"
                        step="0.05"
                        value={flow.tailDelay}
                        onChange={(e) => updateFlow('tailDelay', e.target.value)}
                      />
                      <span className="slider-val">{Math.round(flow.tailDelay * 100)}%</span>
                    </div>
                  </div>

                  {/* Stroke & Glow FX */}
                  <div className="curve-control-group">
                    <span className="group-title">✨ Stroke & Glow</span>
                    <div className="slider-row">
                      <label>Line Thickness</label>
                      <input
                        type="range"
                        min="1"
                        max="7"
                        step="0.5"
                        value={flow.strokeWidth}
                        onChange={(e) => updateFlow('strokeWidth', e.target.value)}
                      />
                      <span className="slider-val">{flow.strokeWidth}px</span>
                    </div>
                    <div className="slider-row">
                      <label>Glow Blur</label>
                      <input
                        type="range"
                        min="0"
                        max="8"
                        step="0.5"
                        value={flow.glowBlur}
                        onChange={(e) => updateFlow('glowBlur', e.target.value)}
                      />
                      <span className="slider-val">{flow.glowBlur}</span>
                    </div>
                  </div>

                  {/* Individual Stage Lighting */}
                  <div className="curve-control-group">
                    <span className="group-title">💡 Stage Opacity</span>
                    <div className="slider-row">
                      <label>Step 01 Opacity</label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={flow.s1}
                        onChange={(e) => updateFlow('s1', e.target.value)}
                      />
                      <span className="slider-val">{flow.s1}</span>
                    </div>
                    <div className="slider-row">
                      <label>Step 02 Opacity</label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={flow.s2}
                        onChange={(e) => updateFlow('s2', e.target.value)}
                      />
                      <span className="slider-val">{flow.s2}</span>
                    </div>
                    <div className="slider-row">
                      <label>Step 03 Opacity</label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={flow.s3}
                        onChange={(e) => updateFlow('s3', e.target.value)}
                      />
                      <span className="slider-val">{flow.s3}</span>
                    </div>
                    <div className="slider-row">
                      <label>Step 04 Opacity</label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.05"
                        value={flow.s4}
                        onChange={(e) => updateFlow('s4', e.target.value)}
                      />
                      <span className="slider-val">{flow.s4}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="curve-editor-actions">
              <button className="curve-btn-reset" onClick={resetAll}>
                Reset
              </button>
              <button className={`curve-btn-copy ${copied ? 'copied' : ''}`} onClick={copyCode}>
                {copied ? '✓ Copied Code!' : '📋 Copy Code'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeLightbox} aria-label="Close Lightbox">
                <X size={22} />
              </button>
              <img src={selectedImage} alt="Large Achievement Preview" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
