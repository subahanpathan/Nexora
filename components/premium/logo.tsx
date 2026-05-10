import React from "react";

export function ThreadifyLogo({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative grid place-items-center rounded-xl"
        style={{ width: size, height: size }}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 opacity-90" />
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 blur-md opacity-60" />
        <svg
          viewBox="0 0 24 24"
          width={size * 0.55}
          height={size * 0.55}
          className="relative z-10"
          fill="none"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 7h16" />
          <path d="M4 12h10" />
          <path d="M4 17h16" />
          <circle cx="18" cy="12" r="2.2" fill="white" stroke="none" />
        </svg>
      </div>
      <div className="flex items-baseline gap-0.5">
        <span className="text-[1.05rem] font-semibold tracking-tight bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
          Threadify
        </span>
        <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-400 shadow-[0_0_10px_rgba(167,139,250,0.9)]" />
      </div>
    </div>
  );
}
