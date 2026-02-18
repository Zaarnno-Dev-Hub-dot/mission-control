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
import type { Task, Column, ColumnId } from "@/types/kanban";

const COLUMNS: { id: ColumnId; title: string }[] = [
  { id: "dragon-backlog", title: "🐉 Dragon Backlog" },
  { id: "to-do", title: "📋 To Do" },
  { id: "in-progress", title: "⚡ In Progress" },
  { id: "review", title: "👀 Review" },
  { id: "deployed", title: "🚀 Deployed" },
];

export function KanBanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">("saved");

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Auto-save when tasks change
  useEffect(() => {
    if (!isLoading && tasks.length > 0) {
      const timeout = setTimeout(() => {
        saveTasks();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [tasks, isLoading]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTasks = async () => {
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tasks),
      });
      if (res.ok) {
        setSaveStatus("saved");
      } else {
        setSaveStatus("error");
      }
    } catch (error) {
      console.error("Failed to save tasks:", error);
      setSaveStatus("error");
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Check if dropped on a column
    const columnIds = COLUMNS.map((c) => c.id);
    if (columnIds.includes(overId as ColumnId)) {
      // Move to column
      setTasks((prev) =>
        prev.map((t) =>
          t.id === activeId ? { ...t, column: overId as ColumnId } : t
        )
      );
      return;
    }

    // Check if dropped on another task
    const overTask = tasks.find((t) => t.id === overId);
    if (overTask) {
      const activeTaskData = tasks.find((t) => t.id === activeId);
      if (activeTaskData && activeTaskData.column !== overTask.column) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === activeId ? { ...t, column: overTask.column } : t
          )
        );
      }
    }
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: "New Task",
      column: "dragon-backlog",
      date: new Date().toISOString().split("T")[0],
      progress: 0,
    };

    setTasks((prev) => [...prev, newTask]);
    setSelectedTask(newTask);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3 text-gray-400">
          <div className="w-5 h-5 border-2 border-gray-600 border-t-purple-500 rounded-full animate-spin" />
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
        <span className="text-xs text-gray-600">{tasks.length} tasks</span>
      </div>

      {/* Board */}
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {COLUMNS.map((column) => (
            <KanBanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasks.filter((t) => t.column === column.id)}
              onAddTask={handleAddTask}
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
