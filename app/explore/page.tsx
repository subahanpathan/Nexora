"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Compass, 
  Sparkles, 
  Play, 
  Image as ImageIcon, 
  Cpu, 
  Heart, 
  Eye,
  ArrowUpRight
} from "lucide-react";

const exploreItems = [
  { id: 1, type: "video", title: "The future of AI-native social", author: "@alexr", views: "142k", likes: "12.4k", g: "from-violet-500 to-indigo-500", size: "large" },
  { id: 2, type: "image", title: "Threadify Design System v1.0", author: "@elena", views: "84k", likes: "8.2k", g: "from-fuchsia-500 to-rose-500", size: "medium" },
  { id: 3, type: "showcase", title: "New RAG Architecture", author: "@kenji", views: "92k", likes: "7.1k", g: "from-amber-400 to-orange-500", size: "small" },
  { id: 4, type: "community", title: "Join t/designengineering", author: "Verified", views: "12k", likes: "2.1k", g: "from-emerald-400 to-cyan-500", size: "medium" },
  { id: 5, type: "video", title: "Building in Public: $0 to $42k MRR", author: "@aria", views: "241k", likes: "18.4k", g: "from-indigo-400 to-sky-500", size: "large" },
  { id: 6, type: "image", title: "Apple-level UI patterns", author: "@mateo", views: "56k", likes: "4.2k", g: "from-rose-500 to-orange-400", size: "small" },
  { id: 7, type: "showcase", title: "Agentic Workflows Demo", author: "@yuki", views: "112k", likes: "9.4k", g: "from-violet-400 to-fuchsia-400", size: "medium" },
  { id: 8, type: "image", title: "Futuristic Glassmorphism", author: "@sofia", views: "42k", likes: "3.1k", g: "from-indigo-600 to-violet-800", size: "small" },
];

export default function ExplorePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Search & Tabs */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6">
         <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl bg-white/[0.04] flex items-center justify-center border border-white/[0.08]">
               <Compass className="h-5 w-5 text-violet-400" />
            </div>
            <div>
               <h1 className="text-xl font-semibold text-white">Explore</h1>
               <p className="text-xs text-white/40">Discover the best of Threadify</p>
            </div>
         </div>
         
         <div className="flex items-center gap-4">
            <div className="relative group">
               <div className="absolute inset-0 rounded-full bg-violet-500/10 opacity-0 blur-lg transition-opacity group-focus-within:opacity-100" />
               <div className="relative flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 transition-all group-focus-within:border-violet-500/40">
                  <Search className="h-4 w-4 text-white/30" />
                  <input 
                    placeholder="Search explore..."
                    className="bg-transparent text-sm text-white placeholder:text-white/20 outline-none w-full md:w-48"
                  />
               </div>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-white/[0.04] p-1 border border-white/[0.08]">
               {["Feed", "Visual", "Audio", "AI"].map((t, i) => (
                 <button 
                    key={t}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      i === 1 ? "bg-white text-black" : "text-white/40 hover:text-white"
                    }`}
                 >
                    {t}
                 </button>
               ))}
            </div>
         </div>
      </section>

      {/* Grid */}
      <section className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
        {exploreItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br ${item.g} break-inside-avoid shadow-2xl transition-all hover:scale-[1.02] active:scale-95`}
            style={{ 
              height: item.size === "large" ? "420px" : item.size === "medium" ? "300px" : "200px" 
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            {/* Icon Tag */}
            <div className="absolute left-4 top-4 rounded-xl bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur border border-white/10 flex items-center gap-2">
               {item.type === "video" ? <Play className="h-3 w-3 fill-white" /> : item.type === "image" ? <ImageIcon className="h-3 w-3" /> : <Cpu className="h-3 w-3" />}
               {item.type}
            </div>

            {/* AI Sparkle */}
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="rounded-full bg-violet-500 p-2 shadow-lg shadow-violet-500/50">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
               </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
               <p className="text-xs font-medium text-white/60 mb-1">{item.author}</p>
               <h3 className="text-lg font-semibold text-white leading-tight group-hover:text-violet-300 transition-colors">
                  {item.title}
               </h3>
               
               <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                     <span className="flex items-center gap-1.5">
                        <Eye className="h-3.5 w-3.5" /> {item.views}
                     </span>
                     <span className="flex items-center gap-1.5 group-hover:text-rose-400 transition-colors">
                        <Heart className="h-3.5 w-3.5 group-hover:fill-rose-400" /> {item.likes}
                     </span>
                  </div>
                  <button className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur border border-white/10 hover:bg-white hover:text-black transition-all">
                     <ArrowUpRight className="h-4 w-4" />
                  </button>
               </div>
            </div>

            {/* Hover Details (Expanded on Large) */}
            {item.size === "large" && (
               <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                  <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xl border border-white/20 cursor-pointer hover:bg-white hover:text-black transition-colors">
                     <Play className="h-6 w-6 ml-1 fill-current" />
                  </div>
                  <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Watch Summary</span>
               </div>
            )}
          </motion.div>
        ))}
      </section>

      {/* Featured Creators Row */}
      <section className="py-6">
         <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/30">Verified Creators</h2>
            <div className="h-px flex-1 mx-6 bg-white/5" />
            <button className="text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors">Join Creators</button>
         </div>
         <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {[1,2,3,4,5,6,7,8].map(i => (
              <div key={i} className="flex flex-col items-center gap-3 shrink-0 group cursor-pointer">
                 <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
                    <div className="relative h-16 w-16 rounded-full p-0.5 bg-gradient-to-br from-violet-500 to-fuchsia-500">
                       <div className="h-full w-full rounded-full bg-[#0a0a0f] ring-2 ring-[#0a0a0f] overflow-hidden">
                          <div className="h-full w-full bg-gradient-to-br from-gray-700 to-gray-900" />
                       </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-[#0a0a0f] border border-white/10 flex items-center justify-center shadow-lg">
                       <Sparkles className="h-3 w-3 text-violet-400" />
                    </div>
                 </div>
                 <span className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors">CREATOR_{i}</span>
              </div>
            ))}
         </div>
      </section>
    </motion.div>
  );
}
