"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ProductType } from "@/lib/types";

export default function ProductDetailsClient({
  product,
}: {
  product: ProductType;
}) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const selectedIndex = product.images.findIndex(
    (image) => image.id === selectedImage.id
  );

  const showPreviousImage = () => {
    if (product.images.length <= 1) return;

    const previousIndex =
      selectedIndex <= 0
        ? product.images.length - 1
        : selectedIndex - 1;

    setSelectedImage(product.images[previousIndex]);
  };

  const showNextImage = () => {
    if (product.images.length <= 1) return;

    const nextIndex =
      selectedIndex >= product.images.length - 1
        ? 0
        : selectedIndex + 1;

    setSelectedImage(product.images[nextIndex]);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* ==================================================
          BREADCRUMB
      ================================================== */}
      <section className="px-6 pt-8 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <nav className="flex items-center gap-2 overflow-hidden text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            <Link
              href="/collections"
              className="shrink-0 transition-colors hover:text-foreground"
            >
              Collections
            </Link>

            <span className="shrink-0 text-muted-foreground/40">
              /
            </span>

            <Link
              href={`/collections/${product.categoryId.slug}`}
              className="max-w-[140px] shrink-0 truncate transition-colors hover:text-foreground sm:max-w-none"
            >
              {product.categoryId.name}
            </Link>

            <span className="shrink-0 text-muted-foreground/40">
              /
            </span>

            <span className="truncate text-foreground/70">
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      {/* ==================================================
          PRODUCT
      ================================================== */}
      <section className="px-6 pb-24 pt-10 sm:pt-12 lg:px-10 lg:pb-36 lg:pt-16">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16 xl:grid-cols-[1.4fr_0.6fr] xl:gap-20">
          {/* ==================================================
              GALLERY
          ================================================== */}
          <div className="min-w-0">
            {/* Main image */}
            <div className="group relative aspect-[4/5] overflow-hidden bg-muted sm:aspect-[5/4] lg:aspect-[4/3]">
              <Image
                src={selectedImage.url || "/image-placeholder.svg"}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="
                  object-contain
                  p-4
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-[1.015]
                  sm:p-8
                  lg:p-12
                "
              />

              {/* Desktop image navigation */}
              {product.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousImage}
                    aria-label="Previous image"
                    className="
                      absolute
                      left-4
                      top-1/2
                      flex
                      size-10
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-border/50
                      bg-background/80
                      text-foreground
                      opacity-0
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:bg-background
                      focus-visible:opacity-100
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-ring
                      group-hover:opacity-100
                    "
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={showNextImage}
                    aria-label="Next image"
                    className="
                      absolute
                      right-4
                      top-1/2
                      flex
                      size-10
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-border/50
                      bg-background/80
                      text-foreground
                      opacity-0
                      backdrop-blur-sm
                      transition-all
                      duration-300
                      hover:bg-background
                      focus-visible:opacity-100
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-ring
                      group-hover:opacity-100
                    "
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </>
              )}

              {/* Image counter */}
              {product.images.length > 1 && (
                <div
                  className="
                    absolute
                    bottom-4
                    right-4
                    bg-background/80
                    px-3
                    py-2
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-foreground
                    backdrop-blur-sm
                    sm:bottom-5
                    sm:right-5
                  "
                >
                  {String(selectedIndex + 1).padStart(2, "0")}
                  {" / "}
                  {String(product.images.length).padStart(2, "0")}
                </div>
              )}
            </div>

            {/* ==================================================
                THUMBNAILS
            ================================================== */}
            {product.images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    aria-label={`View image ${index + 1}`}
                    aria-current={
                      selectedImage.id === image.id
                    }
                    className={`
                      relative
                      size-16
                      shrink-0
                      overflow-hidden
                      bg-muted
                      transition-all
                      duration-300
                      sm:size-20
                      lg:size-24
                      ${
                        selectedImage.id === image.id
                          ? "ring-1 ring-foreground ring-offset-2 ring-offset-background"
                          : "opacity-60 hover:opacity-100"
                      }
                    `}
                  >
                    <Image
                      src={image.url || "/image-placeholder.svg"}
                      alt={`${product.name} image ${index + 1}`}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ==================================================
              PRODUCT INFORMATION
          ================================================== */}
          <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="max-w-xl">
              {/* Category */}
              <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                {product.categoryId.name}
              </p>

              {/* Product name */}
              <h1
                className="
                  mt-5
                  font-serif
                  text-4xl
                  font-normal
                  leading-[0.95]
                  tracking-[-0.045em]
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {product.name}
              </h1>

              {/* Description */}
              <p className="mt-7 text-base leading-8 text-muted-foreground sm:mt-8">
                {product.description}
              </p>

              {/* ==================================================
                  PRODUCT DETAILS
              ================================================== */}
              <div className="mt-8 border-y border-border/60 sm:mt-10">
                <div className="grid grid-cols-2 border-b border-border/60 py-5">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                      Material
                    </p>

                    <p className="mt-2 text-sm">
                      Marble
                    </p>
                  </div>

                  <div>
                    <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                      Colour
                    </p>

                    <p className="mt-2 text-sm">
                      {product.colorName}
                    </p>
                  </div>
                </div>

                <ProductVariants product={product} />
              </div>

              {/* ==================================================
                  ENQUIRY
              ================================================== */}
              <div className="mt-9 sm:mt-10">
                <div className="mb-5">
                  <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                    Enquiries
                  </p>

                  <h2 className="mt-3 font-serif text-2xl sm:text-3xl">
                    Interested in this piece?
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                    Speak with our team about availability,
                    dimensions, customization and delivery.
                  </p>
                </div>

                <Link
                  href={`https://wa.me/+917852057102?text=I%20am%20interested%20in%20the%20${encodeURIComponent(
                    product.name
                  )}%20product.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    size="lg"
                    className="
                      group
                      h-14
                      w-full
                      rounded-none
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.2em]
                    "
                  >
                    Make an enquiry

                    <ArrowUpRight
                      className="
                        ml-3
                        size-4
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ======================================================
   PRODUCT VARIANTS
====================================================== */

function ProductVariants({
  product,
}: {
  product: ProductType;
}) {
  const variants = product.variantId?.variants ?? [];

  if (!variants.length) {
    return null;
  }

  return (
    <div className="py-5">
      <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
        Available colours
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {variants.map((variant) => {
          const isActive =
            product.slug === variant.productSlug;

          return (
            <Link
              key={variant.productSlug}
              href={`/products/${variant.productSlug}`}
              aria-label={`View ${variant.colorName} variant`}
              title={variant.colorName}
            >
              <span
                className={`
                  relative
                  flex
                  size-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  transition-all
                  duration-300
                  hover:scale-105
                  ${
                    isActive
                      ? "border-foreground"
                      : "border-border hover:border-foreground/50"
                  }
                `}
              >
                <span
                  className="size-6 rounded-full"
                  style={{
                    backgroundColor: variant.colorCode,
                  }}
                />

                {isActive && (
                  <span className="absolute inset-[-4px] rounded-full border border-foreground/20" />
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}