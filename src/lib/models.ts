import { Schema, Document, Types, Model, models, model } from "mongoose";

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
  categoryId: Types.ObjectId;
  variantId: Types.ObjectId;
  colorCode: string;
  colorName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface IVisitor extends Document {
  visitorId: string;
  firstVisit: Date;
  lastSeen: Date;
}

export interface IVariant extends Document {
  name: string;
  variants: {
    productId: string;
    colorName: string;
    colorCode: string;
  }[];
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
    variantId: {
      type: Schema.Types.ObjectId,
      ref: "Variant",
      required: false,
    },
    colorCode: {
      type: String,
      required: false,
    },
    colorName: {
      type: String,
      required: false,
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

const VisitorSchema = new Schema<IVisitor>({
  visitorId: { type: String, required: true, unique: true },
  firstVisit: { type: Date, required: true },
  lastSeen: { type: Date, required: true },
});

const VariantSchema = new Schema<IVariant>(
  {
    name: {
      type: String,
      required: true,
    },
    variants: [
      {
        productId: {
          type: String,
          required: true,
        },
        colorCode: {
          type: String,
          required: true,
        },
        colorName: {
          type: String,
          required: true,
        },
      },
    ],
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

// Export models
export const Category: Model<ICategory> =
  models.Category || model<ICategory>("Category", CategorySchema);

export const Product: Model<IProduct> =
  models.Product || model<IProduct>("Product", ProductSchema);

export const Visitor: Model<IVisitor> =
  models.Visitor || model<IVisitor>("Visitor", VisitorSchema);

export const Contact: Model<IContact> =
  models.Contact || model<IContact>("Contact", ContactSchema);

export const Variant: Model<IVariant> =
  models.Variant || model<IVariant>("Variant", VariantSchema);
