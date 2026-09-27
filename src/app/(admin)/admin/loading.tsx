import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* =====================================================
          ADMIN HEADER
      ===================================================== */}
      <div className="border-b border-border/50 bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-6">
            <div className="space-y-2">
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-4 w-72" />
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <Skeleton className="h-10 w-28 rounded-md" />
              <Skeleton className="h-10 w-28 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* =================================================
            ADMIN NAVIGATION
        ================================================= */}
        <nav className="mb-8 overflow-hidden border-b">
          <div className="flex min-w-max gap-1">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-3"
              >
                <Skeleton className="h-4 w-4 rounded" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </nav>

        {/* =================================================
            PAGE HEADER
        ================================================= */}
        <section className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-5 w-full max-w-xl" />
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-40 rounded-md" />
          </div>
        </section>

        {/* =================================================
            STATS
        ================================================= */}
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-10 w-20" />
                    <Skeleton className="h-3 w-40" />
                  </div>

                  <Skeleton className="h-11 w-11 rounded-xl" />
                </div>

                <div className="mt-6">
                  <Skeleton className="h-4 w-20" />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* =================================================
            STOREFRONT ACTIVITY
        ================================================= */}
        <section className="mt-10 space-y-5">
          <div className="space-y-2">
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-72" />
          </div>

          {/* Visitors skeleton */}
          <Card>
            <CardContent className="p-6 sm:p-8">
              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-4 w-56" />
                  </div>

                  <Skeleton className="h-9 w-24 rounded-full" />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-xl border bg-muted/20 p-6"
                    >
                      <div className="flex items-start justify-between">
                        <Skeleton className="h-11 w-11 rounded-full" />
                        <Skeleton className="h-4 w-16" />
                      </div>

                      <div className="mt-6 space-y-2">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center">
                  <Skeleton className="h-9 w-32 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* =================================================
            CUSTOMER ENQUIRIES
        ================================================= */}
        <section className="mt-10 space-y-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-80" />
            </div>

            <Skeleton className="h-4 w-28" />
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-64" />
                    </div>

                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-20 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}