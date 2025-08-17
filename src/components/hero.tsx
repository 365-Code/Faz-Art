import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-400/20 dark:to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-400/20 dark:to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="font-heading text-6xl md:text-8xl font-bold tracking-tight">
            MineArt
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light">
            Discover timeless elegance with our curated collection of premium
            marble pieces.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={"/collections"}>
              <Button size="lg" className="text-lg px-8 py-6">
                Explore Collections
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={"/contact"}>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent"
              >
                Contact us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
