"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/types/kanban";

interface KanBanCardProps {
  task: Task;
  isDragging?: boolean;
  onClick?: () => void;
}

export function KanBanCard({ task, isDragging, onClick }: KanBanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const assigneeEmoji: Record<string, string> = {
    red: "🔴",
    blue: "🔵",
    user: "👤",
    zaarno: "🧙",
  };

  const priorityConfig = {
    low: { color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", label: "Low" },
    medium: { color: "bg-amber-500/20 text-amber-400 border-amber-500/30", label: "Medium" },
    high: { color: "bg-red-500/20 text-red-400 border-red-500/30", label: "High" },
  };

  const priority = task.priority ? priorityConfig[task.priority] : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`
        group relative bg-dragon-800/80 hover:bg-dragon-800 
        p-4 rounded-xl border border-dragon-700/50 hover:border-dragon-600
        shadow-sm hover:shadow-lg hover:shadow-dragon-900/50
        transition-all duration-200 ease-out
        cursor-grab active:cursor-grabbing
        ${isDragging || isSortableDragging ? "opacity-50 rotate-2 scale-105 shadow-xl ring-2 ring-dragon-400/50" : ""}
      `}
    >
      {/* Priority Badge */}
      {priority && (
        <div className={`absolute -top-1.5 -right-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${priority.color}`}>
          {priority.label}
        </div>
      )}

      {/* Title */}
      <h4 className="text-sm font-semibold text-dragon-100 leading-snug pr-4">
        {task.title}
      </h4>

      {/* Description Preview */}
      {task.description && (
        <p className="text-xs text-dragon-500 mt-2 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Footer Row */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-dragon-700/30">
        {/* Assignee */}
        <div className="flex items-center gap-1.5">
          {task.assignee ? (
            <span className="text-sm" title={`Assigned to ${task.assignee}`}>
              {assigneeEmoji[task.assignee]}
            </span>
          ) : (
            <span className="text-xs text-dragon-600">Unassigned</span>
          )}
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap justify-end">
            {task.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-1.5 py-0.5 rounded bg-dragon-700/50 text-dragon-400 border border-dragon-600/30"
              >
                #{tag}
              </span>
            ))}
            {task.tags.length > 2 && (
              <span className="text-[10px] text-dragon-500">+{task.tags.length - 2}</span>
            )}
          </div>
        )}
      </div>

      {/* Edit Hint */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-dragon-900/60 rounded-xl pointer-events-none">
        <span className="px-3 py-1.5 bg-dragon-700 text-dragon-200 text-xs font-medium rounded-lg shadow-lg">
          Click to edit
        </span>
      </div>
    </div>
  );
}
