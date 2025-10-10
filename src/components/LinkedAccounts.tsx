"use client"

import { useEffect, useState } from "react"
import { auth } from "@/app/lib/firebase"
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  linkWithCredential,
  linkWithPopup,
} from "firebase/auth"

export default function LinkedAccounts() {
  const [user, setUser] = useState<any>(null)
  const [providers, setProviders] = useState<string[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser)
        setProviders(currentUser.providerData.map((p) => p.providerId))
      }
    })
    return () => unsubscribe()
  }, [])

  const handleLinkGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await linkWithPopup(auth.currentUser!, provider)
      alert("Akun Google berhasil ditautkan!")
    } catch (error: any) {
      alert("Gagal menautkan akun Google: " + error.message)
    }
  }

  const handleLinkEmailPassword = async () => {
    try {
      const credential = EmailAuthProvider.credential(email, password)
      await linkWithCredential(auth.currentUser!, credential)
      alert("Email & password berhasil ditautkan!")
    } catch (error: any) {
      alert("Gagal menautkan email/password: " + error.message)
    }
  }

  return (
    <div className="p-6 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Metode Login Terhubung</h2>

      <ul className="mb-6 space-y-2">
        <li>
          <strong>Google:</strong>{" "}
          {providers.includes("google.com") ? "✅ Terhubung" : "❌ Belum"}
        </li>
        <li>
          <strong>Email & Password:</strong>{" "}
          {providers.includes("password") ? "✅ Terhubung" : "❌ Belum"}
        </li>
      </ul>

      {!providers.includes("google.com") && (
        <button
          onClick={handleLinkGoogle}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Hubungkan Akun Google
        </button>
      )}

      {!providers.includes("password") && (
        <div className="space-y-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          <button
            onClick={handleLinkEmailPassword}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Hubungkan Email & Password
          </button>
        </div>
      )}
    </div>
  )
}