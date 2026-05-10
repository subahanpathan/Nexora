"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Rocket, 
  Zap, 
  CheckCircle2, 
  UserPlus, 
  ArrowUpRight, 
  Brain, 
  Palette, 
  Code2, 
  Sparkles,
  Search,
  Filter
} from "lucide-react";

const professionals = [
  { n: "Yuki Tanaka", r: "AI Researcher · DeepMind", g: "from-indigo-400 to-violet-500", icon: Brain, bio: "Exploring the boundaries of multi-modal LLMs and agentic workflows.", skills: ["Python", "PyTorch", "Transformers"] },
  { n: "Noah Bennett", r: "Founder · Atlas", g: "from-emerald-400 to-cyan-500", icon: Rocket, bio: "Building the next generation of cloud infrastructure for developers.", skills: ["Go", "Kubernetes", "Rust"] },
  { n: "Sofia Martins", r: "Design Engineer · Vercel", g: "from-fuchsia-500 to-rose-500", icon: Palette, bio: "Bridging the gap between design systems and production code.", skills: ["React", "Framer Motion", "Tailwind"] },
  { n: "Hassan Iqbal", r: "Staff SWE · Stripe", g: "from-amber-400 to-orange-500", icon: Code2, bio: "Obsessed with building highly reliable and scalable payment systems.", skills: ["Ruby", "Java", "Architecture"] },
  { n: "Elena Rossi", r: "Product Designer · Linear", g: "from-sky-400 to-indigo-500", icon: Palette, bio: "Crafting minimalist and efficient tools for high-performance teams.", skills: ["Figma", "Design Systems", "UX"] },
  { n: "Marcus Thorne", r: "Venture Partner · Sequoia", g: "from-rose-400 to-orange-500", icon: Rocket, bio: "Investing in founders who are redefining the future of work and AI.", skills: ["Growth", "Strategy", "Venture"] },
];

export default function NetworkPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
             <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-violet-300">
                <Sparkles className="h-3 w-3" /> Professional Network
             </div>
             <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
                Build your global <br/>
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">professional identity.</span>
             </h1>
             <p className="mt-4 text-white/50 leading-relaxed">
                Connect with world-class engineers, designers, and founders. 
                Build reputation through high-signal contributions and verified showcases.
             </p>
          </div>
          <div className="flex flex-col gap-3">
             <div className="relative group">
                <div className="absolute inset-0 rounded-2xl bg-violet-500/20 opacity-0 blur-lg transition-opacity group-focus-within:opacity-100" />
                <div className="relative flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 transition-colors group-focus-within:border-violet-500/40">
                   <Search className="h-4 w-4 text-white/40" />
                   <input 
                      placeholder="Search for people, roles, skills..."
                      className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full md:w-64"
                   />
                </div>
             </div>
             <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.04] py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]">
                <Filter className="h-4 w-4" /> Filter by industry
             </button>
          </div>
        </div>
      </section>

      {/* Suggested Connections */}
      <section>
        <div className="mb-6 flex items-end justify-between px-2">
          <div>
            <h2 className="text-xl font-medium text-white">Suggested for your network</h2>
            <p className="text-sm text-white/40 mt-1">Based on your interests in AI and Design Engineering</p>
          </div>
          <button className="text-sm text-white/40 hover:text-white transition-colors">View all recommendations</button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {professionals.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 transition-all hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-start justify-between">
                <div className={`relative h-14 w-14 rounded-full bg-gradient-to-br ${p.g} ring-4 ring-[#0a0a0f] ring-offset-0 ring-offset-transparent`}>
                   <div className="absolute -bottom-1 -right-1 grid h-6 w-6 place-items-center rounded-full bg-[#0a0a0f] ring-1 ring-white/10 shadow-xl">
                      <p.icon className="h-3.5 w-3.5 text-white" />
                   </div>
                </div>
                <div className="flex gap-1.5">
                   <button className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.04] text-white/40 transition-colors hover:bg-white text-black hover:text-black">
                      <UserPlus className="h-4 w-4" />
                   </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center gap-1.5 font-medium text-white">
                  {p.n}
                  <CheckCircle2 className="h-3.5 w-3.5 fill-sky-400 text-[#0a0a0f]" />
                </div>
                <div className="text-xs text-violet-400 font-medium mt-0.5">{p.r}</div>
                <p className="mt-3 text-sm text-white/50 leading-relaxed line-clamp-2">
                  {p.bio}
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.skills.map(s => (
                  <span key={s} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/60">
                    {s}
                  </span>
                ))}
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white text-black py-2.5 text-xs font-semibold transition-transform active:scale-95">
                View Showcase <ArrowUpRight className="h-3 w-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats / Showcase */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-indigo-500/10 to-violet-500/5 p-8 overflow-hidden relative">
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
          <h3 className="text-lg font-medium text-white">Project Showcases</h3>
          <p className="mt-2 text-sm text-white/50">Your network has launched 12 new projects this week. Support the next generation of builders.</p>
          <div className="mt-6 flex items-center gap-4">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 ring-2 ring-[#0a0a0f]" />
                ))}
             </div>
             <span className="text-xs text-white/40">+42 launches</span>
             <button className="ml-auto rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/20 transition-colors">
                Explore Launches
             </button>
          </div>
        </div>

        <div className="rounded-3xl border border-white/[0.06] bg-gradient-to-br from-fuchsia-500/10 to-rose-500/5 p-8 overflow-hidden relative">
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-rose-500/20 blur-3xl" />
          <h3 className="text-lg font-medium text-white">Talent Networking</h3>
          <p className="mt-2 text-sm text-white/50">32 world-class teams are currently hiring directly from your network signals. Get verified to stand out.</p>
          <div className="mt-6 flex items-center gap-4">
             <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/[0.05]">
                <Zap className="h-3.5 w-3.5 text-amber-300" />
                <span className="text-xs font-medium text-white">9 Active Offers</span>
             </div>
             <button className="ml-auto rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/20 transition-colors">
                View Open Roles
             </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
