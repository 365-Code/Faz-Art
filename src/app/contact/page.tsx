import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const contactDetails = [
  {
    icon: MapPin,
    label: "Based in",
    value: "Makrana, Rajasthan, India",
    description: "The heart of India's marble craftsmanship.",
  },
  {
    icon: Phone,
    label: "Call / WhatsApp",
    value: "+91 78520 57102",
    description: "For product enquiries and custom requirements.",
  },
  {
    icon: Mail,
    label: "Email",
    value: "theartisansgallery07@gmail.com",
    description: "Send us your requirements anytime.",
  },
];

const enquirySteps = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Share the product, quantity, dimensions, finish, or any reference you have in mind.",
  },
  {
    number: "02",
    title: "We discuss the details",
    description:
      "Our team will understand your requirements and help you select the right piece.",
  },
  {
    number: "03",
    title: "We prepare your enquiry",
    description:
      "Once the details are clear, we can discuss pricing, customization, and delivery.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* ==================================================
          HERO
      ================================================== */}
      <section className="px-6 pb-20 pt-10 sm:pb-24 lg:px-10 lg:pb-28 lg:pt-14">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_2fr] lg:gap-12">
            {/* Eyebrow */}
            <div className="flex items-start">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/40" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                  Get in touch
                </span>
              </div>
            </div>

            {/* Heading */}
            <div>
              <h1 className="max-w-5xl font-serif text-6xl font-normal leading-[0.9] tracking-[-0.055em] sm:text-7xl lg:text-[8rem]">
                Let&apos;s create
                <br />
                something <span className="text-muted-foreground">timeless.</span>
              </h1>

              <div className="mt-10 max-w-2xl">
                <p className="text-base leading-8 text-muted-foreground sm:text-lg">
                  Looking for a distinctive marble piece for your space?
                  Tell us what you have in mind. From individual handcrafted
                  pieces to custom requirements, we&apos;d be happy to discuss
                  it with you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          ENQUIRY + CONTACT DETAILS
      ================================================== */}
      <section className="border-y border-border/60">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[1.35fr_0.65fr]">
          {/* Form */}
          <div className="px-6 py-16 sm:px-10 sm:py-20 lg:border-r lg:border-border/60 lg:px-16 lg:py-24">
            <div className="mb-10 max-w-xl">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Start an enquiry
              </p>

              <h2 className="mt-4 font-serif text-4xl font-normal tracking-tight sm:text-5xl">
                Tell us about your project.
              </h2>

              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                The more details you share, the better we can understand what
                you are looking for.
              </p>
            </div>

            <ContactForm />
          </div>

          {/* Direct contact */}
          <aside className="px-6 py-16 sm:px-10 sm:py-20 lg:px-12 lg:py-24">
            <div className="flex h-full flex-col">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                  Direct contact
                </p>

                <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight">
                  Prefer to talk?
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  For a quicker conversation, reach us directly through
                  WhatsApp or phone.
                </p>
              </div>

              <div className="mt-10 space-y-7">
                {contactDetails.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div key={item.label} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border">
                        <Icon className="h-4 w-4 text-foreground" />
                      </div>

                      <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                          {item.label}
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {item.value}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto pt-12">
                <Separator />

                <div className="pt-8">
                  <div className="flex items-center gap-3">
                    <Clock3 className="h-4 w-4 text-muted-foreground" />

                    <p className="text-xs text-muted-foreground">
                      We&apos;ll get back to your enquiry as soon as possible.
                    </p>
                  </div>

                  <Link
                    href="https://wa.me/917852057102?text=Hi%2C%20I'm%20interested%20in%20your%20marble%20handicraft%20products."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block"
                  >
                    <Button className="w-full rounded-none">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat on WhatsApp
                      <ArrowUpRight className="ml-auto h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ==================================================
          HOW IT WORKS
      ================================================== */}
      <section className="px-6 py-20 sm:py-24 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_2fr] lg:gap-12">
            {/* Intro */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-foreground/40" />

                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                  The process
                </span>
              </div>
            </div>

            {/* Steps */}
            <div>
              <h2 className="max-w-3xl font-serif text-4xl font-normal leading-tight tracking-tight sm:text-5xl">
                From an idea to a piece worth keeping.
              </h2>

              <div className="mt-14 grid border-t border-border/60 sm:grid-cols-3">
                {enquirySteps.map((step) => (
                  <div
                    key={step.number}
                    className="border-b border-border/60 py-8 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
                  >
                    <span className="text-xs text-muted-foreground">
                      {step.number}
                    </span>

                    <h3 className="mt-5 text-lg font-medium">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          LOCATION
      ================================================== */}
      <section className="border-t border-border/60">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden bg-muted lg:min-h-[500px]">
            {/* Replace this block with your actual showroom/workshop image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />

                <p className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Makrana, Rajasthan
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
            <div className="max-w-lg">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                Where we are
              </p>

              <h2 className="mt-4 font-serif text-4xl font-normal tracking-tight sm:text-5xl">
                From the heart of Makrana.
              </h2>

              <p className="mt-6 text-sm leading-8 text-muted-foreground">
                The Artisans Gallery is based in Makrana, Rajasthan — a place with
                a long-standing connection to marble craftsmanship. Our work
                brings that material and tradition into distinctive handcrafted
                pieces for contemporary spaces.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>Makrana, Rajasthan, India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          FINAL CTA
      ================================================== */}
      <section className="px-6 py-24 sm:py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
            Have something in mind?
          </p>

          <h2 className="mt-6 font-serif text-5xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Let&apos;s start a conversation.
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-muted-foreground">
            Whether you&apos;re looking for a particular piece or exploring a
            custom requirement, we&apos;re happy to hear from you.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="https://wa.me/917852057102?text=Hi%2C%20I'd%20like%20to%20discuss%20a%20marble%20handicraft%20requirement."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="h-12 w-full rounded-none px-8 sm:w-auto">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Us
              </Button>
            </Link>

            <Link href="/collections">
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-none bg-transparent px-8 sm:w-auto"
              >
                Explore Collections
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}