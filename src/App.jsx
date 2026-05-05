import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoveMeter from './LoveMeter';
import FlowerGarden from './FlowerGarden';
import './App.css';

export default function App() {
  const [isGarden, setIsGarden] = useState(false);

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {!isGarden ? (
          <LoveMeter key="meter" onBreak={() => setIsGarden(true)} />
        ) : (
          <FlowerGarden key="garden" />
        )}
      </AnimatePresence>
    </div>
  );
}
