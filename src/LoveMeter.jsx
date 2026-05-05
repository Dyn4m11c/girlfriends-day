import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import './App.css';

export default function LoveMeter({ onBreak }) {
  const [clickCount, setClickCount] = useState(0);
  const [isMaxed, setIsMaxed] = useState(false);
  const [canUnlock, setCanUnlock] = useState(false);

  const handleClick = () => {
    if (clickCount >= 10) {
      if (canUnlock) onBreak();
      return;
    }
    const next = clickCount + 1;
    setClickCount(next);
    if (next === 10) {
      setIsMaxed(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.7 }, shapes: ['heart'] });
      setTimeout(() => {
        setCanUnlock(true);
      }, 2000);
    }
  };

  const percentage = (clickCount / 10) * 100;
  const rotation = -90 + (percentage * 1.8);

  return (
    <motion.div className="glass-card-dark" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <h2 style={{ color: '#fbcfe8', marginBottom: '15px', fontStyle: 'italic' }}>-عشان تعرفي قدي بحبك</h2>
      
      <div className="gauge-container">
        <svg viewBox="0 0 100 50" style={{ width: '100%' }}>
          <path d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
          <motion.path 
            d="M10,50 A40,40 0 0,1 90,50" fill="none" stroke="#f472b6" strokeWidth="6" strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: clickCount / 10 }}
            transition={{ type: "spring", stiffness: 40 }}
          />
        </svg>
        
        <motion.div 
          className="needle"
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        />
        <div style={{ position: 'absolute', bottom: '-10px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '20px', background: '#0f172a', borderRadius: '50%', border: '3px solid #334155' }} />
      </div>

      <button 
        className="primary-button" 
        onClick={handleClick}
        disabled={isMaxed && !canUnlock}
        style={{ opacity: (isMaxed && !canUnlock) ? 0.7 : 1, cursor: (isMaxed && !canUnlock) ? 'wait' : 'pointer' }}
      >
        {!isMaxed ? 'قيسي حبي' : (!canUnlock ? 'Preparing... 💖' : '🌸 أفتحي قلبي ')}
      </button>
    </motion.div>
  );
}
