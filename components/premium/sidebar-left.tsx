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
    { name: "design.systems", color: "from-indigo-500 to-violet-500", count: "284k" },
    { name: "buildinpublic", color: "from-emerald-400 to-cyan-500", count: "162k" },
    { name: "aiengineering", color: "from-fuchsia-500 to-rose-500", count: "98k" },
    { name: "founders", color: "from-amber-400 to-orange-500", count: "72k" },
  ];

  const [openCat, setOpenCat] = useState(true);

  return (
    <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-64 shrink-0 overflow-y-auto pr-2 lg:block">
      <div className="space-y-1.5">
        {main.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.label}
              href={it.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                active
                  ? "bg-gradient-to-r from-white/[0.07] to-transparent text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]"
                  : "text-white/65 hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <span
                className={`grid h-8 w-8 place-items-center rounded-lg ${
                  active
                    ? "bg-gradient-to-br from-indigo-500/30 to-violet-500/20 ring-1 ring-violet-400/30"
                    : "bg-white/[0.03] ring-1 ring-white/[0.06] group-hover:ring-white/10"
                }`}
              >
                <it.icon className="h-4 w-4" />
              </span>
              {it.label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.9)]" />
              )}
            </Link>
          );
        })}
      </div>

      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.12] bg-white/[0.02] py-2.5 text-sm text-white/70 transition-colors hover:border-violet-400/40 hover:bg-violet-500/[0.05] hover:text-white">
        <PlusCircle className="h-4 w-4" />
        Create Community
      </button>

      <div className="mt-6">
        <button
          onClick={() => setOpenCat((v) => !v)}
          className="mb-2 flex w-full items-center justify-between px-2 text-[11px] uppercase tracking-[0.18em] text-white/40"
        >
          <span>Favorites</span>
          {openCat ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
        </button>
        {openCat && (
          <div className="space-y-1">
            {favs.map((f) => (
              <a
                key={f.name}
                href="#"
                className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                <span
                  className={`h-7 w-7 shrink-0 rounded-lg bg-gradient-to-br ${f.color} ring-1 ring-white/10`}
                />
                <span className="truncate">t/{f.name}</span>
                <span className="ml-auto text-[11px] text-white/40">{f.count}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-4">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Star className="h-3.5 w-3.5 text-amber-300" /> Reputation
        </div>
        <div className="mt-2 text-2xl font-semibold tracking-tight text-white">
          8,420
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400" />
        </div>
        <div className="mt-2 text-[11px] text-white/40">
          1,580 XP to next tier
        </div>
      </div>
    </aside>
  );
}
