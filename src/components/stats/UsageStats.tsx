"use client";

import { useState, useEffect } from "react";

interface DailyStats {
  tokens: number;
  cost: number;
  calls: number;
}

interface UsageData {
  entries: any[];
  dailyTotals: Record<string, DailyStats>;
  today: DailyStats;
  last7Days: [string, DailyStats][];
  totalEntries: number;
  lastUpdated: string;
}

export function UsageStats() {
  const [data, setData] = useState<UsageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsage();
    const interval = setInterval(fetchUsage, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchUsage = async () => {
    try {
      const res = await fetch("/api/usage");
      if (res.ok) {
        const usageData = await res.json();
        setData(usageData);
      }
    } catch (error) {
      console.error("Failed to fetch usage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num: number) => num.toLocaleString();
  const formatCost = (cost: number) => `$${cost.toFixed(4)}`;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="flex items-center gap-2 text-gray-500">
          <div className="w-4 h-4 border-2 border-gray-600 border-t-orange-500 rounded-full animate-spin" />
          <span className="text-sm">Loading stats...</span>
        </div>
      </div>
    );
  }

  if (!data || data.totalEntries === 0) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Calls" value="--" />
          <StatCard label="Tokens" value="--" />
          <StatCard label="Cost" value="--" accent />
        </div>
        <p className="text-gray-500 text-sm text-center py-4">
          No usage data yet.
        </p>
      </div>
    );
  }

  const maxCalls = Math.max(...(data.last7Days?.map(([, s]) => s.calls) || [1]), 1);

  return (
    <div className="space-y-4">
      {/* Today's Stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard 
          label="Calls" 
          value={formatNumber(data.today?.calls || 0)} 
        />
        <StatCard 
          label="Tokens" 
          value={formatNumber(data.today?.tokens || 0)} 
        />
        <StatCard 
          label="Cost" 
          value={formatCost(data.today?.cost || 0)} 
          accent
        />
      </div>

      {/* 7-Day Chart */}
      <div 
        className="rounded-xl p-4 border border-white/10"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)' }}
      >
        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Last 7 Days
        </h4>
        <div className="space-y-2">
          {data.last7Days?.map(([date, stats]) => (
            <div key={date} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-12">
                {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all"
                  style={{ width: `${(stats.calls / maxCalls) * 100}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-10 text-right">
                {stats.calls}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-between text-xs text-gray-600 pt-2">
        <span>Total: {formatNumber(data.totalEntries)} sessions</span>
        <span>{new Date(data.lastUpdated).toLocaleTimeString()}</span>
      </div>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  accent = false
}: { 
  label: string; 
  value: string;
  accent?: boolean;
}) {
  return (
    <div 
      className={`rounded-xl p-3 text-center border transition-all duration-300 ${
        accent 
          ? "border-orange-500/30 hover:border-orange-500/50" 
          : "border-white/10 hover:border-white/20"
      }`}
      style={{ 
        background: accent 
          ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)' 
          : 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' 
      }}
    >
      <div className={`text-lg font-bold ${accent ? "text-orange-400" : "text-gray-200"}`}>
        {value}
      </div>
      <div className="text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">{label}</div>
    </div>
  );
}
