import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-800 dark:to-amber-900" />
              <span className="font-display text-2xl font-bold">MineArt</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Crafting timeless elegance with premium marble collections for discerning clients worldwide.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Collections</h3>
            <div className="space-y-2">
              <Link
                href="/collections/decorative"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Decorative Items
              </Link>
              <Link
                href="/collections/basins"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Luxury Basins
              </Link>
              <Link
                href="/collections/tables"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Marble Tables
              </Link>
              <Link
                href="/collections/architectural"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Architectural Elements
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <div className="space-y-2">
              <Link
                href="/services/consultation"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Design Consultation
              </Link>
              <Link
                href="/services/installation"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Professional Installation
              </Link>
              <Link
                href="/services/maintenance"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Maintenance Services
              </Link>
              <Link
                href="/services/custom"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Custom Solutions
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>123 Marble Avenue</p>
              <p>Luxury District, LD 12345</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Email: info@mineart.com</p>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} MineArt. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
