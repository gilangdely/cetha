"use client"

import { useEffect, useState } from "react"
import { auth } from "@/app/lib/firebase"
import Image from "next/image"
import { AvatarImage } from "@/components/ui/avatar" // pastikan path ini sesuai struktur proyekmu

export default function UserAvatar() {
  const [photoURL, setPhotoURL] = useState<string | null>(null)
  const [initials, setInitials] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.photoURL && typeof user.photoURL === "string") {
          setPhotoURL(user.photoURL)
        } else {
          const name = user.displayName || user.email || ""
          const parts = name.trim().split(" ")
          const first = parts[0]?.[0] || ""
          const last = parts[1]?.[0] || ""
          setInitials((first + last).toUpperCase())
        }
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
      {photoURL ? (
        <Image
          src={photoURL}
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full object-cover"
          unoptimized
        />
      ) : initials ? (
        <span className="text-sm font-semibold text-gray-700">{initials}</span>
      ) : (
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="avatar"
          className="rounded-full"
        />
      )}
    </div>
  )
}
