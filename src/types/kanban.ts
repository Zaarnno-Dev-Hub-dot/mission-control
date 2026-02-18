export interface Task {
  id: string;
  title: string;
  desc?: string;
  assignee?: "red" | "blue" | "user" | "zaarno";
  date?: string;
  column: "dragon-backlog" | "to-do" | "in-progress" | "review" | "deployed";
  progress?: number;
  priority?: "low" | "medium" | "high";
  tags?: string[];
}

export type ColumnId = "dragon-backlog" | "to-do" | "in-progress" | "review" | "deployed";

export interface Column {
  id: ColumnId;
  title: string;
  tasks: Task[];
}

export interface BoardData {
  columns: Column[];
  lastUpdated: string;
}

export interface DragonStats {
  missions: number;
  power: number;
  health: number;
  active: boolean;
}

export interface SystemStats {
  health: number;
}

export interface StatsData {
  red: DragonStats;
  blue: DragonStats;
  system: SystemStats;
}