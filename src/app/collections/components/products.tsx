import ProductCard from "@/components/product-card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CategoryType, ProductType } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ProductsPageProps {
  category: CategoryType;
  products: ProductType[];
  productCount: number;
  categories: CategoryType[];
  currentPage: number;
  pageCount: number;
}

const Products = ({
  categories,
  category,
  productCount,
  products,
  currentPage,
  pageCount,
}: ProductsPageProps) => {
  return (
    <main className="min-h-screen bg-background">
      {/* ==================================================
    CATEGORY INTRO
================================================== */}
      <section className="px-6 pb-16 pt-8 lg:px-10 lg:pb-20 lg:pt-10">
        <div className="mx-auto max-w-[1440px]">
          {/* Breadcrumb */}
          <div className="mb-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <Link
              href="/collections"
              className="transition-colors hover:text-foreground"
            >
              Collections
            </Link>

            <span className="text-muted-foreground/40">/</span>

            <span className="text-foreground/70">{category.name}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.7fr_2fr] lg:gap-12">
            {/* Eyebrow */}
            <div className="flex items-start">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/40" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                  Collection
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h1 className="max-w-5xl font-serif text-5xl font-normal leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-[7rem]">
                {category.name}
              </h1>

              <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {category.description}
                </p>

                <div className="shrink-0 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {productCount} {productCount === 1 ? "Piece" : "Pieces"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
    PRODUCTS
================================================== */}
      <section className="px-6 pb-20 pt-4 lg:px-10 lg:pb-28 lg:pt-8">
        <div className="mx-auto max-w-[1440px]">
          {/* Section header */}
          <div className="mb-10 flex items-end justify-between border-t border-border/60 pt-5">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                The collection
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                Handcrafted marble pieces
              </p>
            </div>

            <Link
              href="/collections"
              className="
          group hidden items-center
          text-[10px] font-medium uppercase
          tracking-[0.2em]
          text-muted-foreground
          transition-colors
          hover:text-foreground
          sm:flex
        "
            >
              All collections
              <ArrowUpRight
                className="
            ml-2 size-3.5
            transition-transform duration-300
            group-hover:-translate-y-0.5
            group-hover:translate-x-0.5
          "
              />
            </Link>
          </div>

          {/* Product grid */}
          {productCount > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-20 xl:grid-cols-4">
              {products.map((product, index) => (
                <div
                  key={product.id.toString()}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                  style={{
                    animationDelay: `${index * 80}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <EmptyCollection category={category} />
          )}
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
                      href={`/collections/${category.slug}?page=${
                        currentPage - 1
                      }`}
                      className="mr-2"
                    />
                  </PaginationItem>
                )}

                {currentPage > 2 && (
                  <PaginationItem>
                    <PaginationLink
                      href={`/collections/${category.slug}?page=1`}
                      className="rounded-full"
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                )}

                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationLink
                      href={`/collections/${category.slug}?page=${
                        currentPage - 1
                      }`}
                      className="rounded-full"
                    >
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink
                    href={`/collections/${category.slug}?page=${currentPage}`}
                    isActive
                    className="rounded-full"
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>

                {currentPage < pageCount && (
                  <PaginationItem>
                    <PaginationLink
                      href={`/collections/${category.slug}?page=${
                        currentPage + 1
                      }`}
                      className="rounded-full"
                    >
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {currentPage < pageCount - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {currentPage < pageCount - 1 && (
                  <PaginationItem>
                    <PaginationLink
                      href={`/collections/${category.slug}?page=${pageCount}`}
                      className="rounded-full"
                    >
                      {pageCount}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {currentPage < pageCount && (
                  <PaginationItem>
                    <PaginationNext
                      href={`/collections/${category.slug}?page=${
                        currentPage + 1
                      }`}
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
          OTHER COLLECTIONS
      ================================================== */}
      <section className="border-t border-border bg-muted/30 px-6 py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.8fr]">
            <div className="flex items-start">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/40" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                  Continue exploring
                </span>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-4xl tracking-[-0.035em] sm:text-5xl">
                Discover more
                <span className="italic font-light text-muted-foreground">
                  {" "}
                  from the gallery.
                </span>
              </h2>

              <div className="mt-10 grid border-t border-border sm:grid-cols-2">
                {categories
                  .filter((cat) => cat.id !== category.id)
                  .slice(0, 4)
                  .map((cat, index) => (
                    <Link
                      key={cat.id.toString()}
                      href={`/collections/${cat.slug}`}
                      className="
                        group flex items-center
                        justify-between
                        border-b border-border
                        py-6 pr-4
                        transition-colors
                        hover:text-muted-foreground
                        sm:nth-[odd]:mr-6
                      "
                    >
                      <div className="flex items-center gap-5">
                        <span className="text-[9px] tracking-[0.2em] text-muted-foreground/50">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="font-serif text-xl">{cat.name}</span>
                      </div>

                      <ArrowUpRight
                        className="
                          size-4
                          text-muted-foreground
                          transition-transform duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                        "
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

/* ======================================================
   EMPTY COLLECTION
====================================================== */

function EmptyCollection({ category }: { category: CategoryType }) {
  return (
    <div className="border-t border-border py-24">
      <div className="max-w-xl">
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Collection update
        </span>

        <h2 className="mt-5 font-serif text-4xl tracking-[-0.03em]">
          Something is being prepared.
        </h2>

        <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
          We&apos;re currently adding pieces to our {category.name.toLowerCase()}{" "}
          collection. If you&apos;re looking for something specific, we&apos;d be happy to
          help you find or create it.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/collections"
            className="
              inline-flex items-center
              bg-foreground px-6 py-3
              text-xs font-medium uppercase
              tracking-[0.18em]
              text-background
              transition-opacity
              hover:opacity-90
            "
          >
            Browse collections
          </Link>

          <Link
            href="/contact"
            className="
              inline-flex items-center
              border border-border px-6 py-3
              text-xs font-medium uppercase
              tracking-[0.18em]
              transition-colors
              hover:bg-muted
            "
          >
            Make an enquiry
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Products;
