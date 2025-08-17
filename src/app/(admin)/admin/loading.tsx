import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import TabsList and TabsTrigger

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* AdminHeader Skeleton */}
      <div className="border-b border-border/50 bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-5 w-80" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8">
        {/* TabsList Skeleton */}
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" disabled>
            <Skeleton className="h-6 w-24" />
          </TabsTrigger>
          <TabsTrigger value="products" disabled>
            <Skeleton className="h-6 w-24" />
          </TabsTrigger>
          <TabsTrigger value="categories" disabled>
            <Skeleton className="h-6 w-24" />
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab Skeleton */}
        <div className="space-y-8 mt-8">
          {/* Stats Cards Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-8 w-32" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-48" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
                  >
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Visitors Component Skeleton */}
          <div className="py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <Skeleton className="h-8 w-64 mb-2" />
                <Skeleton className="h-5 w-80" />
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-10 w-40 rounded-md" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 2 }).map((_, index) => (
                <div key={index} className="rounded-2xl p-8 border bg-muted/50">
                  <div className="flex items-center justify-between mb-6">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-10 w-20 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
