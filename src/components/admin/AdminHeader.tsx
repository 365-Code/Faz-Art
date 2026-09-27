"use client";

import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ImagePlus,
  Loader2,
  Plus,
  Upload,
  X,
  PackagePlus,
  FolderPlus,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import type {
  CategoryType,
  ProductImage,
  VariantType,
} from "@/lib/types";
import { toast } from "sonner";
import Image from "next/image";
import {
  addCategory,
  fetchCategories,
  addProduct,
  fetchVariants,
} from "@/lib/actions";
import { Combobox } from "@/components/ui/combobox";
import {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
} from "@/lib/api";
import ColorEyeDropper from "@/components/color-eye-dropper";

const AdminHeader = () => {
  return (
    <header className="border-b border-border/60 bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Management
              </span>
            </div>

            <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
              Admin Dashboard
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Manage your marble collections, categories and products.
            </p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <AddCategory />
            <AddProduct />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

/* -------------------------------------------------------------------------- */
/* Add Category                                                               */
/* -------------------------------------------------------------------------- */

const AddCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryImageFile, setCategoryImageFile] =
    useState<File | null>(null);
  const [categoryImagePreview, setCategoryImagePreview] =
    useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setCategoryName("");
    setCategoryDescription("");
    setCategoryImageFile(null);
    setCategoryImagePreview(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (isSubmitting) return;

    setIsOpen(open);

    if (!open) {
      resetForm();
    }
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const image = e.target.files?.[0] ?? null;

    if (!image) {
      setCategoryImageFile(null);
      setCategoryImagePreview(null);
      return;
    }

    if (!image.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    if (image.size > 10 * 1024 * 1024) {
      toast.error("Image must be smaller than 10MB.");
      return;
    }

    setCategoryImageFile(image);
    setCategoryImagePreview(URL.createObjectURL(image));
  };

  const handleRemoveImage = () => {
    if (categoryImagePreview) {
      URL.revokeObjectURL(categoryImagePreview);
    }

    setCategoryImageFile(null);
    setCategoryImagePreview(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !categoryName.trim() ||
      !categoryDescription.trim() ||
      !categoryImageFile
    ) {
      toast.error("Please complete all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadedImage: ProductImage | null =
        await uploadToCloudinary(categoryImageFile);

      if (!uploadedImage) {
        throw new Error("Image upload failed");
      }

      const formData = new FormData();
      formData.append("name", categoryName.trim());
      formData.append(
        "description",
        categoryDescription.trim()
      );
      formData.append(
        "image",
        JSON.stringify(uploadedImage)
      );

      await addCategory(formData);

      toast.success("Category created successfully.");
      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error(
        "Unable to create category. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-full border-border bg-background sm:w-auto"
        >
          <FolderPlus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <FolderPlus className="h-5 w-5" />
          </div>

          <DialogTitle className="text-xl">
            Add New Category
          </DialogTitle>

          <DialogDescription>
            Create a category for organizing your marble collection.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="mt-2 space-y-5"
        >
          {/* Image */}
          <div className="space-y-2">
            <Label>
              Category Image <span className="text-red-500">*</span>
            </Label>

            {categoryImagePreview ? (
              <div className="relative overflow-hidden rounded-xl border bg-muted">
                <Image
                  unoptimized
                  src={categoryImagePreview}
                  width={600}
                  height={350}
                  alt="Category preview"
                  className="h-48 w-full object-cover"
                />

                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute right-3 top-3 h-8 w-8 rounded-full shadow-md"
                  onClick={handleRemoveImage}
                  disabled={isSubmitting}
                >
                  <X className="h-4 w-4" />
                </Button>

                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2 text-xs text-white">
                  {categoryImageFile?.name}
                </div>
              </div>
            ) : (
              <label
                htmlFor="categoryImage"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 text-center transition-colors hover:border-amber-400 hover:bg-amber-50/40"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-background shadow-sm">
                  <Upload className="h-5 w-5 text-muted-foreground" />
                </div>

                <p className="text-sm font-medium">
                  Click to upload an image
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  PNG, JPG or WEBP · Max 10MB
                </p>

                <Input
                  id="categoryImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="categoryName">
              Category Name{" "}
              <span className="text-red-500">*</span>
            </Label>

            <Input
              id="categoryName"
              value={categoryName}
              onChange={(e) =>
                setCategoryName(e.target.value)
              }
              placeholder="e.g. Luxury Basins"
              disabled={isSubmitting}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="categoryDescription">
              Description{" "}
              <span className="text-red-500">*</span>
            </Label>

            <Textarea
              id="categoryDescription"
              value={categoryDescription}
              onChange={(e) =>
                setCategoryDescription(e.target.value)
              }
              placeholder="Describe this category..."
              rows={4}
              disabled={isSubmitting}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="sm:min-w-36"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Category
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

/* -------------------------------------------------------------------------- */
/* Add Product                                                                */
/* -------------------------------------------------------------------------- */

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [variants, setVariants] = useState<VariantType[]>([]);

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] =
    useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [productImageFiles, setProductImageFiles] =
    useState<File[]>([]);
  const [productImagePreviews, setProductImagePreviews] =
    useState<string[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingOptions, setIsLoadingOptions] =
    useState(false);

  const [isVariant, setIsVariant] = useState("false");
  const [selectedVariant, setSelectedVariant] =
    useState("");

  const [colorCode, setColorCode] = useState("#ffffff");
  const [colorName, setColorName] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const loadData = async () => {
      setIsLoadingOptions(true);

      try {
        const [categoriesData, variantsData] =
          await Promise.all([
            fetchCategories(),
            fetchVariants(),
          ]);

        setCategories(categoriesData.categories);
        setVariants(variantsData);
      } catch (error) {
        console.error("Error loading product options:", error);
        toast.error(
          "Failed to load categories and variants."
        );
      } finally {
        setIsLoadingOptions(false);
      }
    };

    loadData();
  }, [isOpen]);

  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id.toString(),
        label: category.name,
      })),
    [categories]
  );

  const variantOptions = useMemo(
    () =>
      variants.map((variant) => ({
        value: variant.id.toString(),
        label: variant.name,
      })),
    [variants]
  );

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setSelectedCategory("");

    setProductImageFiles([]);

    productImagePreviews.forEach((preview) =>
      URL.revokeObjectURL(preview)
    );

    setProductImagePreviews([]);

    setIsVariant("false");
    setSelectedVariant("");
    setColorCode("#ffffff");
    setColorName("");
  };

  const handleOpenChange = (open: boolean) => {
    if (isSubmitting) return;

    setIsOpen(open);

    if (!open) {
      resetForm();
    }
  };

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not a valid image.`);
        return false;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error(
          `${file.name} is larger than the 10MB limit.`
        );
        return false;
      }

      return true;
    });

    if (!validFiles.length) return;

    setProductImageFiles((prev) => [
      ...prev,
      ...validFiles,
    ]);

    setProductImagePreviews((prev) => [
      ...prev,
      ...validFiles.map((file) =>
        URL.createObjectURL(file)
      ),
    ]);

    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const preview = productImagePreviews[index];

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setProductImageFiles((prev) =>
      prev.filter((_, i) => i !== index)
    );

    setProductImagePreviews((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleColorChange = (color: string) => {
    setColorCode(color);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !productName.trim() ||
      !productDescription.trim() ||
      !selectedCategory ||
      productImageFiles.length === 0
    ) {
      toast.error(
        "Please complete all required product fields."
      );
      return;
    }

    if (!colorCode || !colorName.trim()) {
      toast.error(
        "Please provide both a color and color name."
      );
      return;
    }

    if (isVariant === "true" && !selectedVariant) {
      toast.error("Please select an existing variant.");
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadedImages =
        await uploadMultipleToCloudinary(
          productImageFiles
        );

      if (!uploadedImages.length) {
        throw new Error("Image upload failed");
      }

      const formData = new FormData();

      formData.append("name", productName.trim());
      formData.append(
        "description",
        productDescription.trim()
      );
      formData.append("categoryId", selectedCategory);
      formData.append("isVariant", isVariant);
      formData.append("colorCode", colorCode);
      formData.append("colorName", colorName.trim());

      if (isVariant === "true") {
        formData.append("variantId", selectedVariant);
      }

      uploadedImages.forEach((image) => {
        formData.append(
          "images",
          JSON.stringify(image)
        );
      });

      await addProduct(formData);

      toast.success("Product created successfully.");
      setIsOpen(false);
      resetForm();
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error(
        "Unable to create product. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-10 w-full sm:w-auto">
          <PackagePlus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <PackagePlus className="h-5 w-5" />
          </div>

          <DialogTitle className="text-xl">
            Add New Product
          </DialogTitle>

          <DialogDescription>
            Add a new marble product to your collection.
          </DialogDescription>
        </DialogHeader>

        {isLoadingOptions ? (
          <div className="flex min-h-64 flex-col items-center justify-center gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Loading categories and variants...
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-2 space-y-6"
          >
            {/* Basic information */}
            <section className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold">
                  Basic Information
                </h3>
                <p className="text-xs text-muted-foreground">
                  Give your product a name and description.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productName">
                  Product Name{" "}
                  <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="productName"
                  value={productName}
                  onChange={(e) =>
                    setProductName(e.target.value)
                  }
                  placeholder="e.g. Carrara Marble Vase"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Category{" "}
                  <span className="text-red-500">*</span>
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
                <Label htmlFor="productDescription">
                  Description{" "}
                  <span className="text-red-500">*</span>
                </Label>

                <Textarea
                  id="productDescription"
                  value={productDescription}
                  onChange={(e) =>
                    setProductDescription(e.target.value)
                  }
                  placeholder="Describe the product, material, finish, use, etc."
                  rows={4}
                  disabled={isSubmitting}
                />
              </div>
            </section>

            {/* Color / Variant */}
            <section className="rounded-xl border bg-muted/20 p-4">
              <div className="mb-4">
                <h3 className="text-sm font-semibold">
                  Color & Variant
                </h3>
                <p className="text-xs text-muted-foreground">
                  Define the appearance and variant relationship.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>
                    Color{" "}
                    <span className="text-red-500">*</span>
                  </Label>

                  <ColorEyeDropper
                    onColorChange={handleColorChange}
                    selectedColor={colorCode}
                  />

                  <Input
                    value={colorName}
                    onChange={(e) =>
                      setColorName(e.target.value)
                    }
                    placeholder="e.g. Ocean Blue"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-3">
                  <Label>
                    Variant{" "}
                    <span className="text-red-500">*</span>
                  </Label>

                  <RadioGroup
                    value={isVariant}
                    onValueChange={setIsVariant}
                    className="grid gap-3 sm:grid-cols-2"
                  >
                    <label
                      htmlFor="create-new-variant"
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                        isVariant === "false"
                          ? "border-primary bg-primary/5"
                          : "hover:bg-background"
                      }`}
                    >
                      <RadioGroupItem
                        value="false"
                        id="create-new-variant"
                      />

                      <div>
                        <p className="text-sm font-medium">
                          New Variant
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Create a new variant group.
                        </p>
                      </div>
                    </label>

                    <label
                      htmlFor="add-to-existing"
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                        isVariant === "true"
                          ? "border-primary bg-primary/5"
                          : "hover:bg-background"
                      }`}
                    >
                      <RadioGroupItem
                        value="true"
                        id="add-to-existing"
                      />

                      <div>
                        <p className="text-sm font-medium">
                          Existing Variant
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Add this product to a variant.
                        </p>
                      </div>
                    </label>
                  </RadioGroup>
                </div>

                {isVariant === "true" && (
                  <div className="space-y-2">
                    <Label>
                      Existing Variant{" "}
                      <span className="text-red-500">*</span>
                    </Label>

                    <Combobox
                      options={variantOptions}
                      value={selectedVariant}
                      onValueChange={setSelectedVariant}
                      placeholder="Select a variant"
                      searchPlaceholder="Search variants..."
                      emptyMessage="No variants found."
                    />
                  </div>
                )}
              </div>
            </section>

            {/* Images */}
            <section className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold">
                  Product Images
                </h3>
                <p className="text-xs text-muted-foreground">
                  Add one or more high-quality images. The first
                  image can be treated as the primary image.
                </p>
              </div>

              <label
                htmlFor="productImages"
                className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-border p-4 transition-colors hover:border-primary/50 hover:bg-muted/30"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <ImagePlus className="h-5 w-5 text-muted-foreground" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-medium">
                    Add product images
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or WEBP · Max 10MB per image
                  </p>
                </div>

                <Input
                  id="productImages"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                  className="hidden"
                />
              </label>

              {productImagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {productImagePreviews.map((src, index) => (
                    <div
                      key={src}
                      className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                    >
                      <Image
                        unoptimized
                        src={src}
                        width={160}
                        height={160}
                        alt={`Product image ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 rounded bg-black/70 px-2 py-1 text-[10px] font-medium text-white">
                          Primary
                        </span>
                      )}

                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute right-2 top-2 h-7 w-7 rounded-full opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                        onClick={() =>
                          handleRemoveImage(index)
                        }
                        disabled={isSubmitting}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="sm:min-w-40"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Product
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};