import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as Blob[];
    const category = formData.get("category") as string;

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      const buffer = await file.arrayBuffer();
      const base64String = Buffer.from(buffer).toString("base64");
      const dataURI = `data:${file.type};base64,${base64String}`;

      const uploadResponse = await cloudinary.v2.uploader.upload(dataURI, {
        upload_preset: "mine-art",
        folder: `mine-art/${category}`,
      });

      return uploadResponse.secure_url;

      // return {
      //   id: uploadResponse.public_id,
      //   url: uploadResponse.secure_url,
      // };
    });

    const images = await Promise.all(uploadPromises);
    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
