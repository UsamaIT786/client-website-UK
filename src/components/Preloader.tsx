import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[9999] bg-white flex items-center justify-center overflow-hidden"
        >
          {/* Soft ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full" />

          <div className="relative flex flex-col items-center z-10">
            {/* Logo text with staggered letter animation */}
            <div className="flex items-baseline gap-0 mb-8">
              {"Immigration".split("").map((char, i) => (
                <motion.span
                  key={`a-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-3xl sm:text-4xl md:text-5xl font-syne font-bold text-textMain tracking-tighter uppercase"
                >
                  {char}
                </motion.span>
              ))}
              {"Law".split("").map((char, i) => (
                <motion.span
                  key={`b-${i}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.07 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="text-3xl sm:text-4xl md:text-5xl font-syne font-bold text-primary tracking-tighter uppercase"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Minimal animated line */}
            <div className="w-48 h-[2px] bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
