"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanBanCard } from "./KanBanCard";
import type { Column, Task } from "@/types/kanban";

interface KanBanColumnProps {
  column: Column;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
}

const columnColors: Record<string, string> = {
  backlog: "border-dragon-700/50",
  priority: "border-amber-500/30",
  active: "border-dragon-400/30",
  done: "border-emerald-500/30",
};

const columnHeaderColors: Record<string, string> = {
  backlog: "text-dragon-400",
  priority: "text-amber-400",
  active: "text-dragon-300",
  done: "text-emerald-400",
};

export function KanBanColumn({ column, onAddTask, onEditTask }: KanBanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const borderColor = columnColors[column.id] || "border-dragon-700";
  const headerColor = columnHeaderColors[column.id] || "text-dragon-300";

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col bg-dragon-900/50 rounded-xl border-2 min-h-[400px]
        transition-all duration-200
        ${isOver ? "border-dragon-400 bg-dragon-800/50 scale-[1.02]" : borderColor}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-dragon-700/50">
        <div className="flex items-center gap-2">
          <h3 className={`font-bold ${headerColor}`}>{column.title}</h3>
          <span className="text-xs font-medium text-dragon-600 bg-dragon-800/80 px-2.5 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 p-3">
        <SortableContext
          items={column.tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {column.tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <span className="text-2xl mb-2">📝</span>
                <p className="text-xs text-dragon-600">No tasks yet</p>
                <p className="text-[10px] text-dragon-700 mt-1">Drag tasks here</p>
              </div>
            ) : (
              column.tasks.map((task) => (
                <KanBanCard 
                  key={task.id} 
                  task={task} 
                  onClick={() => onEditTask(task)}
                />
              ))
            )}
          </div>
        </SortableContext>
      </div>

      {/* Add Button */}
      <div className="p-3 border-t border-dragon-700/50">
        <button
          onClick={onAddTask}
          className="
            w-full py-3 px-4
            flex items-center justify-center gap-2
            text-sm font-medium text-dragon-500
            hover:text-dragon-200 hover:bg-dragon-700/50
            rounded-lg border border-dashed border-dragon-600
            hover:border-dragon-400 hover:shadow-lg hover:shadow-dragon-400/10
            transition-all duration-200
            active:scale-[0.98]
          "
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Task
        </button>
      </div>
    </div>
  );
}
