import React from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Atom,
  Beaker,
  Database,
  TrendingUp,
  BarChart2,
  Mic,
  CreditCard,
  BookOpen,
  User,
  ChevronRight
} from 'lucide-react';
import '../styles/AboutExperience.css';

const stats = [
  {
    icon: <Rocket className="stat-icon-img" />,
    label: '',
    sublabel: 'WINS',
    value: '4+ Hackathon',
    color: '#FFB800'
  },
  {
    icon: <Database className="stat-icon-img" />,
    label: '',
    sublabel: 'Multimedia & Dev',
    value: '10+ Freelance',
    color: '#50C878'
  },
  {
    icon: <Atom className="stat-icon-img" />,
    label: '',
    sublabel: 'TECH DOMAINS',
    value: 'ML & Web Dev',
    color: '#8A70FF'
  },
  {
    icon: <Beaker className="stat-icon-img" />,
    label: '',
    sublabel: 'PM & BACKEND',
    value: 'Android App',
    color: '#4A90E2'
  }
];

const chatMessages = [
  "Android app developer Intern @Stock8",
  "Freelance developer and video editor",
  "Open source contributor and hackathon mentor",
  "Working on real-world industrial projects 🚀"
];

const skills = [
  { name: 'Web Dev', level: 85, color: '#8A70FF', icon: <Atom size={16} /> },
  { name: 'AI/ML', level: 70, color: '#40E0D0', icon: <TrendingUp size={16} /> },
  { name: 'Video Editing', level: 80, color: '#FFB84D', icon: <Rocket size={16} /> }
];

export default function AboutExperience() {
  return (
    <motion.div
      className="about-exp-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="phone-container">
        {/* Phone Notch/Header area */}
        <div className="phone-frame">
          <div className="phone-screen">
            {/* Top Status Bar */}
            <div className="status-bar">
              <div className="status-left">My Profile</div>
              <div className="status-right">
                <div className="user-avatar-small">
                  <User size={14} color="#FFB800" />
                </div>
              </div>
            </div>

            <div className="scroll-content">
              {/* Greeting */}
              <div className="greeting-section">
                <p className="greeting-text">Hello, <strong>Vivek</strong> here!!</p>
                <h1 className="main-title">Personal Stats</h1>
                {/* <p className="sub-title">Overview of my experience</p> */}
              </div>

              {/* Stats Grid */}
              <div className="stats-grid">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="stat-card"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <div className="stat-icon-wrapper" style={{ backgroundColor: `${stat.color}15` }}>
                      {React.cloneElement(stat.icon, { color: stat.color })}
                    </div>
                    <div className="stat-info">
                      <div className="stat-main">
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                      </div>
                      <span className="stat-sublabel">{stat.sublabel}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chat Experience Section */}
              <div className="chat-section">
                <h2 className="section-label">Experience Feed</h2>
                <div className="chat-container">
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      className="chat-bubble-wrapper"
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.3, duration: 0.5 }}
                    >
                      <div className="chat-bubble">
                        <p>{msg}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Skills Proficiency */}
              <div className="skills-section">
                <h2 className="section-label">Skills Proficiency</h2>
                <div className="skills-list">
                  {skills.map((skill, i) => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-header">
                        <div className="skill-icon" style={{ color: skill.color }}>{skill.icon}</div>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <div className="progress-bg">
                        <motion.div
                          className="progress-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          style={{ backgroundColor: skill.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recently Sold Products (Placeholder) */}
              <div className="recent-section">
                <div className="recent-header">
                  <h2 className="section-label">Recently Sold Products</h2>
                  <span className="view-all">View All</span>
                </div>
                <div className="product-card">
                  <div className="product-img-placeholder"></div>
                  <div className="product-info">
                    <span className="product-name">Stock App UI Kit</span>
                    <span className="product-price">$500</span>
                  </div>
                  <ChevronRight size={16} color="#ccc" />
                </div>
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="bottom-nav">
              <div className="nav-item">
                <TrendingUp size={20} />
                <span>Performance</span>
              </div>
              <div className="nav-item">
                <BarChart2 size={20} />
                <span>Stock</span>
              </div>
              <div className="nav-item mic-wrap">
                <div className="mic-button">
                  <Mic size={24} color="#FFF" />
                </div>
                <span>Bill</span>
              </div>
              <div className="nav-item">
                <CreditCard size={20} />
                <span>Payments</span>
              </div>
              <div className="nav-item">
                <BookOpen size={20} />
                <span>Khata</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
