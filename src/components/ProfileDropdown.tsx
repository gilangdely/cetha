"use client"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import UserAvatar from "./UserAvatar"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/app/lib/auth"
import { auth } from "@/app/lib/firebase"
import { useEffect, useState } from "react"

import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export default function ProfileDropdown() {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [providers, setProviders] = useState<string[]>([])
    const [openDialog, setOpenDialog] = useState(false)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUsername(user.displayName || user.email || "Pengguna")
                setProviders(user.providerData.map((p) => p.providerId))
            }
        })
        return () => unsubscribe()
    }, [])

    const handleLogout = async () => {
        await logoutUser()
        router.push("/")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100">
                    <UserAvatar />
                    <span className="text-sm font-medium">{username}</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Profil Akun</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Google: {providers.includes("google.com") ? "✅" : "❌"}
                </DropdownMenuItem>
                <DropdownMenuItem>
                    Email & Password: {providers.includes("password") ? "✅" : "❌"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600 cursor-pointer"
                    onClick={() => setOpenDialog(true)}
                >
                    <Button variant="destructive">Logout</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
            <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Konfirmasi Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah kamu yakin ingin keluar dari akunmu?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </DropdownMenu>
    )
}