"use client";

import { useState, useEffect } from "react";
import type { Task } from "@/types/kanban";

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export function TaskModal({ task, isOpen, onClose, onSave, onDelete }: TaskModalProps) {
  const [editedTask, setEditedTask] = useState<Task | null>(null);

  useEffect(() => {
    if (task) {
      setEditedTask({ ...task });
    }
  }, [task]);

  if (!isOpen || !editedTask) return null;

  const handleSave = () => {
    if (editedTask.title.trim()) {
      onSave({
        ...editedTask,
        updatedAt: new Date().toISOString(),
      });
      onClose();
    }
  };

  const handleDelete = () => {
    if (confirm("Delete this task?")) {
      onDelete(editedTask.id);
      onClose();
    }
  };

  const assigneeOptions = [
    { value: "", label: "Unassigned" },
    { value: "red", label: "🔴 Red" },
    { value: "blue", label: "🔵 Blue" },
    { value: "zaarno", label: "🧙 Zaarno" },
    { value: "user", label: "👤 User" },
  ];

  const priorityOptions = [
    { value: "", label: "None" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-dragon-800 rounded-xl border border-dragon-600 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-dragon-700 bg-dragon-900/50">
          <h3 className="text-lg font-semibold text-dragon-100">Edit Task</h3>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-dragon-400 mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-dragon-900 border border-dragon-700 rounded-lg text-dragon-100 placeholder-dragon-600 focus:outline-none focus:border-dragon-400 focus:ring-1 focus:ring-dragon-400 transition-all"
              placeholder="Task title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-dragon-400 mb-1.5">
              Description
            </label>
            <textarea
              value={editedTask.description || ""}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-dragon-900 border border-dragon-700 rounded-lg text-dragon-100 placeholder-dragon-600 focus:outline-none focus:border-dragon-400 focus:ring-1 focus:ring-dragon-400 transition-all resize-none"
              placeholder="Add details..."
            />
          </div>

          {/* Assignee & Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-dragon-400 mb-1.5">
                Assignee
              </label>
              <select
                value={editedTask.assignee || ""}
                onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-dragon-900 border border-dragon-700 rounded-lg text-dragon-100 focus:outline-none focus:border-dragon-400 transition-all"
              >
                {assigneeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-dragon-400 mb-1.5">
                Priority
              </label>
              <select
                value={editedTask.priority || ""}
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value as any })}
                className="w-full px-4 py-2.5 bg-dragon-900 border border-dragon-700 rounded-lg text-dragon-100 focus:outline-none focus:border-dragon-400 transition-all"
              >
                {priorityOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-dragon-400 mb-1.5">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={editedTask.tags?.join(", ") || ""}
              onChange={(e) => {
                const tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                setEditedTask({ ...editedTask, tags: tags.length > 0 ? tags : undefined });
              }}
              className="w-full px-4 py-2.5 bg-dragon-900 border border-dragon-700 rounded-lg text-dragon-100 placeholder-dragon-600 focus:outline-none focus:border-dragon-400 focus:ring-1 focus:ring-dragon-400 transition-all"
              placeholder="e.g. urgent, bug, feature"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-dragon-700 bg-dragon-900/30 flex items-center justify-between">
          <button
            onClick={handleDelete}
            className="px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg text-sm font-medium transition-all"
          >
            🗑️ Delete
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 text-dragon-400 hover:text-dragon-200 hover:bg-dragon-700/50 rounded-lg text-sm font-medium transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 bg-dragon-400 hover:bg-dragon-300 text-dragon-900 rounded-lg text-sm font-bold transition-all shadow-lg shadow-dragon-400/20"
            >
              Save Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
