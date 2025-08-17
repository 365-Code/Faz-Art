import { Hero } from "@/components/hero";
import { Collections } from "@/components/collections";
import { About } from "@/components/about";
import { Features } from "@/components/features";
import { CTA } from "@/components/cta";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Collections />
      <About />
      <Features />
      <CTA />
    </main>
  );
}
