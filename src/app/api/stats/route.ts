import { NextResponse } from 'next/server';
import fs from 'fs';

const DATA_FILE = './data/stats.json';

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json({
        red: { missions: 0, power: 100, health: 100, active: true },
        blue: { missions: 0, power: 100, health: 100, active: true },
        system: { health: 100 },
      });
    }

    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const stats = JSON.parse(data);
    return NextResponse.json(stats);
  } catch (e) {
    return NextResponse.json({ 
      error: e instanceof Error ? e.message : 'Unknown error',
      red: { missions: 0, power: 100, health: 100, active: true },
      blue: { missions: 0, power: 100, health: 100, active: true },
      system: { health: 100 },
    });
  }
}
