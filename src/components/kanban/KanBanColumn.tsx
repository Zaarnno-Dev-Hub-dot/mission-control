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

const columnStyles: Record<string, { border: string; header: string; glow: string }> = {
  backlog: { 
    border: "border-white/10", 
    header: "text-gray-300",
    glow: "hover:shadow-lg hover:shadow-white/5",
  },
  priority: { 
    border: "border-amber-500/20", 
    header: "text-amber-400",
    glow: "hover:shadow-lg hover:shadow-amber-500/10",
  },
  active: { 
    border: "border-blue-500/20", 
    header: "text-blue-400",
    glow: "hover:shadow-lg hover:shadow-blue-500/10",
  },
  done: { 
    border: "border-emerald-500/20", 
    header: "text-emerald-400",
    glow: "hover:shadow-lg hover:shadow-emerald-500/10",
  },
};

export function KanBanColumn({ column, onAddTask, onEditTask }: KanBanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  
  const style = columnStyles[column.id] || columnStyles.backlog;

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col rounded-2xl border min-h-[500px] max-h-[calc(100vh-200px)]
        backdrop-blur-sm transition-all duration-500
        ${style.border} ${style.glow}
        ${isOver ? "ring-2 ring-orange-500/50 scale-[1.01]" : ""}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <h3 className={`font-bold text-sm ${style.header}`}>
            {column.title}
          </h3>
          <span className="text-xs font-semibold text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
            {column.tasks.length}
          </span>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 p-3 overflow-y-auto">
        <SortableContext
          items={column.tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {column.tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-white/10">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 font-medium">No tasks</p>
                <p className="text-[10px] text-gray-600 mt-0.5">Add a task to get started</p>
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

      {/* Add Button - Only for Backlog */}
      {column.id === "backlog" && (
        <div className="p-3">
          <button
            onClick={onAddTask}
            className="
              w-full py-3 px-4
              flex items-center justify-center gap-2
              bg-gradient-to-r from-orange-500/20 to-red-500/20
              hover:from-orange-500/30 hover:to-red-500/30
              text-sm font-medium text-orange-300
              rounded-xl border border-orange-500/30
              hover:border-orange-500/50
              transition-all duration-300
              hover:shadow-lg hover:shadow-orange-500/20
              active:scale-[0.98]
            "
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Task
          </button>
        </div>
      )}
    </div>
  );
}
