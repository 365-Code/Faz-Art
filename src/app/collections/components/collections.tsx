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
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Our Collections
              </span>
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              Discover our complete range of premium marble products, from
              decorative pieces to architectural elements.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>{categories.length} Categories</span>
              <span>•</span>
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </section>

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

      {/* Bottom CTA Section */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-muted-foreground">
              Our expert team can help you find the perfect marble piece or
              create a custom solution for your project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-foreground text-background rounded-lg font-medium hover:bg-foreground/90 transition-colors">
                Contact Expert
              </button>
              <button className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-muted/50 transition-colors">
                Custom Request
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;
