import { Hero } from "@/components/home/hero";
import { Collections } from "@/components/home/collections";
import { EnquiryCTA } from "@/components/home/enquiry-cta";
import { BrandStatement } from "@/components/home/brand-statement";
import { FeaturedPieces } from "@/components/home/feature-piece";
import Craftsmanship from "@/components/home/craftman-ship";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      
      <Hero />

      <BrandStatement />

      <Collections />

      <Craftsmanship />

      <FeaturedPieces />

      {/* <MaterialStory /> */}

      {/* <Projects /> */}

      {/* <Testimonials /> */}

      <EnquiryCTA />
    </main>
  );
}
