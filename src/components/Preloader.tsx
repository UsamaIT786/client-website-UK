import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Globe, Lock } from 'lucide-react';

const messages = [
  "Initializing Secure Protocols",
  "Analyzing Global Pathways",
  "Preparing Expert Counsel",
  "Verifying Documentation",
  "Securing Your Future"
];

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        // Random incremental progress for a more "realistic" feel
        const increment = Math.floor(Math.random() * 3) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 40);

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Ambient Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
          
          <div className="relative flex flex-col items-center z-10">
            {/* Advanced Icon Animation Container */}
            <div className="relative w-32 h-32 mb-16 flex items-center justify-center">
              {/* Outer Rotating Ring */}
              <motion.div 
                className="absolute inset-0 border-t-2 border-primary rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              {/* Inner Pulsing Glow */}
              <motion.div 
                className="absolute inset-4 bg-primary/10 blur-xl rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Central Icon */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative z-20 text-primary"
              >
                <Shield size={48} strokeWidth={1.5} />
                <motion.div 
                  className="absolute inset-0 text-primary/20"
                  animate={{ opacity: [0.1, 0.5, 0.1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Shield size={48} strokeWidth={1.5} />
                </motion.div>
              </motion.div>
            </div>

            {/* Progress Display */}
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <motion.span 
                  className="text-slate-900 font-syne font-bold text-6xl md:text-8xl tracking-tighter tabular-nums opacity-5"
                >
                  {progress.toString().padStart(2, '0')}
                </motion.span>
                <div className="absolute inset-0 flex items-center justify-center">
                   <motion.span 
                    className="text-slate-900 font-syne font-bold text-6xl md:text-8xl tracking-tighter tabular-nums"
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {progress.toString().padStart(2, '0')}
                  </motion.span>
                </div>
              </div>

              {/* Engaging Text Animation */}
              <div className="h-6 flex items-center justify-center overflow-hidden mb-8">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={messageIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-primary font-bold tracking-[0.4em] uppercase text-[10px] whitespace-nowrap"
                  >
                    {messages[messageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Premium Loading Bar */}
              <div className="w-64 h-[1px] bg-slate-100 relative overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-primary to-transparent w-full"
                  initial={{ x: "-100%" }}
                  animate={{ x: `${progress - 100}%` }}
                  transition={{ ease: "linear" }}
                />
                {/* Shimmer effect */}
                <motion.div 
                  className="absolute top-0 left-0 h-full w-20 bg-primary/20 blur-sm"
                  animate={{ x: ["-100%", "400%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </div>

          {/* Decorative Corner Text */}
          <div className="absolute top-12 left-12 flex flex-col gap-1 opacity-40">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-slate-900">System Status</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[9px] font-bold uppercase text-slate-500">Secure Protocol</span>
            </div>
          </div>

          <div className="absolute bottom-12 right-12 flex flex-col items-end opacity-40">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-slate-900">Established</span>
            <span className="text-2xl font-syne font-bold text-slate-900 tracking-tighter">2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
