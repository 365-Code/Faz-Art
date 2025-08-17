import { fetchCategories } from "@/lib/actions";
import Collections from "./components/collections";

export const revalidate = 3600

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: number }>;
}) {
  const { page } = await searchParams;
  const itemLimit = 12;
  let currentPage = Number(page) || 1;
  
  const { categories, totalCount } = await fetchCategories(currentPage);
  const pageCount = Math.floor(
    totalCount / itemLimit + (totalCount % itemLimit > 0 ? 1 : 0)
  );

  currentPage = !Number(page) ? 1 : page > pageCount ? pageCount : page;

  return (
    <Collections
      categories={categories}
      categoryCount={totalCount}
      currentPage={currentPage}
      pageCount={pageCount}
    />
  );
}
