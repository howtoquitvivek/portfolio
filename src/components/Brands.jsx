import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/Brands.css';

const brands = [
  "React", "Node.js", "Express", "MongoDB", "TypeScript",
  "Python", "REST APIs", "Full-Stack Development",
  "Machine Learning", "System Design", "Multimedia"
];

export default function Brands() {
  const trackRef = useRef(null);

  useEffect(() => {
    // infinite marquee
    const tween = gsap.to(trackRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 50,
      repeat: -1
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="brands">
      <div className="brands-container" ref={trackRef}>
        <div className="brands-track">
          {brands.map((b, i) => <span key={`a-${i}`}>{b}</span>)}
        </div>
        <div className="brands-track">
          {brands.map((b, i) => <span key={`b-${i}`}>{b}</span>)}
        </div>
      </div>
    </section>
  );
}
