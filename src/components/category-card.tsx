"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryType } from "@/lib/types";

export default function CategoryCard({
  category,
}: {
  category: CategoryType;
}) {
  return (
    <Link href={`/collections/${category.slug}`} className="group block">
      <article
        className="
          relative
          h-[420px]
          overflow-hidden
          bg-muted
          sm:h-[460px]
          lg:h-[500px]
        "
      >
        {/* Image */}
        <Image
          src={
            category.image?.url ||
            "/image-placeholder.svg?height=500&width=400&text=Marble+Category"
          }
          alt={category.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="
            object-cover
            transition-transform
            duration-1000
            ease-out
            group-hover:scale-[1.05]
          "
        />

        {/* Soft editorial gradient */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t
            from-black/80
            via-black/20
            to-transparent
            transition-opacity
            duration-700
            group-hover:from-black/85
          "
        />

        {/* Top metadata */}
        <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
          <span
            className="
              text-[9px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-white/70
            "
          >
            The Artisans Gallery
          </span>

          <span
            className="
              flex
              size-10
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-black/10
              text-white
              backdrop-blur-sm
              transition-all
              duration-500
              group-hover:bg-white
              group-hover:text-black
            "
          >
            <ArrowUpRight
              className="
                size-4
                transition-transform
                duration-500
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <div className="max-w-xl">

            {/* Category */}
            <h3
              className="
                font-serif
                text-3xl
                font-normal
                leading-tight
                tracking-[-0.025em]
                text-white
                sm:text-4xl
              "
            >
              {category.name}
            </h3>

            {/* Description */}
            <p
              className="
                mt-3
                max-w-lg
                text-sm
                leading-6
                text-white/70
                line-clamp-2
                transition-colors
                duration-500
                group-hover:text-white/85
              "
            >
              {category.description}
            </p>

            {/* CTA */}
            <div
              className="
                mt-6
                flex
                items-center
                gap-3
                text-[10px]
                font-medium
                uppercase
                tracking-[0.25em]
                text-white/80
                transition-colors
                duration-300
                group-hover:text-white
              "
            >
              <span>View collection</span>

              <span className="h-px w-8 bg-white/40 transition-all duration-500 group-hover:w-12 group-hover:bg-white/80" />
            </div>

          </div>
        </div>
      </article>
    </Link>
  );
}