import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Craftsmanship() {
  return (
    <section className="overflow-hidden bg-muted/30">
      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">

        {/* ------------------------------------------------
            VIDEO
        ------------------------------------------------ */}
        <div className="relative min-h-[600px] overflow-hidden lg:min-h-[760px]">

          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            // loop
            playsInline
            poster="craftsmanship-material.jpg"
          >
            <source
              src="https://res.cloudinary.com/dlqyylssk/video/upload/v1790508398/craftmanship_pddnot.3gp"
            //   src="/craftmanship.mp4"
              type="video/mp4"
            />
          </video>

          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-black/15" />

          {/* Bottom vignette */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Video label */}
          <div className="absolute left-7 top-7 lg:left-10 lg:top-10">
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-white/60" />

              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/70">
                The Making
              </span>
            </div>
          </div>

          {/* Video caption */}
          <div className="absolute bottom-7 left-7 max-w-xs lg:bottom-10 lg:left-10">
            <p className="text-xs leading-5 text-white/65">
              From raw marble to finished form, every piece carries
              the marks of the hands that shaped it.
            </p>
          </div>
        </div>

        {/* ------------------------------------------------
            CONTENT
        ------------------------------------------------ */}
        <div className="flex items-center px-7 py-24 sm:px-10 lg:px-20 lg:py-32">

          <div className="max-w-xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-px w-7 bg-foreground/40" />

              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                Craftsmanship
              </p>
            </div>

            {/* Heading */}
            <h2 className="mt-7 font-serif text-5xl font-normal leading-[0.98] tracking-[-0.04em] sm:text-6xl">
              The beauty of marble
              <br />
              <span className="italic font-light text-muted-foreground">
                is only half the story.
              </span>
            </h2>

            {/* Description */}
            <div className="mt-9 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">

              <p>
                Every The Artisans Gallery piece begins with a block of
                natural marble — selected for its character, movement
                and individuality.
              </p>

              <p>
                Skilled artisans then shape, carve and polish the stone,
                revealing forms that balance the raw character of marble
                with the quiet precision of contemporary design.
              </p>

            </div>

            {/* ------------------------------------------------
                CRAFT PRINCIPLES
            ------------------------------------------------ */}
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-border pt-8">

              <CraftPrinciple
                number="01"
                title="Selected by eye"
                description="Each block is chosen for its natural character and potential."
              />

              <CraftPrinciple
                number="02"
                title="Shaped by hand"
                description="Traditional skill meets considered contemporary form."
              />

              <CraftPrinciple
                number="03"
                title="Finished with care"
                description="Surfaces are refined to reveal the stone's natural depth."
              />

              <CraftPrinciple
                number="04"
                title="Made to endure"
                description="Designed to become part of a space for years to come."
              />

            </div>

            {/* ------------------------------------------------
                CTA
            ------------------------------------------------ */}
            <Link
              href="/craftsmanship"
              className="
                group mt-12 inline-flex w-fit items-center
                border-b border-foreground/20 pb-2
                text-xs font-medium uppercase tracking-[0.22em]
                text-foreground
                transition-colors duration-300
                hover:border-foreground/60
              "
            >
              Discover our craftsmanship

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
  );
}

/* ------------------------------------------------
   CRAFT PRINCIPLE
------------------------------------------------ */

function CraftPrinciple({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground/60">
        {number}
      </span>

      <h3 className="mt-3 font-serif text-xl font-normal text-foreground">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}