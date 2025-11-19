import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit } from 'lucide-react';

const loadingStates = [
  { text: "[SYSTEM] Establishing Neural Link...", progress: 25 },
  { text: "[AI] Loading Pattern Recognition...", progress: 50 },
  { text: "[EEG] Syncing Waveforms...", progress: 75 },
  { text: "[READY] Starting Session...", progress: 100 }
];

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === loadingStates.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // Wait a bit after 100%
          return prev;
        }
        return prev + 1;
      });
    }, 800); // Change state every 800ms

    return () => clearInterval(interval);
  }, [onComplete]);

  const titleText = "NeuroLearn";

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-dark-bg flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)", transition: { duration: 0.8 } }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent-violet/10 via-transparent to-transparent pointer-events-none" />
      
      {/* 1. The Rotating/Pulsing Core */}
      <div className="relative mb-16">
        {/* Orbiting Ring 1 */}
        <motion.div 
          className="absolute inset-[-30px] border border-accent-cyan/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        {/* Orbiting Ring 2 */}
        <motion.div 
          className="absolute inset-[-50px] border border-accent-violet/20 rounded-full border-dashed"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Main Brain Icon - Rotating Slowly */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="relative z-10"
        >
          <BrainCircuit size={80} className="text-accent-cyan/80" />
        </motion.div>

        {/* Pulsing Overlay Brain */}
        <motion.div
          className="absolute inset-0 z-20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
           <BrainCircuit size={80} className="text-accent-cyan drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        </motion.div>
      </div>

      {/* 2. Cinematic Title Reveal */}
      <div className="flex mb-8 overflow-hidden">
        {titleText.split("").map((char, index) => (
          <motion.span
            key={index}
            className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-accent-cyan to-accent-violet tracking-wider"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ 
              delay: 0.2 + index * 0.05,
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* 3. Progress Bar & Status */}
      <div className="w-80 relative">
        {/* Progress Bar Container */}
        <div className="h-1 bg-dark-border w-full relative overflow-visible">
          {/* Filling Bar */}
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-cyan to-accent-violet z-10"
            initial={{ width: "0%" }}
            animate={{ width: `${loadingStates[currentIndex].progress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
             {/* Leading Edge Particle */}
             <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
          </motion.div>
        </div>

        {/* Tech Status Terminal */}
        <div className="mt-4 h-6 flex justify-center items-center">
            <AnimatePresence mode="wait">
                <motion.p 
                key={currentIndex} 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-mono text-accent-blue tracking-wide"
                >
                {loadingStates[currentIndex].text}
                </motion.p>
            </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
