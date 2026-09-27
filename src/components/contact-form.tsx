"use client";

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
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactType) => {
    try {
      const contactData = new FormData();

      contactData.append("firstName", data.firstName.trim());
      contactData.append("lastName", data.lastName.trim());
      contactData.append("email", data.email.trim());
      contactData.append("phone", data.phone?.replace(/\s+/g, "").trim() ?? "");
      contactData.append("subject", data.subject.trim());
      contactData.append("message", data.message.trim());

      await createContact(contactData);

      reset();

      toast.success("Message sent successfully!", {
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);

      toast.error("Unable to send your message.", {
        description: "Please try again in a moment.",
      });
    }
  };

  const getFieldClassName = (hasError: boolean) =>
    `bg-background transition-colors ${
      hasError
        ? "border-destructive focus-visible:ring-destructive"
        : ""
    }`;

  return (
    <div className="space-y-8">
      {/* Intro */}
      <div className="space-y-4">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">
          Get In Touch
        </h2>

        <p className="max-w-2xl leading-relaxed text-muted-foreground">
          Fill out the form below and our team will get back to you within 24
          hours. For urgent inquiries, please call us directly.
        </p>
      </div>

      {/* Form Card */}
      <Card className="border border-border/50 bg-card/50 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            {/* Required Fields Notice */}
            <p className="text-xs text-muted-foreground">
              Fields marked with <span className="text-destructive">*</span>{" "}
              are required.
            </p>

            {/* Name */}
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">
                  First Name <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  autoComplete="given-name"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={
                    errors.firstName ? "firstName-error" : undefined
                  }
                  {...register("firstName")}
                  className={getFieldClassName(!!errors.firstName)}
                  disabled={isSubmitting}
                />

                {errors.firstName && (
                  <p
                    id="firstName-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">
                  Last Name <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  autoComplete="family-name"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={
                    errors.lastName ? "lastName-error" : undefined
                  }
                  {...register("lastName")}
                  className={getFieldClassName(!!errors.lastName)}
                  disabled={isSubmitting}
                />

                {errors.lastName && (
                  <p
                    id="lastName-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email Address <span className="text-destructive">*</span>
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                autoComplete="email"
                inputMode="email"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
                className={getFieldClassName(!!errors.email)}
                disabled={isSubmitting}
              />

              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>

              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                {...register("phone")}
                className={getFieldClassName(!!errors.phone)}
                disabled={isSubmitting}
              />

              {errors.phone && (
                <p
                  id="phone-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">
                Subject <span className="text-destructive">*</span>
              </Label>

              <Input
                id="subject"
                type="text"
                placeholder="Project inquiry"
                aria-invalid={!!errors.subject}
                aria-describedby={
                  errors.subject ? "subject-error" : undefined
                }
                {...register("subject")}
                className={getFieldClassName(!!errors.subject)}
                disabled={isSubmitting}
              />

              {errors.subject && (
                <p
                  id="subject-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-destructive">*</span>
              </Label>

              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                rows={7}
                aria-invalid={!!errors.message}
                aria-describedby={
                  errors.message ? "message-error" : undefined
                }
                {...register("message")}
                className={`${getFieldClassName(
                  !!errors.message
                )} min-h-[160px] resize-none`}
                disabled={isSubmitting}
              />

              {errors.message && (
                <p
                  id="message-error"
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                size="lg"
                className="w-full bg-foreground text-background transition-all hover:bg-foreground/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}