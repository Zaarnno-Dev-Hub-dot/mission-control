import { KanBanBoard } from "@/components/kanban";
// import { ChatRelay } from "@/components/chat/ChatRelay";
import { UsageStats } from "@/components/stats";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-dragon-950 via-dragon-900 to-dragon-950">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-dragon-800/50 backdrop-blur-sm rounded-2xl border border-dragon-700/50 p-5">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-dragon-400 to-amber-400 bg-clip-text text-transparent">
                🐉 Mission Control
              </h1>
              <p className="text-dragon-500 mt-1 text-sm">
                Dragon&apos;s Eye view of our world
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 px-4 py-2 bg-dragon-900/80 rounded-full text-sm text-dragon-300 border border-dragon-700/50">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                🔴 Red Active
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-dragon-900/80 rounded-full text-sm text-dragon-300 border border-dragon-700/50">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                🔵 Blue Standby
              </span>
            </div>
          </div>
        </header>

        {/* Module Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* KanBan Board */}
          <section className="lg:col-span-2 bg-dragon-800/50 backdrop-blur-sm rounded-2xl border border-dragon-700/50 p-5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-dragon-600 to-dragon-700 flex items-center justify-center">
                  <svg className="w-5 h-5 text-dragon-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-dragon-200">KanBan Board</h2>
                  <p className="text-xs text-dragon-500">Click tasks to edit · Drag to move</p>
                </div>
              </div>
            </div>
            <KanBanBoard />
          </section>

          {/* Games Embed */}
          <section className="bg-dragon-800/50 backdrop-blur-sm rounded-2xl border border-dragon-700/50 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-dragon-200">Games</h2>
                <p className="text-xs text-dragon-500">Math Falling Equations</p>
              </div>
            </div>
            <div className="aspect-video bg-dragon-900 rounded-xl border border-dragon-700 overflow-hidden shadow-lg shadow-black/50">
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
          <section className="bg-dragon-800/50 backdrop-blur-sm rounded-2xl border border-dragon-700/50 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-dragon-200">Usage Stats</h2>
                <p className="text-xs text-dragon-500">Session tracking</p>
              </div>
            </div>
            <UsageStats />
          </section>

          {/* Agent Chat - Hidden for now, revisit in #1470179669113442506
          <section className="lg:col-span-2 bg-dragon-800/50 backdrop-blur-sm rounded-2xl border border-dragon-700/50 p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-dragon-200">Agent Chat Relay</h2>
                <p className="text-xs text-dragon-500">Red ↔ Blue ↔ User coordination</p>
              </div>
            </div>
            <ChatRelay />
          </section>
          */}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-dragon-600">
            Mission Control v1.0 · Built with 🐉 by Red & Blue
          </p>
        </footer>
      </div>
    </main>
  );
}
