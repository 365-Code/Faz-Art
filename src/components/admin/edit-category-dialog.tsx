"use client";

import { type ChangeEvent, type FormEvent, useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [currentImage, setCurrentImage] = useState<ProductImage | null>(
    category?.image || null
  );
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  // Update form fields when category prop changes
  useEffect(() => {
    if (category) {
      setName(category.name);
      setDescription(category.description);
      setCurrentImage(category.image || null);
      setNewImageFile(null);
      setNewImagePreview(null);
    }
  }, [category]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewImageFile(file);
    if (file) {
      setNewImagePreview(URL.createObjectURL(file));
    } else {
      setNewImagePreview(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!category) {
      toast.error("No category selected for editing.");
      return;
    }

    if (!name || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!currentImage && !newImageFile) {
      toast.error("Please upload an image for the category.");
      return;
    }

    try {
      let updatedImage: ProductImage | null = currentImage;

      if (newImageFile) {
        const uploaded = await uploadToCloudinary(newImageFile);
        if (!uploaded) {
          toast.error("Failed to upload new image.");
          return;
        }
        updatedImage = uploaded;
      }

      const updatedData = {
        name,
        description,
        image: updatedImage!, // Asserting it's not null based on checks above
      };

      await updateCategory(category.id, updatedData);
      toast.success(`Category "${name}" updated successfully!`);
      onOpenChange(false); // Close dialog
    } catch (error) {
      toast.error("Failed to update category.");
      console.error("Error updating category:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Make changes to the category details here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="editCategoryName" className="text-sm font-medium">
              Category Name *
            </Label>
            <Input
              id="editCategoryName"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Luxury Basins"
              required
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="editCategoryDescription"
              className="text-sm font-medium"
            >
              Description *
            </Label>
            <Textarea
              id="editCategoryDescription"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this category..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="editCategoryImage" className="text-sm font-medium">
              Category Image
            </Label>
            <Input
              id="editCategoryImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {(newImagePreview || currentImage) && (
              <Image
                unoptimized
                src={newImagePreview || currentImage?.url || "/placeholder.svg"}
                width={100}
                height={100}
                alt="Category Preview"
                className="aspect-square w-24 h-24 object-cover rounded-md mt-2"
              />
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              Save Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
