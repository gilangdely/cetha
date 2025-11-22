// filepath: d:\Projectan\cetha\src\components\dashboard\pencapaian.tsx
"use client";
import { useState, useEffect } from "react";
import { CircleStar, Pencil, PlusCircle, Eye, X, Trash2 } from "lucide-react";
import EditPencapaian, { Achievement } from "./edit-pencapaian";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { db } from "@/app/lib/firebase";
import { toast } from "sonner";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PencapaianTerbaruProps {
  className?: string;
}

export default function PencapaianTerbaru({
  className = "",
}: PencapaianTerbaruProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [openEditor, setOpenEditor] = useState(false);
  const [editItem, setEditItem] = useState<Achievement | null>(null);
  const [previewItem, setPreviewItem] = useState<Achievement | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  // === State untuk AlertDialog delete ===
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Achievement | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "pencapaian"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Achievement[];

        setAchievements(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching achievements:", error);
        toast.error("Gagal memuat pencapaian");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // === Fungsi buka dialog delete ===
  const openDeleteDialog = (item: Achievement) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  // === Fungsi hapus sebenarnya ===
  const confirmDelete = async () => {
    if (!itemToDelete?.id) return;

    try {
      await deleteDoc(doc(db, "pencapaian", itemToDelete.id));
      toast.success("Pencapaian telah dihapus");
    } catch (error) {
      toast.error("Gagal menghapus pencapaian");
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };


  const handleSave = (a: Achievement) => {
    if (editItem) {
      setAchievements((prev) =>
        prev.map((item) => (item.id === a.id ? a : item)),
      );
      setEditItem(null);
    } else {
      setAchievements((prev) => [...prev, a]);
    }
  };
  const openAdd = () => {
    setEditItem(null);
    setOpenEditor(true);
  };
  const openEdit = (item: Achievement) => {
    setEditItem(item);
    setOpenEditor(true);
  };
  const openPreview = (item: Achievement) => {
    setPreviewItem(item);
  };

  const visible = showAll ? achievements : achievements.slice(0, 3);

  return (
    <>
    <div className={`rounded-xl bg-white p-6 shadow-md ${className}`}>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CircleStar className="text-orange-300" size={28} />
          <h3 className="text-lg font-semibold text-gray-800">
            Pencapaian Terbaru
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {achievements.length > 3 && (
            <button
              onClick={() => setShowAll((s) => !s)}
              className="rounded-md border border-gray-300 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100"
            >
              {showAll ? "Ringkas" : "Lihat Semua"}
            </button>
          )}
          <button
            onClick={openAdd}
            className="text-gray-500 hover:text-primaryBlue/80"
            title="Tambah Pencapaian"
          >
            <PlusCircle size={20} />
          </button>
        </div>
        <EditPencapaian
          open={openEditor}
          onOpenChange={(open) => {
            setOpenEditor(open);
            if (!open) setEditItem(null);
          }}
          onSave={() => {
            toast.success(editItem ? "Diperbarui!" : "Ditambahkan!");
          }}
          initialData={editItem || undefined}
          showTrigger={false}
        />
      </div>

      <div className="space-y-3">
        {loading ? (
          // Skeleton loading
          <>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-md border border-gray-100 px-3 py-3"
              >
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-10 animate-pulse rounded bg-gray-200"></div>
              </div>
            ))}
          </>
        ) : visible.length > 0 ? (
          visible.map((item) => (
            <div
              key={item.id}
              className="group flex items-center justify-between rounded-md border border-gray-100 px-3 py-2 transition hover:bg-gray-50"
            >
              <button
                onClick={() => openPreview(item)}
                className="flex-1 text-left"
              >
                <p className="truncate text-sm font-medium text-gray-800">
                  <span className="mr-1 text-orange-400">★</span>
                  {item.title}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-500 capitalize">
                  {item.category.replace("_", " ")}
                  {item.date
                    ? ` • ${new Date(item.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}`
                    : ""}
                </p>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => openPreview(item)}
                  className="invisible rounded-md border border-gray-300 p-1 text-gray-500 group-hover:visible hover:bg-gray-100"
                  title="Preview"
                >
                  <Eye size={14} />
                </button>
                <button
                  onClick={() => openEdit(item)}
                  className="invisible rounded-md border border-gray-300 p-1 text-gray-500 group-hover:visible hover:bg-gray-100"
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                    onClick={() => openDeleteDialog(item)}
                    className="invisible rounded-md border border-red-300 p-1 text-red-600 group-hover:visible hover:bg-red-50"
                    title="Hapus"
                  >
                    <Trash2 size={14} />
                  </button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-gray-200 py-8 text-center">
            <CircleStar className="mb-3 text-gray-300" size={40} />
            <p className="mb-4 text-sm text-gray-500">
              Belum ada pencapaian ditambahkan
            </p>
            <button
              onClick={openAdd}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Tambah Pencapaian Pertama
            </button>
          </div>
        )}
      </div>

      {/* Preview Sheet */}
      <Sheet
        open={!!previewItem}
        onOpenChange={(open) => !open && setPreviewItem(null)}
      >
        {previewItem && (
          <SheetContent className="px-5">
            <SheetHeader>
              <SheetTitle className="text-base font-semibold">
                {previewItem.title}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="rounded bg-gray-100 px-2 py-0.5 capitalize">
                  {previewItem.category.replace("_", " ")}
                </span>
                {previewItem.date && (
                  <span className="rounded bg-gray-100 px-2 py-0.5">
                    {new Date(previewItem.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>

              {previewItem.description ? (
                <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {previewItem.description}
                </p>
              ) : (
                <p className="italic text-gray-400">Tidak ada deskripsi.</p>
              )}

              <div className="flex gap-2 pt-4">
                <button
                  onClick={() => {
                    setPreviewItem(null);
                    openEdit(previewItem);
                  }}
                  className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
                >
                  <X size={14} /> Tutup
                </button>
              </div>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </div>

    {/* === AlertDialog Konfirmasi Hapus (shadcn) === */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Yakin ingin menghapus?</AlertDialogTitle>
            <AlertDialogDescription>
              Pencapaian <strong>“{itemToDelete?.title}”</strong> akan dihapus secara permanen dan tidak bisa dikembalikan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              Hapus Permanen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
