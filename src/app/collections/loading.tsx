

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Skeleton */}
      <section className="py-6 border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 bg-muted animate-pulse rounded" />
            <span>/</span>
            <div className="h-4 w-20 bg-muted animate-pulse rounded" />
            <span>/</span>
            <div className="h-4 w-24 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </section>

      {/* Header Skeleton */}
      <section className="py-16 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-8">
            <div className="h-10 w-10 bg-muted animate-pulse rounded" />
            <div className="flex-1 space-y-4">
              <div className="h-12 w-80 bg-muted animate-pulse rounded" />
              <div className="h-6 w-96 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
