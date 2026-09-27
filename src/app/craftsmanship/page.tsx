import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CraftsmanshipPage() {
  return (
    <main className="bg-background">
      <CraftsmanshipHero />

      <CraftsmanshipStatement />

      <MaterialStory />

      <HumanTouch />

      <CraftsmanshipDetail />

      <WorkshopStory />

      <FinishedCraft />

      <CraftsmanshipCTA />
    </main>
  );
}

function CraftsmanshipHero() {
  return (
    <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden">
      <Image
        src="/craftsmanship-hero.jpg"
        alt="Indian artisan hand carving marble"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Image overlay */}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />

      <div className="relative z-10 flex min-h-[calc(100svh-4rem)] items-end">
        <div className="w-full px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20">
          <div className="mx-auto max-w-[1440px]">
            <div className="max-w-4xl space-y-6 text-white">
              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/70">
                The Art Behind the Stone
              </p>

              <h1 className="font-serif text-5xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[7.5rem]">
                Crafted by hand.
                <br />
                Made to endure.
              </h1>

              <p className="max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                Where natural marble meets patience, precision and the human
                hand.
              </p>
            </div>

            <div className="mt-14 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60">
              <ArrowDown className="h-4 w-4" />
              Discover our craft
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CraftsmanshipStatement() {
  return (
    <section className="px-6 py-28 sm:py-36 lg:px-10 lg:py-44">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_2fr]">
          <div className="flex items-start">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/40" />

              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                Our Craft
              </span>
            </div>
          </div>

          <div className="max-w-5xl">
            <h2 className="font-serif text-5xl font-normal leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              Marble is not simply shaped.
              <br />
              <span className="text-muted-foreground">
                It is patiently revealed.
              </span>
            </h2>

            <p className="mt-10 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Every piece begins with a natural material carrying its own
              character, texture and variation. Our role is not to make the
              stone uniform, but to understand it and reveal the form within.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MaterialStory() {
  return (
    <section className="px-6 py-16 sm:py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/craftsmanship-material.jpg"
              alt="Raw marble being transformed into a handcrafted sculpture"
              fill
              className="object-cover transition-transform duration-700 hover:scale-[1.02]"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          </div>

          <div className="max-w-xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              01 / Material
            </p>

            <h2 className="mt-5 font-serif text-4xl font-normal leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              From stone
              <br />
              to form.
            </h2>

            <div className="mt-8 space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                Natural marble is never completely uniform. Its tone, grain,
                density and subtle variations are part of what makes every piece
                unique.
              </p>

              <p>
                We work with these characteristics rather than trying to hide
                them, allowing the material to influence the final form.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span>Natural Material</span>
              <span>Hand Selected</span>
              <span>Individually Crafted</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HumanTouch() {
  return (
    <section className="px-6 py-20 sm:py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="order-2 lg:order-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              02 / The Artisan
            </p>

            <h2 className="mt-5 font-serif text-4xl font-normal leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              The human
              <br />
              touch.
            </h2>

            <p className="mt-8 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
              Tools may shape the stone, but judgement shapes the work. Every
              curve, edge and carved detail is guided by the eye and hand of the
              artisan.
            </p>

            <p className="mt-5 max-w-lg text-base leading-8 text-muted-foreground">
              It is this attention to detail that gives a handcrafted marble
              piece its individuality.
            </p>
          </div>

          <div className="relative order-1 aspect-[4/5] overflow-hidden lg:order-2">
            <Image
              src="/craftsmanship-hands.jpg"
              alt="Artisan hand carving intricate details into marble"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function CraftsmanshipDetail() {
  return (
    <section className="px-6 py-20 sm:py-28 lg:px-10 lg:py-36">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              03 / Detail
            </p>

            <h2 className="mt-4 font-serif text-4xl font-normal tracking-[-0.03em] sm:text-5xl">
              The beauty is in the details.
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            Fine carving transforms a simple piece of marble into something with
            presence, depth and character.
          </p>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[2/1]">
          <Image
            src="/craftsmanship-detail.jpg"
            alt="Intricate hand-carved marble detail"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="mt-5 flex gap-8 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>Hand Carved</span>
          <span>Hand Finished</span>
        </div>
      </div>
    </section>
  );
}

function WorkshopStory() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[75vh]">
        <Image
          src="/craftsmanship-workshop.jpg"
          alt="Traditional marble craftsmanship workshop in Rajasthan"
          fill
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        <div className="relative z-10 flex min-h-[75vh] items-end px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="max-w-2xl text-white">
              <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/60">
                04 / The Workshop
              </p>

              <h2 className="mt-5 font-serif text-5xl font-normal leading-none tracking-[-0.04em] sm:text-6xl lg:text-8xl">
                Where the
                <br />
                work happens.
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                Behind every finished piece is a process of patience, precision
                and repetition. This is where raw marble gradually becomes
                something made to last.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinishedCraft() {
  return (
    <section className="px-6 py-24 sm:py-32 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/craftsmanship-finished.jpg"
              alt="Finished handcrafted marble pieces in a refined interior"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 65vw"
            />
          </div>

          <div className="max-w-xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              05 / Finished Work
            </p>

            <h2 className="mt-5 font-serif text-4xl font-normal leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              From hands
              <br />
              to home.
            </h2>

            <p className="mt-8 text-base leading-8 text-muted-foreground sm:text-lg">
              Once the carving is complete, the piece leaves the workshop and
              begins a new story — becoming part of a home, a space or a
              collection.
            </p>

            <Link href="/collections" className="mt-9 inline-block">
              <Button
                variant="outline"
                size="lg"
                className="group rounded-full px-6"
              >
                Explore Collections
                <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function CraftsmanshipCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[70vh]">
        <Image
          src="/craftsmanship-closing.jpg"
          alt="Handcrafted marble sculpture in a traditional artisan workshop"
          fill
          className="object-cover"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />

        <div className="relative z-10 flex min-h-[70vh] items-end px-6 pb-12 sm:px-10 sm:pb-16 lg:px-16 lg:pb-20">
          <div className="mx-auto w-full max-w-[1440px]">
            <div className="max-w-3xl text-white">
              <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-white/60">
                The The Artisans Gallery Philosophy
              </p>

              <h2 className="mt-5 font-serif text-5xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-[7rem]">
                Craft that lasts.
              </h2>

              <p className="mt-7 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
                Shaped by stone. Refined by hand. Made to become part of your
                space for years to come.
              </p>

              <Link href="/collections" className="mt-9 inline-block">
                <Button
                  size="lg"
                  className="group rounded-full bg-white px-7 text-black hover:bg-white/90"
                >
                  Explore Collections
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
