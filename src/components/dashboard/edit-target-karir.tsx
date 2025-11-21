"use client";

import { useState } from "react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Check,
  Edit,
  PlusCircle,
  Sparkles,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

interface EditTargetKarirProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
  onSave?: (data: {
    label: string;
    tasks: { id: number; label: string; checked: boolean }[];
  }) => void;
  initialTitle?: string;
  initialTasks?: { id: number; label: string; checked: boolean }[];
  onTasksChange?: (
    tasks: { id: number; label: string; checked: boolean }[],
  ) => void; // baru
}

export default function EditTargetKarir({
  open,
  onOpenChange,
  showTrigger = true,
  onSave,
  initialTitle,
  initialTasks,
  onTasksChange,
}: EditTargetKarirProps) {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [showInput, setShowInput] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [title, setTitle] = useState(initialTitle || "");
  const [genLoading, setGenLoading] = useState(false);

  // Prefill ketika sheet dibuka dalam mode edit / tambah
  // Reset bila tambah baru
  // gunakan efek untuk sync props saat sheet dibuka
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (open) {
      setTitle(initialTitle || "");
      setTasks(initialTasks || []);
    }
  }, [open, initialTitle, initialTasks]);

  const notifyTasks = (
    updated: { id: number; label: string; checked: boolean }[],
  ) => {
    setTasks(updated);
    onTasksChange?.(updated);
  };
  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const updated = [
      ...tasks,
      { id: Date.now(), label: newTask.trim(), checked: false },
    ];
    notifyTasks(updated);
    setNewTask("");
    setShowInput(false);
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleGenerateTasks = async () => {
    if (!title.trim()) return;
    try {
      setGenLoading(true);
      const res = await fetch("/api/generate-target", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, count: Math.max(3, tasks.length || 6) }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || "Gagal generate task");
      }
      const newGenerated = Array.isArray(data.result?.tasks)
        ? data.result.tasks
        : [];
      notifyTasks(newGenerated);
    } catch (e) {
      console.error("Generate target gagal:", e);
    } finally {
      setGenLoading(false);
    }
  };

  const handleSaveTarget = () => {
    if (!title.trim() || tasks.length === 0) return;
    onSave?.({ label: title.trim(), tasks });
    // reset
    setTitle("");
    setTasks([]);
    onOpenChange?.(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <SheetTrigger asChild>
          <button className="text-sm text-gray-400 hover:text-blue-600">
            <Edit size={18} />
          </button>
        </SheetTrigger>
      )}

      <SheetContent className="px-4">
        <SheetHeader className="px-0">
          <SheetTitle>Edit Target Karir</SheetTitle>
          <SheetDescription>
            Tambah target karir dan checklist yang perlu diselesaikan
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Input Judul */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Judul Target</label>
            <input
              type="text"
              placeholder="Contoh: Senior Developer Path"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Daftar To-do */}
          <div>
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-medium">Checklist To-Do</label>
              <button
                type="button"
                title="Generate otomatis dari judul"
                onClick={handleGenerateTasks}
                disabled={genLoading || !title.trim()}
                className={`rounded-md p-2 transition-colors ${
                  genLoading || !title.trim()
                    ? "cursor-not-allowed bg-gray-100 text-gray-400"
                    : "hover:bg-primaryBlue hover:text-white"
                }`}
              >
                {genLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
              </button>
            </div>

            <div className="space-y-2 py-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 rounded-md bg-gray-50 px-2 py-2"
                >
                  <Checkbox
                    checked={task.checked}
                    onCheckedChange={(checked) => {
                      const updated = tasks.map((t) =>
                        t.id === task.id
                          ? { ...t, checked: checked as boolean }
                          : t,
                      );
                      notifyTasks(updated);
                    }}
                  />

                  <div className="flex w-full justify-between">
                    <p
                      className={`text-sm transition-all ${
                        task.checked
                          ? "text-gray-400 line-through"
                          : "text-gray-700"
                      }`}
                    >
                      {task.label}
                    </p>

                    <button
                      onClick={() => {
                        const updated = tasks.filter((t) => t.id !== task.id);
                        notifyTasks(updated);
                      }}
                    >
                      <Trash2 className="size-4 text-red-400 hover:text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Tambah task */}
            {!showInput ? (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowInput(true)}
              >
                <div className="flex items-center gap-2">
                  <PlusCircle className="inline size-4" />
                  <p>Tambah Item</p>
                </div>
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={handleEnterKey}
                  placeholder="Tambah item checklist"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  autoFocus
                />

                {/* Simpan task */}
                <button
                  onClick={handleAddTask}
                  className="bg-primaryBlue rounded-md p-2 text-white"
                >
                  <Check size={16} />
                </button>

                {/* Batal */}
                <button
                  onClick={() => {
                    setNewTask("");
                    setShowInput(false);
                  }}
                  className="rounded-md bg-red-50 p-2 text-red-600 hover:bg-red-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            )}
          </div>

          <Button
            size="sm"
            className="w-full"
            disabled={!title.trim() || tasks.length === 0}
            onClick={handleSaveTarget}
          >
            Simpan Target
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
