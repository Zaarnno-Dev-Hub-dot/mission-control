import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      // Fallback to file system
      return getTasksFromFile();
    }

    return NextResponse.json(data || []);
  } catch (e) {
    console.error('Failed to fetch tasks:', e);
    return getTasksFromFile();
  }
}

export async function POST(request: Request) {
  try {
    const tasks = await request.json();
    
    // Upsert all tasks
    const { error } = await supabase
      .from('tasks')
      .upsert(tasks, { onConflict: 'id' });

    if (error) {
      console.error('Supabase error:', error);
      return saveTasksToFile(tasks);
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Failed to save tasks:', e);
    const tasks = await request.json().catch(() => []);
    return saveTasksToFile(tasks);
  }
}

// Fallback functions using file system
async function getTasksFromFile() {
  try {
    const fs = await import('fs');
    const path = './data/tasks.json';
    if (!fs.existsSync(path)) {
      return NextResponse.json([]);
    }
    const data = fs.readFileSync(path, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}

async function saveTasksToFile(tasks: any[]) {
  try {
    const fs = await import('fs');
    fs.writeFileSync('./data/tasks.json', JSON.stringify(tasks, null, 2));
    return NextResponse.json({ success: true, fallback: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}
