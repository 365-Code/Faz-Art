import CategoryCard from "@/components/category-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";
import { CategoryType } from "@/lib/types";

interface CollectionPageProps {
  categoryCount: number;
  categories: CategoryType[];
  currentPage: number;
  pageCount: number;
}

const Collections = ({
  categories,
  pageCount,
  currentPage,
}: CollectionPageProps) => {
  if (!categories) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Categories Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <div
                key={category.id.toString()}
                className="animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CategoryCard category={category} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      {pageCount > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <>
                <PaginationItem>
                  <PaginationPrevious
                    href={`/collections?page=${
                      currentPage - 1 <= 0 ? 1 : currentPage - 1
                    }`}
                  />
                </PaginationItem>
              </>
            )}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink href="/collections?page=1" isActive={false}>
                  {1}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationLink href="" isActive={true}>
                {currentPage}
              </PaginationLink>
            </PaginationItem>

            {currentPage < pageCount - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {currentPage != pageCount && pageCount > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink
                    isActive={currentPage == pageCount}
                    href={"/collections?page=" + pageCount}
                  >
                    {pageCount}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href={`/collections?page=${
                      currentPage + 1 > pageCount ? pageCount : currentPage + 1
                    }`}
                  />
                </PaginationItem>
              </>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default Collections;
