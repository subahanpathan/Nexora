"use client";

import { motion } from "framer-motion";
import { Plus, ArrowUpRight, Compass, Radio } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 sm:p-10">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-[120px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            Now in public beta
          </div>

          <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Where ideas{" "}
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              find their people.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/60 sm:text-lg">
            A next-generation discussion network — communities, professional
            profiles and signal-rich threads, in one beautifully calm interface.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-10px_rgba(139,92,246,0.85)] transition-all hover:-translate-y-0.5">
              <Plus className="h-4 w-4" /> Create your first post
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-5 py-3 text-sm text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white">
              <Compass className="h-4 w-4" /> Explore communities
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-md">
            {[
              { v: "2.4M", l: "Threads" },
              { v: "184K", l: "Communities" },
              { v: "9.1M", l: "Members" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-3"
              >
                <div className="text-xl font-semibold text-white">{s.v}</div>
                <div className="text-[11px] uppercase tracking-wider text-white/40">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating preview card */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-fuchsia-500/20 blur-2xl" />
          <div className="rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur">
            <div className="flex items-center gap-2 text-xs text-white/55">
              <Radio className="h-3.5 w-3.5 text-rose-400" /> Trending now
            </div>
            <h3 className="mt-2 text-lg font-medium text-white">
              The new wave of AI-native social products
            </h3>
            <p className="mt-1.5 text-sm text-white/55">
              A live discussion across t/aiengineering and t/founders — 3,214
              participants right now.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {["from-amber-400 to-rose-500", "from-emerald-400 to-cyan-500", "from-indigo-400 to-violet-500", "from-fuchsia-500 to-rose-500"].map(
                  (g, i) => (
                    <div
                      key={i}
                      className={`h-7 w-7 rounded-full bg-gradient-to-br ${g} ring-2 ring-[#0a0a0f]`}
                    />
                  )
                )}
              </div>
              <span className="text-xs text-white/55">+3.2k joined</span>
              <button className="ml-auto inline-flex items-center gap-1 rounded-full bg-white text-black px-3 py-1.5 text-xs font-medium transition-transform hover:-translate-y-0.5">
                Join <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
