"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useState,
  useMemo,
  useEffect,
} from "react";
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
import type { ProductType, CategoryType, ProductImage } from "@/lib/types";
import { toast } from "sonner";
import Image from "next/image";
import { Undo, X } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { updateProduct } from "@/lib/actions";
import { uploadMultipleToCloudinary } from "@/lib/api"; // Assuming this is where your Cloudinary upload function is

interface EditProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductType | null;
  categories: CategoryType[];
  // onProductUpdated: () => void;
}

export function EditProductDialog({
  isOpen,
  onOpenChange,
  product,
  categories,
}: EditProductDialogProps) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [selectedCategory, setSelectedCategory] = useState(
    product?.categoryId.id || ""
  );
  const [existingImages, setExistingImages] = useState<ProductImage[]>(
    product?.images || []
  );
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  const [removedImages, setRemovedImages] = useState<ProductImage[]>([]);

  // Update form fields when product prop changes (e.g., when a new product is selected for editing)
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setSelectedCategory(product.categoryId.id);
      setExistingImages(product.images || []);
      setNewImageFiles([]);
      setNewImagePreviews([]);
    }
  }, [product]);

  const categoryOptions = useMemo(() => {
    return categories.map((cat) => ({
      value: cat.id.toString(),
      label: cat.name,
    }));
  }, [categories]);

  const handleRemoveExistingImage = (imageId: string) => {
    const imageToRemove = existingImages.find((img) => img.id === imageId);
    if (!imageToRemove) return;

    // Move image to removedImages
    setRemovedImages((prev) => [...prev, imageToRemove]);

    // Remove from existingImages
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
  };

  const handleRestoreImage = (image: ProductImage) => {
    setExistingImages((prev) => [...prev, image]);
    setRemovedImages((prev) => prev.filter((img) => img.id !== image.id));
  };

  const handleNewImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImageFiles((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setNewImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleRemoveNewImage = (indexToRemove: number) => {
    setNewImageFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    setNewImagePreviews((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!product) {
      toast.error("No product selected for editing.");
      return;
    }

    if (!name || !description || !selectedCategory) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (existingImages.length === 0 && newImageFiles.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    try {
      let uploadedNewImages: ProductImage[] = [];
      if (newImageFiles.length > 0) {
        uploadedNewImages = await uploadMultipleToCloudinary(newImageFiles);
      }

      const allImages = [...existingImages, ...uploadedNewImages];

      const updatedData = {
        name,
        description,
        categoryId: selectedCategory,
        images: allImages,
      };

      await updateProduct(product.id, updatedData);
      toast.success(`Product "${name}" updated successfully!`);
      onOpenChange(false); // Close dialog
      // onProductUpdated(); // Notify parent to refresh data
    } catch (error) {
      toast.error("Failed to update product.");
      console.error("Error updating product:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Make changes to the product details here.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-x-hidden custom-scrollbar max-h-[calc(100vh-150px)] overflow-y-auto pr-0"
        >
          <div className="space-y-2">
            <Label htmlFor="editProductName" className="text-sm font-medium">
              Product Name *
            </Label>
            <Input
              id="editProductName"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Carrara Marble Vase"
              required
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="editProductCategory"
              className="text-sm font-medium"
            >
              Category *
            </Label>
            <Combobox
              options={categoryOptions}
              value={selectedCategory.toString()}
              onValueChange={setSelectedCategory}
              placeholder="Select a Category"
              searchPlaceholder="Search categories..."
              emptyMessage="No categories found."
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="editProductDescription"
              className="text-sm font-medium"
            >
              Description *
            </Label>
            <Textarea
              id="editProductDescription"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this product..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Existing Images</Label>
            {existingImages.length > 0 ? (
              <div
                className="flex gap-2 overflow-x-auto pt-2 no-scrollbar"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {existingImages.map((img, index) => (
                  <div
                    key={img.id}
                    className="relative group flex-shrink-0 w-20 h-20"
                  >
                    <Image
                      unoptimized
                      src={img.url || "/placeholder.svg"}
                      width={80}
                      height={80}
                      alt={`Existing product image ${index + 1}`}
                      className="aspect-square w-full h-full object-cover rounded-md border border-border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveExistingImage(img.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">
                No existing images.
              </p>
            )}
          </div>

          {/* Recently Removed Section */}
          {removedImages.length > 0 && (
            <div className="space-y-2 mt-4">
              <Label className="text-sm font-medium text-yellow-600">
                Recently Removed
              </Label>
              <div
                className="flex gap-2 pt-2 overflow-x-auto no-scrollbar"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {removedImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative group flex-shrink-0 w-20 h-20"
                  >
                    <Image
                      unoptimized
                      src={img.url || "/placeholder.svg"}
                      width={80}
                      height={80}
                      alt="Removed product image"
                      className="aspect-square w-full h-full object-cover rounded-md border border-dashed border-yellow-500"
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRestoreImage(img)}
                    >
                      <Undo className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Newly Added Images */}
          <div className="space-y-2">
            <Label htmlFor="editProductImages" className="text-sm font-medium">
              Upload New Images
            </Label>
            <Button className="p-0" type="button">
              <Label htmlFor="editProductImages" className="px-4 py-2">
                Upload Button
              </Label>
            </Button>
            <Input
              id="editProductImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewImageChange}
              className="hidden"
            />
            {newImagePreviews.length > 0 && (
              <div
                className="flex gap-2 pt-2 overflow-x-auto no-scrollbar"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {newImagePreviews.map((src, index) => (
                  <div
                    key={index}
                    className="relative group flex-shrink-0 w-20 h-20"
                  >
                    <Image
                      unoptimized
                      src={src || "/placeholder.svg"}
                      width={80}
                      height={80}
                      alt={`New product preview ${index + 1}`}
                      className="aspect-square w-full h-full object-cover rounded-md border border-border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveNewImage(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
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
