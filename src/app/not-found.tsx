import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 text-center">
      <div className="space-y-6">
        <h1 className="font-heading text-8xl md:text-9xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
          Page Not Found
        </h2>
        <p className="text-xl text-muted-foreground max-w-md mx-auto font-light leading-relaxed">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row gap-4">
        <Link href="/" passHref>
          <Button size="lg" className="text-lg px-8 py-6">
            <Home className="mr-2 h-5 w-5" />
            Go to Homepage
          </Button>
        </Link>
        <Link href="/collections" passHref>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 bg-transparent"
          >
            Explore Collections
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
