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
    { value: "", label: "Unassigned", emoji: "👤" },
    { value: "red", label: "Red", emoji: "🔴" },
    { value: "blue", label: "Blue", emoji: "🔵" },
    { value: "zaarno", label: "Zaarno", emoji: "🧙" },
    { value: "user", label: "User", emoji: "👤" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div 
        className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        style={{
          background: 'linear-gradient(135deg, rgba(20, 20, 35, 0.95) 0%, rgba(15, 15, 25, 0.98) 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 107, 53, 0.1)',
        }}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-100">Edit Task</h3>
          <button 
            onClick={handleDelete}
            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all"
              placeholder="Task title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Description
            </label>
            <textarea
              value={editedTask.description || ""}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 transition-all resize-none"
              placeholder="Add details..."
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Assignee */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Assignee
              </label>
              <div className="relative">
                <select
                  value={editedTask.assignee || ""}
                  onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value as any })}
                  className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-gray-100 focus:outline-none focus:border-orange-500/50 appearance-none"
                >
                  {assigneeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.emoji} {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">
                Due Date
              </label>
              <input
                type="date"
                value={editedTask.dueDate ? editedTask.dueDate.split('T')[0] : ""}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
                className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-gray-100 focus:outline-none focus:border-orange-500/50"
              />
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Priority
            </label>
            <div className="flex gap-2">
              {[
                { value: "low", label: "Low", gradient: "from-emerald-500/20 to-emerald-600/20", border: "border-emerald-500/30", text: "text-emerald-400" },
                { value: "medium", label: "Medium", gradient: "from-amber-500/20 to-amber-600/20", border: "border-amber-500/30", text: "text-amber-400" },
                { value: "high", label: "High", gradient: "from-red-500/20 to-red-600/20", border: "border-red-500/30", text: "text-red-400" },
              ].map((p) => (
                <button
                  key={p.value}
                  onClick={() => setEditedTask({ ...editedTask, priority: p.value as any })}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                    editedTask.priority === p.value 
                      ? `bg-gradient-to-r ${p.gradient} ${p.border} ${p.text} ring-2 ring-offset-2 ring-offset-gray-900 ring-white/20` 
                      : "bg-black/20 text-gray-500 border-white/10 hover:border-white/20"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Tags
            </label>
            <input
              type="text"
              value={editedTask.tags?.join(", ") || ""}
              onChange={(e) => {
                const tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                setEditedTask({ ...editedTask, tags: tags.length > 0 ? tags : undefined });
              }}
              className="w-full px-4 py-2.5 bg-black/30 border border-white/10 rounded-xl text-gray-100 placeholder-gray-600 focus:outline-none focus:border-orange-500/50"
              placeholder="bug, feature, urgent (comma separated)"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-xl text-sm font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-orange-500/25"
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}
