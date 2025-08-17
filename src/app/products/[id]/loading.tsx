export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Breadcrumb and Back Button Skeleton */}
      <section className="py-6 border-b border-border/50 bg-gradient-to-br from-background to-muted/30">
        <div className="mx-auto container px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-muted animate-pulse rounded" />
            <span>/</span>
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            <span>/</span>
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            <span>/</span>
            <div className="h-4 w-28 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-10 w-24 bg-muted animate-pulse rounded-full" />
        </div>
      </section>

      {/* Product Details Content Skeleton */}
      <div className="mx-auto container px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 xl:grid-cols-5">
          {/* Image Gallery Loading */}
          <div className="lg:col-span-2 xl:col-span-3">
            <div className="flex h-full flex-col space-y-6 md:flex-row-reverse md:justify-between md:space-x-6 md:space-y-0">
              {/* Main Image Loading */}
              <div className="flex-1 w-full">
                <div className="relative aspect-square h-full overflow-hidden rounded-xl bg-muted animate-pulse shadow-lg" />
              </div>

              {/* Thumbnail Images Loading */}
              <div className="flex shrink-0 flex-row md:flex-col gap-4 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto no-scrollbar p-1">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square min-w-24 min-h-24 sm:min-h-28 sm:min-w-28 overflow-hidden rounded-xl bg-muted animate-pulse"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Details Loading */}
          <div className="space-y-10 lg:col-span-1 xl:col-span-2">
            <div className="space-y-6">
              {/* Category Badge Loading */}
              <div className="h-6 w-24 bg-muted animate-pulse rounded-full" />

              {/* Product Title Loading */}
              <div className="space-y-4">
                <div className="h-10 w-full bg-muted animate-pulse rounded" />
                <div className="h-8 w-3/4 bg-muted animate-pulse rounded" />
                <div className="h-px bg-muted animate-pulse" />
              </div>

              {/* Description Loading */}
              <div className="space-y-3">
                <div className="h-6 w-full bg-muted animate-pulse rounded" />
                <div className="h-6 w-11/12 bg-muted animate-pulse rounded" />
                <div className="h-6 w-10/12 bg-muted animate-pulse rounded" />
                <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
              </div>
            </div>

            {/* Call to Action Buttons Loading */}
            <div className="space-y-6 pt-8">
              <div className="h-px bg-muted animate-pulse" />
              <div className="h-14 w-full bg-muted animate-pulse rounded-lg" />
              <div className="h-14 w-full bg-muted animate-pulse rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
