"use client"

import { type ChangeEvent, type FormEvent, useEffect, useMemo, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { CategoryType, ProductImage, VariantType } from "@/lib/types"
import { toast } from "sonner"
import Image from "next/image"
import { addCategory, fetchCategories, addProduct, fetchVariants } from "@/lib/actions"
import { Combobox } from "@/components/ui/combobox"
import { uploadToCloudinary, uploadMultipleToCloudinary } from "@/lib/api"
import ColorEyeDropper from "@/components/color-eye-dropper"

const AdminHeader = () => {
  return (
    <div className="border-b border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your marble collections and products</p>
          </div>
          <div className="flex gap-2">
            <AddCategory />
            <AddProduct />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHeader

const AddCategory = () => {
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")
  const [categoryImageFile, setCategoryImageFile] = useState<File | null>(null)
  const [categoryImagePreview, setCategoryImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files ? e.target.files[0] : null

    if (image) {
      setCategoryImageFile(image)
      setCategoryImagePreview(URL.createObjectURL(image))
    } else {
      setCategoryImageFile(null)
      setCategoryImagePreview(null)
    }
  }

  const handleRemoveImage = () => {
    setCategoryImageFile(null)
    setCategoryImagePreview(null)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!categoryName || !categoryDescription || !categoryImageFile) {
      toast.error("Please provide all fields and an image.")
      return
    }

    setIsSubmitting(true)
    try {
      const uploadedImage: ProductImage | null = await uploadToCloudinary(categoryImageFile)

      if (!uploadedImage) {
        toast.error("Failed to upload image to Cloudinary.")
        return
      }

      const formData = new FormData()
      formData.append("name", categoryName)
      formData.append("image", JSON.stringify(uploadedImage))
      formData.append("description", categoryDescription)

      await addCategory(formData)
      toast.success("Category added successfully!")
      setIsAddCategoryOpen(false)
      setCategoryName("")
      setCategoryDescription("")
      setCategoryImageFile(null)
      setCategoryImagePreview(null)
    } catch (error) {
      toast.error("Failed to add category.")
      console.error("Error adding category:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>Create a new marble category for your collection.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="categoryImage" className="text-sm font-medium">
              Upload an Image *
            </Label>
            <Input onChange={handleImageChange} type="file" accept="image/*" id="categoryImage" required />
            {categoryImagePreview && (
              <div className="relative group w-24 h-24 mt-2">
                <Image
                  unoptimized
                  src={categoryImagePreview || "/placeholder.svg"}
                  width={100}
                  height={100}
                  alt="Category Preview"
                  className="aspect-square w-full h-full object-cover rounded-md border border-border"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryName" className="text-sm font-medium">
              Category Name *
            </Label>
            <Input
              id="categoryName"
              name="name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., Luxury Basins"
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="categoryDescription" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              name="description"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              id="categoryDescription"
              placeholder="Describe this category..."
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Category"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsAddCategoryOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const AddProduct = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [variants, setVariants] = useState<VariantType[]>([])
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [productImageFiles, setProductImageFiles] = useState<File[]>([])
  const [productImagePreviews, setProductImagePreviews] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Variant related states
  const [isVariant, setIsVariant] = useState("false")
  const [selectedVariant, setSelectedVariant] = useState("")
  const [colorCode, setColorCode] = useState("#ffffff")
  const [colorName, setColorName] = useState("")

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, variantsData] = await Promise.all([fetchCategories(), fetchVariants()])
        setCategories(categoriesData.categories)
        setVariants(variantsData)
      } catch (error) {
        console.error("Error loading data:", error)
        toast.error("Failed to load categories and variants")
      }
    }

    if (isAddProductOpen) {
      loadData()
    }
  }, [isAddProductOpen])

  const categoryOptions = useMemo(() => {
    return categories.map((cat) => ({
      value: cat.id.toString(),
      label: cat.name,
    }))
  }, [categories])

  const variantOptions = useMemo(() => {
    return variants.map((variant) => ({
      value: variant.id.toString(),
      label: variant.name,
    }))
  }, [variants])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setProductImageFiles((prev) => [...prev, ...files])

    const previews = files.map((file) => URL.createObjectURL(file))
    setProductImagePreviews((prev) => [...prev, ...previews])
  }

  const handleRemoveNewImage = (indexToRemove: number) => {
    setProductImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove))
    setProductImagePreviews((prev) => prev.filter((_, index) => index !== indexToRemove))
  }

  const handleColorChange = (color: string) => {
    setColorCode(color)
  }

  const resetForm = () => {
    setProductName("")
    setProductDescription("")
    setSelectedCategory("")
    setProductImageFiles([])
    setProductImagePreviews([])
    setIsVariant("false")
    setSelectedVariant("")
    setColorCode("#ffffff")
    setColorName("")
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!productName || !productDescription || !selectedCategory || productImageFiles.length === 0) {
      toast.error("Please provide all required fields and at least one image.")
      return
    }

    if (!colorCode || !colorName) {
      toast.error("Please provide color code and color name.")
      return
    }

    if (isVariant === "true" && !selectedVariant) {
      toast.error("Please select an existing variant.")
      return
    }

    setIsSubmitting(true)
    try {
      const uploadedImages: ProductImage[] = await uploadMultipleToCloudinary(productImageFiles)

      if (uploadedImages.length === 0) {
        toast.error("Failed to upload product images.")
        return
      }

      const formData = new FormData()
      formData.append("name", productName)
      formData.append("description", productDescription)
      formData.append("categoryId", selectedCategory)
      formData.append("isVariant", isVariant)
      formData.append("colorCode", colorCode)
      formData.append("colorName", colorName)

      if (isVariant === "true") {
        formData.append("variantId", selectedVariant)
      }

      uploadedImages.forEach((img) => {
        formData.append("images", JSON.stringify(img))
      })

      console.log(isVariant);
      
      await addProduct(formData)
      toast.success("Product added successfully!")
      setIsAddProductOpen(false)
      resetForm()
    } catch (error) {
      toast.error("Failed to add product.")
      console.error("Error adding product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>Add a new marble product to your collection.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 overflow-x-hidden max-h-[calc(100vh-150px)] overflow-y-auto custom-scrollbar pr-2"
        >
          <div className="space-y-2">
            <Label htmlFor="productName" className="text-sm font-medium">
              Product Name *
            </Label>
            <Input
              id="productName"
              name="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., Carrara Marble Vase"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productCategory" className="text-sm font-medium">
              Category *
            </Label>
            <Combobox
              options={categoryOptions}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              placeholder="Select a Category"
              searchPlaceholder="Search categories..."
              emptyMessage="No categories found."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="productDescription" className="text-sm font-medium">
              Description *
            </Label>
            <Textarea
              id="productDescription"
              name="description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
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
                <ColorEyeDropper onColorChange={handleColorChange} selectedColor={colorCode} />
                <Input
                  placeholder="Color name (e.g., Ocean Blue)"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Variant Selection *</Label>
              <RadioGroup value={isVariant} onValueChange={setIsVariant} className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="create-new-variant" />
                  <Label htmlFor="create-new-variant" className="text-sm">
                    Create New Variant
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="add-to-existing" />
                  <Label htmlFor="add-to-existing" className="text-sm">
                    Add to Existing Variant
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {isVariant === "true" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Existing Variant *</Label>
                <Combobox
                  options={variantOptions}
                  value={selectedVariant}
                  onValueChange={setSelectedVariant}
                  placeholder="Select a Variant"
                  searchPlaceholder="Search variants..."
                  emptyMessage="No variants found."
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="productImages" className="text-sm font-medium">
              Product Images *
            </Label>
            <Input
              id="productImages"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              required
              disabled={isSubmitting}
            />
            {productImagePreviews.length > 0 && (
              <div className="flex gap-2 pt-2 overflow-x-auto">
                {productImagePreviews.map((src, index) => (
                  <div key={index} className="relative group flex-shrink-0 w-20 h-20">
                    <Image
                      unoptimized
                      src={src || "/placeholder.svg"}
                      width={80}
                      height={80}
                      alt={`Product preview ${index + 1}`}
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
              {isSubmitting ? "Creating..." : "Create Product"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsAddProductOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
