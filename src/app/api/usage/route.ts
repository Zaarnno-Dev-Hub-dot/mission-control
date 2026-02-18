import { NextResponse } from 'next/server';
import fs from 'fs';

interface UsageEntry {
  timestamp: string;
  sessionId?: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCost: number;
}

interface UsageData {
  entries: UsageEntry[];
  dailyTotals: Record<string, { tokens: number; cost: number; calls: number }>;
  lastUpdated: string;
}

const DATA_FILE = './data/usage.json';

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      const emptyData: UsageData = {
        entries: [],
        dailyTotals: {},
        lastUpdated: new Date().toISOString(),
      };
      return NextResponse.json(emptyData);
    }

    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const usage: UsageData = JSON.parse(data);
    
    // Calculate current session totals
    const today = new Date().toISOString().split('T')[0];
    const todayStats = usage.dailyTotals[today] || { tokens: 0, cost: 0, calls: 0 };
    
    // Get last 7 days
    const last7Days = Object.entries(usage.dailyTotals)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 7);

    return NextResponse.json({
      ...usage,
      today: todayStats,
      last7Days,
      totalEntries: usage.entries.length,
    });
  } catch (e) {
    return NextResponse.json({ 
      entries: [], 
      dailyTotals: {},
      error: e instanceof Error ? e.message : 'Unknown error',
      lastUpdated: new Date().toISOString(),
    });
  }
}

export async function POST(request: Request) {
  try {
    const entry: UsageEntry = await request.json();
    
    // Load existing data
    let usage: UsageData;
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      usage = JSON.parse(data);
    } else {
      usage = { entries: [], dailyTotals: {}, lastUpdated: new Date().toISOString() };
    }

    // Add entry
    usage.entries.push({
      ...entry,
      timestamp: new Date().toISOString(),
    });

    // Update daily totals
    const today = new Date().toISOString().split('T')[0];
    if (!usage.dailyTotals[today]) {
      usage.dailyTotals[today] = { tokens: 0, cost: 0, calls: 0 };
    }
    usage.dailyTotals[today].tokens += entry.totalTokens;
    usage.dailyTotals[today].cost += entry.estimatedCost;
    usage.dailyTotals[today].calls += 1;

    usage.lastUpdated = new Date().toISOString();

    // Save
    fs.writeFileSync(DATA_FILE, JSON.stringify(usage, null, 2));

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });
  }
}
