import { Quote } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "The piece became the focal point of the room without ever feeling excessive. The natural variation in the marble is what makes it special.",
    name: "Private Client",
    role: "Residential Project",
    location: "Mumbai, India",
  },
  {
    quote:
      "We were looking for something that felt timeless rather than decorative. The craftsmanship and character of the marble made all the difference.",
    name: "Interior Designer",
    role: "Hospitality Project",
    location: "New Delhi, India",
  },
  {
    quote:
      "There is something very different about seeing the stone in person. Every detail feels considered, from the form to the final finish.",
    name: "Private Client",
    role: "Residential Project",
    location: "Rajasthan, India",
  },
];

export function Testimonials() {
  return (
    <section className="bg-muted/30 px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1440px]">

        {/* ------------------------------------------------
            HEADER
        ------------------------------------------------ */}
        <div className="flex flex-col gap-6 border-b border-border/60 pb-10 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/40" />

              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                Client Perspective
              </span>
            </div>

            <h2 className="mt-6 max-w-3xl font-serif text-5xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Pieces that become
              <br />
              <span className="italic font-light text-muted-foreground">
                part of the space.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-7 text-muted-foreground">
            A few words from the people and designers who have brought
            The Artisans Gallery pieces into their spaces.
          </p>

        </div>

        {/* ------------------------------------------------
            TESTIMONIALS
        ------------------------------------------------ */}
        <div className="grid gap-0 md:grid-cols-3">

          {testimonials.map((testimonial, index) => (
            <article
              key={`${testimonial.name}-${index}`}
              className="
                relative
                border-b border-border
                py-10
                md:border-b-0
                md:border-r
                md:px-8
                md:first:pl-0
                md:last:border-r-0
                md:last:pr-0
                lg:py-14
                lg:px-12
              "
            >
              {/* Quote icon */}
              <Quote
                className="size-5 text-muted-foreground/40"
                strokeWidth={1.5}
              />

              {/* Quote */}
              <blockquote className="mt-8 font-serif text-xl leading-[1.35] tracking-[-0.015em] sm:text-2xl">
                “{testimonial.quote}”
              </blockquote>

              {/* Client */}
              <div className="mt-10">

                <p className="text-xs font-medium uppercase tracking-[0.2em]">
                  {testimonial.name}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  {testimonial.role}
                </p>

                <p className="mt-1 text-xs text-muted-foreground/70">
                  {testimonial.location}
                </p>

              </div>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}