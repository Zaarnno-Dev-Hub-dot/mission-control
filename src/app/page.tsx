import { KanBanBoard } from "@/components/kanban";
// import { ChatRelay } from "@/components/chat/ChatRelay";
import { UsageStats } from "@/components/stats";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Header - Dark */}
      <header className="bg-[#12121a] border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white text-xl shadow-lg shadow-orange-500/30">
                🐉
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-100">Mission Control</h1>
                <p className="text-xs text-gray-500">Dragon&apos;s Eye view of our world</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 rounded-lg text-sm text-red-400 border border-red-500/20">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                🔴 Red
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 rounded-lg text-sm text-blue-400 border border-blue-500/20">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                🔵 Blue
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Dark Background */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* KanBan Board - Takes 2 columns */}
          <section className="lg:col-span-2">
            <div className="bg-[#12121a] rounded-2xl border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-gray-100">KanBan Board</h2>
                      <p className="text-xs text-gray-500">Click tasks to edit • Drag to move</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <KanBanBoard />
              </div>
            </div>
          </section>

          {/* Right Sidebar - Dark */}
          <div className="space-y-6">
            {/* Games */}
            <section className="bg-[#12121a] rounded-2xl border border-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
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
              <div className="aspect-video bg-[#0a0a0f]">
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
            <section className="bg-[#12121a] rounded-2xl border border-gray-800">
              <div className="px-6 py-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
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

      {/* Footer - Dark */}
      <footer className="border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-xs text-gray-600 text-center">
            Mission Control v1.0 • Built with 🐉 by Red & Blue
          </p>
        </div>
      </footer>
    </main>
  );
}
