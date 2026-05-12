import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/premium/navbar";
import { LeftSidebar } from "@/components/premium/sidebar-left";
import { RightSidebar } from "@/components/premium/sidebar-right";
import { IntroOverlay } from "@/components/premium/intro-overlay";
import { NeuralBackground } from "@/components/premium/neural-background";
import Provider from "@/providers/session-provider";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexora | The AI-Native Community Platform",
  description: "A premium, intelligent discussion ecosystem where communities think together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-[#030303] text-white antialiased selection:bg-violet-500/30 overflow-x-hidden`}>
        <Provider>
          <QueryProvider>
            <IntroOverlay />
            
            <NeuralBackground />

            
            {/* Ambient Background Glows */}
            <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
              <div className="absolute -left-[10%] top-0 h-[800px] w-[800px] rounded-full bg-violet-600/10 blur-[120px]" />
              <div className="absolute -right-[10%] bottom-0 h-[800px] w-[800px] rounded-full bg-fuchsia-600/5 blur-[120px]" />
            </div>

            <div className="relative z-0">
              <Navbar />

              <div className="mx-auto flex max-w-[1600px] items-start gap-0 px-4 sm:px-6 lg:gap-8 lg:px-8">
                <LeftSidebar />
                
                <main className="flex-1 min-w-0 py-8 lg:py-10">
                  {children}
                </main>

                <RightSidebar />
              </div>
            </div>
            
            <Toaster position="bottom-right" richColors />
          </QueryProvider>
        </Provider>
      </body>
    </html>
  );
}