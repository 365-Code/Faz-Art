import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function MaterialStory() {
  return (
    <section className="bg-muted/30 px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1440px]">

        {/* ------------------------------------------------
            INTRO
        ------------------------------------------------ */}
        <div className="grid gap-10 lg:grid-cols-[1fr_1.8fr] lg:items-end">

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/40" />

              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                The Material
              </span>
            </div>
          </div>

          <h2 className="max-w-5xl font-serif text-5xl font-normal leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-[5.5rem]">
            No two pieces of marble
            <br />
            <span className="italic font-light text-muted-foreground">
              are ever the same.
            </span>
          </h2>

        </div>

        {/* ------------------------------------------------
            LARGE MATERIAL IMAGE
        ------------------------------------------------ */}
        <div className="relative mt-14 aspect-[16/9] min-h-[420px] overflow-hidden bg-muted sm:min-h-0">

          <Image
            src="https://res.cloudinary.com/dlqyylssk/image/upload/v1754811098/mine-art/ck5fuflp868nsz2lm6sf.jpg"
            alt="Natural marble surface showing unique veining and texture"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover"
          />

          {/* Soft overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Image label */}
          <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
            <span className="bg-black/20 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.3em] text-white backdrop-blur-md">
              Natural variation
            </span>
          </div>

        </div>

        {/* ------------------------------------------------
            STORY + DETAILS
        ------------------------------------------------ */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-24">

          {/* Story */}
          <div>
            <p className="max-w-2xl font-serif text-2xl font-normal leading-[1.25] tracking-[-0.02em] sm:text-3xl">
              Nature creates the first artwork.
              <span className="text-muted-foreground">
                {" "}Our artisans reveal it.
              </span>
            </p>

            <p className="mt-7 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              Every block carries its own geological history. Veins move
              differently, tones shift subtly and no surface can ever be
              perfectly replicated. These variations are not imperfections —
              they are what make each piece uniquely its own.
            </p>

            <Link
              href="/about"
              className="
                group mt-8 inline-flex items-center
                border-b border-foreground/20 pb-2
                text-xs font-medium uppercase tracking-[0.22em]
                transition-colors duration-300
                hover:border-foreground/60
              "
            >
              Discover the material

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

          {/* Material characteristics */}
          <div className="border-t border-border">

            <MaterialDetail
              number="01"
              title="Natural variation"
              description="Every stone carries its own unique pattern, movement and tone."
            />

            <MaterialDetail
              number="02"
              title="Tactile surfaces"
              description="Polished, honed and carefully finished surfaces reveal different expressions of the stone."
            />

            <MaterialDetail
              number="03"
              title="Timeless character"
              description="Marble develops a deeper sense of character as it becomes part of a space."
            />

          </div>

        </div>

      </div>
    </section>
  );
}

function MaterialDetail({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="grid grid-cols-[48px_1fr] gap-4 border-b border-border py-6">

      <span className="pt-1 text-[10px] font-medium tracking-[0.2em] text-muted-foreground/60">
        {number}
      </span>

      <div>
        <h3 className="font-serif text-xl font-normal tracking-[-0.01em]">
          {title}
        </h3>

        <p className="mt-2 max-w-md text-xs leading-5 text-muted-foreground">
          {description}
        </p>
      </div>

    </div>
  );
}