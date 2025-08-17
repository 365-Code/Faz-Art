"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2, Mail, Send } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ContactType } from "./contact-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactZodSchema } from "@/lib/types";
import { createContact } from "@/lib/actions";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import z from "zod";

const emailSchema = z.email("Invalid Email Format");

export function CTA() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [inputEmail, setInputEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleGetStarted = () => {
    const result = emailSchema.safeParse(inputEmail);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError("");
    setIsContactOpen(true);
  };

  return (
    <section className="py-32 bg-gradient-to-br from-muted/30 to-background">
      <div className="container px-4 text-center mx-auto">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="space-y-6">
            <h2 className="font-heading text-5xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Ready to Transform
              </span>
              <br />
              <span className="text-muted-foreground">Your Space?</span>
            </h2>
            <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
              Get in touch with our marble experts and discover the perfect
              pieces for your project.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                onChange={(e) => {
                  setInputEmail(e.target.value);
                  setError("");
                }}
                placeholder="Enter your email"
                className={`pl-12 h-14 text-base rounded-full border-2 bg-background/50 glass-effect ${
                  error && "border border-red-500"
                }`}
              />
            </div>
            <Button
              size="lg"
              className="h-14 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90"
              onClick={handleGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 rounded-full border-2 bg-transparent"
            >
              Schedule Consultation
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="h-12 px-8 rounded-full"
            >
              View Portfolio
            </Button>
          </div>
        </div>
      </div>
      {isContactOpen && (
        <ContactDialog
          isOpen={isContactOpen}
          openChange={setIsContactOpen}
          inputEmail={inputEmail}
        />
      )}
    </section>
  );
}

const ContactDialog = ({
  isOpen,
  openChange,
  inputEmail,
}: {
  isOpen: boolean;
  openChange: (open: boolean) => void;
  inputEmail: string;
}) => {
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
    <Dialog open={isOpen} onOpenChange={openChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get In Touch</DialogTitle>
          <DialogDescription>
            Fill out the form below and our team will get back to you within 24
            hours. For urgent inquiries, please call us directly.
          </DialogDescription>
        </DialogHeader>
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
              defaultValue={inputEmail}
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
      </DialogContent>
    </Dialog>
  );
};
