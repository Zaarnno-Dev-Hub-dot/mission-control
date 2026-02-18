import { NextResponse } from 'next/server';
import fs from 'fs';

export async function GET() {
  try {
    const data = fs.readFileSync('./data/chat.jsonl', 'utf8');
    const lines = data.trim().split('\n').filter(Boolean).slice(-50).map((line) => JSON.parse(line));
    return NextResponse.json({ messages: lines });
  } catch (e) {
    return NextResponse.json({ messages: [], error: e.message });
  }
}

export async function POST(request) {
  try {
    const msg = await request.json();
    const line = JSON.stringify({ ...msg, ts: new Date().toISOString() }) + '\n';
    fs.appendFileSync('./data/chat.jsonl', line);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}