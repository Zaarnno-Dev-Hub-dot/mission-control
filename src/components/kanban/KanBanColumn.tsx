"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanBanCard } from "./KanBanCard";
import type { Task, ColumnId } from "@/types/kanban";

interface KanBanColumnProps {
  id: ColumnId;
  title: string;
  tasks: Task[];
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
}

const columnStyles: Record<ColumnId, { border: string; header: string; glow: string }> = {
  "dragon-backlog": { 
    border: "border-purple-500/20", 
    header: "text-purple-400",
    glow: "hover:shadow-lg hover:shadow-purple-500/10",
  },
  "to-do": { 
    border: "border-gray-500/20", 
    header: "text-gray-400",
    glow: "hover:shadow-lg hover:shadow-gray-500/10",
  },
  "in-progress": { 
    border: "border-blue-500/20", 
    header: "text-blue-400",
    glow: "hover:shadow-lg hover:shadow-blue-500/10",
  },
  "review": { 
    border: "border-amber-500/20", 
    header: "text-amber-400",
    glow: "hover:shadow-lg hover:shadow-amber-500/10",
  },
  "deployed": { 
    border: "border-emerald-500/20", 
    header: "text-emerald-400",
    glow: "hover:shadow-lg hover:shadow-emerald-500/10",
  },
};

export function KanBanColumn({ id, title, tasks, onAddTask, onEditTask }: KanBanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  
  const style = columnStyles[id];

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col rounded-2xl border min-h-[500px] max-h-[calc(100vh-280px)]
        backdrop-blur-sm transition-all duration-500
        ${style.border} ${style.glow}
        ${isOver ? "ring-2 ring-purple-500/50 scale-[1.01]" : ""}
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <h3 className={`font-bold text-sm ${style.header}`}>
            {title}
          </h3>
          <span className="text-xs font-semibold text-gray-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 p-3 overflow-y-auto">
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-white/10">
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 font-medium">No tasks</p>
              </div>
            ) : (
              tasks.map((task) => (
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

      {/* Add Button - Only for Dragon Backlog */}
      {id === "dragon-backlog" && (
        <div className="p-3">
          <button
            onClick={onAddTask}
            className="
              w-full py-3 px-4
              flex items-center justify-center gap-2
              bg-gradient-to-r from-purple-500/20 to-red-500/20
              hover:from-purple-500/30 hover:to-red-500/30
              text-sm font-medium text-purple-300
              rounded-xl border border-purple-500/30
              hover:border-purple-500/50
              transition-all duration-300
              hover:shadow-lg hover:shadow-purple-500/20
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
