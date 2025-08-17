"use server";
import slugify from "slugify";
import { connectDB } from "./db";
import { Category, Contact, Product, Variant } from "./models";
import type {
  CategoryType,
  ContactType,
  ProductImage,
  ProductType,
  VariantType,
} from "./types";
import mongoose, { Types, startSession } from "mongoose";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { limit } from "./constant";
import { v4 as uuidv4 } from "uuid";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const mapToProduct = (product: any): ProductType => {
  return {
    id: product.id || product._id?.toString(),
    name: product.name,
    slug: product.slug,
    categoryId: {
      id: product.categoryId?.id || product.categoryId?._id?.toString(),
      name: product.categoryId?.name,
    },
    variantId: product.variantId,
    colorCode: product.colorCode,
    colorName: product.colorName,
    images: product.images,
    description: product.description,
  };
};

const mapToCategory = (category: any): CategoryType => {
  return {
    id: category.id || category._id?.toString(),
    name: category.name,
    slug: category.slug,
    image: category.image,
    description: category.description,
  };
};

const mapToVariant = (variant: any): VariantType => {
  return {
    id: variant.id || variant._id?.toString(),
    name: variant.name,
    variants: variant.variants || [],
  };
};

export async function fetchCategoriesCount(): Promise<number> {
  await connectDB();
  const totalCount = Number(await Category.countDocuments());
  return totalCount;
}

export async function fetchCategories(
  page?: number | 0
): Promise<{ totalCount: number; categories: CategoryType[] }> {
  await connectDB();
  const categories = await Category.find({})
    .limit(limit)
    .skip(page && page > 1 ? (page - 1) * limit : 0);

  const totalCount = Number(await Category.countDocuments());
  const ctgs = JSON.parse(JSON.stringify(categories)) as any[];

  return {
    totalCount,
    categories: ctgs.map((ctg) => mapToCategory(ctg)),
  };
}

export async function fetchCategory(
  categoryId: Types.ObjectId
): Promise<CategoryType> {
  await connectDB();
  const category = await Category.findById(categoryId);
  return JSON.parse(JSON.stringify(category));
}

export async function addCategory(categoryData: FormData) {
  const name = categoryData.get("name") as string;
  const image = categoryData.get("image") as string;
  const description = categoryData.get("description") as string;
  if (!name || !name.trim() || !image || !description || !description.trim()) {
    throw new Error("All fields are required");
  }

  await connectDB();
  const slug = slugify(name.toLowerCase(), "-");

  const category = await Category.create({
    name,
    image: JSON.parse(image),
    slug,
    description,
  });

  return JSON.parse(JSON.stringify(category));
}

export async function deleteCategory(categoryId: Types.ObjectId) {
  await connectDB();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const category = await Category.findById(categoryId).session(session);
    if (!category) throw new Error("Category not found");

    if (category.image?.id) {
      await cloudinary.v2.uploader.destroy(category.image.id);
    }

    const products = await Product.find({ categoryId }).session(session);

    for (const product of products) {
      if (Array.isArray(product.images)) {
        for (const img of product.images) {
          if (img.id) {
            await cloudinary.v2.uploader.destroy(img.id);
          }
        }
      }
    }

    await Product.deleteMany({ categoryId }).session(session);
    await Category.findByIdAndDelete(categoryId).session(session);

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Category and its products deleted successfully",
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new Error(`Failed to delete category: ${error}`);
  }
}

export async function updateCategory(
  categoryId: Types.ObjectId,
  updatedData: {
    name: string;
    description: string;
    image?: { id: string; url: string };
  }
) {
  await connectDB();

  const category = await Category.findById(categoryId);
  if (!category) throw new Error("Category not found");

  if (updatedData.image && updatedData.image.id !== category.image?.id) {
    if (category.image?.id) {
      await cloudinary.v2.uploader.destroy(category.image.id);
    }
    category.image = updatedData.image;
  }

  category.name = updatedData.name;
  category.description = updatedData.description;

  await category.save();

  return { success: true, message: "Category updated successfully" };
}

// Variant Actions
export async function fetchVariants(): Promise<VariantType[]> {
  await connectDB();
  const variants = await Variant.find({});
  const variantsData = JSON.parse(JSON.stringify(variants)) as any[];
  return variantsData.map((variant) => mapToVariant(variant));
}

export async function createVariant(
  name: string,
  productId: string,
  colorCode: string,
  colorName: string
): Promise<VariantType> {
  await connectDB();

  const variant = await Variant.create({
    name,
    variants: [
      {
        productId,
        colorCode,
        colorName,
      },
    ],
  });

  return JSON.parse(JSON.stringify(variant));
}

export async function addProductToVariant(
  variantId: string,
  productId: string,
  colorCode: string,
  colorName: string
) {
  await connectDB();

  const variant = await Variant.findById(variantId);
  if (!variant) throw new Error("Variant not found");

  variant.variants.push({
    productId,
    colorCode,
    colorName,
  });

  await variant.save();
  return JSON.parse(JSON.stringify(variant));
}


export async function updateVariantName(variantId: string, newName: string) {
  await connectDB()

  const variant = await Variant.findById(variantId)
  if (!variant) throw new Error("Variant not found")

  variant.name = newName
  await variant.save()

  return JSON.parse(JSON.stringify(variant))
}

export async function removeProductFromVariant(variantId: string, productId: string) {
  await connectDB()

  const variant = await Variant.findById(variantId)
  if (!variant) throw new Error("Variant not found")

  // Remove the product from the variant
  variant.variants = variant.variants.filter((v: any) => v.productId.toString() !== productId)

  // If variant has only one product left, delete the variant
  if (variant.variants.length <= 1) {
    await Variant.findByIdAndDelete(variantId)
    return { deleted: true }
  } else {
    await variant.save()
    return { deleted: false, variant: JSON.parse(JSON.stringify(variant)) }
  }
}

// Products
export async function fetchProducts(
  page?: number | 0
): Promise<{ totalCount: number; products: ProductType[] }> {
  await connectDB();
  const products = await Product.find({})
    .limit(limit)
    .skip(page && page > 1 ? (page - 1) * limit : 0)
    .populate("categoryId", "id name")

  const totalCount = Number(await Product.countDocuments());
  const prods = JSON.parse(JSON.stringify(products)) as any[];

  return {
    totalCount,
    products: prods.map((p) => mapToProduct(p)),
  };
}

export async function fetchProductsCount(): Promise<number> {
  await connectDB();
  const totalCount = Number(await Product.countDocuments());
  return totalCount;
}

export async function fetchByCategory(
  categoryId: Types.ObjectId,
  page?: number | 0
): Promise<{ totalCount: number; products: ProductType[] }> {
  await connectDB();
  const products = await Product.find({ categoryId })
    .limit(limit)
    .skip(page && page > 1 ? (page - 1) * limit : 0)
    .populate("categoryId")
    .populate("variantId");

  const totalCount = Number(
    await Product.findOne({ categoryId }).countDocuments()
  );

  return {
    totalCount,
    products: JSON.parse(JSON.stringify(products)),
  };
}

export async function fetchProduct(
  productId: Types.ObjectId
): Promise<ProductType> {
  await connectDB();
  const product = await Product.findById(productId)
    .populate("categoryId", "id name")
    .populate("variantId", "id name variants");

  return JSON.parse(JSON.stringify(product));
}

export async function addProduct(productData: FormData) {
  const name = productData.get("name") as string;
  const imgs = productData.getAll("images") as string[];
  const description = productData.get("description") as string;
  const categoryId = productData.get("categoryId") as string;
  const isVariant = productData.get("isVariant") as string;
  const variantId = productData.get("variantId") as string;
  const colorCode = productData.get("colorCode") as string;
  const colorName = productData.get("colorName") as string;

  if (
    !name ||
    !name.trim() ||
    !imgs.length ||
    !description ||
    !description.trim()
  ) {
    throw new Error("All fields are required");
  }

  if (!colorCode || !colorName) {
    throw new Error("Color code and color name are required");
  }

  const images: { id: string; url: string }[] = [];
  imgs.forEach((img) => {
    images.push(JSON.parse(img));
  });

  await connectDB();
  const slug = slugify(name.toLowerCase(), "-");

  let finalVariantId = null;

  if (isVariant === "true") {
    // Add to existing variant
    if (!variantId) {
      throw new Error("Variant ID is required when adding to existing variant");
    }
    finalVariantId = new Types.ObjectId(variantId);
  } else {
    // Create new variant

    const newVariant = await createVariant(
      name,
      uuidv4(),
      colorCode,
      colorName
    );
    finalVariantId = new Types.ObjectId(newVariant.id);
  }

  const productPayload: any = {
    name,
    images,
    slug,
    description,
    categoryId,
    variantId: finalVariantId,
    colorCode: colorCode,
    colorName: colorName,
  };

  const product = await Product.create(productPayload);

  // Update the variant with the product ID
  if (isVariant === "true") {
    await addProductToVariant(variantId, product.id, colorCode, colorName);
  } else {
    // Update the newly created variant with the actual product ID
    await Variant.findByIdAndUpdate(finalVariantId, {
      $set: {
        "variants.0.productId": product.id,
      },
    });
  }

  return JSON.parse(JSON.stringify(product));
}

export async function deleteProduct(productId: Types.ObjectId) {
  await connectDB();

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  if (Array.isArray(product.images)) {
    for (const img of product.images) {
      if (img.id) {
        await cloudinary.v2.uploader.destroy(img.id);
      }
    }
  }

  await Product.findByIdAndDelete(productId);

  revalidatePath("/admin/products");

  return { success: true, message: "Product and images deleted successfully." };
}

export async function updateProduct(
  productId: Types.ObjectId,
  updatedData: {
    name?: string;
    description?: string;
    slug?: string;
    categoryId?: Types.ObjectId | string;
    images?: ProductImage[];
    variantId?: Types.ObjectId | string;
    colorCode?: string;
    colorName?: string;
  }
) {
  await connectDB();

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  if (updatedData.name && updatedData.name !== product.name) {
    updatedData.slug = slugify(updatedData.name.toLowerCase(), "-");
  }

  const oldImageIds = new Set(
    product.images.map((img: ProductImage) => img.id)
  );

  const newImageIds = new Set(
    updatedData.images?.map((img: ProductImage) => img.id) || []
  );

  const imagesToDelete = Array.from(oldImageIds).filter(
    (id) => !newImageIds.has(id as string)
  );

  for (const id of imagesToDelete) {
    try {
      await cloudinary.v2.uploader.destroy(id as string);
    } catch (error) {
      console.error(`Failed to delete image ${id} from Cloudinary:`, error);
    }
  }

  await Product.findByIdAndUpdate(productId, updatedData, { new: true });
  revalidatePath("/admin");
  return { success: true, message: "Product updated successfully." };
}

export async function createContact(contactData: FormData) {
  const firstName = contactData.get("firstName");
  const lastName = contactData.get("lastName");
  const email = contactData.get("email");
  const phone = contactData.get("phone");
  const subject = contactData.get("subject");
  const message = contactData.get("message");

  await connectDB();
  await Contact.create({
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
  });
  return {
    message: "Message Sent Successfully",
    success: true,
  };
}

export async function getContacts(
  page?: number | 0
): Promise<{ totalCount: number; contacts: ContactType[] }> {
  await connectDB();
  const contacts = await Contact.find({})
    .skip(page && page > 1 ? (page - 1) * limit : 0)
    .limit(limit);

  const totalCount = Number(await Contact.countDocuments());

  return {
    totalCount: totalCount,
    contacts: JSON.parse(JSON.stringify(contacts)) as ContactType[],
  };
}

export const simulateDelay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
