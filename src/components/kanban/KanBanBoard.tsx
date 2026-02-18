"use client";

import { useState, useEffect } from "react";
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
import { TaskModal } from "./TaskModal";
import type { Task, Column, BoardData } from "@/types/kanban";

export function KanBanBoard() {
  const [boardData, setBoardData] = useState<BoardData | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      }, 500);
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
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: "New Task",
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

    // Open modal for the new task
    setSelectedTask(newTask);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (updatedTask: Task) => {
    setBoardData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        columns: prev.columns.map((col) => ({
          ...col,
          tasks: col.tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
        })),
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  const handleDeleteTask = (taskId: string) => {
    setBoardData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        columns: prev.columns.map((col) => ({
          ...col,
          tasks: col.tasks.filter((t) => t.id !== taskId),
        })),
        lastUpdated: new Date().toISOString(),
      };
    });
  };

  if (isLoading || !boardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-dragon-400">
          <div className="w-5 h-5 border-2 border-dragon-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading board...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Status Bar */}
      <div className="flex items-center justify-between mb-4 px-1">
        <span className="text-xs font-medium">
          {saveStatus === "saving" && (
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-3 h-3 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          )}
          {saveStatus === "saved" && (
            <span className="flex items-center gap-1.5 text-emerald-400">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Saved
            </span>
          )}
          {saveStatus === "error" && (
            <span className="flex items-center gap-1.5 text-red-400">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Save failed
            </span>
          )}
        </span>
        <span className="text-xs text-dragon-600">
          {boardData.columns.reduce((acc, col) => acc + col.tasks.length, 0)} tasks
        </span>
      </div>

      {/* Board */}
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
              onEditTask={handleEditTask}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? <KanBanCard task={activeTask} isDragging /> : null}
        </DragOverlay>
      </DndContext>

      {/* Task Modal */}
      <TaskModal
        task={selectedTask}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
