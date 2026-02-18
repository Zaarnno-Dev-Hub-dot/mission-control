import { KanBanBoard } from "@/components/kanban";
// import { ChatRelay } from "@/components/chat/ChatRelay";
import { UsageStats } from "@/components/stats";

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      {/* Header */}
      <header className="mb-8 border-b border-dragon-600 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-dragon-400">
              🐉 Mission Control
            </h1>
            <p className="text-dragon-500 mt-1">
              Dragon&apos;s Eye view of our world
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-dragon-700 rounded-full text-sm text-dragon-200">
              🔴 Red Active
            </span>
            <span className="px-3 py-1 bg-dragon-700 rounded-full text-sm text-dragon-200">
              🔵 Blue Standby
            </span>
          </div>
        </div>
      </header>

      {/* Module Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KanBan Board */}
        <section className="lg:col-span-2 bg-dragon-800 rounded-lg border border-dragon-600 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-dragon-300">
              📋 KanBan Board
            </h2>
            <span className="text-xs text-dragon-500">
              Drag tasks between columns
            </span>
          </div>
          <KanBanBoard />
        </section>

        {/* Games Embed */}
        <section className="bg-dragon-800 rounded-lg border border-dragon-600 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-dragon-300">
              🎮 Games
            </h2>
            <span className="text-xs text-dragon-500">Math Falling Equations</span>
          </div>
          <div className="aspect-video bg-dragon-900 rounded border border-dragon-700 overflow-hidden">
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
        <section className="bg-dragon-800 rounded-lg border border-dragon-600 p-4">
          <h2 className="text-xl font-semibold text-dragon-300 mb-4">
            📊 Usage Stats
          </h2>
          <UsageStats />
        </section>

        {/* Agent Chat - Hidden for now, revisit in #1470179669113442506
        <section className="lg:col-span-2 bg-dragon-800 rounded-lg border border-dragon-600 p-4">
          <h2 className="text-xl font-semibold text-dragon-300 mb-4">
            💬 Agent Chat Relay
          </h2>
          <ChatRelay />
        </section>
        */}
      </div>
    </main>
  );
}
