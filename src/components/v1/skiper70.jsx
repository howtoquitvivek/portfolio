import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const TextBoxReveal = ({ children, className = '' }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.95", "start 0.35"]
  });

  const words = typeof children === 'string' ? children.split(" ") : [];

  return (
    <motion.span 
      ref={container} 
      className={className} 
      style={{ 
        display: 'inline-flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        columnGap: '0.25em', 
        rowGap: '0.1em' 
      }}
    >
      {words.map((word, i) => {
        // First 40% of scroll: pills fade in sequentially
        const fadeStart = (i / words.length) * 0.4;
        const fadeEnd = fadeStart + (0.4 / words.length);

        // Remaining 60% of scroll: text reveals sequentially
        const revealStart = 0.4 + (i / words.length) * 0.6;
        const revealEnd = revealStart + (0.6 / words.length);
        
        return (
          <Word key={i} progress={scrollYProgress} fadeRange={[fadeStart, fadeEnd]} range={[revealStart, revealEnd]}>
            {word}
          </Word>
        );
      })}
    </motion.span>
  );
};

const Word = ({ children, progress, fadeRange, range }) => {
  const opacity = useTransform(progress, fadeRange, [0, 1]);
  const color = useTransform(progress, range, ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]);
  const backgroundColor = useTransform(progress, range, ["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0)"]);
  
  return (
    <motion.span 
      style={{ 
        opacity,
        color, 
        backgroundColor,
        borderRadius: "100px", // Perfect pill shape
        padding: "0 0.2em", // Wider padding for the pill look
        margin: "0 0.05em",
        display: "inline-block"
      }}
    >
      {children}
    </motion.span>
  );
};
