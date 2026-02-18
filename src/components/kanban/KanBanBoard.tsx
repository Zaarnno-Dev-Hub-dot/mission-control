"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { KanBanColumn } from "./KanBanColumn";
import { KanBanCard } from "./KanBanCard";
import type { Task, Column, BoardData } from "@/types/kanban";

export function KanBanBoard() {
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">("saved");

  // Load board data on mount
  useEffect(() => {
    fetchBoard();
  }, []);

  // Auto-save when board changes
  useEffect(() => {
    if (boardData && !isLoading) {
      const timeout = setTimeout(() => {
        saveBoard();
      }, 500); // Debounce 500ms
      return () => clearTimeout(timeout);
    }
  }, [boardData, isLoading]);

  const fetchBoard = async () => {
    try {
      const res = await fetch("/api/kanban");
      if (res.ok) {
        const data = await res.json();
        setBoardData(data);
      }
    } catch (error) {
      console.error("Failed to load board:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBoard = async () => {
    if (!boardData) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/kanban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(boardData),
      });
      if (res.ok) {
        setSaveStatus("saved");
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Failed to save board:", error);
      setSaveStatus("error");
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = findTask(active.id as string);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const sourceColumn = findColumnByTaskId(activeId);
    const destColumn = boardData?.columns.find(
      (col) => col.id === overId || col.tasks.some((t) => t.id === overId)
    );

    if (!sourceColumn || !destColumn) return;

    if (sourceColumn.id === destColumn.id) {
      const taskIndex = sourceColumn.tasks.findIndex((t) => t.id === activeId);
      const overIndex = sourceColumn.tasks.findIndex((t) => t.id === overId);

      if (taskIndex !== overIndex) {
        const newTasks = arrayMove(sourceColumn.tasks, taskIndex, overIndex);
        updateColumnTasks(sourceColumn.id, newTasks);
      }
    } else {
      const task = sourceColumn.tasks.find((t) => t.id === activeId);
      if (task) {
        const newSourceTasks = sourceColumn.tasks.filter((t) => t.id !== activeId);
        const newDestTasks = [...destColumn.tasks, { ...task, updatedAt: new Date().toISOString() }];
        updateColumnTasks(sourceColumn.id, newSourceTasks);
        updateColumnTasks(destColumn.id, newDestTasks);
      }
    }
  };

  const findTask = (taskId: string): Task | undefined => {
    if (!boardData) return;
    for (const column of boardData.columns) {
      const task = column.tasks.find((t) => t.id === taskId);
      if (task) return task;
    }
  };

  const findColumnByTaskId = (taskId: string): Column | undefined => {
    if (!boardData) return;
    return boardData.columns.find((col) => col.tasks.some((t) => t.id === taskId));
  };

  const updateColumnTasks = (columnId: string, tasks: Task[]) => {
    setBoardData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        columns: prev.columns.map((col) =>
          col.id === columnId ? { ...col, tasks } : col
        ),
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleAddTask = (columnId: string) => {
    const title = prompt("Task title:");
    if (!title || !boardData) return;

    const assigneeInput = prompt("Assign to: (red/blue/user/zaarno)");
    const assigneeMap: Record<string, "red" | "blue" | "user" | "zaarno"> = {
      red: "red",
      blue: "blue",
      user: "user",
      zaarno: "zaarno",
    };
    const assignee = assigneeMap[assigneeInput?.toLowerCase() || ""];

    const priorityInput = prompt("Priority: (low/medium/high)");
    const priority = ["low", "medium", "high"].includes(priorityInput?.toLowerCase() || "")
      ? (priorityInput?.toLowerCase() as "low" | "medium" | "high")
      : undefined;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      assignee,
      priority,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setBoardData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        columns: prev.columns.map((col) =>
          col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
        ),
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  if (isLoading || !boardData) {
    return (
      <div className="flex items-center justify-center h-64 text-dragon-500">
        <div className="animate-pulse">Loading KanBan board...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-dragon-500">
          {saveStatus === "saving" && "💾 Saving..."}
          {saveStatus === "saved" && `✅ Saved · ${new Date(boardData.lastUpdated).toLocaleTimeString()}`}
          {saveStatus === "error" && "❌ Save failed"}
        </span>
      </div>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {boardData.columns.map((column) => (
            <KanBanColumn
              key={column.id}
              column={column}
              onAddTask={() => handleAddTask(column.id)}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? <KanBanCard task={activeTask} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
