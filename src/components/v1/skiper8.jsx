import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const words = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Olà",
  "やあ",
  "Hallå",
  "Guten tag",
  "Hallo",
  "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਜੀ"
];

export const Preloader_002 = () => {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Only capture dimension on client
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (index === words.length - 1) return;
    
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 800 : 180); // Fast swap like the video

    return () => clearTimeout(timeout);
  }, [index]);

  const slideUp = {
    initial: { top: 0 },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
  };

  const curve = {
    initial: {
      d: `M 0 0 L ${dimension.width} 0 Q ${dimension.width / 2} 300 0 0 Z`,
    },
    exit: {
      d: `M 0 0 L ${dimension.width} 0 Q ${dimension.width / 2} 0 0 0 Z`,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
    }
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      exit="exit"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#FFFFFF', // White background matching video
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            color: '#666666', // Grey text matching video
            fontSize: '4rem',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            top: '50%',
            margin: 0
          }}
        >
          {words[index]}
        </motion.h1>
      </motion.div>

      {dimension.width > 0 && (
        <svg 
          style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            width: '100%', 
            height: '300px',
            pointerEvents: 'none'
          }}
        >
          <motion.path
            variants={curve}
            initial="initial"
            exit="exit"
            fill="#FFFFFF"
          />
        </svg>
      )}
    </motion.div>
  );
};
