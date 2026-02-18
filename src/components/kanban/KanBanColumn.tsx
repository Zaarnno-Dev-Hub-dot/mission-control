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

const columnStyles: Record<string, { bg: string; border: string; header: string }> = {
  backlog: { 
    bg: "bg-gray-50/50", 
    border: "border-gray-200", 
    header: "text-gray-700" 
  },
  priority: { 
    bg: "bg-amber-50/50", 
    border: "border-amber-200", 
    header: "text-amber-700" 
  },
  active: { 
    bg: "bg-blue-50/50", 
    border: "border-blue-200", 
    header: "text-blue-700" 
  },
  done: { 
    bg: "bg-green-50/50", 
    border: "border-green-200", 
    header: "text-green-700" 
  },
};

export function KanBanColumn({ column, onAddTask, onEditTask }: KanBanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });
  
  const style = columnStyles[column.id] || columnStyles.backlog;

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col rounded-2xl border-2 min-h-[500px] max-h-[calc(100vh-200px)]
        transition-all duration-200
        ${style.bg} ${style.border}
        ${isOver ? "ring-2 ring-blue-500/50 scale-[1.01]" : ""}
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100/50">
        <div className="flex items-center gap-2">
          <h3 className={`font-bold text-sm ${style.header}`}>
            {column.title}
          </h3>
          <span className="text-xs font-semibold text-gray-400 bg-white/80 px-2 py-0.5 rounded-full border border-gray-100">
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
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <p className="text-xs text-gray-400 font-medium">No tasks</p>
                <p className="text-[10px] text-gray-300 mt-0.5">Add a task to get started</p>
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
      <div className="p-3">
        <button
          onClick={onAddTask}
          className="
            w-full py-3 px-4
            flex items-center justify-center gap-2
            bg-white hover:bg-gray-50
            text-sm font-medium text-gray-600 hover:text-gray-800
            rounded-xl border border-dashed border-gray-300 hover:border-gray-400
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
