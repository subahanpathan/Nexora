"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { ThreadifyLogo } from "../premium/logo";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

export function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLink,
  footerLinkText,
}: AuthCardProps) {
  return (
    <div className="min-h-screen bg-[#07070b] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-500/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        <div className="flex justify-center mb-8">
           <ThreadifyLogo />
        </div>

        <div className="rounded-[32px] border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-8 md:p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold tracking-tight text-white">{title}</h1>
            <p className="mt-2 text-white/40 text-sm">{subtitle}</p>
          </div>

          <div className="space-y-4">
            {children}
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-white/30 uppercase tracking-widest font-bold italic mb-4 flex items-center justify-center gap-2">
               <Sparkles className="h-3 w-3 text-violet-400" /> Threadify <span className="text-violet-500">Secure Access</span>
            </p>
            <p className="text-sm text-white/40">
              {footerText}{" "}
              <Link href={footerLink} className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                {footerLinkText}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function AuthInput({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative group">
       <div className="absolute inset-0 rounded-2xl bg-violet-500/10 opacity-0 blur-lg transition-opacity group-focus-within:opacity-100" />
       <input
         {...props}
         className="relative w-full rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-white placeholder:text-white/20 outline-none transition-all focus:border-violet-500/40 focus:bg-white/[0.06]"
       />
    </div>
  );
}

export function AuthButton({ children, loading, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-4 text-sm font-bold text-white shadow-[0_8px_30px_-8px_rgba(139,92,246,0.7)] transition-all hover:shadow-[0_8px_40px_-4px_rgba(139,92,246,0.9)] hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-50 disabled:translate-y-0"
    >
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {children}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </div>
    </button>
  );
}
