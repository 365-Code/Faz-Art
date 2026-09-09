import React from "react";
import ProductDetails from "@/components/product-details";
import { fetchProduct, fetchProductBySlug } from "@/lib/actions";
import mongoose from "mongoose";

const page = async ({
  params,
}: {
  params: Promise<{
    // id: mongoose.Types.ObjectId
    id: string;
  }>;
}) => {
  const { id } = await params;

  // const product = await fetchProduct(id);
  const product = await fetchProductBySlug(id)

  return <ProductDetails product={product} />;
};

export default page;
