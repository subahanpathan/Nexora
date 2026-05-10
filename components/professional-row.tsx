"use client";

import { motion } from "framer-motion";
import { Briefcase, Rocket, Cpu, Zap, ArrowUpRight } from "lucide-react";

export function ProfessionalRow() {
  const items = [
    {
      icon: Briefcase,
      title: "Hiring posts",
      desc: "Reach builders directly — from $0 to series-B teams.",
      g: "from-amber-400/30 via-orange-500/20 to-rose-500/20",
      stat: "1,284 open roles",
    },
    {
      icon: Rocket,
      title: "Project showcases",
      desc: "Launch your startup to a network of operators and investors.",
      g: "from-indigo-500/30 via-violet-500/20 to-fuchsia-500/20",
      stat: "612 launching this week",
    },
    {
      icon: Cpu,
      title: "Verified creators",
      desc: "A trusted layer for engineers, designers and founders.",
      g: "from-emerald-400/25 via-cyan-500/20 to-sky-500/20",
      stat: "48,200 verified",
    },
    {
      icon: Zap,
      title: "Reputation engine",
      desc: "Earn signal across communities — not just karma.",
      g: "from-fuchsia-500/25 via-rose-500/20 to-amber-500/20",
      stat: "9 tiers",
    },
  ];
  return (
    <section className="mt-10">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-4 flex items-end justify-between"
      >
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
            Built for professionals
          </div>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white">
            More than a feed — a network.
          </h2>
        </div>
        <a
          href="#"
          className="hidden items-center gap-1 text-sm text-white/60 hover:text-white sm:inline-flex"
        >
          View all <ArrowUpRight className="h-4 w-4" />
        </a>
      </motion.div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 transition-all hover:-translate-y-1 hover:border-white/[0.12]"
          >
            <div
              className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${it.g} blur-2xl opacity-80 transition-opacity group-hover:opacity-100`}
            />
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                <it.icon className="h-4 w-4 text-white/85" />
              </div>
              <div className="mt-4 text-base font-medium text-white">
                {it.title}
              </div>
              <p className="mt-1 text-sm text-white/55">{it.desc}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-white/55">
                <span>{it.stat}</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
