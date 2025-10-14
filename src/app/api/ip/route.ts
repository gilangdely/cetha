import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for")
  const ip = forwarded?.split(",")[0] || "unknown"

  return new Response(JSON.stringify({ ip }), {
    headers: { "Content-Type": "application/json" },
  })
}