"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function IntroOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, reduceMotion ? 700 : 1400);
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303]"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_30%,rgba(139,92,246,0.25),transparent_38%),radial-gradient(circle_at_70%_65%,rgba(217,70,239,0.18),transparent_42%)]" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: "blur(8px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6"
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-violet-500/25 blur-xl" />
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <motion.path
                    d="M20 20 L80 80 M80 20 L20 80"
                    stroke="white"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                  <motion.circle
                    cx="50" cy="50" r="40"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="text-5xl font-bold tracking-[0.22em] text-white sm:text-6xl"
            >
              NEXORA
            </motion.h1>
            
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.5 }}
              transition={{ delay: 0.2, duration: 0.45 }}
              className="mt-3 text-[11px] uppercase tracking-[0.16em] text-white/60 sm:text-sm"
            >
              Where communities think together.
            </motion.p>
          </div>

          <motion.div 
            className="absolute bottom-20 left-1/2 h-[1px] w-44 -translate-x-1/2 bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.22 }}
          >
            <motion.div 
              className="h-full bg-violet-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.22, duration: 0.9, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
