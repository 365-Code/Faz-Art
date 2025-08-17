"use server";
import slugify from "slugify";
import { connectDB } from "./db";
import { Category, Contact, Product } from "./models";
import { CategoryType, ContactType, ProductImage, ProductType } from "./types";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
import { limit } from "./constant";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// let cachedCategories: {
//   categories: CategoryType[];
//   totalCount: number;
//   page: number;
// } = {
//   categories: [],
//   totalCount: 0,
//   page: 0,
// };

const mapToProduct = (product: ProductType): ProductType => {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    categoryId: {
      id: product.categoryId.id,
      name: product.categoryId.name,
    },
    images: product.images,
    description: product.description,
  };
};

const mapToCategory = (category: CategoryType): CategoryType => {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    image: category.image,
    description: category.description,
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
  // if (cachedCategories.totalCount && page && cachedCategories.page >= page) {
  //   return {
  //     categories: cachedCategories.categories.slice(
  //       (page - 1) * limit,
  //       page * limit
  //     ),
  //     totalCount: cachedCategories.totalCount,
  //   };
  // }

  await connectDB();
  const categories = await Category.find({})
    .limit(limit)
    .skip(page && page > 1 ? (page - 1) * limit : 0);

  const totalCount = Number(await Category.countDocuments());

  const ctgs = JSON.parse(JSON.stringify(categories)) as CategoryType[];

  // cachedCategories = {
  //   categories: [
  //     ...cachedCategories.categories,
  //     ...ctgs.map((ctg) => mapToCategory(ctg)),
  //   ],
  //   totalCount,
  //   page: Number(page),
  // };

  return {
    totalCount,
    categories: ctgs.map((ctg) => mapToCategory(ctg)),
  };
}

export async function fetchCategory(
  categoryId: mongoose.Types.ObjectId
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

  // cachedCategories.categories.push({
  //   id: category.id,
  //   name,
  //   image: JSON.parse(image),
  //   slug,
  //   description,
  // });

  return JSON.parse(JSON.stringify(category)); // serialize
}

export async function deleteCategory(categoryId: mongoose.Types.ObjectId) {
  await connectDB();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const category = await Category.findById(categoryId).session(session);
    if (!category) throw new Error("Category not found");

    // 1️⃣ Delete category image from Cloudinary
    if (category.image?.id) {
      await cloudinary.v2.uploader.destroy(category.image.id);
    }

    // 2️⃣ Find all products in this category
    const products = await Product.find({ categoryId }).session(session);

    // 3️⃣ Delete each product’s images from Cloudinary
    for (const product of products) {
      if (Array.isArray(product.images)) {
        for (const img of product.images) {
          if (img.id) {
            await cloudinary.v2.uploader.destroy(img.id);
          }
        }
      }
    }

    // 4️⃣ Delete all products for this category
    await Product.deleteMany({ categoryId }).session(session);

    // 5️⃣ Delete category
    await Category.findByIdAndDelete(categoryId).session(session);

    // ✅ Commit transaction
    await session.commitTransaction();
    session.endSession();

    // const newCategories = cachedCategories.categories.filter(
    //   (f) => f.id == categoryId
    // );

    // cachedCategories = {
    //   categories: newCategories,
    //   totalCount: newCategories.length,
    //   page: cachedCategories.page,
    // };

    return {
      success: true,
      message: "Category and its products deleted successfully",
    };
  } catch (error) {
    // ❌ Rollback transaction if anything fails
    await session.abortTransaction();
    session.endSession();
    throw new Error(`Failed to delete category: ${error}`);
  }
}

export async function updateCategory(
  categoryId: mongoose.Types.ObjectId,
  updatedData: {
    name: string;
    description: string;
    image?: { id: string; url: string };
  }
) {
  await connectDB();

  const category = await Category.findById(categoryId);
  if (!category) throw new Error("Category not found");

  // If there’s a new image and it’s different from the existing one
  if (updatedData.image && updatedData.image.id !== category.image?.id) {
    // Delete old image from Cloudinary
    if (category.image?.id) {
      await cloudinary.v2.uploader.destroy(category.image.id);
    }
    // Save the new image object
    category.image = updatedData.image;
  }

  category.name = updatedData.name;
  category.description = updatedData.description;

  await category.save();

  return { success: true, message: "Category updated successfully" };
}

// Products
export async function fetchProducts(
  page?: number | 0
): Promise<{ totalCount: number; products: ProductType[] }> {
  await connectDB();
  const products = await Product.find({})
    .limit(limit)
    .skip(page && page > 1 ? (page - 1) * limit : 0)
    .populate("categoryId", "id name");

  const totalCount = Number(await Product.countDocuments());

  const prods = JSON.parse(JSON.stringify(products)) as ProductType[];

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
  categoryId: mongoose.Types.ObjectId,
  page?: number | 0
): Promise<{ totalCount: number; products: ProductType[] }> {
  await connectDB();
  const products = await Product.find({ categoryId })
    .limit(limit)
    .skip(page && page > 1 ? (page - 1) * limit : 0)
    .populate("categoryId");

  const totalCount = Number(
    await Product.findOne({ categoryId }).countDocuments()
  );

  return {
    totalCount,
    products: JSON.parse(JSON.stringify(products)), // serialize
  };
}

export async function fetchProduct(
  productId: mongoose.Types.ObjectId
): Promise<ProductType> {
  await connectDB();
  const product = await Product.findById(productId).populate(
    "categoryId",
    "id name"
  );

  return JSON.parse(JSON.stringify(product));
}

export async function addProduct(productData: FormData) {
  const name = productData.get("name") as string;
  const imgs = productData.getAll("images") as string[];
  const description = productData.get("description") as string;
  const categoryId = productData.get("categoryId") as string;

  if (
    !name ||
    !name.trim() ||
    !imgs.length ||
    !description ||
    !description.trim()
  ) {
    throw new Error("All fields are required");
  }

  const images: { id: string; url: string }[] = [];
  imgs.forEach((img) => {
    images.push(JSON.parse(img));
  });

  await connectDB();
  const slug = slugify(name.toLowerCase(), "-");
  const product = await Product.create({
    name,
    images,
    slug,
    description,
    categoryId,
  });
  return JSON.parse(JSON.stringify(product)); // serialize
}

export async function deleteProduct(productId: mongoose.Types.ObjectId) {
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
  productId: mongoose.Types.ObjectId,
  updatedData: {
    name?: string;
    description?: string;
    slug?: string;
    categoryId?: mongoose.Types.ObjectId | string;
    images?: ProductImage[]; // Array of image objects
  }
) {
  await connectDB();

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  // If name is updated, update slug
  if (updatedData.name && updatedData.name !== product.name) {
    // Only update slug if name actually changed
    updatedData.slug = slugify(updatedData.name.toLowerCase(), "-");
  }

  // Handle image deletions from Cloudinary if images are removed from the list
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
  revalidatePath("/admin"); // Revalidate admin page
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
