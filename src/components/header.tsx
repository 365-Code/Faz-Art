"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

const navigation = [
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "Craftsmanship",
    href: "/craftsmanship",
  },
  {
    label: "Our Story",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const whatsappUrl =
  "https://wa.me/+917852057102?text=Hi%2C%20I'm%20interested%20in%20your%20marble%20collections.";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main navigation */}
      <div
        className={cn(
          "border-b border-border/40 bg-background/80 backdrop-blur-xl",
          "supports-[backdrop-filter]:bg-background/65",
          "transition-all duration-300",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 lg:px-8">
          {/* Brand */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <div className="relative size-9 overflow-hidden rounded-full ring-1 ring-border/60 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.jpg"
                alt="The Artisans Gallery"
                fill
                sizes="36px"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="font-heading text-[15px] font-semibold leading-none tracking-[-0.01em]">
                The Artisans Gallery
              </span>

              <span className="mt-1 text-[8px] uppercase tracking-[0.28em] text-muted-foreground">
                Marble · Craft · Art
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-2 text-[13px] font-medium tracking-wide",
                    "text-muted-foreground transition-colors duration-200",
                    "hover:text-foreground",
                    isActive && "text-foreground",
                  )}
                >
                  {item.label}

                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-[1px] mx-auto h-px",
                      "origin-center bg-foreground transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                      "group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            <Link
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block"
            >
              <Button
                className={cn(
                  "group h-10 rounded-full px-5",
                  "text-[13px] font-medium",
                  "shadow-none transition-all duration-300",
                  "hover:gap-3",
                  "cursor-pointer",
                )}
              >
                Enquire
                <ArrowUpRight className="ml-1 size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </Link>

            {/* Mobile menu trigger */}
            <Button
              variant="ghost"
              size="icon"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="size-10 rounded-full md:hidden"
            >
              {isMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "absolute left-0 right-0 top-[72px] overflow-hidden",
          "border-b border-border/40 bg-background/95 backdrop-blur-2xl",
          "transition-all duration-300 md:hidden",
          isMenuOpen
            ? "visible max-h-[calc(100vh-72px)] opacity-100"
            : "invisible max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-[1440px] flex-col px-5 pb-8 pt-4">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "flex items-center justify-between border-b border-border/40 py-5",
                  "text-lg font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span>{item.label}</span>

                <ArrowUpRight className="size-4 opacity-50" />
              </Link>
            );
          })}

          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-6"
          >
            <Button className="group h-12 w-full rounded-full text-sm">
              Start an Enquiry
              <ArrowUpRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </Link>

          <p className="mt-6 text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Handcrafted in Makrana, India
          </p>
        </nav>
      </div>
    </header>
  );
}
