-- Supabase Schema for Mission Control
-- Run this in Supabase SQL Editor

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  "desc" TEXT,
  assignee TEXT,
  date DATE,
  "column" TEXT NOT NULL DEFAULT 'dragon-backlog',
  progress INTEGER DEFAULT 0,
  priority TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stats table
CREATE TABLE IF NOT EXISTS dragon_stats (
  id TEXT PRIMARY KEY,
  agent TEXT NOT NULL UNIQUE,
  missions INTEGER DEFAULT 0,
  power DECIMAL(5,2) DEFAULT 100,
  health DECIMAL(5,2) DEFAULT 100,
  active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System stats
CREATE TABLE IF NOT EXISTS system_stats (
  id INTEGER PRIMARY KEY DEFAULT 1,
  health DECIMAL(5,2) DEFAULT 100,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial data
INSERT INTO dragon_stats (id, agent, missions, power, health, active) VALUES
  ('red', 'red', 47, 99.9, 99, true),
  ('blue', 'blue', 52, 99, 99.9, true)
ON CONFLICT (agent) DO NOTHING;

INSERT INTO system_stats (id, health) VALUES (1, 99.9)
ON CONFLICT (id) DO NOTHING;

-- Insert sample tasks
INSERT INTO tasks (id, title, "desc", assignee, date, "column", progress, priority, tags) VALUES
  ('task-1', 'Scaffold Next.js MC', 'App/TS/Tailwind dnd-kit', 'red', '2026-02-18', 'deployed', 100, 'high', ARRAY['mvp']),
  ('task-2', 'UI Review & Plan', 'Match dragon mockup', 'blue', '2026-02-18', 'review', 100, 'high', ARRAY['design']),
  ('task-3', 'NavBar tabs', 'Overview | Kanban toggle', 'red', '2026-02-19', 'to-do', 0, 'medium', ARRAY['ui']),
  ('task-4', 'Dragon stats panels', 'Red left/Blue right', 'red', '2026-02-19', 'in-progress', 50, 'high', ARRAY['ui']),
  ('task-5', 'Kanban drag/drop', '5 cols + edit modal', 'red', '2026-02-19', 'dragon-backlog', 0, 'high', ARRAY['feature'])
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security (optional but recommended)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE dragon_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_stats ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all for MVP)
CREATE POLICY "Allow all" ON tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON dragon_stats FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON system_stats FOR ALL USING (true) WITH CHECK (true);

-- Create realtime publication (optional)
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;

ALTER PUBLICATION supabase_realtime ADD TABLE tasks;
