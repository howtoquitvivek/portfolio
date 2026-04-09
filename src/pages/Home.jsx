import Hero from '../components/Hero';
import Brands from '../components/Brands';
import ProjectsSection from '../components/ProjectsSection';
import AchievementsSection from '../components/AchievementsSection';
import AboutSection from '../components/AboutSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <ProjectsSection />
      <AchievementsSection />
      <AboutSection />
    </>
  );
}
