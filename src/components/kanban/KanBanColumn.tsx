"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanBanCard } from "./KanBanCard";
import type { Column } from "@/types/kanban";

interface KanBanColumnProps {
  column: Column;
  onAddTask: () => void;
}

export function KanBanColumn({ column, onAddTask }: KanBanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`kanban-column bg-dragon-900 rounded-lg border-2 p-3 ${
        isOver ? "border-dragon-400 bg-dragon-800/50" : "border-dragon-700"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-dragon-200">{column.title}</h3>
        <span className="text-xs text-dragon-500 bg-dragon-800 px-2 py-1 rounded">
          {column.tasks.length}
        </span>
      </div>

      <SortableContext
        items={column.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2 min-h-[100px]">
          {column.tasks.map((task) => (
            <KanBanCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>

      <button
        onClick={onAddTask}
        className="w-full mt-3 py-2 text-sm text-dragon-500 hover:text-dragon-300 hover:bg-dragon-800 rounded transition border border-dashed border-dragon-700 hover:border-dragon-500"
      >
        + Add Task
      </button>
    </div>
  );
}
