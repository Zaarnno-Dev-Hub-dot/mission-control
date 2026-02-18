import { NextResponse } from 'next/server';
import fs from 'fs';
import type { Task } from '@/types/kanban';

const DATA_FILE = './data/tasks.json';

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return NextResponse.json([]);
    }

    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const tasks: Task[] = JSON.parse(data);
    return NextResponse.json(tasks);
  } catch (e) {
    return NextResponse.json({ 
      error: e instanceof Error ? e.message : 'Unknown error',
      tasks: [],
    });
  }
}

export async function POST(request: Request) {
  try {
    const tasks: Task[] = await request.json();
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Unknown error' }, { status: 500 });
  }
}
