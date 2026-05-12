"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Radio } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[2.25rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent p-7 sm:p-10 lg:p-14">
      <div className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-[110px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-fuchsia-600/15 blur-[110px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_80%_65%,rgba(139,92,246,0.2),transparent_36%)]" />

      <div className="relative z-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div className="max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.23em] text-violet-200"
          >
            <Sparkles className="h-3.5 w-3.5 text-violet-300" />
            AI-native Community Layer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl"
          >
            Communities with
            <br />
            <span className="title-gradient">clarity, signal, and velocity.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            Nexora is where ambitious teams and creators think together. Discover
            high-signal conversations, contribute with context, and build
            reputation in a premium, focused experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              href="/create"
              className="group relative overflow-hidden rounded-2xl bg-white px-7 py-3.5 text-sm font-bold text-black transition-all hover:scale-[1.02] hover:shadow-[0_18px_35px_-10px_rgba(255,255,255,0.45)]"
            >
              <div className="relative z-10 flex items-center gap-2">
                Launch Your First Post{" "}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
            <Link
              href="/trending"
              className="rounded-2xl border border-white/[0.12] bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/[0.06] hover:border-white/20"
            >
              Explore Trending
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.18, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:ml-auto"
        >
          <div className="absolute -inset-10 -z-10 rounded-full bg-violet-500/15 blur-[70px]" />
          <div className="glass-card relative w-full max-w-[400px] overflow-hidden p-6 sm:p-8">
            <div className="absolute right-0 top-0 p-4 opacity-20">
              <Radio className="h-20 w-20 text-white" />
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              Real-time Pulse
            </div>

            <h3 className="mt-4 text-2xl font-semibold leading-tight text-white">
              Conversations with
              <br />
              context, not noise.
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-white/50">
              3,412 members active right now. Most discussed topics in{" "}
              <span className="text-violet-300">t/product</span> and{" "}
              <span className="text-violet-300">t/aiengineering</span>.
            </p>

            <div className="mt-8 flex items-center gap-4 border-t border-white/8 pt-6">
              <div className="flex -space-x-3">
                {["bg-violet-500", "bg-fuchsia-500", "bg-indigo-500", "bg-sky-500"].map((c, i) => (
                  <div key={i} className={`h-10 w-10 rounded-2xl ${c} border-2 border-[#030303] flex items-center justify-center font-bold text-[10px]`}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Signal Quality</div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "82%" }}
                    transition={{ delay: 0.6, duration: 1.2 }}
                    className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  />
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs text-white/60"
            >
              Where communities think together.
            </motion.div>
          </div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-5 -top-5 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4 text-violet-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
