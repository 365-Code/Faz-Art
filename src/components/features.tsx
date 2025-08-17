import { Card, CardContent } from "@/components/ui/card"
import { Truck, Shield, Palette, Wrench } from "lucide-react"

const features = [
  {
    icon: Palette,
    title: "Custom Design",
    description: "Bespoke marble solutions tailored to your unique vision and space requirements.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Every piece comes with our comprehensive quality assurance and warranty.",
  },
  {
    icon: Truck,
    title: "Global Delivery",
    description: "Secure worldwide shipping with professional handling and installation services.",
  },
  {
    icon: Wrench,
    title: "Expert Installation",
    description: "Professional installation by certified craftsmen for perfect results.",
  },
]

export function Features() {
  return (
    <section className="py-32">
      <div className="container px-4 mx-auto">
        <div className="text-center space-y-6 mb-20">
          <h2 className="font-heading text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Why Choose Us
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Experience unparalleled service and quality with every marble piece you choose
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 bg-card/50 glass-effect hover:bg-card/80 transition-all duration-300 group"
            >
              <CardContent className="p-8 text-center space-y-4">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm font-light leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
