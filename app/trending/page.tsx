"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Flame, 
  TrendingUp, 
  Activity, 
  MessageSquare, 
  ArrowUpRight, 
  Sparkles,
  Zap,
  Clock,
  Globe
} from "lucide-react";

const trendingTopics = [
  { topic: "Local RAG Optimization", category: "AI Engineering", signal: "98/100", velocity: "+42%", desc: "Developers are ditching managed vector stores for lean local implementations.", tags: ["#rag", "#ai", "#performance"] },
  { topic: "Glassmorphism v2", category: "Design", signal: "89/100", velocity: "+18%", desc: "A new wave of layered surfaces and ambient lighting in dense UIs.", tags: ["#uiux", "#design", "#trends"] },
  { topic: "Agentic Workflows", category: "AI Engineering", signal: "95/100", velocity: "+36%", desc: "Moving from chat to autonomous agents in production software.", tags: ["#agents", "#automation", "#software"] },
  { topic: "Bootstrapping in 2026", category: "Founders", signal: "82/100", velocity: "+12%", desc: "How solo founders are using AI to replace entire marketing departments.", tags: ["#growth", "#solo", "#founders"] },
  { topic: "Type-Safe Everything", category: "Engineering", signal: "78/100", velocity: "+9%", desc: "The industry-wide move towards end-to-end type safety in full-stack apps.", tags: ["#typescript", "#rust", "#engineering"] },
];

export default function TrendingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0a0a0f] p-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-rose-600/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-violet-600/10 blur-[100px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="max-w-2xl">
             <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-rose-400">
                <Flame className="h-3.5 w-3.5" /> High Signal Only
             </div>
             <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                The Threadify <br/>
                <span className="bg-gradient-to-r from-rose-400 via-orange-400 to-fuchsia-400 bg-clip-text text-transparent">Trending Engine.</span>
             </h1>
             <p className="mt-5 text-white/50 leading-relaxed text-lg">
                Our AI analyzes 2.4M daily threads to distill the signals from the noise. 
                Discover what the world&apos;s best builders are talking about, before it goes mainstream.
             </p>
             <div className="mt-8 flex items-center gap-6">
                <div className="flex flex-col">
                   <span className="text-2xl font-semibold text-white">2.4M</span>
                   <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">Threads Analyzed</span>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="flex flex-col">
                   <span className="text-2xl font-semibold text-white">18.2s</span>
                   <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">Refresh Rate</span>
                </div>
                <div className="h-10 w-px bg-white/10" />
                <div className="flex flex-col">
                   <span className="text-2xl font-semibold text-white">99.2%</span>
                   <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">Signal Quality</span>
                </div>
             </div>
          </div>
          
          <div className="flex-1 max-w-sm rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur">
             <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-semibold text-white/60">LIVE NETWORK LOAD</span>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-bold tracking-widest">
                   <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> OPTIMAL
                </span>
             </div>
             <div className="space-y-4">
                {[45, 78, 62, 91, 54, 83].map((h, i) => (
                  <div key={i} className="flex items-end gap-1 h-12">
                     <div className="flex-1 bg-white/5 rounded-t-sm transition-all hover:bg-violet-500/40" style={{ height: `${h}%` }} />
                  </div>
                ))}
             </div>
             <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 uppercase tracking-widest font-bold">
                <span>00:00</span>
                <span>GLOBAL SIGNAL</span>
                <span>23:59</span>
             </div>
          </div>
        </div>
      </section>

      {/* Trending Topics List */}
      <section className="space-y-4">
         <div className="flex items-center justify-between px-2 mb-6">
            <h2 className="text-xl font-medium text-white flex items-center gap-2">
               <Activity className="h-5 w-5 text-violet-400" /> Current Hot Zones
            </h2>
            <div className="flex items-center gap-4 text-xs text-white/40">
               <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Clock className="h-3.5 w-3.5" /> Last 1h
               </button>
               <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Globe className="h-3.5 w-3.5" /> Global
               </button>
            </div>
         </div>

         <div className="space-y-3">
            {trendingTopics.map((t, i) => (
              <motion.div
                key={t.topic}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-r from-white/[0.04] to-transparent p-6 transition-all hover:border-violet-500/30 hover:bg-white/[0.06]"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                   <div className="flex items-start gap-5">
                      <div className="flex flex-col items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06] px-4 py-3 min-w-[80px]">
                         <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Signal</span>
                         <span className="text-xl font-bold text-white mt-1">{t.signal.split('/')[0]}</span>
                      </div>
                      <div className="max-w-md">
                         <div className="flex items-center gap-2 text-xs font-medium text-violet-400 mb-1">
                            {t.category}
                         </div>
                         <h3 className="text-xl font-semibold text-white group-hover:text-violet-300 transition-colors">
                            {t.topic}
                         </h3>
                         <p className="mt-2 text-sm text-white/50 leading-relaxed">
                            {t.desc}
                         </p>
                      </div>
                   </div>

                   <div className="flex flex-wrap md:flex-nowrap items-center gap-8">
                      <div className="flex flex-col items-end">
                         <span className="text-xs font-bold text-white/40 uppercase tracking-widest mb-1">Velocity</span>
                         <span className="text-lg font-bold text-emerald-400 flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" /> {t.velocity}
                         </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 max-w-[200px]">
                         {t.tags.map(tag => (
                           <span key={tag} className="text-[11px] font-medium text-white/30 hover:text-white transition-colors cursor-pointer">
                             {tag}
                           </span>
                         ))}
                      </div>

                      <button className="rounded-full bg-white text-black px-6 py-2.5 text-xs font-bold transition-transform active:scale-95 flex items-center gap-2">
                         Join Discuss <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Insights Section */}
      <section className="grid gap-6 md:grid-cols-3">
         {[
           { icon: Sparkles, title: "AI Predictions", desc: "Based on current trends, 'Decentralized Vector Search' is likely to peak in next 48 hours." },
           { icon: Zap, title: "Breakout Creators", desc: "@alexr and 14 others are currently driving 12% of the total network signal." },
           { icon: MessageSquare, title: "Deep Dive", desc: "The longest active thread has reached 4,214 replies with 98.2% sentiment clarity." },
         ].map((item, i) => (
           <motion.div
             key={item.title}
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.5 + i * 0.1 }}
             className="rounded-3xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors"
           >
              <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20 mb-4">
                 <item.icon className="h-5 w-5 text-violet-400" />
              </div>
              <h4 className="text-sm font-semibold text-white">{item.title}</h4>
              <p className="mt-2 text-xs text-white/40 leading-relaxed">
                 {item.desc}
              </p>
           </motion.div>
         ))}
      </section>
    </motion.div>
  );
}
