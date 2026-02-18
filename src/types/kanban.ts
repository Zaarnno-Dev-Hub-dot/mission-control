export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: "red" | "blue" | "user" | "zaarno";
  priority?: "low" | "medium" | "high";
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: "backlog" | "priority" | "active" | "done";
  title: string;
  tasks: Task[];
}

export interface BoardData {
  columns: Column[];
  lastUpdated: string;
}
