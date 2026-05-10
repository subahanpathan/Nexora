"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Flame, 
  ArrowUpRight, 
  Search, 
  Hash,
  Activity,
  Star,
  Plus
} from "lucide-react";

const communities = [
  { name: "design.systems", g: "from-indigo-500 to-violet-500", m: "284k", d: "A space for design systems, tokens, and component architecture.", live: 124, trending: true },
  { name: "aiengineering", g: "from-fuchsia-500 to-rose-500", m: "98k", d: "Building with LLMs, agents, and multi-modal models.", live: 421, trending: true },
  { name: "founders", g: "from-amber-400 to-orange-500", m: "72k", d: "Raw insights and support for early-stage builders.", live: 84, trending: false },
  { name: "buildinpublic", g: "from-emerald-400 to-cyan-500", m: "162k", d: "Transparency, metrics, and growth strategies for solo founders.", live: 212, trending: true },
  { name: "typescript.magic", g: "from-blue-500 to-indigo-500", m: "45k", d: "Advanced TS patterns, type safety, and wizardry.", live: 32, trending: false },
  { name: "framer.motion", g: "from-pink-500 to-violet-500", m: "12k", d: "Cinematic web animations and interaction design.", live: 18, trending: true },
  { name: "nextjs.edge", g: "from-gray-800 to-black", m: "89k", d: "The future of the web, performance, and server components.", live: 156, trending: false },
  { name: "rust.systems", g: "from-orange-700 to-red-900", m: "34k", d: "Memory safety, performance, and low-level engineering.", live: 67, trending: true },
];

export default function CommunitiesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      {/* Header Section */}
      <section className="text-center space-y-4 pt-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-white/60"
        >
          <Users className="h-4 w-4 text-violet-400" /> Discover your people
        </motion.div>
        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
          Communities of the <br/>
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">next generation.</span>
        </h1>
        <div className="mx-auto max-w-xl">
           <div className="relative group mt-8">
              <div className="absolute inset-0 rounded-full bg-violet-500/20 opacity-0 blur-xl transition-opacity group-focus-within:opacity-100" />
              <div className="relative flex items-center gap-3 rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-4 transition-all group-focus-within:border-violet-500/40 group-focus-within:bg-white/[0.06]">
                 <Search className="h-5 w-5 text-white/30" />
                 <input 
                    placeholder="Search 184,200 communities by topic, name, or keywords..."
                    className="w-full bg-transparent text-base text-white placeholder:text-white/20 outline-none"
                 />
                 <kbd className="hidden rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-white/30 sm:inline">
                    ⌘K
                 </kbd>
              </div>
           </div>
        </div>
      </section>

      {/* Categories / Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide px-2">
         {["All", "Engineering", "Design", "Founders", "AI", "Products", "Careers"].map((cat, i) => (
           <button 
             key={cat}
             className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
               i === 0 ? "bg-white text-black" : "border border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white"
             }`}
           >
             {cat}
           </button>
         ))}
      </div>

      {/* Community Grid */}
      <section className="grid gap-6 sm:grid-cols-2">
        {communities.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group relative flex flex-col overflow-hidden rounded-[32px] border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 transition-all hover:border-white/[0.12] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
          >
            {/* Ambient Background Glow */}
            <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${c.g} opacity-0 blur-[100px] transition-opacity group-hover:opacity-20`} />

            <div className="relative flex items-start justify-between">
              <div className={`h-20 w-20 rounded-[24px] bg-gradient-to-br ${c.g} p-0.5 shadow-2xl`}>
                 <div className="h-full w-full rounded-[22px] bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${c.g} opacity-20`} />
                    <Hash className="h-8 w-8 text-white relative z-10" />
                 </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                {c.trending && (
                   <div className="flex items-center gap-1 rounded-full bg-rose-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-rose-400">
                      <Flame className="h-3 w-3" /> Trending
                   </div>
                )}
                <div className="flex items-center gap-2 text-xs text-white/40">
                   <Activity className="h-3.5 w-3.5 text-emerald-400" /> 
                   <span className="tabular-nums text-emerald-400 font-semibold">{c.live} live now</span>
                </div>
              </div>
            </div>

            <div className="relative mt-8">
              <div className="flex items-center gap-2">
                 <h3 className="text-2xl font-semibold text-white group-hover:text-violet-300 transition-colors">t/{c.name}</h3>
                 <Star className="h-4 w-4 text-amber-400 fill-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-white/40">
                <Users className="h-4 w-4" /> {c.m} members
              </div>
              <p className="mt-4 text-white/50 leading-relaxed min-h-[48px]">
                {c.d}
              </p>
            </div>

            <div className="relative mt-8 flex items-center gap-3">
               <button className="flex-1 rounded-2xl bg-white text-black py-3.5 text-sm font-bold transition-transform active:scale-95 flex items-center justify-center gap-2 group/btn">
                  Join Community
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
               </button>
               <button className="grid h-12 w-12 place-items-center rounded-2xl border border-white/[0.1] bg-white/[0.04] text-white transition-colors hover:bg-white/[0.1]">
                  <Plus className="h-5 w-5" />
               </button>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden rounded-[40px] border border-violet-500/20 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/5 p-12 text-center">
         <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
         <h2 className="text-3xl font-semibold text-white">Can&apos;t find your niche?</h2>
         <p className="mx-auto mt-4 max-w-lg text-white/50 leading-relaxed">
            Start a new community and build the future you want to see. 
            AI-powered moderation and growth tools included for free during beta.
         </p>
         <button className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-8 py-4 text-sm font-bold text-white shadow-xl hover:shadow-violet-500/20 transition-all active:scale-95">
            <Plus className="h-5 w-5" /> Create a community
         </button>
      </section>
    </motion.div>
  );
}
