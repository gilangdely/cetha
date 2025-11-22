import { Target, PlusCircle, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  where
} from "firebase/firestore";
import { db, auth } from "@/app/lib/firebase";
import EditTargetKarir from "./edit-target-karir";

interface Task {
  id: number;
  label: string;
  checked: boolean;
}

interface StoredTarget {
  id: string;               // Firestore document ID
  label: string;
  progress: number;
  tasks?: Task[];
}

export default function TargetKarir() {
  const [targets, setTargets] = useState<StoredTarget[]>([]);
  const [isAddingTarget, setIsAddingTarget] = useState(false);
  const [editTarget, setEditTarget] = useState<StoredTarget | null>(null);
  const [loading, setLoading] = useState(true);

  // Ambil user ID (bisa null kalau belum login)
  const userId = auth.currentUser?.uid;

  // Load semua target karir dari Firestore (real-time listener)
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "careerTargets"),        // ← top-level
      where("userId", "==", userId),          // ← filter berdasarkan userId
      orderBy("updatedAt", "desc")            // atau orderBy("label") kalau mau
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loaded: StoredTarget[] = [];
      snapshot.forEach((doc) => {
        loaded.push({
          id: doc.id,               // ← PASTIKAN INI ADA
          ...(doc.data() as Omit<StoredTarget, 'id'>)
        });
      });
      setTargets(loaded);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const recomputeProgress = (tasks: Task[]) => {
    if (!tasks || tasks.length === 0) return 0;
    const done = tasks.filter((t) => t.checked).length;
    return Math.round((done / tasks.length) * 100);
  };

  // Simpan atau update target ke Firestore
  // Fungsi saveTargetToFirestore → tambahin userId di data
  const saveTargetToFirestore = async (data: { label: string; tasks: Task[] }, existingId?: string) => {
    if (!userId) return;

    const progress = recomputeProgress(data.tasks);
    const targetData = {
      userId,
      label: data.label,
      progress,
      tasks: data.tasks,
      updatedAt: new Date(),
    };

    try {
      if (existingId && existingId.startsWith("temp-") === false) {
        // Edit existing document
        console.log("Mengupdate document existing:", existingId);
        await setDoc(doc(db, "careerTargets", existingId), targetData, { merge: true });
      } else {
        // Tambah baru
        console.log("Membuat document baru");
        const newRef = doc(collection(db, "careerTargets"));
        await setDoc(newRef, targetData);
        // Optional: update local state dengan id asli
        setTargets(prev => prev.map(t =>
          t.id === existingId ? { ...t, id: newRef.id } : t
        ));
      }
    } catch (err: any) {
      console.error("Gagal simpan:", err);
      alert("Error: " + err.message);
    }
  };

  const handleSaveNewTarget = async (data: {
    label: string;
    tasks: Task[];
  }) => {
    const existingId = editTarget?.id;  // ← ini sekarang benar ada kalau edit

    // Optimistic update UI
    if (existingId) {
      setTargets((prev) =>
        prev.map((t) =>
          t.id === existingId
            ? {
              ...t,
              label: data.label,
              tasks: data.tasks,
              progress: recomputeProgress(data.tasks),
            }
            : t
        )
      );
    } else {
      // Tambah baru (tanpa id)
      const newTarget = {
        id: "temp-" + Date.now(), // id sementara biar key di map aman
        label: data.label,
        tasks: data.tasks,
        progress: recomputeProgress(data.tasks),
      };
      setTargets((prev) => [...prev, newTarget]);
    }

    // Simpan ke Firestore
    await saveTargetToFirestore(data, existingId);

    setEditTarget(null);
    setIsAddingTarget(false);
  };

  const openAdd = () => {
    setEditTarget(null);
    setIsAddingTarget(true);
  };

  const openEdit = (target: StoredTarget) => {
    setEditTarget(target);  // ← sekarang target sudah punya id
    setIsAddingTarget(true);
  };

  // Live update progress ketika task di-checklist di modal edit
  const handleTasksLiveUpdate = async (updatedTasks: Task[]) => {
    if (!editTarget?.id) return;

    const newProgress = recomputeProgress(updatedTasks);

    // Update UI dulu
    setTargets((prev) =>
      prev.map((t) =>
        t.id === editTarget.id
          ? { ...t, tasks: updatedTasks, progress: newProgress }
          : t
      )
    );
    setEditTarget((prev) =>
      prev ? { ...prev, tasks: updatedTasks, progress: newProgress } : prev
    );

    // Simpan ke Firestore (hanya tasks & progress)
    // Live update task (hanya progress & tasks)
    if (userId && editTarget?.id) {
      await setDoc(
        doc(db, "careerTargets", editTarget.id),  // ← top-level
        {
          tasks: updatedTasks,
          progress: newProgress,
          updatedAt: new Date(),
        },
        { merge: true }
      );
    }
  };

  // Jika belum login atau masih loading
  if (!userId) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-md text-center text-gray-500">
        Silakan login untuk menyimpan target karir
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow-md text-center">
        Loading target karir...
      </div>
    );
  }

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
          <PlusCircle size={28} />
        </button>

        <EditTargetKarir
          open={isAddingTarget}
          onOpenChange={setIsAddingTarget}
          showTrigger={false}
          onSave={handleSaveNewTarget}
          initialTitle={editTarget?.label}
          initialTasks={editTarget?.tasks || []}
          onTasksChange={handleTasksLiveUpdate}
        />
      </div>

      <div className="space-y-4">
        {targets.length > 0 ? (
          targets.map((item) => (
            <div key={item.id} className="group">
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
                  className="h-2 rounded-full bg-blue-600 transition-all"
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