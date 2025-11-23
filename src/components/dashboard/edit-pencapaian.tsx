// filepath: d:\Projectan\cetha\src\components\dashboard\edit-pencapaian.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PlusCircle, Edit, Check, X } from "lucide-react";
import { db } from "@/app/lib/firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

export type Achievement = {
  id: string;
  title: string;
  category:
  | "kursus"
  | "proyek"
  | "kompetisi"
  | "open_source"
  | "organisasi"
  | "publikasi"
  | "kinerja"
  | "skill"
  | "network"
  | "penghargaan";
  description?: string | null;
  date?: string | null;
  createdAt: string;
};

interface EditPencapaianProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (achievement: Achievement) => void;
  initialData?: Achievement | null;
  showTrigger?: boolean;
}

const categories: Achievement["category"][] = [
  "kursus",
  "proyek",
  "kompetisi",
  "open_source",
  "organisasi",
  "publikasi",
  "kinerja",
  "skill",
  "network",
  "penghargaan",
];

export default function EditPencapaian({
  open,
  onOpenChange,
  onSave,
  initialData,
  showTrigger = true,
}: EditPencapaianProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Achievement["category"]>("proyek");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && initialData) {
      setTitle(initialData.title || "");
      setCategory(initialData.category || "proyek");
      setDescription(initialData.description || "");
      setDate(initialData.date || "");
    } else if (open && !initialData) {
      // reset form ketika tambah baru
      setTitle("");
      setCategory("proyek");
      setDescription("");
      setDate("");
    }
  }, [open, initialData]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Judul wajib diisi");
      return;
    }

    setLoading(true);

    try {
      const payload: Omit<Achievement, "id"> = {
        title: title.trim(),
        category,
        createdAt: new Date().toISOString(),
      };

      // Hanya tambahkan jika ada nilai (bukan empty string)
      if (description.trim()) {
        payload.description = description.trim();
      }
      if (date) {
        payload.date = date;
      }

      let savedDoc: Achievement;

      if (initialData?.id) {
        // MODE EDIT → update document yang sudah ada
        const docRef = doc(db, "pencapaian", initialData.id);
        await updateDoc(docRef, payload);
        savedDoc = { ...payload, id: initialData.id };
        toast.success("Pencapaian berhasil diperbarui!");
      } else {
        // MODE TAMBAH → tambah document baru
        const docRef = await addDoc(collection(db, "pencapaian"), payload);
        savedDoc = { ...payload, id: docRef.id };
        toast.success("Pencapaian berhasil ditambahkan!");
      }

      // Kirim ke parent kalau memang dibutuhkan (misal untuk refresh list)
      onSave?.(savedDoc);

      onOpenChange(false);
    } catch (error: any) {
      console.error("Error saving achievement:", error);
      toast.error(error?.message || "Gagal menyimpan ke Firebase");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <SheetTrigger asChild>
          <button className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
            {initialData ? <Edit size={16} /> : <PlusCircle size={16} />}{" "}
            {initialData ? "Edit" : "Tambah"}
          </button>
        </SheetTrigger>
      )}
      <SheetContent className="overflow-y-auto px-4">
        <SheetHeader className="px-0">
          <SheetTitle>{initialData ? "Edit" : "Tambah"} Pencapaian</SheetTitle>
          <SheetDescription>
            Isi data pencapaian yang relevan dan berdampak.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Judul</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Merilis Aplikasi BudgetMate"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Kategori</label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as Achievement["category"])
              }
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tanggal</label>
              <input
                type="date"
                className="w-full rounded-md border px-3 py-2 text-sm"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Deskripsi (opsional)</label>
            <textarea
              className="min-h-[90px] w-full rounded-md border px-3 py-2 text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ringkas pencapaian dan konteksnya"
              disabled={loading}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button
              size="sm"
              disabled={!title.trim()}
              onClick={handleSubmit}
              className="flex items-center gap-1"
            >
              {" "}
              <Check size={16} /> Simpan
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-1"
            >
              {" "}
              <X size={16} /> Batal
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
