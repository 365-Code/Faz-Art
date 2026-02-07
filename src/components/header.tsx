"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 glass-effect border-b border-border/50">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-3">
          {/* <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-foreground to-muted-foreground" /> */}
          <Image
            unoptimized
            width={40}
            height={40}
            src={"/logo.jpg"}
            alt="logo.jpg"
            className="rounded-full"
          />
          <span className="font-heading text-xl font-bold">MineArt</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-sm font-medium hover:text-foreground/80 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/collections"
            className="text-sm font-medium hover:text-foreground/80 transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-foreground/80 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-foreground/80 transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Link
            href="https://wa.me/1234567890?text=Hi%2C%20I'm%20interested%20in%20getting%20a%20quote%20for%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="hidden md:inline-flex rounded-full">
              Get Quote
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 glass-effect absolute h-screen w-full">
          <nav className="container flex flex-col space-y-4 px-4 py-6">
            <Link
              href="/"
              className="text-sm font-medium hover:text-foreground/80 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium hover:text-foreground/80 transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-foreground/80 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-foreground/80 transition-colors"
            >
              Contact
            </Link>
            <Button className="w-full rounded-full">Get Quote</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
