import Link from "next/link";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";

import LogoutButton from "./logout-button";

export default async function Navbar() {
  const session = await getServerSession(
    authOptions
  );

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#0f1115]/90 backdrop-blur">
      <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          Echo
        </Link>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <div className="px-4 py-2 rounded-full bg-zinc-800 text-sm font-medium">
                {session.user.name}
              </div>

              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm text-zinc-300 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}