import React from "react";
import ProductDetails from "@/components/product-details";
import { fetchProduct } from "@/lib/actions";
import mongoose from "mongoose";

const page = async ({
  params,
}: {
  params: Promise<{ id: mongoose.Types.ObjectId }>;
}) => {
  const { id } = await params;

  const product = await fetchProduct(id);

  return <ProductDetails product={product} />;
};

export default page;
