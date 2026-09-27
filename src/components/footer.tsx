import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, } from "lucide-react";

const collectionLinks = [
  {
    label: "Wash Basins",
    href: "/collections/elegant-wash-basins",
  },
  {
    label: "Console Tables",
    href: "/collections/stone-consol-tables",
  },
  {
    label: "Stone Bathtubs",
    href: "/collections/stone-bathtubs",
  },
  {
    label: "Sculptural Vases",
    href: "/collections/stone-sculpted-grace-vases",
  },
  {
    label: "Decorative Objects",
    href: "/collections/artful-accents-decorative-items",
  },
];

const exploreLinks = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Craftsmanship",
    href: "/craftsmanship",
  },
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com/artisans_gallery_07",
    Logo: <Instagram className="size-4" />,
  },
  // {
  //   label: "Facebook",
  //   href: "#",
  //   Logo: <Facebook className="size-4" />,
  // },
  // {
  //   label: "YouTube",
  //   href: "#",
  //   Logo: <Youtube className="size-4" />,
  // },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      {/* ==================================================
          MAIN FOOTER
      ================================================== */}
      <div className="mx-auto max-w-[1440px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* ------------------------------------------------
              BRAND
          ------------------------------------------------ */}
          <div className="max-w-sm">
            <Link href="/" className="group inline-flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="The Artisans Gallery"
                width={42}
                height={42}
                className="rounded-full object-cover"
              />

              <span className="font-serif text-2xl tracking-[-0.02em]">
                The Artisans Gallery
              </span>
            </Link>

            <p className="mt-7 max-w-xs text-sm leading-7 text-muted-foreground">
              Handcrafted marble objects shaped by natural stone, skilled hands
              and a quiet appreciation for timeless design.
            </p>

            {/* Social */}
            <div className="mt-8 flex items-center gap-3">
              {socials.map((social) => (
                <SocialLink key={social.label} href={social.href} label={social.label}>
                  {/* <Instagram className="size-4" /> */}
                  {social.Logo}
                </SocialLink>
              ))}
            </div>
          </div>

          {/* ------------------------------------------------
              COLLECTIONS
          ------------------------------------------------ */}
          <FooterColumn title="Collections">
            {collectionLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* ------------------------------------------------
              EXPLORE
          ------------------------------------------------ */}
          <FooterColumn title="Explore">
            {exploreLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* ------------------------------------------------
              CONTACT
          ------------------------------------------------ */}
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
              Visit / Enquire
            </p>

            <div className="mt-6 space-y-2 text-sm leading-6 text-muted-foreground">
              <p>The Artisans Gallery</p>
              <p>Plot No.2, Rajora Baas, Gunawati Road</p>
              <p>Makrana, Rajasthan 341505</p>
            </div>

            <div className="mt-6 space-y-2">
              <a
                href="tel:+917852057102"
                className="
                  block text-sm text-foreground
                  transition-colors hover:text-muted-foreground
                "
              >
                +91 7852 057102
              </a>

              <a
                href="mailto:theartisansgallery07@gmail.com"
                className="
                  block text-sm text-foreground
                  transition-colors hover:text-muted-foreground
                "
              >
                theartisansgallery07@gmail.com
              </a>
            </div>

            <Link
              href="/contact"
              className="
                group mt-7 inline-flex items-center
                border-b border-foreground/20 pb-2
                text-[10px] font-medium uppercase
                tracking-[0.25em]
                transition-colors duration-300
                hover:border-foreground/60
              "
            >
              Start a conversation
              <ArrowUpRight
                className="
                  ml-2 size-3.5
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>
        </div>

        {/* ==================================================
            LARGE BRAND STATEMENT
        ================================================== */}
        <div className="mt-24 border-t border-border/60 pt-12 lg:mt-32">
          <p className="max-w-5xl font-serif text-3xl leading-[1.05] tracking-[-0.03em] text-foreground sm:text-4xl lg:text-5xl">
            Natural stone.
            <span className="italic text-muted-foreground">
              {" "}
              Shaped by hand.
            </span>{" "}
            Made to become part of your space.
          </p>
        </div>

        {/* ==================================================
            BOTTOM BAR
        ================================================== */}
        <div className="mt-12 flex flex-col gap-5 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} The Artisans Gallery
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="
                text-[10px] uppercase tracking-[0.2em]
                text-muted-foreground
                transition-colors hover:text-foreground
              "
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="
                text-[10px] uppercase tracking-[0.2em]
                text-muted-foreground
                transition-colors hover:text-foreground
              "
            >
              Terms
            </Link>
          </div>

          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Makrana · Rajasthan · India
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ======================================================
   FOOTER COLUMN
====================================================== */

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
        {title}
      </p>

      <nav className="mt-6 flex flex-col items-start gap-3">{children}</nav>
    </div>
  );
}

/* ======================================================
   FOOTER LINK
====================================================== */

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        group relative
        text-sm text-muted-foreground
        transition-colors duration-300
        hover:text-foreground
      "
    >
      <span>{children}</span>

      <span
        className="
          absolute -bottom-1 left-0 h-px w-0
          bg-foreground
          transition-all duration-300
          group-hover:w-full
        "
      />
    </Link>
  );
}

/* ======================================================
   SOCIAL LINK
====================================================== */

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="
        flex size-9 items-center justify-center
        rounded-full border border-border
        text-muted-foreground
        transition-all duration-300
        hover:border-foreground
        hover:text-foreground
      "
    >
      {children}
    </Link>
  );
}
