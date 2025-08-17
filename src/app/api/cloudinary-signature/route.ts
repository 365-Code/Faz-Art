// app/api/cloudinary-signature/route.ts
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Optional: define preset/folder here
    const signature = cloudinary.v2.utils.api_sign_request(
      { timestamp, upload_preset: "mine-art" },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({ timestamp, signature });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
  }
}
