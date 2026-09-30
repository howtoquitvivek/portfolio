import React from 'react';
import { motion } from 'framer-motion';

export const PreLoader_006 = () => {
  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      <div style={{ position: 'relative', width: '60px', height: '60px' }}>
        <motion.span 
          style={{
            position: 'absolute',
            inset: 0,
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%'
          }}
        />
        <motion.span 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          style={{
            position: 'absolute',
            inset: 0,
            border: '2px solid transparent',
            borderTopColor: 'var(--color-primary)',
            borderRadius: '50%'
          }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        style={{
          fontSize: '0.9rem',
          letterSpacing: '0.2em',
          fontWeight: 500,
          textTransform: 'uppercase'
        }}
      >
        Loading
      </motion.div>
    </div>
  );
};
