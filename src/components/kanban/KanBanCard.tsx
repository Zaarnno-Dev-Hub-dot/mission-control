"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/types/kanban";

interface KanBanCardProps {
  task: Task;
  isDragging?: boolean;
}

export function KanBanCard({ task, isDragging }: KanBanCardProps) {
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

  const priorityColor = {
    low: "bg-dragon-600 text-dragon-200",
    medium: "bg-dragon-400 text-dragon-900",
    high: "bg-red-500 text-white",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`kanban-card bg-dragon-800 p-3 rounded border border-dragon-600 ${
        isDragging || isSortableDragging
          ? "opacity-50 rotate-2 scale-105 shadow-xl"
          : ""
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-medium text-dragon-100 flex-1">
          {task.title}
        </h4>
        {task.assignee && (
          <span className="text-xs">{assigneeEmoji[task.assignee]}</span>
        )}
      </div>

      {task.description && (
        <p className="text-xs text-dragon-500 mt-1 line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex items-center gap-2 mt-2">
        {task.priority && (
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded ${
              priorityColor[task.priority]
            }`}
          >
            {task.priority}
          </span>
        )}
        {task.tags?.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-1.5 py-0.5 rounded bg-dragon-700 text-dragon-400"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
