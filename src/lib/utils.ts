import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadMultipleToCloudinary = async (
  files: File[]
  // ): Promise<string[]> => {
): Promise<{ id: string; url: string }[]> => {
  if (!files || files.length === 0) return [];

  // 1. Get signature from server
  const sigRes = await fetch("/api/cloudinary-signature");
  if (!sigRes.ok) throw new Error("Failed to get Cloudinary signature");
  const { timestamp, signature } = await sigRes.json();

  const uploaded = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mine-art");
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

    // 2. Upload directly to Cloudinary
    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!uploadRes.ok) throw new Error("Cloudinary upload failed");
    const data = await uploadRes.json();

    uploaded.push({
      id: data.public_id,
      url: data.secure_url,
    });
    // uploaded.push(data.secure_url);
  }

  return uploaded;
};
