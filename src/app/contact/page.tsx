import { ContactForm } from "@/components/contact-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Showroom",
      details: [
        "123 Marble Avenue",
        "Luxury District, LD 12345",
        "United States",
      ],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: [
        "+1 (555) 123-4567",
        "+1 (555) 123-4568",
        "Toll-free: 1-800-MARBLE",
      ],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@mineart.com", "sales@mineart.com", "support@mineart.com"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
        "Sunday: Closed",
      ],
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
                Contact Us
              </span>
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Ready to transform your space with premium marble? Get in touch
              with our experts and let&apos;s bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <ContactForm />

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading text-3xl md:text-4xl font-bold">
                  Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We&apos;re here to help you find the perfect marble solution
                  for your project.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="border-0 bg-card/50">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                          <info.icon className="h-5 w-5 text-foreground" />
                        </div>
                        {info.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-1">
                        {info.details.map((detail, idx) => (
                          <p
                            key={idx}
                            className="text-muted-foreground text-sm"
                          >
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Visit Our Showroom
            </h2>
            <p className="text-muted-foreground">
              Experience our marble collections in person at our luxury showroom
            </p>
          </div>

          <Card className="border-0 overflow-hidden">
            <div className="aspect-[16/9] bg-muted flex items-center justify-center">
              <div className="text-center space-y-4">
                <MapPin className="h-16 w-16 mx-auto text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="font-heading text-xl font-semibold">
                    Interactive Map
                  </h3>
                  <p className="text-muted-foreground">
                    Map integration would be implemented here
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading text-3xl md:text-4xl font-bold">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-muted-foreground font-light">
                Schedule a consultation with our marble experts and bring your
                vision to life.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                Schedule Consultation
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent">
                Request Quote
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
