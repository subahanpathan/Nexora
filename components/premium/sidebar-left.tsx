"use client";

import React, { useState } from "react";
import {
  Home,
  Flame,
  Compass,
  Users,
  Bookmark,
  PlusCircle,
  ChevronDown,
  ChevronRight,
  Star,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

export function LeftSidebar() {
  const pathname = usePathname();
  
  const main = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Flame, label: "Trending", href: "/trending" },
    { icon: Compass, label: "Explore", href: "/explore" },
    { icon: Users, label: "Communities", href: "/communities" },
    { icon: Globe, label: "Network", href: "/network" },
    { icon: Bookmark, label: "Saved", href: "/saved" },
  ];

  const favs = [
    { name: "design.systems", color: "from-violet-500 to-indigo-500", count: "284k" },
    { name: "buildinpublic", color: "from-emerald-400 to-cyan-500", count: "162k" },
    { name: "aiengineering", color: "from-fuchsia-500 to-rose-500", count: "98k" },
    { name: "founders", color: "from-amber-400 to-orange-500", count: "72k" },
  ];

  const [openCat, setOpenCat] = useState(true);

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-64 shrink-0 overflow-y-auto pr-4 custom-scrollbar lg:block">
      <div className="space-y-1">
        {main.map((it, i) => {
          const active = pathname === it.href;
          return (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={it.href}
                className={`group flex items-center gap-4 rounded-2xl px-4 py-3 text-[13px] font-medium transition-all ${
                  active
                    ? "bg-white/[0.05] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.05)]"
                    : "text-white/40 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-xl transition-all ${
                    active
                      ? "bg-violet-500 text-white shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]"
                      : "bg-white/[0.03] border border-white/[0.05] text-white/40 group-hover:text-white group-hover:border-white/20"
                  }`}
                >
                  <it.icon className="h-4 w-4" />
                </span>
                {it.label}
                {active && (
                  <motion.span 
                    layoutId="sideActive"
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,1)]" 
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] py-3 text-[11px] font-black uppercase tracking-widest text-white/30 transition-all hover:border-violet-500/40 hover:bg-violet-500/5 hover:text-white"
      >
        <PlusCircle className="h-4 w-4" />
        New Node
      </motion.button>

      <div className="mt-8">
        <button
          onClick={() => setOpenCat((v) => !v)}
          className="mb-4 flex w-full items-center justify-between px-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20"
        >
          <span>Signals</span>
          {openCat ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
        </button>
        {openCat && (
          <div className="space-y-1">
            {favs.map((f, i) => (
              <motion.a
                key={f.name}
                href="#"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-center gap-4 rounded-xl px-4 py-2.5 text-[13px] font-medium text-white/40 transition-all hover:bg-white/[0.03] hover:text-white group"
              >
                <span
                  className={`h-7 w-7 shrink-0 rounded-xl bg-gradient-to-br ${f.color} border border-white/10 group-hover:scale-110 transition-transform`}
                />
                <span className="truncate">t/{f.name}</span>
                <span className="ml-auto text-[10px] font-bold text-white/10 group-hover:text-white/30">{f.count}</span>
              </motion.a>
            ))}
          </div>
        )}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 rounded-[2rem] border border-white/5 bg-white/[0.02] p-6 relative overflow-hidden"
      >
        <div className="absolute -right-4 -bottom-4 opacity-5">
           <Star className="h-24 w-24 text-white" />
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-violet-400">
           <Star className="h-3.5 w-3.5" /> Rep Scope
        </div>
        <div className="mt-4 text-3xl font-bold tracking-tight text-white">
          8.4k
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/5">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "72%" }}
            transition={{ delay: 1, duration: 1.5 }}
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500" 
          />
        </div>
        <div className="mt-3 text-[10px] font-bold text-white/20 uppercase tracking-widest">
          1.5k XP to Level 9
        </div>
      </motion.div>
    </aside>

  );
}
