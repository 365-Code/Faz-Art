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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type {
  ProductType,
  CategoryType,
  ProductImage,
  VariantType,
} from "@/lib/types";
import { toast } from "sonner";
import Image from "next/image";
import { Undo, X } from "lucide-react";
import { Combobox } from "@/components/ui/combobox";
import { updateProduct, fetchVariants } from "@/lib/actions";
import { uploadMultipleToCloudinary } from "@/lib/api";
import ColorEyeDropper from "@/components/color-eye-dropper";

interface EditProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductType | null;
  categories: CategoryType[];
}

export function EditProductDialog({
  isOpen,
  onOpenChange,
  product,
  categories,
}: EditProductDialogProps) {

  console.log("Product Detail = ", product);
  

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Variant related states
  const [variants, setVariants] = useState<VariantType[]>([]);
  const [isVariant, setIsVariant] = useState("false");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [variantName, setVariantName] = useState("");
  const [colorCode, setColorCode] = useState("#ffffff");
  const [colorName, setColorName] = useState("");

  // Load variants when dialog opens
  useEffect(() => {
    const loadVariants = async () => {
      if (isOpen) {
        try {
          const variantsData = await fetchVariants();
          setVariants(variantsData);
        } catch (error) {
          console.error("Error loading variants:", error);
        }
      }
    };

    loadVariants();
  }, [isOpen]);

  // Update form fields when product prop changes
  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setSelectedCategory(product.categoryId.id.toString());
      setExistingImages(product.images || []);
      setNewImageFiles([]);
      setNewImagePreviews([]);
      setRemovedImages([]);
      // Set variant-related fields
      setVariantName(product.variantId?.name || "");
      setColorCode(product.colorCode || "#ffffff");
      setColorName(product.colorName || "");
      setIsVariant("false"); // Default to creating new variant
      setSelectedVariant("");
    }
  }, [product]);

  const categoryOptions = useMemo(() => {
    return categories.map((cat) => ({
      value: cat.id.toString(),
      label: cat.name,
    }));
  }, [categories]);

  const variantOptions = useMemo(() => {
    return variants
      .filter((variant) => variant.id !== product?.variantId?.id) // Exclude current variant
      .map((variant) => ({
        value: variant.id.toString(),
        label: variant.name,
      }));
  }, [variants, product?.variantId?.id]);

  const handleRemoveExistingImage = (imageId: string) => {
    const imageToRemove = existingImages.find((img) => img.id === imageId);
    if (!imageToRemove) return;

    setRemovedImages((prev) => [...prev, imageToRemove]);
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

  const handleColorChange = (color: string) => {
    setColorCode(color);
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

    if (!colorCode || !colorName) {
      toast.error("Please provide color code and color name.");
      return;
    }

    if (isVariant === "true" && !selectedVariant) {
      toast.error("Please select an existing variant.");
      return;
    }

    if (existingImages.length === 0 && newImageFiles.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    setIsSubmitting(true);
    try {
      let uploadedNewImages: ProductImage[] = [];
      if (newImageFiles.length > 0) {
        uploadedNewImages = await uploadMultipleToCloudinary(newImageFiles);
      }

      const allImages = [...existingImages, ...uploadedNewImages];

      const updatedData: any = {
        name,
        description,
        categoryId: selectedCategory,
        images: allImages,
        colorCode,
        colorName,
        isVariant,
      };

      if (isVariant === "true") {
        updatedData.newVariantId = selectedVariant;
      } else {
        updatedData.variantName = variantName || name;
      }

      await updateProduct(product.id, updatedData);
      toast.success(`Product "${name}" updated successfully!`);
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to update product.");
      console.error("Error updating product:", error);
    } finally {
      setIsSubmitting(false);
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
          className="space-y-4 overflow-x-hidden max-h-[calc(100vh-150px)] overflow-y-auto pr-2"
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>

          {/* Color Selection - Always Required */}
          <div className="space-y-4 p-4 border border-border/50 rounded-lg bg-muted/20">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Color Selection *</Label>
              <div className="space-y-3">
                <ColorEyeDropper
                  onColorChange={handleColorChange}
                  selectedColor={colorCode}
                />
                <Input
                  placeholder="Color name (e.g., Ocean Blue)"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Variant Selection *</Label>
              <RadioGroup
                value={isVariant}
                onValueChange={setIsVariant}
                className="flex gap-6"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="edit-create-new-variant" />
                  <Label htmlFor="edit-create-new-variant" className="text-sm">
                    Update Current Variant
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="edit-add-to-existing" />
                  <Label htmlFor="edit-add-to-existing" className="text-sm">
                    Move to Existing Variant
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {isVariant === "false" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Variant Name</Label>
                <Input
                  placeholder="Variant name (defaults to product name)"
                  value={variantName}
                  onChange={(e) => setVariantName(e.target.value)}
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to use product name as variant name
                </p>
              </div>
            )}

            {isVariant === "true" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Select Existing Variant *
                </Label>
                <Combobox
                  options={variantOptions}
                  value={selectedVariant}
                  onValueChange={setSelectedVariant}
                  placeholder="Select a Variant"
                  searchPlaceholder="Search variants..."
                  emptyMessage="No other variants found."
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Existing Images</Label>
            {existingImages.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto pt-2">
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
                      disabled={isSubmitting}
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
              <div className="flex gap-2 pt-2 overflow-x-auto">
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
                      disabled={isSubmitting}
                    >
                      <Undo className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="editProductImages" className="text-sm font-medium">
              Upload New Images
            </Label>
            <Input
              id="editProductImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleNewImageChange}
              disabled={isSubmitting}
            />
            {newImagePreviews.length > 0 && (
              <div className="flex gap-2 pt-2 overflow-x-auto">
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
                      disabled={isSubmitting}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
