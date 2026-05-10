"use client";

import { Users, Flame, Settings } from "lucide-react";
import { ExtendedCommunity } from "@/lib/types";

export function CommunityHeader({ community }: { community: ExtendedCommunity }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0a0a0f] p-8 md:p-12">
      <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br ${community.color || 'from-violet-500/20 to-indigo-500/10'} blur-[100px]`} />
      
      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className={`h-24 w-24 rounded-[32px] bg-gradient-to-br ${community.color || 'from-violet-500 to-indigo-600'} ring-4 ring-white/5 flex items-center justify-center text-3xl font-bold text-white shadow-2xl`}>
             {community.name[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
               <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Community</span>
               <div className="h-1 w-1 rounded-full bg-white/20" />
               <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/40">
                  <Flame className="h-3.5 w-3.5 text-rose-400" /> Hot
               </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white">t/{community.name}</h1>
            <p className="mt-2 text-white/50 text-sm flex items-center gap-4">
               <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {community._count.members.toLocaleString()} members</span>
               <span className="h-1 w-1 rounded-full bg-white/20" />
               <span className="text-emerald-400 font-medium">842 online</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
           <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03] text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white">
              <Settings className="h-5 w-5" />
           </button>
           <button className="h-12 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-8 text-sm font-bold text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.7)] transition-all hover:shadow-[0_8px_40px_-4px_rgba(139,92,246,0.9)] hover:-translate-y-0.5">
              Join Community
           </button>
        </div>
      </div>
    </section>
  );
}
