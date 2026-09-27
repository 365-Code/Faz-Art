import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Project = {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
};

const projects: Project[] = [
  {
    id: "01",
    title: "A Quiet Residence",
    location: "Mumbai, India",
    category: "Private Residence",
    image:
      "https://res.cloudinary.com/dlqyylssk/image/upload/v1754811098/mine-art/ck5fuflp868nsz2lm6sf.jpg",
  },
  {
    id: "02",
    title: "Contemporary Retreat",
    location: "Rajasthan, India",
    category: "Hospitality",
    image:
      "https://res.cloudinary.com/dlqyylssk/image/upload/v1755277839/faxvofoidq33x5hzyter.jpg",
  },
  {
    id: "03",
    title: "The Modern Residence",
    location: "New Delhi, India",
    category: "Private Residence",
    image:
      "https://res.cloudinary.com/dlqyylssk/image/upload/v1755277885/vnsynhe1t2wz3e384uvy.jpg",
  },
];

export function Projects() {
  return (
    <section className="bg-background px-6 py-28 lg:px-10 lg:py-40">
      <div className="mx-auto max-w-[1440px]">

        {/* ------------------------------------------------
            HEADER
        ------------------------------------------------ */}
        <div className="grid gap-8 border-b border-border/60 pb-10 lg:grid-cols-[1fr_1.4fr] lg:items-end">

          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-foreground/40" />

              <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
                In Their Element
              </span>
            </div>

            <h2 className="mt-6 font-serif text-5xl font-normal leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Made for
              <br />
              <span className="italic font-light text-muted-foreground">
                considered spaces.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            Our pieces are created to live within spaces, not simply
            occupy them. Explore selected interiors where natural marble,
            architecture and everyday life come together.
          </p>

        </div>

        {/* ------------------------------------------------
            PROJECTS
        ------------------------------------------------ */}
        <div className="mt-12">

          {/* Featured project */}
          <Link
            href="/projects"
            className="group relative block overflow-hidden"
          >
            <div className="relative aspect-[16/9] min-h-[480px] sm:min-h-0">

              <Image
                src={projects[0].image}
                alt={projects[0].title}
                fill
                sizes="100vw"
                className="
                  object-cover
                  transition-transform
                  duration-1000
                  ease-out
                  group-hover:scale-[1.025]
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              {/* Project number */}
              <span className="absolute left-6 top-6 text-[10px] font-medium tracking-[0.3em] text-white/60 lg:left-8 lg:top-8">
                {projects[0].id}
              </span>

              {/* Arrow */}
              <div
                className="
                  absolute right-6 top-6
                  flex size-11 items-center justify-center
                  rounded-full border border-white/30
                  bg-black/10 text-white
                  backdrop-blur-md
                  transition-all duration-500
                  group-hover:border-white
                  group-hover:bg-white
                  group-hover:text-black
                  lg:right-8 lg:top-8
                "
              >
                <ArrowUpRight
                  className="
                    size-4
                    transition-transform duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">

                <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/55">
                  {projects[0].category}
                </p>

                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                  <h3 className="font-serif text-3xl font-normal tracking-[-0.025em] text-white sm:text-4xl lg:text-5xl">
                    {projects[0].title}
                  </h3>

                  <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                    {projects[0].location}
                  </span>

                </div>
              </div>

            </div>
          </Link>

          {/* ------------------------------------------------
              SECONDARY PROJECTS
          ------------------------------------------------ */}
          <div className="mt-5 grid gap-5 md:grid-cols-2">

            {projects.slice(1).map((project) => (
              <Link
                key={project.id}
                href="/projects"
                className="group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">

                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="
                      object-cover
                      transition-transform
                      duration-1000
                      ease-out
                      group-hover:scale-[1.035]
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Number */}
                  <span className="absolute left-5 top-5 text-[10px] tracking-[0.3em] text-white/60">
                    {project.id}
                  </span>

                  {/* Arrow */}
                  <div
                    className="
                      absolute right-5 top-5
                      flex size-10 items-center justify-center
                      rounded-full border border-white/30
                      bg-black/10 text-white
                      backdrop-blur-md
                      transition-all duration-500
                      group-hover:border-white
                      group-hover:bg-white
                      group-hover:text-black
                    "
                  >
                    <ArrowUpRight className="size-4" />
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">

                    <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/55">
                      {project.category}
                    </p>

                    <div className="mt-2 flex items-end justify-between gap-4">

                      <h3 className="font-serif text-2xl font-normal text-white">
                        {project.title}
                      </h3>

                      <span className="shrink-0 text-[10px] uppercase tracking-[0.18em] text-white/55">
                        {project.location}
                      </span>

                    </div>

                  </div>

                </div>
              </Link>
            ))}

          </div>

        </div>

        {/* ------------------------------------------------
            FOOTER
        ------------------------------------------------ */}
        <div className="mt-10 flex flex-col gap-5 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between">

          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Explore more spaces featuring handcrafted marble from
            The Artisans Gallery.
          </p>

          <Link
            href="/projects"
            className="
              group inline-flex w-fit items-center
              text-xs font-medium uppercase tracking-[0.22em]
              text-foreground
            "
          >
            View all projects

            <ArrowUpRight
              className="
                ml-2 size-4
                transition-transform duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>

        </div>

      </div>
    </section>
  );
}