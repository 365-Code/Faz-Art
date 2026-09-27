"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CategoryType, ProductImage } from "@/lib/types";
import { toast } from "sonner";
import Image from "next/image";
import { updateCategory } from "@/lib/actions";
import { uploadToCloudinary } from "@/lib/api";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface EditCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  category: CategoryType | null;
}

export function EditCategoryDialog({
  isOpen,
  onOpenChange,
  category,
}: EditCategoryDialogProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [currentImage, setCurrentImage] = useState<ProductImage | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!category) return;

    setName(category.name);
    setDescription(category.description);
    setCurrentImage(category.image || null);
    setNewImageFile(null);
    setNewImagePreview(null);
  }, [category]);

  useEffect(() => {
    return () => {
      if (newImagePreview) {
        URL.revokeObjectURL(newImagePreview);
      }
    };
  }, [newImagePreview]);

  const handleDialogChange = (open: boolean) => {
    if (isSubmitting) return;

    if (!open) {
      setNewImageFile(null);
      setNewImagePreview(null);
    }

    onOpenChange(open);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setNewImageFile(null);
      setNewImagePreview(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    // Optional client-side size protection.
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image must be smaller than 10MB.");
      e.target.value = "";
      return;
    }

    setNewImageFile(file);
    setNewImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveNewImage = () => {
    setNewImageFile(null);
    setNewImagePreview(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!category) {
      toast.error("No category selected.");
      return;
    }

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      toast.error("Please enter a category name.");
      return;
    }

    if (!trimmedDescription) {
      toast.error("Please enter a category description.");
      return;
    }

    if (!currentImage && !newImageFile) {
      toast.error("Please upload an image for the category.");
      return;
    }

    setIsSubmitting(true);

    try {
      let updatedImage = currentImage;

      if (newImageFile) {
        const uploadedImage = await uploadToCloudinary(newImageFile);

        if (!uploadedImage) {
          toast.error("Failed to upload the new image.");
          return;
        }

        updatedImage = uploadedImage;
      }

      if (!updatedImage) {
        toast.error("Category image is required.");
        return;
      }

      await updateCategory(category.id, {
        name: trimmedName,
        description: trimmedDescription,
        image: updatedImage,
      });

      toast.success(`"${trimmedName}" updated successfully.`);

      handleRemoveNewImage();
      onOpenChange(false);

      router.refresh();
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const previewImage =
    newImagePreview || currentImage?.url || "/placeholder.svg";

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      {" "}
      <DialogContent className="sm:max-w-[560px] p-0 overflow-hidden">
        {" "}
        <DialogHeader className="border-b px-6 py-5">
          {" "}
          <DialogTitle className="text-xl">Edit Category</DialogTitle>{" "}
          <DialogDescription>
            Update the category name, description, or image.{" "}
          </DialogDescription>{" "}
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar"
        >
          <div className="space-y-6 px-6 py-6">
            {/* Category Name */}
            <div className="space-y-2">
              <Label htmlFor="editCategoryName">
                Category Name <span className="text-destructive">*</span>
              </Label>

              <Input
                id="editCategoryName"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Luxury Basins"
                disabled={isSubmitting}
                autoComplete="off"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="editCategoryDescription">
                Description <span className="text-destructive">*</span>
              </Label>

              <Textarea
                id="editCategoryDescription"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this category..."
                rows={5}
                disabled={isSubmitting}
                className="resize-none"
              />

              <p className="text-xs text-muted-foreground">
                Keep the description clear and useful for customers browsing
                your collection.
              </p>
            </div>

            {/* Image */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="editCategoryImage">
                  Category Image{" "}
                  {!currentImage && <span className="text-destructive">*</span>}
                </Label>

                <p className="mt-1 text-xs text-muted-foreground">
                  Upload a new image to replace the current one.
                </p>
              </div>

              <div className="rounded-xl border border-dashed bg-muted/20 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  {/* Preview */}
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border bg-muted">
                    {previewImage ? (
                      <Image
                        unoptimized
                        src={previewImage}
                        alt={name || "Category preview"}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageIcon className="h-7 w-7 text-muted-foreground" />
                      </div>
                    )}

                    {newImagePreview && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-1 top-1 h-7 w-7 rounded-full shadow-sm"
                        onClick={handleRemoveNewImage}
                        disabled={isSubmitting}
                        aria-label="Remove new image"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Upload */}
                  <div className="min-w-0 flex-1">
                    <Label
                      htmlFor="editCategoryImage"
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border bg-background px-4 py-3 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <Upload className="h-4 w-4" />
                      {newImageFile
                        ? "Choose Different Image"
                        : "Replace Image"}
                    </Label>

                    <Input
                      id="editCategoryImage"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={handleImageChange}
                      disabled={isSubmitting}
                      className="sr-only"
                    />

                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      JPG, PNG, WebP or AVIF · Max 10MB
                    </p>

                    {newImageFile && (
                      <p className="mt-2 truncate text-center text-xs font-medium text-foreground">
                        {newImageFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="border-t bg-muted/20 px-6 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleDialogChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting || !name.trim() || !description.trim()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
