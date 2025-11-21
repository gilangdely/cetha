// filepath: d:\Projectan\cetha\src\components\dashboard\pencapaian.tsx
"use client";
import { useState } from "react";
import { CircleStar, Pencil, PlusCircle, Eye, X } from "lucide-react";
import EditPencapaian, { Achievement } from "./edit-pencapaian";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
            className="hover:text-primaryBlue/80 text-gray-500"
          >
            <PlusCircle size={16} />
          </button>
        </div>
        <EditPencapaian
          open={openEditor}
          onOpenChange={setOpenEditor}
          onSave={handleSave}
          initialData={editItem}
          showTrigger={false}
        />
      </div>

      <div className="space-y-3">
        {visible.length > 0 ? (
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
                  {item.date ? ` • ${item.date}` : ""}
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
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-gray-200 py-6 text-center">
            <p className="mb-3 text-sm text-gray-500">
              Belum ada pencapaian ditambahkan
            </p>
            <button
              onClick={openAdd}
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
            >
              Tambah Pencapaian
            </button>
          </div>
        )}
      </div>

      {/* Preview Sheet */}
      <Sheet
        open={!!previewItem}
        onOpenChange={(o) => {
          if (!o) setPreviewItem(null);
        }}
      >
        {previewItem && (
          <SheetContent className="px-5">
            <SheetHeader>
              <SheetTitle className="text-base font-semibold">
                {previewItem.title}
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="rounded bg-gray-100 px-2 py-0.5 capitalize">
                  {previewItem.category.replace("_", " ")}
                </span>
                {previewItem.date && (
                  <span className="rounded bg-gray-100 px-2 py-0.5">
                    {previewItem.date}
                  </span>
                )}
              </div>
              {previewItem.description ? (
                <p className="leading-relaxed whitespace-pre-wrap text-gray-700">
                  {previewItem.description}
                </p>
              ) : (
                <p className="text-gray-400 italic">Tidak ada deskripsi.</p>
              )}
              <button
                onClick={() => setPreviewItem(null)}
                className="mt-4 inline-flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
              >
                <X size={14} /> Tutup
              </button>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </div>
  );
}
