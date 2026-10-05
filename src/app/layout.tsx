"use client";

import React, { useState } from "react";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { RoleBanner } from "@/components/layout/RoleBanner";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { DemoTourModal } from "@/components/demo/DemoTourModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>Project Sentinel – Intelligent Integrated Project Monitoring Platform (MoSPI)</title>
        <meta
          name="description"
          content="Centralized government-grade integrated project monitoring platform for MoSPI (SIH26103) with real-time tracking, AI insights, budget analytics, and GIS geo-monitoring."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans flex flex-col">
        <AppProvider>
          {/* Top Role Switcher Demo Bar */}
          <RoleBanner />

          {/* Main App Shell */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Content Container */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
              <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
              
              <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                {children}
              </main>

              {/* National Footer */}
              <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-gov-navy text-amber-400 font-black text-[10px] flex items-center justify-center">
                    PS
                  </div>
                  <span>Ministry of Statistics & Programme Implementation • Smart India Hackathon (SIH26103)</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Project Sentinel Platform v2.6.0 • Hosted on Secure Government Infrastructure
                </div>
              </footer>
            </div>
          </div>

          {/* Toasts & Hackathon Guided Demo Tour */}
          <ToastContainer />
          <DemoTourModal />
        </AppProvider>
      </body>
    </html>
  );
}
