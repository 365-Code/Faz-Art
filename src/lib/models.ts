import mongoose, { Schema, Document } from "mongoose";
import { Model } from "mongoose";

// Interface for Category
export interface ICategory extends Document {
  name: string;
  image: {
    id: string;
    url: string;
  };
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Product
export interface IProduct extends Document {
  name: string;
  slug: string;
  images: Array<{
    id: string;
    url: string;
  }>;
  categoryId: mongoose.Types.ObjectId;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// Category Schema
const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: {
      id: { type: String, required: true },
      url: { type: String, required: true },
    },
    description: { type: String, required: false },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id; // Replace _id with id
        delete ret._id;
        // delete ret.__v; // Remove Mongoose version key
      },
    },
  }
);

// Product Schema
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    images: [
      {
        id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
        // delete ret.__v;
      },
    },
  }
);

// Export models
export const Category: Model<ICategory> =
  mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export interface IVisitor extends Document {
  visitorId: string;
  firstVisit: Date;
  lastSeen: Date;
}

const VisitorSchema = new Schema<IVisitor>({
  visitorId: { type: String, required: true, unique: true },
  firstVisit: { type: Date, required: true },
  lastSeen: { type: Date, required: true },
});

export const Visitor: Model<IVisitor> =
  mongoose.models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactSchema = new Schema<IContact>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
    toJSON: {
      virtuals: true,
      transform: (_, ret) => {
        ret.id = ret._id; // Replace _id with id
        delete ret._id;
        // delete ret.__v; // Remove Mongoose version key
      },
    },
  }
);

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);
