import React from "react";
import {
  CheckCircle2,
  Flame,
  Radio,
  Users,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { getRecommendedCommunities, getRecommendedUsers } from "@/lib/actions/recommendation";
import { FollowButton } from "@/components/user/follow-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import Link from "next/link";

type RecommendedCommunity = {
  id?: string;
  slug?: string;
  name?: string;
  color?: string | null;
  _count?: { members?: number };
};

type RecommendedUser = {
  id?: string;
  username?: string | null;
  bio?: string | null;
  verified?: boolean;
};

export async function RightSidebar() {
  const session = await getServerSession(authOptions).catch(() => null);
  
  let communities: RecommendedCommunity[] = [];
  let users: RecommendedUser[] = [];


  try {
    const [communitiesData, usersData] = await Promise.all([
      getRecommendedCommunities(),
      getRecommendedUsers(),
    ]);
    communities = communitiesData || [];
    users = usersData || [];
  } catch (error) {
    console.error("RightSidebar data fetch failed:", error);
  }


  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-[360px] shrink-0 space-y-6 overflow-y-auto pl-4 xl:block scrollbar-hide">
      {/* Profile / Reputation */}
      {session?.user ? (
        <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-6">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 border border-white/10 shadow-lg flex items-center justify-center font-bold text-white text-xl">
              {session.user.name?.[0].toUpperCase() || "U"}
            </div>
            <div>
              <div className="flex items-center gap-2 text-base font-bold text-white tracking-tight">
                {session.user.name || "Nexora Member"}
                <CheckCircle2 className="h-4 w-4 text-violet-400" />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-widest text-white/30">Member · Node Sync Active</div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              { v: "1.2k", l: "Rep" },
              { v: "12", l: "Posts" },
              { v: "84", l: "Nodes" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/5 bg-white/[0.02] py-3 flex flex-col items-center"
              >
                <div className="text-sm font-black text-white">{s.v}</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-white/20 mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-600/10 via-fuchsia-500/5 to-transparent p-8 text-center">
           <div className="mx-auto h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-black" />
           </div>
           <h3 className="text-lg font-bold text-white tracking-tight">Join Nexora</h3>
           <p className="mt-2 text-xs text-white/40 leading-relaxed font-medium">Connect with top-tier builders and grow your professional signal.</p>
           <Link href="/register" className="mt-6 block w-full rounded-2xl bg-white py-3.5 text-xs font-black uppercase tracking-widest text-black hover:-translate-y-1 transition-all shadow-xl shadow-white/5">
              Sync Account
           </Link>
        </div>
      )}

      {/* Trending communities */}
      <SidebarCard title="Trending Nodes" icon={<Flame className="h-4 w-4 text-rose-400" />}>
        {communities.slice(0, 5).map((c, i) => (
          <div
            key={c?.id || i}
            className="flex items-center gap-4 rounded-2xl px-3 py-3 transition-all hover:bg-white/[0.03] group"
          >
            <span className="w-4 text-[10px] font-black text-white/10 group-hover:text-white/30">{i + 1}</span>
            <span className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${c?.color || 'from-violet-600 to-indigo-500'} border border-white/10 group-hover:scale-110 transition-transform`} />
            <div className="min-w-0 flex-1">
              <Link href={`/t/${c?.slug || '#'}`} className="truncate text-sm font-bold text-white block hover:text-violet-300">t/{c?.name || 'community'}</Link>
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{(c?._count?.members || 0).toLocaleString()} synced</div>
            </div>
            <Link href={`/t/${c?.slug || '#'}`} className="rounded-xl border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] font-bold text-white/80 hover:bg-white/[0.1] hover:text-white transition-all">
              Join
            </Link>
          </div>
        ))}
      </SidebarCard>

      {/* Suggested creators / network */}
      <SidebarCard title="Network Signals" icon={<Users className="h-4 w-4 text-sky-400" />}>
        {users.slice(0, 5).map((p, i) => (
          <div
            key={p?.id || i}
            className="flex items-center gap-4 rounded-2xl px-3 py-3 transition-all hover:bg-white/[0.03] group"
          >
            <div className="relative h-11 w-11 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center font-bold text-sm text-white group-hover:border-white/20 transition-all">
              {p?.username?.[0]?.toUpperCase() || "U"}
              {p?.verified && (
                <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-lg bg-[#030303] border border-white/10 flex items-center justify-center">
                   <CheckCircle2 className="h-3 w-3 text-violet-400" />
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/u/${p?.username || '#'}`} className="truncate text-sm font-bold text-white block hover:text-violet-300 tracking-tight">{p?.username || 'anonymous'}</Link>
              <div className="truncate text-[10px] font-bold text-white/20 uppercase tracking-widest">{p?.bio || "Node Creator"}</div>
            </div>
            {p?.id && <FollowButton userId={p.id} isFollowingInitial={false} />}
          </div>
        ))}
      </SidebarCard>

      {/* Live discussions */}
      <SidebarCard
        title="Live Signal"
        icon={<Radio className="h-4 w-4 text-rose-500 animate-pulse" />}
      >
        {[
          { t: "AI-native social: hype or reality?", c: "1.2k" },
          { t: "What killed your last side project?", c: "842" },
          { t: "Designing for calm in dense UIs", c: "612" },
        ].map((d) => (
          <div
            key={d.t}
            className="flex items-start gap-4 rounded-2xl px-3 py-4 transition-all hover:bg-white/[0.03] group"
          >
            <span className="relative mt-1.5 h-2 w-2 shrink-0 rounded-full bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,1)]">
              <span className="absolute inset-0 animate-ping rounded-full bg-rose-500/70" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-white leading-tight tracking-tight group-hover:text-violet-200 transition-colors">{d.t}</div>
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mt-1.5">{d.c} synced</div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-white/10 group-hover:text-white transition-all" />
          </div>
        ))}
      </SidebarCard>

      <div className="px-6 pb-12">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-white/20">
          <a href="#" className="hover:text-white transition-colors">Vision</a>
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Nodes</a>
        </div>
        <div className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/10">© 2026 Nexora Network</div>
      </div>
    </aside>

  );
}

function SidebarCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4">
      <div className="mb-3 flex items-center gap-2 px-1 text-[11px] uppercase tracking-[0.18em] text-white/45">
        {icon}
        <span>{title}</span>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}
