"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export function FeedTabs() {
  const tabs = ["For You", "Following", "Top Today", "Networking", "Hiring"];
  const [active, setActive] = useState(0);
  return (
    <div className="mt-8 flex items-center gap-2 overflow-x-auto rounded-2xl border border-white/[0.06] bg-white/[0.02] p-1.5">
      {tabs.map((t, i) => (
        <button
          key={t}
          onClick={() => setActive(i)}
          className={`relative whitespace-nowrap rounded-xl px-4 py-2 text-sm transition-colors ${
            active === i ? "text-white" : "text-white/55 hover:text-white"
          }`}
        >
          {active === i && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 z-0 rounded-xl bg-gradient-to-r from-white/[0.08] to-white/[0.04] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{t}</span>
        </button>
      ))}
      <div className="ml-auto hidden items-center gap-1 pr-2 text-xs text-white/40 sm:flex">
        <Activity className="h-3.5 w-3.5" /> Live
      </div>
    </div>
  );
}
