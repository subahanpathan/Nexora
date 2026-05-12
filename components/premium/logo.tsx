import React from "react";
import { motion } from "framer-motion";

export function NexoraLogo({ size = 40 }: { size?: number }) {
  return (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div
        className="relative grid place-items-center rounded-2xl overflow-hidden"
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-indigo-400 opacity-90 transition-transform group-hover:scale-110 duration-500" />
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600 via-fuchsia-500 to-indigo-400 blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
        
        <svg
          viewBox="0 0 24 24"
          width={size * 0.55}
          height={size * 0.55}
          className="relative z-10"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path 
            d="M2 12h20M12 2l10 10-10 10" 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
          <circle cx="12" cy="12" r="3" fill="white" stroke="none" />
        </svg>
      </div>
      <div className="flex flex-col -space-y-1">
        <span className="text-xl font-bold tracking-[-0.03em] text-white">
          Nexora
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400/80">
          Neural Node
        </span>
      </div>
    </div>
  );
}

