import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Search } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background">
      <section className="flex min-h-[calc(100vh-4rem)] items-center px-6 py-20 lg:px-10">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="grid items-center gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            {/* Editorial label */}
            <div className="flex items-center gap-4">
              <span className="h-px w-12 bg-foreground/40" />

              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                The Artisans Gallery
              </span>
            </div>

            {/* Main content */}
            <div className="max-w-4xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                404 / Product not found
              </p>

              <h1
                className="
                  mt-6
                  max-w-4xl
                  font-serif
                  text-6xl
                  font-normal
                  leading-[0.9]
                  tracking-[-0.055em]
                  sm:text-7xl
                  lg:text-[8rem]
                "
              >
                This piece
                <br />
                <span className="text-muted-foreground">
                  isn&apos;t here.
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                We couldn&apos;t find the marble piece you&apos;re looking for.
                It may have been removed, renamed, or the link may no longer
                be active.
              </p>

              {/* Actions */}
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/collections">
                  <Button
                    size="lg"
                    className="
                      group
                      h-14
                      rounded-none
                      px-7
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.2em]
                    "
                  >
                    Browse collections

                    <ArrowUpRight
                      className="
                        ml-3
                        size-4
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                      "
                    />
                  </Button>
                </Link>

                <Link href="/">
                  <Button
                    size="lg"
                    variant="outline"
                    className="
                      h-14
                      rounded-none
                      px-7
                      text-[10px]
                      font-medium
                      uppercase
                      tracking-[0.2em]
                    "
                  >
                    <ArrowLeft className="mr-3 size-4" />
                    Back home
                  </Button>
                </Link>
              </div>

              {/* Helpful recovery */}
              <div className="mt-16 border-t border-border/60 pt-6">
                <div className="flex items-start gap-4">
                  <Search className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                  <div>
                    <p className="text-xs font-medium">
                      Looking for something specific?
                    </p>

                    <p className="mt-1 max-w-md text-xs leading-6 text-muted-foreground">
                      If you can&apos;t find the piece you need, get in touch
                      with our team. We may be able to help you find a similar
                      piece or discuss a custom request.
                    </p>

                    <Link
                      href="/contact"
                      className="
                        mt-3
                        inline-flex
                        items-center
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.2em]
                        underline
                        underline-offset-4
                        transition-colors
                        hover:text-muted-foreground
                      "
                    >
                      Contact The Artisans Gallery
                      <ArrowUpRight className="ml-2 size-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer detail */}
              <div className="mt-10">
                <p className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                  Handcrafted marble · Each piece is unique
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}