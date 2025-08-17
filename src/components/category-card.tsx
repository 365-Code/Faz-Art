"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CategoryType } from "@/lib/types";

export default function CategoryCard({ category }: { category: CategoryType }) {
  return (
    <Link href={`/collections/${category.id}`} className="group block">
      <Card className="relative h-80 overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:scale-[1.02] bg-card p-0">
        {/* Background Image */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={
              category.image.url ||
              "/image-placeholder.svg?height=400&width=320&text=Marble+Category"
            }
            alt={category.slug}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-all duration-500" />

          {/* Decorative Element */}
          <div className="absolute top-6 right-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
            <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <CardContent className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="space-y-4 text-white">
            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-bold group-hover:text-amber-200 transition-colors duration-300">
                {category.name}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                {category.description}
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-white/90 text-sm font-medium group-hover:text-white transition-colors duration-300">
                Explore Category
              </span>
              <ArrowRight className="h-5 w-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
        </CardContent>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-amber-400/30 transition-all duration-500" />
      </Card>
    </Link>
  );
}
