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
    low: { bg: "bg-green-100", text: "text-green-700", label: "Low" },
    medium: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Medium" },
    high: { bg: "bg-red-100", text: "text-red-700", label: "High" },
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
        group bg-white rounded-xl shadow-sm hover:shadow-md
        border border-gray-100 hover:border-gray-200
        transition-all duration-200
        cursor-grab active:cursor-grabbing
        ${isDragging || isSortableDragging ? "opacity-50 rotate-2 scale-105 shadow-xl ring-2 ring-blue-500/50" : ""}
      `}
    >
      <div className="p-4">
        {/* Header row with badges */}
        <div className="flex items-start justify-between gap-2 mb-2">
          {/* Priority Badge */}
          {priority && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wide ${priority.bg} ${priority.text}`}>
              {priority.label}
            </span>
          )}
          
          {/* Due Date */}
          {dueDateInfo && (
            <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
              dueDateInfo.isOverdue ? "text-red-500" : 
              dueDateInfo.isToday ? "text-blue-500" : "text-gray-500"
            }`}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {dueDateInfo.text}
            </span>
          )}
        </div>

        {/* Title */}
        <h4 className="text-sm font-semibold text-gray-800 leading-snug mb-2">
          {task.title}
        </h4>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          {/* Assignee */}
          <div className="flex items-center">
            {task.assignee ? (
              <span className="text-base" title={`Assigned to ${task.assignee}`}>
                {assigneeEmoji[task.assignee]}
              </span>
            ) : (
              <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
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
                  className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    i === 0 ? "bg-blue-100 text-blue-700" :
                    i === 1 ? "bg-purple-100 text-purple-700" :
                    "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tag}
                </span>
              ))}
              {task.tags.length > 2 && (
                <span className="text-[10px] text-gray-400">+{task.tags.length - 2}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
