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

  // Priority badge colors
  const priorityBadge = {
    low: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30", label: "Low" },
    medium: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30", label: "Medium" },
    high: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30", label: "High" },
  };

  const priority = task.priority ? priorityBadge[task.priority] : null;

  // Progress color
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-emerald-500";
    if (progress >= 50) return "bg-amber-500";
    if (progress >= 20) return "bg-blue-500";
    return "bg-gray-500";
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={onClick}
      className={`
        group relative rounded-xl border backdrop-blur-sm
        transition-all duration-300 ease-out
        cursor-grab active:cursor-grabbing
        hover:scale-[1.02] hover:shadow-xl
        ${isDragging || isSortableDragging 
          ? "opacity-50 rotate-2 scale-105 ring-2 ring-purple-500/50" 
          : "border-white/10 hover:border-white/20"
        }
      `}
      style={{
        background: isDragging || isSortableDragging 
          ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
      }}
    >
      <div className="p-4">
        {/* Header row with badges */}
        <div className="flex items-start justify-between gap-2 mb-2">
          {/* Priority Badge */}
          {priority && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${priority.bg} ${priority.text} ${priority.border}`}>
              {priority.label}
            </span>
          )}
          
          {/* Date */}
          {task.date && (
            <span className="text-[11px] text-gray-500">
              {task.date}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-sm font-semibold text-gray-100 leading-snug mb-2 group-hover:text-purple-300 transition-colors">
          {task.title}
        </h4>

        {/* Description */}
        {task.desc && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
            {task.desc}
          </p>
        )}

        {/* Progress Bar */}
        {task.progress !== undefined && (
          <div className="mb-3">
            <div className="flex justify-between text-[10px] text-gray-400 mb-1">
              <span>Progress</span>
              <span>{task.progress}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getProgressColor(task.progress)} rounded-full transition-all`}
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          {/* Assignee */}
          <div className="flex items-center">
            {task.assignee ? (
              <span className="text-base" title={`Assigned to ${task.assignee}`}>
                {assigneeEmoji[task.assignee]}
              </span>
            ) : (
              <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-gray-500 text-xs border border-white/10">
                ?
              </span>
            )}
          </div>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <div className="flex items-center gap-1">
              {task.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={tag}
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${
                    i === 0 ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
                    i === 1 ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                    "bg-white/5 text-gray-400 border-white/10"
                  }`}
                >
                  {tag}
                </span>
              ))}
              {task.tags.length > 2 && (
                <span className="text-[10px] text-gray-500">+{task.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-red-500/0 group-hover:from-purple-500/5 group-hover:via-purple-500/10 group-hover:to-red-500/5 transition-all duration-500 pointer-events-none" />
    </div>
  );
}
