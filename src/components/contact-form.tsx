"use client"

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { createContact } from "@/lib/actions";
import { Label } from "@/components/ui/label";
import { Send, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ContactZodSchema } from "@/lib/types";
import z from "zod";
import { Button } from "./ui/button";

export type ContactType = z.infer<typeof ContactZodSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactType>({
    resolver: zodResolver(ContactZodSchema),
  });

  const onSubmit = async (data: ContactType) => {
    try {
      // You can send data to an API or perform any action here
      const contactData = new FormData();
      contactData.append("firstName", data.firstName);
      contactData.append("lastName", data.lastName);
      contactData.append("email", data.email);
      contactData.append("phone", data.phone.replaceAll(" ", ""));
      contactData.append("subject", data.subject);
      contactData.append("message", data.message);

      await createContact(contactData);
      reset();

      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold">
          Get In Touch
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Fill out the form below and our team will get back to you within 24
          hours. For urgent inquiries, please call us directly.
        </p>
      </div>
      <Card className="border-0 bg-card/50">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register("firstName")}
                  className="bg-background"
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                  className="bg-background"
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className="bg-background"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register("phone")}
                className="bg-background"
                disabled={isSubmitting}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">
                Subject *
              </Label>
              <Input
                id="subject"
                placeholder="Project inquiry"
                {...register("subject")}
                className="bg-background"
                disabled={isSubmitting}
              />
              {errors.subject && (
                <p className="text-red-500 text-sm">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Message *
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                rows={6}
                {...register("message")}
                className="bg-background resize-none"
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-foreground text-background hover:bg-foreground/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" /> Sending
                </>
              ) : (
                <>
                  Send Message <Send />
                </>
              )}{" "}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
