import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type FeaturedPiece = {
  id: string;
  name: string;
  category: string;
  slug: string;
  image: string;
  description: string;
};

const featuredPieces: FeaturedPiece[] = [
  {
    id: "01",
    name: "AURELIA — Sculpted Marble Pedestal Basin",
    category: "Elegant Wash Basins",
    slug: "aurelia-sculpted-marble-pedestal-basin",
    image:
      "https://res.cloudinary.com/dlqyylssk/image/upload/v1755428314/prcefslnetiqjllyw7ct.jpg",
    description:
      "Carved from pristine white marble with delicate gray veining, its fluted form and scalloped rim evoke classical architecture, while the golden brass band adds a modern touch of warmth and luxury.",
  },
  {
    id: "02",
    name: "Lavanto Consol table",
    category: "Stone Consol Tables",
    slug: "lavanto-consol-table",
    image:
      "https://res.cloudinary.com/dlqyylssk/image/upload/v1788931880/jyjorrrm90n3rc6kpd3n.jpg",
    description:
      "The Lavanto Console Table brings timeless elegance with its premium marble construction. Natural veining gives every piece a unique and luxurious character. A refined statement piece, perfect for modern, classic, and sophisticated interiors.",
  },
  {
    id: "03",
    name: "Stone Bathtub",
    category: "Stone Bathtub",
    slug: "stone-bathtub",
    image:
      "https://res.cloudinary.com/dlqyylssk/image/upload/v1755277885/vnsynhe1t2wz3e384uvy.jpg",
    description:
      "A monolithic bathing form shaped to reveal the natural character of the stone.",
  },
  {
    id: "04",
    name: "Modern Stone Fireplace ",
    category: "Modern Stone Fireplace ",
    slug: "modern-stone-fireplace",
    image:
      "https://res.cloudinary.com/dlqyylssk/image/upload/v1790508461/gghqjrnfzxpbsx0tdisd.png",
    description:
      "The modern stone fire palace is a perfect blend of contemporary design and rustic charm, ideal for those who want to create a cozy and stylish outdoor or indoor gathering space.",
  },
];

export function FeaturedPieces() {
  return (
    <section className="bg-background px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        {/* ------------------------------------------------
            HEADER
        ------------------------------------------------ */}
        <div className="flex flex-col gap-8 border-b border-border/60 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/40" />

              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                Selected Pieces
              </span>
            </div>

            <h2 className="font-serif text-5xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Objects worth
              <br />
              <span className="italic font-light text-muted-foreground">
                living with.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-muted-foreground">
            A considered selection of handcrafted marble objects, each chosen
            for its form, materiality and ability to become part of a space.
          </p>
        </div>

        {/* ------------------------------------------------
            FEATURED GRID
        ------------------------------------------------ */}
        <div className="mt-12 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featuredPieces.map((piece) => (
            <Link
              key={piece.id}
              href={`/products/${piece.slug}`}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={piece.image}
                  alt={piece.name}
                  fill
                  sizes="
                    (max-width: 640px) 100vw,
                    (max-width: 1024px) 50vw,
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

                {/* Number */}
                <span
                  className="
                    absolute left-5 top-5
                    text-[10px] font-medium
                    tracking-[0.25em]
                    text-white/70
                  "
                >
                  {piece.id}
                </span>

                {/* Hover button */}
                <div
                  className="
                    absolute bottom-5 right-5
                    flex size-10 items-center justify-center
                    rounded-full
                    bg-background/90
                    text-foreground
                    opacity-0
                    translate-y-2
                    backdrop-blur-md
                    transition-all duration-500
                    group-hover:translate-y-0
                    group-hover:opacity-100
                  "
                >
                  <ArrowUpRight className="size-4" />
                </div>
              </div>

              {/* Product information */}
              <div className="pt-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                      {piece.category}
                    </p>

                    <h3 className="mt-2 font-serif text-2xl font-normal tracking-[-0.02em]">
                      {piece.name}
                    </h3>
                  </div>

                  <span className="mt-1 text-muted-foreground">
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>

                <p className="mt-3 max-w-xs text-xs leading-5 text-muted-foreground">
                  {piece.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* ------------------------------------------------
            FOOTER CTA
        ------------------------------------------------ */}
        <div className="mt-20 flex flex-col gap-5 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Explore the complete The Artisans Gallery collection.
          </p>

          <Link
            href="/collections"
            className="
              group inline-flex w-fit items-center
              text-xs font-medium uppercase tracking-[0.22em]
              text-foreground
            "
          >
            View all pieces
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
    </section>
  );
}
