import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../../styles/skiper11.css';

export const Preloader_005 = () => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Block size dictates how many "pixels" there are.
  const blockSize = window.innerWidth > 768 ? 50 : 40;
  
  // Guard against divide by zero during initial render
  const cols = dimension.width > 0 ? Math.ceil(dimension.width / blockSize) : 0;
  const rows = dimension.height > 0 ? Math.ceil(dimension.height / blockSize) : 0;
  const amountOfBlocks = cols * rows;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, pointerEvents: 'none' }}>
      {/* Pixel Grid */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexWrap: 'wrap',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        {amountOfBlocks > 0 && Array.from(Array(amountOfBlocks)).map((_, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          
          return (
            <motion.div
              key={i}
              initial={{ scale: 1, opacity: 1 }}
              exit={{ 
                scale: 0, 
                opacity: 0,
                transition: { 
                  duration: 0.4, 
                  // Diagonal wipe effect from top-left to bottom-right
                  delay: (col + row) * 0.02, 
                  ease: [0.76, 0, 0.24, 1] 
                }
              }}
              style={{
                width: blockSize,
                height: blockSize,
                backgroundColor: 'var(--color-bg)',
                // Overlap borders slightly to prevent 1px visual gaps during render
                outline: '1px solid var(--color-bg)',
                transformOrigin: 'center'
              }}
            />
          );
        })}
      </div>
      
      {/* Centered Animated Loader */}
      <motion.div
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="loader">
          <span className="loader-text">loading</span>
          <span className="load"></span>
        </div>
      </motion.div>
    </div>
  );
};
