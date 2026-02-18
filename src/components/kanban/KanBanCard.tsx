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

  // Format due date with relative labels
  const formatDueDate = (dateStr: string): { text: string; isOverdue: boolean; isToday: boolean } => {
    const due = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: "Overdue", isOverdue: true, isToday: false };
    if (diffDays === 0) return { text: "Today", isOverdue: false, isToday: true };
    if (diffDays === 1) return { text: "Tomorrow", isOverdue: false, isToday: false };
    
    return { 
      text: due.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), 
      isOverdue: false, 
      isToday: false 
    };
  };

  const dueDateInfo = task.dueDate ? formatDueDate(task.dueDate) : null;

  // Priority badge colors
  const priorityBadge = {
    low: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30", label: "Low" },
    medium: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30", label: "Medium" },
    high: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30", label: "High" },
  };

  const priority = task.priority ? priorityBadge[task.priority] : null;

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
          ? "opacity-50 rotate-2 scale-105 ring-2 ring-orange-500/50" 
          : "border-white/10 hover:border-white/20"
        }
      `}
      style={{
        background: isDragging || isSortableDragging 
          ? 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)'
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
          
          {/* Due Date */}
          {dueDateInfo && (
            <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
              dueDateInfo.isOverdue ? "text-red-400" : 
              dueDateInfo.isToday ? "text-blue-400" : "text-gray-400"
            }`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {dueDateInfo.text}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-sm font-semibold text-gray-100 leading-snug mb-2 group-hover:text-orange-300 transition-colors">
          {task.title}
        </h4>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
            {task.description}
          </p>
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
                    i === 0 ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                    i === 1 ? "bg-purple-500/10 text-purple-400 border-purple-500/20" :
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
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-red-500/0 group-hover:from-orange-500/5 group-hover:via-orange-500/10 group-hover:to-red-500/5 transition-all duration-500 pointer-events-none" />
    </div>
  );
}
