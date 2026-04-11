import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';

// Pages
import Home from './pages/Home';
import Work from './pages/Work';
import ThemeConfigurator from './components/ThemeConfigurator';

function App() {
  return (
    <Router>
      <ThemeConfigurator />
      <SmoothScroll>
        <div className="portfolio-app">
          <FloatingCTA />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </Router>
  );
}

export default App;
