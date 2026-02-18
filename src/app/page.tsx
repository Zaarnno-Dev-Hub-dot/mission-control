"use client";

import { useState, useEffect } from "react";
import { KanBanBoard } from "@/components/kanban";
import { DragonPanel } from "@/components/dragons";
import { UsageStats } from "@/components/stats";
import type { DragonStats, StatsData } from "@/types/kanban";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"overview" | "kanban">("overview");
  const [dragonStats, setDragonStats] = useState<StatsData | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      if (res.ok) {
        const data = await res.json();
        setDragonStats(data);
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0a0a0f]">
      {/* Animated Background */}
      <div className="fixed inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/5 backdrop-blur-xl bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-red-500 rounded-xl animate-pulse" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-red-500 flex items-center justify-center text-white text-xl shadow-lg shadow-purple-500/30">
                  🐉
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Mission Control
                </h1>
                <p className="text-xs text-gray-500">Dragon&apos;s Eye view of our world</p>
              </div>
            </div>

            {/* Nav Tabs */}
            <div className="flex items-center bg-white/5 rounded-xl p-1 border border-white/10">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "overview"
                    ? "bg-gradient-to-r from-purple-500/20 to-red-500/20 text-white border border-white/10"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("kanban")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === "kanban"
                    ? "bg-gradient-to-r from-purple-500/20 to-red-500/20 text-white border border-white/10"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                Kanban Board
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {activeTab === "overview" ? (
          /* Overview Tab */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Dragon Panel */}
            <div className="hidden lg:flex justify-center">
              <DragonPanel agent="red" stats={dragonStats?.red} />
            </div>

            {/* Center Content */}
            <div className="lg:col-span-1 space-y-6">
              {/* Games */}
              <section 
                className="rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/20"
                style={{ background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.6) 0%, rgba(15, 15, 25, 0.8) 100%)' }}
              >
                <div className="px-6 py-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-100">Games</h2>
                      <p className="text-xs text-gray-500">Quick break</p>
                    </div>
                  </div>
                </div>
                <div className="aspect-video bg-black/40">
                  <iframe
                    src="https://math-falling-equations-v2.vercel.app/"
                    title="Math Falling Equations"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                </div>
              </section>

              {/* Usage Stats */}
              <section 
                className="rounded-2xl border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-white/20"
                style={{ background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.6) 0%, rgba(15, 15, 25, 0.8) 100%)' }}
              >
                <div className="px-6 py-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-100">System Stats</h2>
                      <p className="text-xs text-gray-500">Performance metrics</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <UsageStats />
                </div>
              </section>
            </div>

            {/* Right Dragon Panel */}
            <div className="hidden lg:flex justify-center">
              <DragonPanel agent="blue" stats={dragonStats?.blue} />
            </div>
          </div>
        ) : (
          /* Kanban Tab */
          <div className="flex gap-4">
            {/* Left Dragon Panel - Compact */}
            <div className="hidden xl:block">
              <DragonPanel agent="red" stats={dragonStats?.red} />
            </div>

            {/* Kanban Board */}
            <div className="flex-1">
              <div 
                className="rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/20"
                style={{ background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.6) 0%, rgba(15, 15, 25, 0.8) 100%)' }}
              >
                <div className="px-6 py-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-100">Kanban Board</h2>
                      <p className="text-xs text-gray-500">Drag tasks to move • Click to edit</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <KanBanBoard />
                </div>
              </div>
            </div>

            {/* Right Dragon Panel - Compact */}
            <div className="hidden xl:block">
              <DragonPanel agent="blue" stats={dragonStats?.blue} />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-gray-600 text-center">
            Mission Control v1.0 • Built with 🔥 by Red & Blue
          </p>
        </div>
      </footer>
    </main>
  );
}
