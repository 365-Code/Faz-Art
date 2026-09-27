"use client";

import Link from "next/link";
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

export function Hero() {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section className="relative min-h-[calc(100svh-72px)] overflow-hidden bg-black text-white">
      {/* ------------------------------------------------
          BACKGROUND VIDEO
      ------------------------------------------------ */}
      <div className="absolute inset-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted={isMuted}
          // loop
          playsInline
          poster="/hero-poster.jpg"
        >
          <source
            // src="/marble-craft.mp4"
            src="https://res.cloudinary.com/dlqyylssk/video/upload/v1790508429/marble-craft_so1ll8.3gp"
            type="video/mp4"
          />
        </video>

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Bottom gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />

        {/* Subtle side vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.28)_100%)]" />
      </div>

      {/* ------------------------------------------------
          CONTENT
      ------------------------------------------------ */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-[1440px] flex-col justify-end px-6 pb-8 pt-32 lg:px-10 lg:pb-10">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-8 bg-white/50" />

            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/65 sm:text-xs">
              Handcrafted Marble · Makrana, India
            </p>
          </div>

          {/* Main heading */}
          <h1 className="max-w-5xl font-serif text-[4rem] font-normal leading-[0.9] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[7.5rem]">
            Marble,
            <br />
            <span className="italic font-light">shaped into art.</span>
          </h1>

          {/* Supporting content */}
          <div className="mt-8 flex flex-col gap-7 sm:flex-row sm:items-end sm:gap-12">
            <p className="max-w-md text-sm leading-6 text-white/65 sm:text-base">
              Sculptural objects and timeless furniture crafted from naturally
              expressive marble by skilled artisans.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/collections">
                <Button
                  size="lg"
                  className="group h-12 rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-white/90"
                >
                  Explore Collection
                  <ArrowUpRight className="ml-2 size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Button>
              </Link>

              <Link href="/about">
                <Button
                  size="lg"
                  variant="ghost"
                  className="h-12 rounded-full border border-white/25 bg-white/5 px-6 text-sm text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
                >
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------
            BOTTOM BAR
        ------------------------------------------------ */}
        <div className="mt-16 flex items-end justify-between border-t border-white/15 pt-5">
          <div className="hidden text-[10px] uppercase tracking-[0.3em] text-white/40 sm:block">
            From stone to sculpture
          </div>

          <div className="flex w-full items-center justify-between sm:w-auto sm:gap-8">
            {/* Scroll indicator */}
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/45">
              <span className="flex size-8 items-center justify-center rounded-full border border-white/20">
                <ArrowDown className="size-3" />
              </span>
              Scroll to explore
            </div>

            {/* Video sound control */}
            <button
              type="button"
              onClick={() => setIsMuted((muted) => !muted)}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/10 text-white/70 backdrop-blur-sm transition hover:border-white/40 hover:text-white"
            >
              {isMuted ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
