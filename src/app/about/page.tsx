import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Gem, Clock } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Users, label: "Happy Clients", value: "1000+" },
    { icon: Gem, label: "Marble Types", value: "25+" },
    { icon: Clock, label: "Support", value: "24/7" },
  ];

  const team = [
    {
      name: "Alessandro Romano",
      role: "Master Craftsman",
      image: "/team-1.svg?height=300&width=300&text=Alessandro+Romano",
      description:
        "With over 20 years of experience in marble craftsmanship, Alessandro leads our artisan team.",
    },
    {
      name: "Maria Benedetti",
      role: "Design Director",
      image: "/team-2.svg?height=300&width=300&text=Maria+Benedetti",
      description:
        "Maria brings contemporary design sensibilities to traditional marble working techniques.",
    },
    {
      name: "Giuseppe Carrera",
      role: "Quality Specialist",
      image: "/team-1.svg?height=300&width=300&text=Giuseppe+Carrera",
      description:
        "Giuseppe ensures every piece meets our exacting standards for quality and beauty.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="font-heading text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                About MineArt
              </span>
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              For over 15 years, we have been dedicated to bringing you the
              finest marble collections from around the world. Each piece tells
              a story of geological wonder and human craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 1998 by master craftsman Alessandro Romano, Luxe
                    Marble began as a small family workshop in the heart of
                    Italy&apos;s marble region. What started as a passion for
                    transforming raw stone into works of art has grown into a
                    globally recognized brand.
                  </p>
                  <p>
                    Our journey has taken us from the quarries of Carrara to the
                    workshops of skilled artisans worldwide. We&apos;ve built
                    relationships with the finest marble suppliers and
                    craftspeople, ensuring that every piece in our collection
                    meets the highest standards of quality and beauty.
                  </p>
                  <p>
                    Today, we continue to honor traditional techniques while
                    embracing modern design sensibilities, creating marble
                    pieces that are both timeless and contemporary.
                  </p>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                View Our Process
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-muted">
                <Image
                  src="/about.jpg?height=600&width=480&text=Marble+Workshop"
                  alt="Our marble workshop"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
              By the Numbers
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Our commitment to excellence is reflected in our achievements
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 bg-card/50 text-center">
                <CardContent className="p-8 space-y-4">
                  <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <stat.icon className="h-8 w-8 text-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="font-heading text-4xl font-bold">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              The passionate artisans and designers behind every piece in our
              collection
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 bg-card/50 overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-heading text-xl font-semibold">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground font-medium">
                      {member.role}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-16">
            <div className="space-y-6">
              <h2 className="font-heading text-4xl md:text-5xl font-bold tracking-tight">
                Our Values
              </h2>
              <p className="text-xl text-muted-foreground font-light">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
                  <Gem className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold">
                  Quality First
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We never compromise on quality, sourcing only the finest
                  marble and employing master craftsmen.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900 dark:to-emerald-800 flex items-center justify-center">
                  <Users className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold">
                  Customer Focus
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Every decision we make is guided by what&apos;s best for our
                  customers and their unique needs.
                </p>
              </div>

              <div className="space-y-4">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 flex items-center justify-center">
                  <Award className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="font-heading text-xl font-semibold">
                  Craftsmanship
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We honor traditional techniques while embracing innovation to
                  create truly exceptional pieces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
