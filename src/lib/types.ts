import mongoose from "mongoose";
import { z } from "zod";

export type CategoryType = {
  id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  image: {
    id: string;
    url: string;
  };
  description: string;
};

export type ProductType = {
  id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  images: Array<ProductImage>;
  description: string;
  categoryId: {
    name: string;
    id: mongoose.Types.ObjectId;
  };
  variantId: {
    id: string;
    name: string;
    variants: ProductVariantType[]
  };
  colorCode: string;
  colorName: string;
};

export type ProductImage = {
  id: string;
  url: string;
};

export const ContactZodSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email format"),
  phone: z
    .string()
    .min(10, "Phone number should be at least 10 characters")
    .max(15, "Phone number is too long"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export type ContactType = {
  id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ProductVariantType = {
  productId: string;
  colorCode: string;
  colorName: string;
};

export type VariantType = {
  id: string;
  name: string;
  variants: Array<ProductVariantType>;
};
