import { Target, PlusCircle, Pencil } from "lucide-react";
import { useState } from "react";
import EditTargetKarir from "./edit-target-karir"; // Sesuaikan path import

interface StoredTarget {
  label: string;
  progress: number;
  tasks?: { id: number; label: string; checked: boolean }[];
}

export default function TargetKarir() {
  const [targets, setTargets] = useState<StoredTarget[]>([]);
  const [isAddingTarget, setIsAddingTarget] = useState(false);
  const [editTarget, setEditTarget] = useState<StoredTarget | null>(null);

  const recomputeProgress = (
    tasks: { id: number; label: string; checked: boolean }[],
  ) => {
    if (!tasks.length) return 0;
    const done = tasks.filter((t) => t.checked).length;
    return Math.round((done / tasks.length) * 100);
  };

  const handleSaveNewTarget = (data: {
    label: string;
    tasks: { id: number; label: string; checked: boolean }[];
  }) => {
    if (editTarget) {
      // update existing
      setTargets((prev) =>
        prev.map((t) =>
          t.label === editTarget.label
            ? {
                ...t,
                label: data.label,
                tasks: data.tasks,
                progress: recomputeProgress(data.tasks),
              }
            : t,
        ),
      );
      setEditTarget(null);
    } else {
      setTargets((prev) => [
        ...prev,
        {
          label: data.label,
          progress: recomputeProgress(data.tasks),
          tasks: data.tasks,
        },
      ]);
    }
  };

  const openAdd = () => {
    setEditTarget(null);
    setIsAddingTarget(true);
  };

  const openEdit = (target: StoredTarget) => {
    setEditTarget(target);
    setIsAddingTarget(true);
  };

  const handleTasksLiveUpdate = (
    updatedTasks: { id: number; label: string; checked: boolean }[],
  ) => {
    if (editTarget) {
      setTargets((prev) =>
        prev.map((t) =>
          t.label === editTarget.label
            ? {
                ...t,
                tasks: updatedTasks,
                progress: recomputeProgress(updatedTasks),
              }
            : t,
        ),
      );
      setEditTarget((prev) =>
        prev
          ? {
              ...prev,
              tasks: updatedTasks,
              progress: recomputeProgress(updatedTasks),
            }
          : prev,
      );
    }
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-md">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="text-rose-400" size={28} />
          <h3 className="text-lg font-semibold text-gray-800">Target Karir</h3>
        </div>
        <button
          onClick={openAdd}
          className="hover:text-primaryBlue/80 text-gray-500"
        >
          <PlusCircle size={16} />
        </button>
        <EditTargetKarir
          open={isAddingTarget}
          onOpenChange={setIsAddingTarget}
          showTrigger={false}
          onSave={handleSaveNewTarget}
          initialTitle={editTarget?.label}
          initialTasks={editTarget?.tasks}
          onTasksChange={handleTasksLiveUpdate}
        />
      </div>
      <div className="space-y-4">
        {targets.length > 0 ? (
          targets.map((item) => (
            <div key={item.label} className="group">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-sm font-medium">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-blue-600">
                    {item.progress}%
                  </span>
                  <button
                    onClick={() => openEdit(item)}
                    className="hidden items-center rounded-md border border-gray-300 p-1 text-gray-500 group-hover:inline-flex hover:bg-gray-100"
                  >
                    <Pencil size={14} />
                  </button>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="mb-4 text-gray-500">
              Belum ada target karir yang ditambahkan
            </p>
            <button
              onClick={openAdd}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Tambah Target
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
