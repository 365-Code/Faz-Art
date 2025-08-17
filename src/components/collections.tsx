import { ProductImage } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Collections() {
  return (
    <section className="py-32 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 mx-auto">
        <div className="text-center space-y-6 mb-20">
          <h2 className="font-heading text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Collections
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Explore our carefully curated marble collections, each piece
            selected for its exceptional quality and timeless beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group block"
            >
              <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-border transition-all duration-500 hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-black/20">
                {/* Background Image */}
                <Image
                  src={collection.image.url || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover group-hover:scale-105 h-full transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  {/* Top Badge */}
                  <div className="flex justify-end">
                    {/* <div className="bg-white/10 glass-effect text-white text-sm font-medium px-4 py-2 rounded-full border border-white/20">
                      {400} Items
                    </div> */}
                  </div>

                  {/* Bottom Content */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-heading text-2xl font-bold text-white">
                        {collection.name}
                      </h3>
                      <p className="text-white/80 text-sm font-light leading-relaxed line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                        {collection.description}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-white/90 group-hover:text-white transition-colors duration-300">
                      <span className="font-medium text-sm">
                        Explore Collection
                      </span>
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
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
      "Elevate your bathroom with our premium wash basins, blending modern design and everyday functionality. Ideal for both contemporary and classic interiors.",
  },
  {
    id: "689f6a15306164754467da95",
    name: "Signature Tables",
    slug: "signature-tables",
    image: {
      id: "faxvofoidq33x5hzyter",
      url: "https://res.cloudinary.com/dlqyylssk/image/upload/v1755277839/faxvofoidq33x5hzyter.jpg",
    },
    description:
      "Explore a curated collection of tables that blend design with purpose. Whether it's for dining, working, or styling, our tables are crafted to stand out and last.",
  },
  {
    id: "689f6a44306164754467da97",
    name: "Luxe Bathtubs",
    slug: "luxe-bathtubs",
    image: {
      id: "vnsynhe1t2wz3e384uvy",
      url: "https://res.cloudinary.com/dlqyylssk/image/upload/v1755277885/vnsynhe1t2wz3e384uvy.jpg",
    },
    description:
      "Unwind in style with our luxurious bathtubs, designed for both comfort and aesthetic appeal. Choose from modern silhouettes to timeless soakers for your perfect retreat.",
  },
  {
    id: "689f6a85306164754467da99",
    name: "Sculpted Grace – Vases",
    slug: "sculpted-grace-vases",
    image: {
      id: "fvlf0isrydtq91euprhu",
      url: "https://res.cloudinary.com/dlqyylssk/image/upload/v1755277950/fvlf0isrydtq91euprhu.jpg",
    },
    description:
      "Enhance your interiors with our sculptural vases, perfect for flowers or as standalone art. A blend of texture, form, and timeless design for every space.",
  },
  {
    id: "689f70f4306164754467da9f",
    name: "Marble Coasters",
    slug: "marble-coasters",
    image: {
      id: "qaku8oacycvcsa8ggc0m",
      url: "https://res.cloudinary.com/dlqyylssk/image/upload/v1755279597/qaku8oacycvcsa8ggc0m.png",
    },
    description:
      "Protect your surfaces in style with our handcrafted marble coasters — a perfect fusion of elegance and everyday function.",
  },
  {
    id: "68a019940c2050e6110035c4",
    name: "Artful Accents - Decorative Items",
    slug: "artful-accents-decorative-items",
    image: {
      id: "zy1uoqbpfdtayamnll8q",
      url: "https://res.cloudinary.com/dlqyylssk/image/upload/v1755322764/zy1uoqbpfdtayamnll8q.png",
    },
    description:
      "Curate your space with unique decorative pieces that spark conversation and elevate ambiance. From timeless classics to bold modern statements, each piece adds character.",
  },
];
