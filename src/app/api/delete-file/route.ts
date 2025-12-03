// filepath: d:\Projectan\cetha\src\app\api\delete-file\route.ts
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Config Cloudinary (server-side)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_API_KEY, // Wait, no: cloud_name
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    const { publicId } = await request.json(); // public_id dari URL (e.g., 'cv-files/user123/123-file.pdf')

    const result = await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
    if (result.result !== "ok") {
      return NextResponse.json({ error: "Gagal hapus file" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}