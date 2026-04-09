import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Work from './pages/Work';
import Projects from './pages/Projects';
import Achievements from './pages/Achievements';
import About from './pages/About';

function App() {
  return (
    <Router>
      <SmoothScroll>
        <div className="portfolio-app">
          <ThemeToggle />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
