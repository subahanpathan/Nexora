import React from "react";
import {
  CheckCircle2,
  Flame,
  Radio,
  Users,
  ArrowUpRight,
  Hash,
  Globe,
} from "lucide-react";
import { getRecommendedCommunities, getRecommendedUsers } from "@/lib/actions/recommendation";
import { FollowButton } from "@/components/user/follow-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import Link from "next/link";

export async function RightSidebar() {
  const session = await getServerSession(authOptions).catch(() => null);
  
  let communities: any[] = [];
  let users: any[] = [];


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
    <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-[340px] shrink-0 space-y-5 overflow-y-auto pl-2 xl:block scrollbar-hide">
      {/* Profile / Reputation */}
      {session ? (
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-5">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 ring-2 ring-white/10 flex items-center justify-center font-bold text-white text-lg">
              {session.user.name?.[0].toUpperCase() || "U"}
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-sm font-medium text-white">
                {session.user.name}
                <CheckCircle2 className="h-3.5 w-3.5 fill-sky-400/80 text-[#0a0a0f]" />
              </div>
              <div className="text-xs text-white/55">Member · @{session.user.name?.toLowerCase().replace(/ /g, "")}</div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            {[
              { v: "1.2k", l: "Rep" },
              { v: "12", l: "Posts" },
              { v: "84", l: "Followers" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] py-2"
              >
                <div className="text-sm font-semibold text-white">{s.v}</div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-6 text-center">
           <h3 className="text-sm font-semibold text-white">Join the ecosystem</h3>
           <p className="mt-2 text-xs text-white/50 leading-relaxed">Connect with top-tier builders and grow your professional signal.</p>
           <Link href="/register" className="mt-4 block w-full rounded-xl bg-white py-2.5 text-xs font-bold text-black hover:-translate-y-0.5 transition-transform">
              Get Started
           </Link>
        </div>
      )}

      {/* Trending communities */}
      <SidebarCard
        title="Trending communities"
        icon={<Flame className="h-3.5 w-3.5 text-rose-300" />}
      >
        {communities.map((c, i) => (
          <div
            key={c?.id || i}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.04]"
          >
            <span className="w-4 text-center text-xs text-white/40">{i + 1}</span>
            <span className={`h-8 w-8 rounded-lg bg-gradient-to-br ${c?.color || 'from-violet-500 to-indigo-500'} ring-1 ring-white/10`} />
            <div className="min-w-0 flex-1">
              <Link href={`/t/${c?.slug || '#'}`} className="truncate text-sm text-white block hover:text-violet-300">t/{c?.name || 'community'}</Link>
              <div className="text-[11px] text-white/45">{(c?._count?.members || 0).toLocaleString()} members</div>
            </div>
            <Link href={`/t/${c?.slug || '#'}`} className="rounded-full border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[11px] text-white/80 hover:bg-white/[0.08]">
              Join
            </Link>
          </div>
        ))}

      </SidebarCard>

      {/* Suggested creators / network */}
      <SidebarCard
        title="People to network with"
        icon={<Users className="h-3.5 w-3.5 text-sky-300" />}
      >
        {users.map((p, i) => (
          <div
            key={p?.id || i}
            className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.04]"
          >
            <div className={`relative h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 ring-1 ring-white/10 flex items-center justify-center font-bold text-[10px] text-white`}>
              {p?.username?.[0]?.toUpperCase() || "U"}
              {p?.verified && (
                <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-[#0a0a0f] ring-1 ring-white/10">
                   <CheckCircle2 className="h-2.5 w-2.5 text-sky-400" />
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <Link href={`/u/${p?.username || '#'}`} className="truncate text-sm text-white block hover:text-violet-300">{p?.username || 'anonymous'}</Link>
              <div className="truncate text-[11px] text-white/45">{p?.bio || "High-signal builder"}</div>
            </div>
            {p?.id && <FollowButton userId={p.id} isFollowingInitial={false} />}
          </div>
        ))}

      </SidebarCard>

      {/* Live discussions */}
      <SidebarCard
        title="Live discussions"
        icon={<Radio className="h-3.5 w-3.5 text-rose-400" />}
      >
        {[
          { t: "AI-native social: hype or reality?", c: "1.2k" },
          { t: "What killed your last side project?", c: "842" },
          { t: "Designing for calm in dense UIs", c: "612" },
        ].map((d) => (
          <div
            key={d.t}
            className="flex items-start gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-white/[0.04]"
          >
            <span className="relative mt-1.5 h-2 w-2 shrink-0 rounded-full bg-rose-400">
              <span className="absolute inset-0 animate-ping rounded-full bg-rose-400/70" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm text-white">{d.t}</div>
              <div className="text-[11px] text-white/45">{d.c} listening now</div>
            </div>
            <ArrowUpRight className="h-3.5 w-3.5 text-white/40" />
          </div>
        ))}
      </SidebarCard>

      {/* Trending topics */}
      <SidebarCard
        title="Trending topics"
        icon={<Hash className="h-3.5 w-3.5 text-violet-300" />}
      >
        <div className="flex flex-wrap gap-1.5">
          {[
            "#design-systems",
            "#rag",
            "#founders",
            "#typescript",
            "#agents",
            "#hiring",
            "#open-source",
            "#ux",
          ].map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white cursor-pointer"
            >
              {t}
            </span>
          ))}
        </div>
      </SidebarCard>

      {/* Online users */}
      <SidebarCard
        title="Online now"
        icon={<Globe className="h-3.5 w-3.5 text-emerald-300" />}
      >
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[
              "from-amber-400 to-rose-500",
              "from-emerald-400 to-cyan-500",
              "from-indigo-400 to-violet-500",
              "from-fuchsia-500 to-rose-500",
              "from-sky-400 to-indigo-500",
            ].map((g, i) => (
              <div
                key={i}
                className={`h-7 w-7 rounded-full bg-gradient-to-br ${g} ring-2 ring-[#0a0a0f]`}
              />
            ))}
          </div>
          <div className="text-xs text-white/60">
            <span className="font-medium text-white">2,418</span> people online
          </div>
        </div>
      </SidebarCard>

      <div className="px-2 pb-6 text-[11px] text-white/35">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#" className="hover:text-white/70">About</a>
          <a href="#" className="hover:text-white/70">Privacy</a>
          <a href="#" className="hover:text-white/70">Terms</a>
        </div>
        <div className="mt-2">© 2026 Threadify Labs</div>
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
