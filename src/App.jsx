import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';

// Pages
import Home from './pages/Home';
import Work from './pages/Work';
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
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<AboutExperience />} />
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
      <SmoothScroll>
        <AppContent />
      </SmoothScroll>
    </Router>
  );
}

export default App;
