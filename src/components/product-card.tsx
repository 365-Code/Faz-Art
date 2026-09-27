import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProductType } from "@/lib/types";

export default function ProductCard({
  product,
}: {
  product: ProductType;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
    >
      <article>

        {/* Product Image */}
        <div
          className="
            relative
            aspect-[4/5]
            overflow-hidden
            bg-muted
          "
        >
          <Image
            src={product.images?.[0]?.url || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              (max-width: 1280px) 33vw,
              25vw
            "
            className="
              object-cover
              transition-transform
              duration-1000
              ease-out
              group-hover:scale-[1.04]
            "
          />

          {/* Subtle hover wash */}
          <div
            className="
              absolute
              inset-0
              bg-black/0
              transition-colors
              duration-500
              group-hover:bg-black/[0.04]
            "
          />

          {/* View button */}
          <div
            className="
              absolute
              bottom-5
              right-5
              flex
              size-10
              items-center
              justify-center
              rounded-full
              bg-background/90
              text-foreground
              opacity-0
              shadow-sm
              backdrop-blur-sm
              transition-all
              duration-500
              translate-y-2
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            <ArrowUpRight
              className="
                size-4
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="pt-5">

          {/* Category */}
          <p
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.25em]
              text-muted-foreground
            "
          >
            {product.categoryId.name}
          </p>

          {/* Product Name */}
          <div className="mt-2 flex items-start justify-between gap-4">

            <h3
              className="
                max-w-[85%]
                font-serif
                text-xl
                font-normal
                leading-tight
                tracking-[-0.02em]
                text-foreground
                transition-colors
                duration-300
                group-hover:text-muted-foreground
              "
            >
              {product.name}
            </h3>

            <ArrowUpRight
              className="
                mt-1
                size-4
                shrink-0
                text-muted-foreground/50
                transition-all
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
                group-hover:text-foreground
              "
            />

          </div>

        </div>

      </article>
    </Link>
  );
}