import CategoryManagement from "@/components/admin/CategoryManagement";
import { fetchCategories } from "@/lib/actions";
import { limit as categoryLimit } from "@/lib/constant";
import React from "react";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) => {
  const currentPage = (await searchParams).page || 1;

  const { categories, totalCount } = await fetchCategories(currentPage);
  const pageCount = Math.floor(
    totalCount / categoryLimit + (totalCount % categoryLimit > 0 ? 1 : 0)
  );

  return (
    <CategoryManagement
      categories={categories}
      currentPage={currentPage > pageCount ? pageCount : currentPage}
      pageCount={pageCount}
    />
  );
};

export default Page;
