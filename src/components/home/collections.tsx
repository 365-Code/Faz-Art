import { ProductImage } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Collections() {
  return (
    <section className="bg-background px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1440px]">

        {/* ------------------------------------------------
            SECTION INTRO
        ------------------------------------------------ */}
        <div className="grid gap-8 border-b border-border/60 pb-12 lg:grid-cols-[1fr_1.4fr] lg:items-end">

          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/40" />

              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                The Collection
              </span>
            </div>

            <h2 className="max-w-xl font-serif text-5xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Marble,
              <br />
              <span className="italic font-light">
                made personal.
              </span>
            </h2>
          </div>

          <div className="flex lg:justify-end">
            <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
              Discover sculptural marble objects created for considered
              interiors. From architectural basins to hand-finished
              decorative pieces, every collection celebrates the natural
              character of stone and the hands that shape it.
            </p>
          </div>

        </div>

        {/* ------------------------------------------------
            COLLECTION GRID
        ------------------------------------------------ */}
        <div className="mt-12 grid gap-5 md:grid-cols-2">

          {categories.map((collection, index) => {
            const isFeatured = index === 0;

            return (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className={`
                  group relative block overflow-hidden
                  bg-muted
                  ${isFeatured ? "md:row-span-2" : ""}
                `}
              >
                <div
                  className={`
                    relative
                    ${
                      isFeatured
                        ? "aspect-[4/5] md:h-full md:min-h-[760px]"
                        : "aspect-[4/3]"
                    }
                  `}
                >
                  {/* Image */}
                  <Image
                    src={collection.image.url || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    sizes={
                      isFeatured
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 100vw, 50vw"
                    }
                    className="
                      object-cover
                      transition-transform
                      duration-1000
                      ease-out
                      group-hover:scale-[1.045]
                    "
                  />

                  {/* Very subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent opacity-90" />

                  {/* Collection number */}
                  <div className="absolute left-6 top-6 lg:left-8 lg:top-8">
                    <span className="text-[10px] font-medium tracking-[0.3em] text-white/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Arrow */}
                  <div
                    className="
                      absolute right-6 top-6
                      flex size-11 items-center justify-center
                      rounded-full
                      border border-white/30
                      bg-black/5
                      text-white
                      backdrop-blur-md
                      transition-all duration-500
                      group-hover:border-white
                      group-hover:bg-white
                      group-hover:text-black
                    "
                  >
                    <ArrowUpRight
                      className="
                        size-4
                        transition-transform duration-500
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">

                    <div className="max-w-xl">

                      <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.3em] text-white/55">
                        Collection
                      </p>

                      <h3
                        className={`
                          font-serif font-normal leading-none tracking-[-0.025em] text-white
                          ${
                            isFeatured
                              ? "text-4xl sm:text-5xl"
                              : "text-3xl"
                          }
                        `}
                      >
                        {collection.name}
                      </h3>

                      <p
                        className="
                          mt-4 max-w-lg
                          text-sm leading-6 text-white/65
                          transition-colors duration-300
                          group-hover:text-white/80
                        "
                      >
                        {collection.description}
                      </p>

                      <div
                        className="
                          mt-6 flex items-center gap-2
                          text-[10px] font-medium uppercase tracking-[0.25em]
                          text-white/80
                          transition-colors duration-300
                          group-hover:text-white
                        "
                      >
                        <span>Explore collection</span>

                        <span className="h-px w-8 bg-white/50 transition-all duration-500 group-hover:w-12" />
                      </div>

                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

        </div>

        {/* ------------------------------------------------
            BOTTOM CTA
        ------------------------------------------------ */}
        <div className="mt-10 flex flex-col gap-5 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">

          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Looking for something specific? Explore our complete collection
            of handcrafted marble objects.
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

const categories: {
  id: string;
  name: string;
  slug: string;
  image: ProductImage;
  description: string;
}[] = [
  {
    id: "68984ada6c6721c99f3171c7",
    name: "Elegant Wash Basins",
    slug: "elegant-wash-basins",
    image: {
      id: "mine-art/ck5fuflp868nsz2lm6sf",
      url: "https://res.cloudinary.com/dlqyylssk/image/upload/v1754811098/mine-art/ck5fuflp868nsz2lm6sf.jpg",
    },
    description:
      "Sculptural wash basins carved from natural marble, bringing tactile character and quiet elegance to contemporary bathrooms.",
  },
  {
    id: "689f6a15306164754467da95",
    name: "Marble Console Tables",
    slug: "stone-consol-tables",
    image: {
      id: "faxvofoidq33x5hzyter",
      url: "https://res.cloudinary.com/dlqyylssk/image/upload/v1755277839/faxvofoidq33x5hzyter.jpg",
    },
    description:
      "Considered marble forms designed to anchor an entrance, living space or carefully composed interior.",
  },
  {
    id: "689f6a44306164754467da97",
    name: "Marble Bathtubs",
    slug: "stone-bathtubs",
    image: {
      id: "vnsynhe1t2wz3e384uvy",
      url: "https://res.cloudinary.com/dlqyylssk/image/upload/v1755277885/vnsynhe1t2wz3e384uvy.jpg",
    },
    description:
      "Monolithic bathing forms shaped from natural marble for a private and deeply considered retreat.",
  },
  {
    id: "689f6a85306164754467da99",
    name: "Sculptural Vessels",
    slug: "stone-sculpted-grace-vases",
    image: {
      id: "fvlf0isrydtq91euprhu",
      url: "https://res.cloudinary.com/dlqyylssk/image/upload/v1755277950/fvlf0isrydtq91euprhu.jpg",
    },
    description:
      "Decorative marble vessels where natural veining, texture and sculptural form become the centre of attention.",
  },
  {
    id: "689f70f4306164754467da9f",
    name: "Pedestal Wash Basins",
    slug: "stone-pedestal-wash-basin",
    image: {
      id: "natu6svuspqwtzunp8wl",
      url: "https://res.cloudinary.com/dlqyylssk/image/upload/v1789027049/natu6svuspqwtzunp8wl.jpg",
    },
    description:
      "Architectural pedestal basins combining sculptural presence with the everyday functionality of a considered bathroom piece.",
  },
  {
    id: "68a019940c2050e6110035c4",
    name: "Artful Accents",
    slug: "artful-accents-decorative-items",
    image: {
      id: "zy1uoqbpfdtayamnll8q",
      url: "https://res.cloudinary.com/dlqyylssk/image/upload/v1755322764/zy1uoqbpfdtayamnll8q.png",
    },
    description:
      "Small marble objects and decorative accents designed to bring texture, character and individuality to a space.",
  },
];