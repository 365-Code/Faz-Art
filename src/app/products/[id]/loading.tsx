export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* ==================================================
          BREADCRUMB
      ================================================== */}
      <section className="px-6 pt-8 lg:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex items-center gap-2">
            <Skeleton className="h-2.5 w-20" />
            <span className="text-muted-foreground/30">/</span>
            <Skeleton className="h-2.5 w-28" />
            <span className="text-muted-foreground/30">/</span>
            <Skeleton className="h-2.5 w-32" />
          </div>
        </div>
      </section>

      {/* ==================================================
          PRODUCT
      ================================================== */}
      <section className="px-6 pb-24 pt-10 sm:pt-12 lg:px-10 lg:pb-36 lg:pt-16">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16 xl:grid-cols-[1.4fr_0.6fr] xl:gap-20">
          {/* ==================================================
              GALLERY
          ================================================== */}
          <div className="min-w-0">
            {/* Main image */}
            <div className="relative aspect-[4/5] overflow-hidden bg-muted sm:aspect-[5/4] lg:aspect-[4/3]">
              <Skeleton className="absolute inset-0 rounded-none" />

              {/* Fake image positioning detail */}
              <div className="absolute inset-8 flex items-center justify-center sm:inset-12 lg:inset-16">
                <div className="h-2/3 w-2/3 animate-pulse bg-muted-foreground/5" />
              </div>

              {/* Image counter */}
              <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5">
                <Skeleton className="h-7 w-12" />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="mt-4 flex gap-3 overflow-hidden pb-1">
              {Array.from({ length: 4 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="
                    size-16
                    shrink-0
                    rounded-none
                    sm:size-20
                    lg:size-24
                  "
                />
              ))}
            </div>
          </div>

          {/* ==================================================
              PRODUCT INFORMATION
          ================================================== */}
          <div className="min-w-0 lg:self-start">
            <div className="max-w-xl">
              {/* Category */}
              <Skeleton className="h-2.5 w-28" />

              {/* Product title */}
              <div className="mt-5 space-y-3">
                <Skeleton className="h-11 w-full rounded-none sm:h-14" />
                <Skeleton className="h-11 w-4/5 rounded-none sm:h-14" />
              </div>

              {/* Description */}
              <div className="mt-8 space-y-3">
                <Skeleton className="h-4 w-full rounded-none" />
                <Skeleton className="h-4 w-[95%] rounded-none" />
                <Skeleton className="h-4 w-[82%] rounded-none" />
                <Skeleton className="h-4 w-[65%] rounded-none" />
              </div>

              {/* Product information */}
              <div className="mt-10 border-y border-border/60">
                <div className="grid grid-cols-2 border-b border-border/60 py-5">
                  {/* Material */}
                  <div>
                    <Skeleton className="h-2.5 w-16" />
                    <Skeleton className="mt-3 h-4 w-20 rounded-none" />
                  </div>

                  {/* Colour */}
                  <div>
                    <Skeleton className="h-2.5 w-14" />
                    <Skeleton className="mt-3 h-4 w-24 rounded-none" />
                  </div>
                </div>

                {/* Variants */}
                <div className="py-5">
                  <Skeleton className="h-2.5 w-28" />

                  <div className="mt-4 flex gap-3">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="size-9 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* ==================================================
                  ENQUIRY
              ================================================== */}
              <div className="mt-10">
                <Skeleton className="h-2.5 w-20" />

                <Skeleton className="mt-4 h-8 w-64 rounded-none" />

                <div className="mt-3 space-y-2">
                  <Skeleton className="h-3.5 w-full rounded-none" />
                  <Skeleton className="h-3.5 w-[75%] rounded-none" />
                </div>

                <Skeleton className="mt-6 h-14 w-full rounded-none" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ======================================================
   SKELETON
====================================================== */

function Skeleton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-muted ${className}`}
      aria-hidden="true"
    />
  );
}