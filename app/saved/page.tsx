"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bookmark, 
  Search, 
  Filter, 
  Grid, 
  List, 
  MoreHorizontal, 
  Sparkles, 
  Trash2, 
  Share2,
  FolderPlus,
  ArrowRight,
  Hash,
  Star,
  Activity
} from "lucide-react";

const collections = [
  { name: "All Bookmarks", count: 42, icon: Bookmark, active: true },
  { name: "AI Research", count: 12, icon: Sparkles, active: false },
  { name: "Design Systems", count: 8, icon: FolderPlus, active: false },
  { name: "Founder Insights", count: 15, icon: Star, active: false },
  { name: "Job Leads", count: 7, icon: Activity, active: false },
];

const savedPosts = [
  { id: 1, title: "Designing calm interfaces: how layered surfaces replace decoration", author: "Mira Okafor", community: "t/design.systems", time: "2d ago", tags: ["Design", "UI"] },
  { id: 2, title: "We replaced our entire RAG stack with a single 400-line file", author: "Kenji Watanabe", community: "t/aiengineering", time: "5d ago", tags: ["AI", "RAG"] },
  { id: 3, title: "$0 → $42K MRR in 9 months: Selling software to designers", author: "Aria Chen", community: "t/buildinpublic", time: "1w ago", tags: ["Growth", "Founders"] },
  { id: 4, title: "Next.js 16.2: Server Components Deep Dive", author: "Staff Engineer", community: "t/nextjs", time: "2w ago", tags: ["Engineering"] },
  { id: 5, title: "The grain overlay tip alone is worth the entire write-up", author: "Daniel Park", community: "t/design.systems", time: "3w ago", tags: ["Design"] },
];

export default function SavedPage() {
  const [view, setView] = useState<"grid" | "list">("list");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
               <Bookmark className="h-6 w-6 text-violet-400" />
            </div>
            <div>
               <h1 className="text-2xl font-semibold text-white">Saved Library</h1>
               <p className="text-sm text-white/40">Your personal signal-rich collection</p>
            </div>
         </div>
         
         <div className="flex items-center gap-2">
            <div className="relative group">
               <div className="absolute inset-0 rounded-full bg-violet-500/10 opacity-0 blur-lg transition-opacity group-focus-within:opacity-100" />
               <div className="relative flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 transition-all group-focus-within:border-violet-500/40">
                  <Search className="h-4 w-4 text-white/30" />
                  <input 
                    placeholder="Search library..."
                    className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full md:w-48"
                  />
               </div>
            </div>
            <button className="h-10 w-10 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-all">
               <Filter className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1 rounded-full bg-white/[0.04] p-1 border border-white/[0.08]">
               <button 
                 onClick={() => setView("grid")}
                 className={`p-1.5 rounded-full transition-all ${view === "grid" ? "bg-white text-black" : "text-white/40 hover:text-white"}`}
               >
                  <Grid className="h-4 w-4" />
               </button>
               <button 
                 onClick={() => setView("list")}
                 className={`p-1.5 rounded-full transition-all ${view === "list" ? "bg-white text-black" : "text-white/40 hover:text-white"}`}
               >
                  <List className="h-4 w-4" />
               </button>
            </div>
         </div>
      </section>

      <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        {/* Collections Sidebar */}
        <aside className="space-y-6">
           <div className="space-y-1">
              <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">Collections</p>
              {collections.map(c => (
                <button 
                  key={c.name}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all ${
                    c.active 
                      ? "bg-white/[0.07] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" 
                      : "text-white/50 hover:bg-white/[0.03] hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                     <c.icon className={`h-4 w-4 ${c.active ? 'text-violet-400' : 'text-white/30'}`} />
                     {c.name}
                  </div>
                  <span className="text-[10px] font-bold text-white/20">{c.count}</span>
                </button>
              ))}
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-violet-400/60 hover:text-violet-400 hover:bg-violet-400/5 transition-all mt-4 border border-dashed border-violet-400/20">
                 <FolderPlus className="h-4 w-4" />
                 Create Collection
              </button>
           </div>

           <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-violet-400 mb-2">
                 <Sparkles className="h-3 w-3" /> AI Librarian
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                 Threadify AI has organized 12 of your AI bookmarks into a new suggested collection.
              </p>
              <button className="mt-4 text-xs font-bold text-white hover:text-violet-300 transition-colors flex items-center gap-1.5 group">
                 Review Suggestions <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </button>
           </div>
        </aside>

        {/* Content Area */}
        <main className="space-y-4">
           <AnimatePresence mode="popLayout">
              {savedPosts.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 transition-all hover:border-white/[0.1] hover:bg-white/[0.03]"
                >
                  <div className="flex items-start justify-between gap-4">
                     <div className="flex-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 mb-2">
                           <Hash className="h-3 w-3" /> {p.community}
                           <span>·</span>
                           <span>{p.time}</span>
                        </div>
                        <h3 className="text-base font-medium text-white group-hover:text-violet-300 transition-colors leading-snug">
                           {p.title}
                        </h3>
                        <p className="mt-1 text-xs text-white/40">By {p.author}</p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                           {p.tags.map(tag => (
                             <span key={tag} className="rounded-lg bg-white/[0.03] px-2 py-1 text-[10px] text-white/40 border border-white/[0.05]">
                               {tag}
                             </span>
                           ))}
                        </div>
                     </div>

                     <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="h-8 w-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all">
                           <Share2 className="h-3.5 w-3.5" />
                        </button>
                        <button className="h-8 w-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-rose-400 hover:bg-rose-400/10 transition-all">
                           <Trash2 className="h-3.5 w-3.5" />
                        </button>
                        <button className="h-8 w-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all">
                           <MoreHorizontal className="h-3.5 w-3.5" />
                        </button>
                     </div>
                  </div>
                </motion.div>
              ))}
           </AnimatePresence>

           <div className="flex items-center justify-center py-10">
              <div className="flex flex-col items-center gap-4 text-center max-w-xs">
                 <div className="h-12 w-12 rounded-full border border-dashed border-white/10 flex items-center justify-center text-white/10">
                    <Bookmark className="h-6 w-6" />
                 </div>
                 <p className="text-xs text-white/20">
                    You have reached the end of your library. <br/>
                    Saved threads are kept forever unless manually removed.
                 </p>
              </div>
           </div>
        </main>
      </div>
    </motion.div>
  );
}
