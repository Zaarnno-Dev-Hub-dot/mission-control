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
    const interval = setInterval(fetchUsage, 30000); // Refresh every 30s
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
      <div className="flex items-center justify-center h-48 text-dragon-500">
        <div className="animate-pulse">Loading stats...</div>
      </div>
    );
  }

  if (!data || data.totalEntries === 0) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Today's Calls" value="--" />
          <StatCard label="Today's Tokens" value="--" />
          <StatCard label="Est. Cost" value="--" />
        </div>
        <p className="text-dragon-500 text-sm text-center">
          No usage data yet. Stats will appear here once sessions are tracked.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Today's Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard 
          label="Today's Calls" 
          value={formatNumber(data.today?.calls || 0)} 
          color="text-dragon-300"
        />
        <StatCard 
          label="Today's Tokens" 
          value={formatNumber(data.today?.tokens || 0)} 
          color="text-dragon-300"
        />
        <StatCard 
          label="Est. Cost" 
          value={formatCost(data.today?.cost || 0)} 
          color="text-dragon-400"
        />
      </div>

      {/* 7-Day Chart */}
      <div className="bg-dragon-900 rounded p-3 border border-dragon-700">
        <h4 className="text-xs text-dragon-500 uppercase tracking-wider mb-3">
          Last 7 Days
        </h4>
        <div className="space-y-2">
          {data.last7Days?.map(([date, stats]) => (
            <div key={date} className="flex items-center gap-3">
              <span className="text-xs text-dragon-500 w-16">
                {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </span>
              <div className="flex-1 h-4 bg-dragon-800 rounded overflow-hidden">
                <div 
                  className="h-full bg-dragon-400 rounded"
                  style={{ 
                    width: `${Math.min(100, (stats.calls / Math.max(...data.last7Days.map(([, s]) => s.calls))) * 100)}%` 
                  }}
                />
              </div>
              <span className="text-xs text-dragon-400 w-12 text-right">
                {stats.calls} calls
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-between text-xs text-dragon-500 pt-2 border-t border-dragon-700">
        <span>Total Sessions: {formatNumber(data.totalEntries)}</span>
        <span>
          Updated: {new Date(data.lastUpdated).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  color = "text-dragon-200" 
}: { 
  label: string; 
  value: string; 
  color?: string;
}) {
  return (
    <div className="bg-dragon-900 rounded p-3 border border-dragon-700 text-center">
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-dragon-500 mt-1">{label}</div>
    </div>
  );
}
