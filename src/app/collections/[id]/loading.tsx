export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* ==================================================
          COLLECTION HEADER
      ================================================== */}
      <section className="px-6 pb-16 pt-8 sm:pb-20 sm:pt-10 lg:px-10 lg:pb-24 lg:pt-12">
        <div className="mx-auto max-w-[1440px]">
          {/* Breadcrumb */}
          <div className="mb-12 flex items-center gap-2 sm:mb-14 lg:mb-16">
            <Skeleton className="h-2.5 w-20" />

            <span className="text-muted-foreground/30">/</span>

            <Skeleton className="h-2.5 w-28" />
          </div>

          {/* Editorial header */}
          <div className="grid gap-8 lg:grid-cols-[0.7fr_2fr] lg:gap-12">
            {/* Eyebrow */}
            <div className="flex items-start">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/20" />

                <Skeleton className="h-2.5 w-20" />
              </div>
            </div>

            {/* Content */}
            <div>
              {/* Collection title */}
              <div className="space-y-3">
                <Skeleton className="h-16 w-[85%] rounded-none sm:h-20 lg:h-[7rem] lg:w-[75%]" />
              </div>

              {/* Description + count */}
              <div className="mt-8 flex flex-col gap-6 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
                <div className="w-full max-w-2xl space-y-3">
                  <Skeleton className="h-4 w-full rounded-none" />
                  <Skeleton className="h-4 w-[92%] rounded-none" />
                  <Skeleton className="h-4 w-[70%] rounded-none" />
                </div>

                <Skeleton className="h-2.5 w-20 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          PRODUCTS
      ================================================== */}
      <section className="px-6 pb-24 lg:px-10 lg:pb-36">
        <div className="mx-auto max-w-[1440px]">
          {/* Grid */}
          <div className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ======================================================
   PRODUCT SKELETON
====================================================== */

function ProductSkeleton() {
  return (
    <div>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Skeleton className="absolute inset-0 rounded-none" />

        {/* Subtle inner image shape */}
        <div className="absolute inset-8 flex items-center justify-center">
          <div className="h-2/3 w-2/3 bg-muted-foreground/[0.035]" />
        </div>
      </div>

      {/* Product information */}
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3.5 w-[75%] rounded-none" />

        <Skeleton className="h-2.5 w-[45%] rounded-none" />
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