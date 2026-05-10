"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Loader2, ArrowRight, CornerDownLeft, Search, Users, Hash } from "lucide-react";
import { askThreadifyAI, AIResponse } from "@/lib/ai-service";
import { searchEverything } from "@/lib/actions/search";
import Link from "next/link";

interface SearchResults {
  posts: Array<{
    id: string;
    title: string;
    community: { name: string };
    author: { username: string };
  }>;
  communities: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
  users: Array<{
    id: string;
    username: string;
  }>;
}

export function AICommandPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    if (query.length > 15 || query.toLowerCase().includes("summarize") || query.toLowerCase().includes("how") || query.toLowerCase().includes("what")) {
      const res = await askThreadifyAI(query);
      setResponse(res);
      setSearchResults(null);
    } else {
      const results = await searchEverything(query);
      setSearchResults(results as unknown as SearchResults);
      setResponse(null);
    }
    
    setIsLoading(false);
  };

  const handleClose = () => {
    setQuery("");
    setResponse(null);
    setSearchResults(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-[15%] z-[101] w-full max-w-2xl -translate-x-1/2 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0f] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]"
          >
            <div className="relative p-6">
              <form onSubmit={handleSearch} className="flex items-center gap-4">
                <Sparkles className={`h-6 w-6 ${isLoading ? 'text-violet-400 animate-pulse' : 'text-violet-500'}`} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask Threadify AI anything or search..."
                  className="w-full bg-transparent text-xl font-medium text-white placeholder:text-white/20 outline-none"
                />
                <div className="flex items-center gap-2">
                   {query && !isLoading && (
                     <button type="submit" className="p-2 rounded-full bg-violet-500/10 text-violet-400 hover:bg-violet-500/20">
                        <CornerDownLeft className="h-4 w-4" />
                     </button>
                   )}
                   <button onClick={handleClose} className="p-2 text-white/30 hover:text-white">
                     <X className="h-5 w-5" />
                   </button>
                </div>
              </form>

              <div className="mt-6 min-h-[100px]">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-10 text-white/40">
                    <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
                    <p className="mt-4 text-sm tracking-wide">Processing query...</p>
                  </div>
                ) : response ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    <div className="text-lg leading-relaxed text-white/80">{response.answer}</div>
                    {response.sources && (
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">Sources</p>
                        <div className="flex flex-wrap gap-2">
                          {response.sources.map((s, i) => (
                            <Link key={i} href={s.url} className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-white/60 transition-colors hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-white">
                              {s.title} <ArrowRight className="h-3 w-3" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : searchResults ? (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                    {searchResults.communities.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">Communities</p>
                        <div className="grid grid-cols-2 gap-2">
                          {searchResults.communities.map((c) => (
                            <Link key={c.id} href={`/t/${c.slug}`} onClick={handleClose} className="flex items-center gap-3 rounded-2xl bg-white/[0.03] p-3 text-sm text-white hover:bg-white/[0.06] transition-all group">
                              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center font-bold">{c.name[0]}</div>
                              <span className="flex-1 truncate">t/{c.name}</span>
                              <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 text-white/40 transition-opacity" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {searchResults.posts.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">Threads</p>
                        <div className="space-y-2">
                          {searchResults.posts.map((p) => (
                            <Link key={p.id} href={`/post/${p.id}`} onClick={handleClose} className="flex flex-col gap-1 rounded-2xl bg-white/[0.03] p-3 text-sm text-white hover:bg-white/[0.06] transition-all group">
                              <span className="font-medium group-hover:text-violet-300 transition-colors">{p.title}</span>
                              <span className="text-[10px] text-white/40">in t/{p.community.name} by {p.author.username}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                    {searchResults.posts.length === 0 && searchResults.communities.length === 0 && (
                       <div className="text-center py-10 text-white/20">No results found for &quot;{query}&quot;</div>
                    )}
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                     <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-semibold">Quick Actions</p>
                     <div className="grid grid-cols-2 gap-3">
                        {[
                          { l: "Summarize AI Engineering", d: "Latest trends from t/aiengineering", icon: Sparkles },
                          { l: "Browse Communities", d: "Find your people", icon: Hash },
                          { l: "Trending Threads", d: "What's hot right now", icon: Search },
                          { l: "Network Hub", d: "Connect with builders", icon: Users },
                        ].map((cmd, i) => (
                          <button key={i} onClick={() => { setQuery(cmd.l); handleSearch(); }} className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-all hover:border-violet-500/40 hover:bg-violet-500/5 group">
                            <div className="h-10 w-10 rounded-xl bg-white/[0.03] flex items-center justify-center shrink-0">
                               <cmd.icon className="h-5 w-5 text-white/40 group-hover:text-violet-400 transition-colors" />
                            </div>
                            <div>
                               <span className="text-sm font-medium text-white/80 group-hover:text-white">{cmd.l}</span>
                               <span className="block mt-1 text-[11px] text-white/30 leading-tight">{cmd.d}</span>
                            </div>
                          </button>
                        ))}
                     </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-white/[0.06] bg-white/[0.02] px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-[10px] text-white/30">
                  <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-white/50 font-sans">ESC</kbd> to close
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-white/30 uppercase tracking-widest font-bold italic">
                Threadify <span className="text-violet-500">Core Engine</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
