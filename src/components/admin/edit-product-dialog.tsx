"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type {
  ProductType,
  CategoryType,
  ProductImage,
  VariantType,
} from "@/lib/types";
import { toast } from "sonner";
import Image from "next/image";
import {
  AlertCircle,
  ImageIcon,
  Loader2,
  Trash2,
  Undo,
  Upload,
  X,
} from "lucide-react";
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

interface UpdateProductPayload {
  name: string;
  description: string;
  categoryId: string;
  images: ProductImage[];
  colorCode: string;
  colorName: string;
  isVariant: "true" | "false";
  newVariantId?: string;
  variantName?: string;
}

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

export function EditProductDialog({
  isOpen,
  onOpenChange,
  product,
  categories,
}: EditProductDialogProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<ProductImage[]>([]);

  const [variants, setVariants] = useState<VariantType[]>([]);
  const [isLoadingVariants, setIsLoadingVariants] = useState(false);

  const [isVariant, setIsVariant] = useState<"true" | "false">("false");
  const [selectedVariant, setSelectedVariant] = useState("");
  const [variantName, setVariantName] = useState("");
  const [colorCode, setColorCode] = useState("#ffffff");
  const [colorName, setColorName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  /*

* Load variants whenever the dialog opens.
  */
  useEffect(() => {
    if (!isOpen) return;

    const loadVariants = async () => {
      setIsLoadingVariants(true);

      try {
        const variantsData = await fetchVariants();
        setVariants(variantsData);
      } catch (error) {
        console.error("Error loading variants:", error);
        toast.error("Failed to load variants.");
      } finally {
        setIsLoadingVariants(false);
      }
    };

    loadVariants();
  }, [isOpen]);

  /*

* Populate form whenever the selected product changes.
  */
  useEffect(() => {
    if (!product) return;

    setName(product.name);

    setDescription(product.description);
    setSelectedCategory(product.categoryId.id.toString());

    setExistingImages(product.images || []);
    setNewImageFiles([]);
    setNewImagePreviews([]);
    setRemovedImages([]);

    setColorCode(product.colorCode || "#ffffff");
    setColorName(product.colorName || "");

    setVariantName(product.variantId?.name || "");
    setSelectedVariant("");
    setIsVariant("false");
  }, [product]);

  /*

* Clean up object URLs when previews change/unmount.
  */
  useEffect(() => {
    return () => {
      newImagePreviews.forEach((preview) => {
        URL.revokeObjectURL(preview);
      });
    };
  }, [newImagePreviews]);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id.toString(),
        label: category.name,
      })),
    [categories],
  );

  const variantOptions = useMemo(
    () =>
      variants
        .filter((variant) => variant.id !== product?.variantId?.id)
        .map((variant) => ({
          value: variant.id.toString(),
          label: variant.name,
        })),
    [variants, product?.variantId?.id],
  );

  const handleDialogChange = (open: boolean) => {
    if (isSubmitting) return;

    if (!open) {
      setNewImageFiles([]);
      setNewImagePreviews([]);
      setRemovedImages([]);
      setSelectedVariant("");
    }

    onOpenChange(open);
  };

  const handleRemoveExistingImage = (image: ProductImage) => {
    setExistingImages((prev) => prev.filter((item) => item.id !== image.id));

    setRemovedImages((prev) => [...prev, image]);
  };

  const handleRestoreImage = (image: ProductImage) => {
    setRemovedImages((prev) => prev.filter((item) => item.id !== image.id));

    setExistingImages((prev) => {
      if (prev.some((item) => item.id === image.id)) {
        return prev;
      }

      return [...prev, image];
    });
  };

  const handleNewImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const validFiles: File[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not a valid image.`);
        continue;
      }

      if (file.size > MAX_IMAGE_SIZE) {
        toast.error(`${file.name} is larger than 10MB.`);
        continue;
      }

      validFiles.push(file);
    }

    if (!validFiles.length) {
      e.target.value = "";
      return;
    }

    const previews = validFiles.map((file) => URL.createObjectURL(file));

    setNewImageFiles((prev) => [...prev, ...validFiles]);
    setNewImagePreviews((prev) => [...prev, ...previews]);

    e.target.value = "";
  };

  const handleRemoveNewImage = (index: number) => {
    const preview = newImagePreviews[index];

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setNewImageFiles((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index),
    );

    setNewImagePreviews((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index),
    );
  };

  const handleColorChange = (color: string) => {
    setColorCode(color);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!product) {
      toast.error("No product selected.");
      return;
    }

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedColorName = colorName.trim();

    if (!trimmedName) {
      toast.error("Please enter a product name.");
      return;
    }

    if (!trimmedDescription) {
      toast.error("Please enter a product description.");
      return;
    }

    if (!selectedCategory) {
      toast.error("Please select a category.");
      return;
    }

    if (!colorCode || !trimmedColorName) {
      toast.error("Please provide a color code and color name.");
      return;
    }

    if (isVariant === "true" && !selectedVariant) {
      toast.error("Please select an existing variant.");
      return;
    }

    if (existingImages.length === 0 && newImageFiles.length === 0) {
      toast.error("A product must have at least one image.");
      return;
    }

    setIsSubmitting(true);

    try {
      let uploadedNewImages: ProductImage[] = [];

      if (newImageFiles.length > 0) {
        uploadedNewImages = await uploadMultipleToCloudinary(newImageFiles);

        if (uploadedNewImages.length !== newImageFiles.length) {
          toast.error("Some images failed to upload. Please try again.");
          return;
        }
      }

      const allImages = [...existingImages, ...uploadedNewImages];

      const updatedData: UpdateProductPayload = {
        name: trimmedName,
        description: trimmedDescription,
        categoryId: selectedCategory,
        images: allImages,
        colorCode,
        colorName: trimmedColorName,
        isVariant,
        ...(isVariant === "true"
          ? {
              newVariantId: selectedVariant,
            }
          : {
              variantName: variantName.trim() || trimmedName,
            }),
      };

      await updateProduct(product.id, updatedData);

      toast.success(`"${trimmedName}" updated successfully.`);

      setNewImageFiles([]);
      setNewImagePreviews([]);
      setRemovedImages([]);

      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      {" "}
      <DialogContent className="max-h-[92vh] sm:max-w-2xl overflow-hidden p-0">
        {/* Header */}{" "}
        <DialogHeader className="border-b bg-muted/10 px-6 py-5">
          {" "}
          <DialogTitle className="text-xl">Edit Product </DialogTitle>
          <DialogDescription>
            Update product details, images, color, category, and variant
            information.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="flex max-h-[calc(100vh-180px)] flex-col"
        >
          {/* Scrollable content */}
          <div className="custom-scrollbar flex-1 space-y-7 overflow-y-auto px-6 py-6">
            {/* Basic Information */}
            <section className="space-y-5">
              <div>
                <h3 className="text-sm font-semibold">Basic Information</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Keep your product information clear and descriptive.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="editProductName">
                  Product Name <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="editProductName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Carrara Marble Vase"
                  disabled={isSubmitting}
                  autoComplete="off"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editProductCategory">
                  Category <span className="text-destructive">*</span>
                </Label>

                <Combobox
                  options={categoryOptions}
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  placeholder="Select a category"
                  searchPlaceholder="Search categories..."
                  emptyMessage="No categories found."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="editProductDescription">
                  Description <span className="text-destructive">*</span>
                </Label>

                <Textarea
                  id="editProductDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this product..."
                  rows={5}
                  disabled={isSubmitting}
                  className="resize-none"
                />
              </div>
            </section>

            {/* Color & Variant */}
            <section className="space-y-5 rounded-xl border bg-muted/20 p-5">
              <div>
                <h3 className="text-sm font-semibold">Color & Variant</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Configure the product&apos;s appearance and variant relationship.
                </p>
              </div>

              {/* Color */}
              <div className="space-y-3">
                <Label>
                  Color <span className="text-destructive">*</span>
                </Label>

                <ColorEyeDropper
                  onColorChange={handleColorChange}
                  selectedColor={colorCode}
                />

                <Input
                  placeholder="Color name (e.g., Ocean Blue)"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              {/* Variant mode */}
              <div className="space-y-3">
                <Label>
                  Variant Action <span className="text-destructive">*</span>
                </Label>

                <RadioGroup
                  value={isVariant}
                  onValueChange={(value) =>
                    setIsVariant(value as "true" | "false")
                  }
                  className="grid gap-3 sm:grid-cols-2"
                  disabled={isSubmitting}
                >
                  <label
                    htmlFor="edit-update-current-variant"
                    className="flex cursor-pointer items-start gap-3 rounded-lg border bg-background p-4 transition-colors hover:bg-muted/50"
                  >
                    <RadioGroupItem
                      value="false"
                      id="edit-update-current-variant"
                      className="mt-0.5"
                    />

                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        Update Current Variant
                      </p>
                      <p className="text-xs leading-5 text-muted-foreground">
                        Keep this product in its current variant.
                      </p>
                    </div>
                  </label>

                  <label
                    htmlFor="edit-move-existing-variant"
                    className="flex cursor-pointer items-start gap-3 rounded-lg border bg-background p-4 transition-colors hover:bg-muted/50"
                  >
                    <RadioGroupItem
                      value="true"
                      id="edit-move-existing-variant"
                      className="mt-0.5"
                    />

                    <div className="space-y-1">
                      <p className="text-sm font-medium">
                        Move to Existing Variant
                      </p>
                      <p className="text-xs leading-5 text-muted-foreground">
                        Associate this product with another variant.
                      </p>
                    </div>
                  </label>
                </RadioGroup>
              </div>

              {/* Current variant name */}
              {isVariant === "false" && (
                <div className="space-y-2">
                  <Label htmlFor="variantName">Variant Name</Label>

                  <Input
                    id="variantName"
                    value={variantName}
                    onChange={(e) => setVariantName(e.target.value)}
                    placeholder="Defaults to product name"
                    disabled={isSubmitting}
                  />

                  <p className="text-xs text-muted-foreground">
                    Leave empty to use the product name.
                  </p>
                </div>
              )}

              {/* Existing variant */}
              {isVariant === "true" && (
                <div className="space-y-2">
                  <Label>
                    Existing Variant <span className="text-destructive">*</span>
                  </Label>

                  <Combobox
                    options={variantOptions}
                    value={selectedVariant}
                    onValueChange={setSelectedVariant}
                    placeholder={
                      isLoadingVariants
                        ? "Loading variants..."
                        : "Select a variant"
                    }
                    searchPlaceholder="Search variants..."
                    emptyMessage="No other variants found."
                  />

                  {isLoadingVariants && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Loading variants...
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Existing Images */}
            <section className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold">Product Images</h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Keep at least one image attached to the product.
                  </p>
                </div>

                <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                  {existingImages.length} active
                </span>
              </div>

              {existingImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {existingImages.map((image, index) => (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-xl border bg-muted"
                    >
                      <div className="relative aspect-square">
                        <Image
                          unoptimized
                          src={image.url || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 50vw, 150px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-8">
                          <span className="text-xs font-medium text-white">
                            Image {index + 1}
                          </span>
                        </div>

                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 h-8 w-8 rounded-full opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                          onClick={() => handleRemoveExistingImage(image)}
                          disabled={isSubmitting}
                          aria-label={`Remove image ${index + 1}`}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-10 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <p className="text-sm font-medium">No active images</p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Upload at least one image below.
                  </p>
                </div>
              )}
            </section>

            {/* Removed Images */}
            {removedImages.length > 0 && (
              <section className="space-y-3 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500/10">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">Removed Images</h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      These images will be removed when you save.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {removedImages.map((image) => (
                    <div
                      key={image.id}
                      className="group relative overflow-hidden rounded-xl border border-dashed border-yellow-500/50 bg-background"
                    >
                      <div className="relative aspect-square opacity-60">
                        <Image
                          unoptimized
                          src={image.url || "/placeholder.svg"}
                          alt="Removed product image"
                          fill
                          sizes="150px"
                          className="object-cover"
                        />
                      </div>

                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full shadow-md"
                        onClick={() => handleRestoreImage(image)}
                        disabled={isSubmitting}
                        aria-label="Restore image"
                      >
                        <Undo className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Upload New Images */}
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold">Add New Images</h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG, WebP, or AVIF. Maximum 10MB per image.
                </p>
              </div>

              <Label
                htmlFor="editProductImages"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 py-8 text-center transition-colors hover:border-foreground/30 hover:bg-muted/40"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-sm">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>

                <span className="text-sm font-medium">
                  Click to upload images
                </span>

                <span className="mt-1 text-xs text-muted-foreground">
                  You can select multiple images
                </span>
              </Label>

              <Input
                id="editProductImages"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                multiple
                onChange={handleNewImageChange}
                disabled={isSubmitting}
                className="sr-only"
              />

              {newImagePreviews.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium">New images</p>

                    <span className="text-xs text-muted-foreground">
                      {newImagePreviews.length} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {newImagePreviews.map((src, index) => (
                      <div
                        key={src}
                        className="group relative overflow-hidden rounded-xl border bg-muted"
                      >
                        <div className="relative aspect-square">
                          <Image
                            unoptimized
                            src={src}
                            alt={`New product image ${index + 1}`}
                            fill
                            sizes="150px"
                            className="object-cover"
                          />

                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute right-2 top-2 h-8 w-8 rounded-full opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                            onClick={() => handleRemoveNewImage(index)}
                            disabled={isSubmitting}
                            aria-label={`Remove new image ${index + 1}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Sticky footer */}
          <DialogFooter className="border-t bg-background px-6 py-4">
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
              disabled={
                isSubmitting ||
                !name.trim() ||
                !description.trim() ||
                !selectedCategory ||
                !colorName.trim() ||
                (isVariant === "true" && !selectedVariant) ||
                (existingImages.length === 0 && newImageFiles.length === 0)
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
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
