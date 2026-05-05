import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import bgMusic from './HelpFiles/Hamaki - Mel Bedaya (Official Lyric Video)  حماقي - م البداية - كلمات.mp3';

export default function FlowerGarden() {
  const [flowers, setFlowers] = useState([]);
  const [done, setDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const triggerFireworks = () => {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;

      // Shoot from bottom left
      confetti({
        particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 1 },
        colors: ['#f472b6', '#fb7185', '#eab308', '#ffffff']
      });
      // Shoot from bottom right
      confetti({
        particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 1 },
        colors: ['#f472b6', '#fb7185', '#eab308', '#ffffff']
      });
      
      requestAnimationFrame(frame);
    };
    frame();
  };

  const plant = (type) => {
    if (flowers.length >= 10) return;
    const f = { id: Math.random(), type, x: Math.random() * 80 + 10, y: Math.random() * 70 + 10 };
    const newList = [...flowers, f];
    setFlowers(newList);
    if (newList.length === 10) {
      setTimeout(() => {
        setDone(true);
        triggerFireworks();
      }, 1000);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFlowerClick = (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    // Tiny burst of pollen
    confetti({
      particleCount: 20, spread: 40, origin: { x, y },
      colors: ['#fef08a', '#fcd34d'], scalar: 0.6,
      shapes: ['circle'], ticks: 50, gravity: 0.4
    });
  };

  return (
    <div style={{ width: '100vw', height: '100dvh', background: '#fff1f2', position: 'relative', overflow: 'hidden' }}>
      <audio ref={audioRef} src={bgMusic} loop />
      
      <button 
        onClick={toggleMusic}
        style={{
          position: 'absolute', top: '20px', right: '20px', zIndex: 1000,
          background: 'rgba(255,255,255,0.7)', border: 'none', borderRadius: '50%',
          width: '55px', height: '55px', fontSize: '1.6rem', cursor: 'pointer',
          backdropFilter: 'blur(10px)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isPlaying ? '⏸️' : '🎵'}
      </button>

      <AnimatePresence>
        {flowers.map(f => (
          <motion.div 
            key={f.id} 
            initial={{ scale: 0, rotate: -20, opacity: 0 }} 
            animate={{ scale: 1, rotate: [-5, 5, -5], opacity: 1, y: [0, -15, 0] }}
            transition={{ 
              scale: { duration: 0.6, type: 'spring' },
              rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
            }}
            onClick={handleFlowerClick}
            style={{ 
              position: 'absolute', left: `${f.x}%`, top: `${f.y}%`, fontSize: '4.5rem',
              filter: 'drop-shadow(0 15px 25px rgba(236,72,153,0.5))',
              cursor: 'pointer'
            }}
          >
            {f.type === 'Red' ? '🌹' : f.type === 'Yellow' ? '🌻' : '🌸'}
          </motion.div>
        ))}
      </AnimatePresence>

      {!done && (
        <div className="fixed-center" style={{ background: 'rgba(255,255,255,0.8)', padding: '25px', borderRadius: '35px', display: 'flex', gap: '15px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          {['Red', 'Yellow', 'Pink'].map(c => (
            <button key={c} onClick={() => plant(c)} className="primary-button" style={{ background: c === 'Red' ? '#ef4444' : c === 'Yellow' ? '#eab308' : '#ec4899' }}>{c}</button>
          ))}
        </div>
      )}

      {done && (
        <div 
          className="fixed-center glass-card-dark" 
          style={{ background: 'white', color: '#1e1b4b', width: '85%', border: '2px solid #f472b6' }}
        >
          <h1 style={{ marginBottom: '15px', direction: 'rtl' }}>يوم حبيبة سعيد 🥰</h1>
          <p style={{ fontStyle: 'italic', opacity: 0.8, direction: 'rtl' }}>كل عام وأنت الحبيبة الوحيدة بحياتي 💖</p>
        </div>
      )}
    </div>
  );
}
