import ProductManagement from "@/components/admin/ProductManagement";
import { fetchCategories, fetchProducts } from "@/lib/actions";
import { limit as productsLimit } from "@/lib/constant";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) => {
  const currentPage = (await searchParams).page || 1;

  const { products, totalCount } = await fetchProducts(currentPage);
  const pageCount = Math.floor(
    totalCount / productsLimit + (totalCount % productsLimit > 0 ? 1 : 0)
  );
  const { categories } = await fetchCategories();

  return (
    <ProductManagement
      products={products}
      currentPage={currentPage}
      pageCount={pageCount}
      categories={categories}
    />
  );
};

export default Page;
