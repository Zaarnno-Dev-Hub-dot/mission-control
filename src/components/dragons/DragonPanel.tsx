"use client";

import { useState, useEffect } from "react";
import type { DragonStats } from "@/types/kanban";

interface DragonPanelProps {
  agent: "red" | "blue";
  stats?: DragonStats;
}

export function DragonPanel({ agent, stats }: DragonPanelProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isRed = agent === "red";
  const theme = isRed 
    ? { from: "from-red-500", to: "to-orange-500", glow: "shadow-red-500/30", text: "text-red-400", bg: "bg-red-500/10" }
    : { from: "from-blue-500", to: "to-cyan-500", glow: "shadow-blue-500/30", text: "text-blue-400", bg: "bg-blue-500/10" };

  const dragonEmoji = isRed ? "🔴" : "🔵";
  const name = isRed ? "Red" : "Blue";

  if (!mounted) {
    return (
      <div className="w-16 rounded-2xl border border-white/10 backdrop-blur-sm" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' }}>
        <div className="p-3 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`w-20 rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-white/20 ${theme.glow} hover:shadow-lg`}
      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' }}
    >
      <div className="p-3 flex flex-col items-center gap-3">
        {/* Dragon Avatar */}
        <div className="relative">
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.from} ${theme.to} rounded-full blur-md opacity-50 animate-pulse`} />
          <div className={`relative w-12 h-12 rounded-full bg-gradient-to-br ${theme.from} ${theme.to} flex items-center justify-center text-2xl shadow-lg ${theme.glow}`}>
            {dragonEmoji}
          </div>
          {stats?.active && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#0a0a0f] flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            </div>
          )}
        </div>

        {/* Name */}
        <span className={`text-xs font-bold ${theme.text}`}>{name}</span>

        {/* Stats */}
        {stats && (
          <div className="w-full space-y-2">
            {/* Missions */}
            <div className="text-center">
              <div className={`text-lg font-bold ${theme.text}`}>{stats.missions}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wide">Missions</div>
            </div>

            {/* Power */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Power</span>
                <span className={theme.text}>{stats.power}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${theme.from} ${theme.to} rounded-full transition-all duration-1000`}
                  style={{ width: `${stats.power}%` }}
                />
              </div>
            </div>

            {/* Health */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>Health</span>
                <span className={theme.text}>{stats.health}%</span>
              </div>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${theme.from} ${theme.to} rounded-full transition-all duration-1000`}
                  style={{ width: `${stats.health}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
