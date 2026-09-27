import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function About() {
  return (
    <main className="bg-background">

      {/* ==================================================
          HERO
      ================================================== */}
      <section className="px-6 pb-24 pt-16 lg:px-10 lg:pb-32 lg:pt-24">
        <div className="mx-auto max-w-[1440px]">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_2fr]">

            <div className="flex items-start">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/40" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                  About The Artisans Gallery
                </span>
              </div>
            </div>

            <div>
              <h1 className="max-w-6xl font-serif text-6xl font-normal leading-[0.92] tracking-[-0.05em] sm:text-7xl lg:text-[8rem]">
                A new perspective
                <br />
                <span className="italic font-light text-muted-foreground">
                  on natural stone.
                </span>
              </h1>

              <p className="mt-10 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                The Artisans Gallery is a new marble house creating handcrafted
                objects for contemporary spaces. We bring together the
                natural character of stone with thoughtful forms and
                skilled craftsmanship.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          HERO IMAGE
      ================================================== */}
      <section className="px-6 lg:px-10">
        <div className="relative mx-auto max-w-[1440px] overflow-hidden">

          <div className="relative aspect-[16/8] min-h-[420px]">
            <Image
              src="/about-hero.jpg"
              alt="Natural marble at The Artisans Gallery"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/10" />

            <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10">
              <span className="bg-black/20 px-3 py-2 text-[9px] font-medium uppercase tracking-[0.3em] text-white backdrop-blur-md">
                Makrana · Rajasthan
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          WHY WE STARTED
      ================================================== */}
      <section className="px-6 py-28 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1440px]">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.8fr]">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/40" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                  Why We Started
                </span>
              </div>
            </div>

            <div className="max-w-4xl">

              <h2 className="font-serif text-4xl leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                We wanted to see marble
                <br />
                <span className="italic font-light text-muted-foreground">
                  treated differently.
                </span>
              </h2>

              <div className="mt-10 grid gap-8 sm:grid-cols-2">

                <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  Natural marble has been part of architecture and craft
                  for centuries. Yet we believe there is room for new
                  interpretations of it—objects that feel equally at home
                  in modern interiors.
                </p>

                <p className="text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                  The Artisans Gallery was created to explore that space:
                  bringing together natural stone, contemporary design
                  and the skill of the people who shape it.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          OUR APPROACH
      ================================================== */}
      <section className="bg-muted/30 px-6 py-28 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1440px]">

          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            {/* Image */}
            <div className="relative aspect-[4/5] overflow-hidden">

              <Image
                src="/about-craft.jpg"
                alt="Crafting marble at The Artisans Gallery"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

            </div>

            {/* Text */}
            <div className="lg:px-10">

              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/40" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                  Our Approach
                </span>
              </div>

              <h2 className="mt-7 font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
                Start with the stone.
                <br />
                <span className="italic font-light text-muted-foreground">
                  Then let it lead.
                </span>
              </h2>

              <div className="mt-9 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">

                <p>
                  Every piece begins with the marble itself. Its veins,
                  colour, texture and natural variation become part of
                  the design rather than something to conceal.
                </p>

                <p>
                  We work to find the balance between the character of
                  the material and the simplicity of the finished form.
                  The result is marble that feels contemporary without
                  losing the qualities that make natural stone unique.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          WHAT MATTERS
      ================================================== */}
      <section className="px-6 py-28 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1440px]">

          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.8fr]">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/40" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                  What Matters
                </span>
              </div>
            </div>

            <div className="grid border-t border-border md:grid-cols-2">

              <Value
                number="01"
                title="Natural character"
                description="We embrace the individuality of natural marble rather than treating variation as a flaw."
              />

              <Value
                number="02"
                title="Thoughtful design"
                description="We favour simple, considered forms that allow the material to remain the centre of attention."
              />

              <Value
                number="03"
                title="Skilled hands"
                description="The character of each piece comes not only from the stone, but from the people who shape and finish it."
              />

              <Value
                number="04"
                title="Built with purpose"
                description="We create objects intended to have a place in the spaces people live, work and gather in."
              />

            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          THE BEGINNING
      ================================================== */}
      <section className="border-t border-border bg-muted/30 px-6 py-28 lg:px-10 lg:py-40">
        <div className="mx-auto max-w-[1440px]">

          <div className="mx-auto max-w-5xl text-center">

            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              This is just the beginning
            </p>

            <h2 className="mt-7 font-serif text-5xl leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Building something
              <br />
              <span className="italic font-light text-muted-foreground">
                worth keeping.
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
              We are at the beginning of our journey, with a simple
              ambition: to create marble pieces that bring natural
              material and thoughtful design into everyday spaces.
            </p>

            <Link
              href="/collections"
              className="
                group mt-9 inline-flex items-center
                border-b border-foreground/20 pb-2
                text-xs font-medium uppercase tracking-[0.22em]
                transition-colors duration-300
                hover:border-foreground/60
              "
            >
              Explore collections

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

    </main>
  );
}

/* ======================================================
   VALUE
====================================================== */

function Value({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-border p-7 first:pl-0 md:nth-[2n+1]:pl-0 md:nth-[2n]:pr-0 lg:p-10">

      <span className="text-[10px] font-medium tracking-[0.25em] text-muted-foreground/60">
        {number}
      </span>

      <h3 className="mt-5 font-serif text-2xl tracking-[-0.02em]">
        {title}
      </h3>

      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
        {description}
      </p>

    </div>
  );
}