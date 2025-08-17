import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
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
import { ArrowLeft, Grid3X3, List, SlidersHorizontal } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <section className="py-6 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/collections"
              className="hover:text-foreground transition-colors"
            >
              Collections
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{category.name}</span>
          </div>
        </div>
      </section>

      {/* Category Header */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-8">
            <Link href="/collections">
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  {category.name}
                </span>
              </h1>
              <p className="text-xl text-muted-foreground font-light max-w-3xl">
                {category.description}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{productCount} Products</span>
              <span>•</span>
              <span>Premium Quality</span>
            </div>

            {/* View Options */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {productCount > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product, index) => (
                  <div
                    key={product.id.toString()}
                    className="animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto space-y-4">
                <h3 className="font-heading text-2xl font-semibold">
                  No Products Found
                </h3>
                <p className="text-muted-foreground">
                  We&apos;re currently updating our{" "}
                  {category.name.toLowerCase()} collection. Please check back
                  soon or contact us for custom requests.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/collections">
                    <Button variant="outline">Browse Other Collections</Button>
                  </Link>
                  <Link href={"/contact"}>
                  <Button>Contact Us</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Load More */}
      {pageCount > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <>
                <PaginationItem>
                  <PaginationPrevious
                    href={`/collections/${category.id}?page=${
                      currentPage - 1 <= 0 ? 1 : currentPage - 1
                    }`}
                  />
                </PaginationItem>
              </>
            )}
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  href={`/collections/${category.id}?page=1`}
                  isActive={false}
                >
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
                    href={`/collections/${category.id}?page=` + pageCount}
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

      {/* Related Categories */}
      {productCount > 0 && (
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Explore Other Collections
              </h2>
              <p className="text-muted-foreground">
                Discover more premium marble products in our other categories
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {categories
                .filter((cat) => cat.id !== category.id)
                .slice(0, 4)
                .map((cat) => (
                  <Link key={cat.id.toString()} href={`/collections/${cat.id}`}>
                    <Button variant="outline" className="bg-transparent">
                      {cat.name}
                    </Button>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Products;
