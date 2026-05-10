import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/premium/navbar";
import { LeftSidebar } from "@/components/premium/sidebar-left";
import { RightSidebar } from "@/components/premium/sidebar-right";
import Provider from "@/providers/session-provider";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threadify | Next-Gen Social Ecosystem",
  description: "A futuristic AI-native discussion ecosystem for creators, developers, and communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#07070b] text-white antialiased selection:bg-violet-500/30`}>
        <Provider>
          <QueryProvider>
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
              <div className="absolute -left-[10%] top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
              <div className="absolute -right-[10%] bottom-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[120px]" />
            </div>

            <Navbar />

            <div className="mx-auto flex max-w-[1600px] items-start gap-0 px-4 sm:px-6 lg:gap-8 lg:px-8">
              <LeftSidebar />
              
              <main className="flex-1 min-w-0 py-8 lg:py-10">
                {children}
              </main>

              <RightSidebar />
            </div>
            <Toaster position="bottom-right" richColors />
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}