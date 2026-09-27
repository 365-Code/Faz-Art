import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EnquiryCTA() {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-background/[0.04] blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-background/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 py-28 lg:px-10 lg:py-40">

        {/* ------------------------------------------------
            TOP LABEL
        ------------------------------------------------ */}
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-background/40" />

          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-background/50">
            Begin a conversation
          </span>
        </div>

        {/* ------------------------------------------------
            MAIN CONTENT
        ------------------------------------------------ */}
        <div className="mt-8 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">

          <div>
            <h2 className="max-w-5xl font-serif text-5xl font-normal leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-[6rem]">
              Looking for something
              <br />
              <span className="italic font-light text-background/60">
                truly distinctive?
              </span>
            </h2>
          </div>

          <div className="max-w-md lg:pb-2">

            <p className="text-sm leading-7 text-background/60 sm:text-base sm:leading-8">
              Whether you have a particular piece in mind, are furnishing
              a new space, or simply want to explore what is possible,
              we&apos;d love to hear from you.
            </p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <Link
                href="/contact"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="
                    h-12 w-full rounded-full
                    bg-background px-7
                    text-foreground
                    hover:bg-background/90
                    sm:w-auto
                  "
                >
                  Make an enquiry
                  <ArrowUpRight className="ml-2 size-4" />
                </Button>
              </Link>

              <Link
                href="https://wa.me/+917852057102?text=Hi%2C%20I'm%20interested%20in%20Artisan%20Gallery%20marble%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="
                    h-12 w-full rounded-full
                    border-background/20
                    bg-transparent
                    px-7
                    text-background
                    hover:bg-background/10
                    hover:text-background
                    sm:w-auto
                  "
                >
                  <MessageCircle className="mr-2 size-4" />
                  WhatsApp us
                </Button>
              </Link>

            </div>

          </div>
        </div>

        {/* ------------------------------------------------
            BOTTOM BRAND LINE
        ------------------------------------------------ */}
        <div className="mt-24 border-t border-background/10 pt-6">

          <div className="flex flex-col gap-4 text-[10px] uppercase tracking-[0.25em] text-background/35 sm:flex-row sm:items-center sm:justify-between">

            <span>The Artisans Gallery</span>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <span>Handcrafted marble</span>
              <span>·</span>
              <span>Made in India</span>
              <span>·</span>
              <span>Created to endure</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}