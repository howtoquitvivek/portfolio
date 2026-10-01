import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';

// Pages
import Home from './pages/Home';
import AboutExperience from './pages/AboutExperience';
import ThemeConfigurator from './components/ThemeConfigurator';

function AppContent() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <div className="portfolio-app">
      {!isAboutPage && <FloatingCTA />}
      {!isAboutPage && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutExperience />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAboutPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeConfigurator />
      <main className="relative" style={{ height: '100%', width: '100%' }}>
        <SmoothScroll>
          <AppContent />
        </SmoothScroll>
      </main>
    </Router>
  );
}

export default App;
