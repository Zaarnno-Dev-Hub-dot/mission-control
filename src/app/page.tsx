import { KanBanBoard } from "@/components/kanban";
import { UsageStats } from "@/components/stats";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-[#0a0a0f]">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Dragon Silhouette SVG Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3E%3Cpath fill='%23ff6b35' d='M200 400 Q300 200 500 300 T800 250 T1000 350 L1050 380 Q1020 360 1000 380 T800 400 T500 450 T200 420 Z'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        
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
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl animate-pulse" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xl shadow-lg shadow-orange-500/30">
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
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 backdrop-blur-sm rounded-lg text-sm text-red-400 border border-red-500/20 hover:border-red-500/40 transition-all">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                🔴 Red
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 backdrop-blur-sm rounded-lg text-sm text-blue-400 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                🔵 Blue
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* KanBan Board */}
          <section className="lg:col-span-2">
            <div 
              className="rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.6) 0%, rgba(15, 15, 25, 0.8) 100%)',
              }}
            >
              <div className="px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                    <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-100">KanBan Board</h2>
                    <p className="text-xs text-gray-500">Click tasks to edit • Drag to move</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <KanBanBoard />
              </div>
            </div>
          </section>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Games */}
            <section 
              className="rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.6) 0%, rgba(15, 15, 25, 0.8) 100%)',
              }}
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
              style={{
                background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.6) 0%, rgba(15, 15, 25, 0.8) 100%)',
              }}
            >
              <div className="px-6 py-4 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-100">Usage Stats</h2>
                    <p className="text-xs text-gray-500">Session tracking</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <UsageStats />
              </div>
            </section>
          </div>
        </div>
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
