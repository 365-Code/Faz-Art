import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Gem, Clock } from "lucide-react";

export function About() {
  return (
    <section className="py-32 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="font-heading text-5xl md:text-6xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Crafting Excellence
                </span>
                <br />
                <span className="text-muted-foreground">Since 1998</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                We are passionate artisans dedicated to bringing you the finest
                marble collections from around the world. Each piece tells a
                story of geological wonder and human craftsmanship.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50">
                <CardContent className="p-6 text-center space-y-3">
                  <Award className="h-8 w-8 mx-auto text-blue-600 dark:text-blue-400" />
                  <div className="font-heading text-3xl font-bold">15+</div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Years Experience
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/50 dark:to-emerald-900/50">
                <CardContent className="p-6 text-center space-y-3">
                  <Users className="h-8 w-8 mx-auto text-emerald-600 dark:text-emerald-400" />
                  <div className="font-heading text-3xl font-bold">1000+</div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Happy Clients
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50">
                <CardContent className="p-6 text-center space-y-3">
                  <Gem className="h-8 w-8 mx-auto text-amber-600 dark:text-amber-400" />
                  <div className="font-heading text-3xl font-bold">25+</div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Marble Types
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50">
                <CardContent className="p-6 text-center space-y-3">
                  <Clock className="h-8 w-8 mx-auto text-purple-600 dark:text-purple-400" />
                  <div className="font-heading text-3xl font-bold">24/7</div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Support
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
              <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Gem className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground font-medium">
                    Premium Marble Showcase
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
