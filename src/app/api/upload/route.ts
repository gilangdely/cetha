import { NextRequest } from "next/server";
import { Client, handle_file } from "@gradio/client"

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return Response.json({ error: "Tidak ada file" }, { status: 400 });
  }

  // Validasi format file
  const allowedTypes = [
    "application/pdf", // PDF
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
  ];

  if (!allowedTypes.includes(file.type)) {
    return Response.json(
      { error: `Format file tidak didukung (${file.type})` },
      { status: 400 },
    );
  }

  const buffer = await file.arrayBuffer();
  const app = await Client.connect("firmanaziz/CV2")

  const result = await app.predict("/score_cv", [handle_file(Buffer.from(buffer))]);

  // Info file
  const fileName = file.name;
  const fileType = file.type;
  const fileSize = file.size;

  return Response.json({
    message: "File diterima",
    fileName,
    fileType,
    fileSize,
    result
  });
};
