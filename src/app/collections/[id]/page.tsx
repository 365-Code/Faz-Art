import { notFound } from "next/navigation";
import { fetchByCategory, fetchCategories, fetchCategory } from "@/lib/actions";
import mongoose from "mongoose";
import Products from "../components/products";
import { limit } from "@/lib/constant";

interface CollectionPageProps {
  id: mongoose.Types.ObjectId;
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<CollectionPageProps>;
  searchParams: Promise<{ page: number }>;
}) {
  const { id } = await params;
  const { page } = await searchParams;
  let currentPage = Number(page) || 1;

  const category = await fetchCategory(id);
  const { products, totalCount } = await fetchByCategory(id, currentPage);
  const { categories } = await fetchCategories();

  const pageCount = Math.floor(
    totalCount / limit + (totalCount % limit > 0 ? 1 : 0)
  );
  currentPage = !Number(page) ? 1 : page > pageCount ? pageCount : page;

  if (!category) {
    notFound();
  }

  return (
    <Products
      category={category}
      products={products}
      productCount={totalCount}
      categories={categories}
      currentPage={currentPage}
      pageCount={pageCount}
    />
  );
}
