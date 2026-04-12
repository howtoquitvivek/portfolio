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

import { config } from '../config';

const { aboutExperience } = config;
const { 
  userName, 
  stats, 
  chatMessages, 
  skills, 
  products, 
  navigation 
} = aboutExperience;

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
                <p className="greeting-text">Hello, <strong>{userName}</strong> here!!</p>
                <h1 className="main-title">Personal Stats</h1>
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
                      {React.createElement(stat.icon, { color: stat.color, className: 'stat-icon-img' })}
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
                        <div className="skill-icon" style={{ color: skill.color }}>{React.createElement(skill.icon, { size: 16 })}</div>
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
                <div className="product-list">
                  {products.map((product, i) => (
                    <div key={i} className="product-card">
                      <div className="product-img-placeholder"></div>
                      <div className="product-info">
                        <span className="product-name">{product.name}</span>
                        <span className="product-price">{product.price}</span>
                      </div>
                      <ChevronRight size={16} color="#ccc" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="bottom-nav">
              {navigation.map((nav, i) => (
                <div key={i} className={`nav-item ${nav.isMain ? 'mic-wrap' : ''}`}>
                  {nav.isMain ? (
                    <div className="mic-button">
                      {React.createElement(nav.icon, { size: 24, color: "#FFF" })}
                    </div>
                  ) : (
                    React.createElement(nav.icon, { size: 20 })
                  )}
                  <span>{nav.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
