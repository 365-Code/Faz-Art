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
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CollectionPageProps {
  categoryCount: number;
  categories: CategoryType[];
  currentPage: number;
  pageCount: number;
}

const Collections = ({
  categories,
  categoryCount,
  pageCount,
  currentPage,
}: CollectionPageProps) => {
  return (
    <main className="min-h-screen bg-background">

      {/* ==================================================
          HERO
      ================================================== */}
      <section className="px-6 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_2fr]">

            {/* Eyebrow */}
            <div className="flex items-start">

              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/40" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                  The Artisans Gallery
                </span>
              </div>

            </div>

            {/* Heading */}
            <div>

              <h1 className="max-w-6xl font-serif text-6xl font-normal leading-[0.92] tracking-[-0.05em] sm:text-7xl lg:text-[8rem]">
                Objects in
                <br />
                <span className="italic font-light text-muted-foreground">
                  natural stone.
                </span>
              </h1>

              <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">

                <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                  Explore our collection of handcrafted marble objects,
                  created to bring natural material, sculptural form and
                  lasting character into contemporary spaces.
                </p>

                <div className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {categoryCount} Collections
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          COLLECTION GRID
      ================================================== */}
      <section className="px-6 pb-28 lg:px-10 lg:pb-40">
        <div className="mx-auto max-w-[1440px]">

          {/* Grid header */}
          <div className="mb-8 flex items-center justify-between border-t border-border/60 pt-5">

            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Explore the collection
            </span>

            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
              {String(categories.length).padStart(2, "0")} shown
            </span>

          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20">

            {categories.map((category, index) => (
              <div
                key={category.id.toString()}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                <div className="group">

                  {/* Number */}
                  <div className="mb-4 flex items-center justify-between">

                    <span className="text-[10px] font-medium tracking-[0.25em] text-muted-foreground/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <ArrowUpRight
                      className="
                        size-4
                        text-muted-foreground/50
                        transition-all
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                        group-hover:text-foreground
                      "
                    />

                  </div>

                  <CategoryCard category={category} />

                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ==================================================
          PAGINATION
      ================================================== */}
      {pageCount > 1 && (
        <section className="border-t border-border/60 px-6 py-8 lg:px-10">

          <div className="mx-auto flex max-w-[1440px] justify-center">

            <Pagination>
              <PaginationContent className="gap-1">

                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/collections?page=${currentPage - 1}`}
                      className="mr-2"
                    />
                  </PaginationItem>
                )}

                {/* First page */}
                {currentPage > 2 && (
                  <PaginationItem>
                    <PaginationLink
                      href="/collections?page=1"
                      className="rounded-full"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Ellipsis before current */}
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Previous page */}
                {currentPage > 1 && currentPage < pageCount && (
                  <PaginationItem>
                    <PaginationLink
                      href={`/collections?page=${currentPage - 1}`}
                      className="rounded-full"
                    >
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Current */}
                <PaginationItem>
                  <PaginationLink
                    href={`/collections?page=${currentPage}`}
                    isActive
                    className="rounded-full"
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>

                {/* Next page */}
                {currentPage < pageCount && (
                  <PaginationItem>
                    <PaginationLink
                      href={`/collections?page=${currentPage + 1}`}
                      className="rounded-full"
                    >
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {/* Ellipsis after current */}
                {currentPage < pageCount - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {/* Last page */}
                {currentPage < pageCount - 1 && (
                  <PaginationItem>
                    <PaginationLink
                      href={`/collections?page=${pageCount}`}
                      className="rounded-full"
                    >
                      {pageCount}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {currentPage < pageCount && (
                  <PaginationItem>
                    <PaginationNext
                      href={`/collections?page=${currentPage + 1}`}
                      className="ml-2"
                    />
                  </PaginationItem>
                )}

              </PaginationContent>
            </Pagination>

          </div>

        </section>
      )}

      {/* ==================================================
          ENQUIRY
      ================================================== */}
      <section className="bg-foreground px-6 py-28 text-background lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[1440px]">

          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">

            <div>

              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-background/40" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-background/50">
                  Have something specific in mind?
                </span>
              </div>

              <h2 className="mt-7 max-w-4xl font-serif text-5xl leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Let&apos;s find the piece
                <br />
                <span className="italic font-light text-background/60">
                  that belongs in your space.
                </span>
              </h2>

            </div>

            <div>

              <p className="max-w-md text-sm leading-7 text-background/60 sm:text-base sm:leading-8">
                Tell us what you&apos;re looking for and our team can help
                you explore available pieces, finishes and possibilities.
              </p>

              <Link
                href="/contact"
                className="
                  group mt-8 inline-flex items-center
                  border-b border-background/30
                  pb-2
                  text-xs font-medium uppercase
                  tracking-[0.22em]
                  transition-colors duration-300
                  hover:border-background
                "
              >
                Make an enquiry

                <ArrowUpRight
                  className="
                    ml-2 size-4
                    transition-transform duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
};

export default Collections;