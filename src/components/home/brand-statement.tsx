import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function BrandStatement() {
  return (
    <section className="bg-muted/30 px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_2fr] lg:gap-20">

          {/* Eyebrow */}
          <div className="flex items-start">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/40" />

              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                The Artisans Gallery
              </span>
            </div>
          </div>

          {/* Statement */}
          <div className="max-w-5xl">

            <h2 className="font-serif text-4xl font-normal leading-[1.08] tracking-[-0.035em] sm:text-5xl md:text-6xl lg:text-[4.5rem]">
              We believe marble is
              <span className="italic font-light"> more than a material.</span>
            </h2>

            <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">

              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                It is a story of place, craftsmanship and time. At Artisan
                Gallery, natural marble is transformed by skilled hands into
                sculptural objects designed to become part of the spaces
                we live in.
              </p>

              <Link
                href="/about"
                className="
                  group inline-flex w-fit items-center
                  border-b border-foreground/20 pb-2
                  text-xs font-medium uppercase tracking-[0.22em]
                  transition-colors duration-300
                  hover:border-foreground/60
                "
              >
                Discover our story

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

        {/* Bottom philosophy */}
        <div className="mt-20 border-t border-border/60 pt-6">
          <div className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>Natural marble</span>
            <span className="hidden sm:block">·</span>
            <span>Skilled craftsmanship</span>
            <span className="hidden sm:block">·</span>
            <span>Contemporary design</span>
            <span className="hidden sm:block">·</span>
            <span>Made in Makrana, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}