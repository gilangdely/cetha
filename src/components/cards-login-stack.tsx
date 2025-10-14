"use client";
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";

export function CardsLoginStack() {
    return (
        <div className="h-[12rem] lg:h-[40rem] flex items-center justify-center w-full">
            <CardStack offset={12} items={profiles} />
        </div>
    );
}

export const Highlight = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <span
            className={cn(
                "font-bold bg-primaryBlue/10 text-primaryBlue dark:bg-primaryBlue/20 dark:text-primaryBlue px-1 py-0.5 rounded-md",
                className
            )}
        >
            {children}
        </span>
    );
};

const profiles = [
    {
        id: 0,
        name: "Rafi Pradana",
        designation: "Frontend Developer",
        avatar: "https://i.pravatar.cc/150?img=12",
        description:
            "Suka membangun antarmuka web modern menggunakan React dan TailwindCSS. Senang berkolaborasi di proyek open source.",
    },
    {
        id: 1,
        name: "Alya Salsabila",
        designation: "UI/UX Designer",
        avatar: "https://i.pravatar.cc/150?img=47",
        description:
            "Percaya bahwa desain bukan hanya soal tampilan, tapi tentang pengalaman pengguna. Fokus membuat desain yang estetis dan intuitif.",
    },
    {
        id: 2,
        name: "Dimas Saputra",
        designation: "Mobile Developer",
        avatar: "https://i.pravatar.cc/150?img=22",
        description:
            "Fokus pada pengembangan aplikasi Flutter yang efisien dan responsif. Suka bereksperimen dengan animasi UI interaktif.",
    },
    {
        id: 3,
        name: "Nadia Putri",
        designation: "Data Analyst",
        avatar: "https://i.pravatar.cc/150?img=68",
        description:
            "Berusaha mengubah data menjadi insight yang bermanfaat bagi bisnis melalui analisis dan visualisasi yang bermakna.",
    },
];
