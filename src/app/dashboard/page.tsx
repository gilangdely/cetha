"use client";

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { logoutUser } from "@/app/lib/auth"
import { auth } from "@/app/lib/firebase"

import LinkedAccounts from "@/components/LinkedAccounts"




export default function DashboardPage() {
    const router = useRouter()

    const handleLogout = async () => {
        await logoutUser()
        router.push("/")
    }


    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUsername(user.displayName || "Pengguna")
            } else {
                setUsername(null)
            }
        })

        return () => unsubscribe()
    }, [])


    return (
        <div className="p-6 flex flex-1 justify-center items-center">
            <p className="text-center mr-5">{username ? `Halo, ${username}!` : "Kamu belum login"}
            </p>
                  <LinkedAccounts />

            
        </div>
    )
}