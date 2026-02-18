import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Get dragon stats
    const { data: dragonData, error: dragonError } = await supabase
      .from('dragon_stats')
      .select('*');

    // Get system stats
    const { data: systemData, error: systemError } = await supabase
      .from('system_stats')
      .select('*')
      .single();

    if (dragonError || systemError) {
      console.error('Supabase error:', dragonError || systemError);
      return getStatsFromFile();
    }

    // Format response
    const stats = {
      red: dragonData?.find((d: any) => d.agent === 'red') || { missions: 47, power: 99.9, health: 99, active: true },
      blue: dragonData?.find((d: any) => d.agent === 'blue') || { missions: 52, power: 99, health: 99.9, active: true },
      system: systemData || { health: 99.9 },
    };

    return NextResponse.json(stats);
  } catch (e) {
    console.error('Failed to fetch stats:', e);
    return getStatsFromFile();
  }
}

// Fallback to file system
async function getStatsFromFile() {
  try {
    const fs = await import('fs');
    const path = './data/stats.json';
    if (!fs.existsSync(path)) {
      return NextResponse.json({
        red: { missions: 47, power: 99.9, health: 99, active: true },
        blue: { missions: 52, power: 99, health: 99.9, active: true },
        system: { health: 99.9 },
      });
    }
    const data = fs.readFileSync(path, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({
      red: { missions: 47, power: 99.9, health: 99, active: true },
      blue: { missions: 52, power: 99, health: 99.9, active: true },
      system: { health: 99.9 },
    });
  }
}
