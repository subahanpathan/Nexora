"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Bell,
  Sparkles,
  ChevronDown,
  MessageSquare,
  UserPlus,
  Zap,
  ArrowRight
} from "lucide-react";
import { ThreadifyLogo } from "./logo";
import { AICommandPanel } from "./ai-command-panel";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "@/hooks/use-notifications";
import { markNotificationRead } from "@/lib/actions/user";

export function Navbar() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const pathname = usePathname();
  const { notifications, unreadCount, refresh } = useNotifications();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsAIOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Trending", href: "/trending" },
    { label: "Explore", href: "/explore" },
    { label: "Communities", href: "/communities" },
    { label: "Network", href: "/network" },
  ];

  const handleMarkRead = async (id: string) => {
    try {
      await markNotificationRead(id);
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 to-black/30 backdrop-blur-2xl border-b border-white/[0.06]" />
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <ThreadifyLogo />
        </Link>

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative rounded-full px-4 py-2 text-sm transition-all ${
                  active
                    ? "text-white"
                    : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {active && (
                   <motion.div 
                     layoutId="navActive"
                     className="absolute inset-0 z-0 rounded-full bg-white/[0.07] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                   />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto hidden flex-1 max-w-md md:block">
          <div className="group relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/30 via-violet-500/30 to-fuchsia-500/30 opacity-0 blur-md transition-opacity group-focus-within:opacity-100" />
            <div 
              onClick={() => setIsAIOpen(true)}
              className="relative flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 transition-colors group-focus-within:border-violet-400/40 cursor-text"
            >
              <Sparkles className="h-4 w-4 text-violet-300/80" />
              <div className="w-full bg-transparent text-sm text-white/40 outline-none">
                Ask Threadify AI or search...
              </div>
              <kbd className="hidden rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-white/50 sm:inline">
                ⌘K
              </kbd>
            </div>
          </div>
        </div>

        <div className="ml-auto md:ml-0 flex items-center gap-2">
          <button className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.7)] transition-all hover:shadow-[0_8px_40px_-4px_rgba(139,92,246,0.9)] hover:-translate-y-0.5 active:scale-95">
            <Plus className="h-4 w-4" /> Create
          </button>
          
          <IconBtn 
            icon={<Sparkles className="h-4 w-4 text-violet-400" />} 
            onClick={() => setIsAIOpen(true)}
          />
          
          <div className="relative">
            <IconBtn 
              icon={<Bell className="h-4 w-4" />} 
              dot={unreadCount > 0}
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              active={isNotifOpen}
            />
            <AnimatePresence>
               {isNotifOpen && (
                 <>
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     onClick={() => setIsNotifOpen(false)}
                     className="fixed inset-0 z-[-1]"
                   />
                   <motion.div
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
                     className="absolute right-0 mt-3 w-80 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0f] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                   >
                     <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">Notifications</span>
                        <button className="text-[10px] font-bold uppercase tracking-widest text-violet-400 hover:text-violet-300 transition-colors">Mark all as read</button>
                     </div>
                     <div className="max-h-[380px] overflow-y-auto">
                        {notifications.length === 0 ? (
                           <div className="p-10 text-center text-white/20 text-xs font-medium uppercase tracking-widest">No activity yet</div>
                        ) : (
                          notifications.map((n) => {
                            const Icon = n.type === "REPLY" ? MessageSquare : n.type === "FOLLOW" ? UserPlus : Zap;
                            const color = n.type === "REPLY" ? "text-blue-400" : n.type === "FOLLOW" ? "text-emerald-400" : "text-amber-400";
                            
                            return (
                              <div 
                                key={n.id} 
                                onClick={() => handleMarkRead(n.id)}
                                className={`p-4 flex items-start gap-3 hover:bg-white/[0.03] transition-colors cursor-pointer group ${!n.read ? 'bg-white/[0.02]' : 'opacity-60'}`}
                              >
                                 <div className={`mt-1 h-8 w-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center ${color}`}>
                                    <Icon className="h-4 w-4" />
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium text-white leading-snug">{n.title}</p>
                                    <p className="text-[11px] text-white/40 mt-0.5 truncate">{n.content}</p>
                                    <p className="text-[10px] text-white/20 mt-1">{new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                 </div>
                                 {!n.read && <div className="h-1.5 w-1.5 rounded-full bg-violet-500 mt-2 shrink-0 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />}
                              </div>
                            );
                          })
                        )}
                     </div>
                     <button className="w-full py-3 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/[0.03] transition-all border-t border-white/5 flex items-center justify-center gap-2">
                        View all activity <ArrowRight className="h-3 w-3" />
                     </button>
                   </motion.div>
                 </>
               )}
            </AnimatePresence>
          </div>

          <button className="ml-1 flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] p-1 pr-2 transition-colors hover:bg-white/[0.06]">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center font-bold text-[10px] text-white">
               T
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-white/50" />
          </button>
        </div>
      </div>
      
      <AICommandPanel isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
    </header>
  );
}

function IconBtn({ 
  icon, 
  dot, 
  onClick, 
  active 
}: { 
  icon: React.ReactNode; 
  dot?: boolean; 
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button 
      onClick={onClick}
      className={`relative grid h-9 w-9 place-items-center rounded-full border transition-all ${
        active 
          ? "border-violet-500/40 bg-violet-500/10 text-white" 
          : "border-white/[0.06] bg-white/[0.03] text-white/70 hover:bg-white/[0.07] hover:text-white"
      }`}
    >
      {icon}
      {dot && (
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gradient-to-br from-rose-400 to-fuchsia-500 shadow-[0_0_8px_rgba(244,114,182,0.9)]" />
      )}
    </button>
  );
}
