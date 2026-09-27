export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* ==================================================
          COLLECTIONS HEADER
      ================================================== */}
      <section className="px-6 pb-16 pt-8 sm:pb-20 sm:pt-10 lg:px-10 lg:pb-24 lg:pt-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Editorial header */}
          <div className="grid gap-8 lg:grid-cols-[0.7fr_2fr] lg:gap-12">
            {/* Eyebrow */}
            <div className="flex items-start">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/20" />

                <Skeleton className="h-2.5 w-24" />
              </div>
            </div>

            {/* Heading */}
            <div>
              <Skeleton
                className="
                  h-16
                  w-[85%]
                  rounded-none
                  sm:h-20
                  lg:h-[7rem]
                  lg:w-[70%]
                "
              />

              {/* Supporting text */}
              <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
                <div className="w-full max-w-2xl space-y-3">
                  <Skeleton className="h-4 w-full rounded-none" />
                  <Skeleton className="h-4 w-[92%] rounded-none" />
                  <Skeleton className="h-4 w-[68%] rounded-none" />
                </div>

                {/* Category count */}
                <Skeleton className="h-2.5 w-24 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          CATEGORY GRID
      ================================================== */}
      <section className="px-6 pb-24 lg:px-10 lg:pb-36">
        <div className="mx-auto max-w-[1440px]">
          <div
            className="
              grid
              grid-cols-1
              gap-x-5
              gap-y-12
              sm:grid-cols-2
              lg:grid-cols-3
              xl:gap-x-6
            "
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <CategorySkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ======================================================
   CATEGORY SKELETON
====================================================== */

function CategorySkeleton() {
  return (
    <div>
      {/* Category image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Skeleton className="absolute inset-0 rounded-none" />

        {/* Subtle image composition */}
        <div className="absolute inset-10 flex items-center justify-center">
          <div className="h-2/3 w-2/3 bg-muted-foreground/[0.035]" />
        </div>
      </div>

      {/* Category information */}
      <div className="mt-5 space-y-3">
        <Skeleton className="h-5 w-[65%] rounded-none" />

        <div className="space-y-2">
          <Skeleton className="h-3 w-full rounded-none" />
          <Skeleton className="h-3 w-[82%] rounded-none" />
        </div>

        <Skeleton className="h-2.5 w-28 rounded-none" />
      </div>
    </div>
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