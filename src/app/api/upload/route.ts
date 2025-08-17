import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Configure Cloudinary (ensure ENV variables are set)
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to a buffer
    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString("base64");
    const dataURI = `data:${file.type};base64,${base64String}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
      upload_preset: "mine-art",
      folder: "mine-art",
    });

    return NextResponse.json(
      { secure_url: uploadResponse.secure_url, id: uploadResponse.public_id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
