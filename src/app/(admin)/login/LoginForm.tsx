"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { login } from "./actions";

export default function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          {/* =====================================================
              BRAND
          ====================================================== */}
          <div className="mb-10 text-center">
            <Link
              href="/"
              className="group inline-flex flex-col items-center"
            >
              <div className="relative mb-4 h-14 w-14 overflow-hidden rounded-full border border-border bg-muted shadow-sm">
                <Image
                  src="/logo.jpg"
                  alt="Artisan Gallery"
                  fill
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <span className="font-serif text-2xl tracking-tight">
                Artisan Gallery
              </span>
            </Link>
          </div>

          {/* =====================================================
              LOGIN
          ====================================================== */}
          <Card className="border-border/60 bg-card shadow-sm">
            <CardHeader className="space-y-4 border-b border-border/60 px-6 py-7 sm:px-8">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="h-px w-7 bg-foreground/40" />

                    <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">
                      Admin Portal
                    </span>
                  </div>

                  <CardTitle className="font-serif text-3xl font-normal tracking-tight">
                    Sign in
                  </CardTitle>

                  <CardDescription className="text-sm leading-6">
                    Sign in to continue to the administration area.
                  </CardDescription>
                </div>

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted/40">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="px-6 py-7 sm:px-8">
              <form action={loginAction} className="space-y-6">
                {/* Username */}
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-xs font-medium uppercase tracking-[0.12em]"
                  >
                    Username
                  </Label>

                  <div className="relative">
                    <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      placeholder="Enter username"
                      required
                      className="h-12 border-border/70 bg-background pl-10 shadow-none transition-colors focus-visible:border-foreground/40 focus-visible:ring-1 focus-visible:ring-foreground/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-xs font-medium uppercase tracking-[0.12em]"
                  >
                    Password
                  </Label>

                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter password"
                      required
                      className="h-12 border-border/70 bg-background pl-10 pr-11 shadow-none transition-colors focus-visible:border-foreground/40 focus-visible:ring-1 focus-visible:ring-foreground/20"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {state?.errors?.message && (
                  <div
                    role="alert"
                    className="border border-destructive/20 bg-destructive/5 px-4 py-3"
                  >
                    <p className="text-sm text-destructive">
                      {state.errors.message}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <SubmitButton />
              </form>
            </CardContent>
          </Card>

          {/* =====================================================
              FOOTER
          ====================================================== */}
          <div className="mt-7 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <LockKeyhole className="h-3 w-3" />
              Secure administrator access
            </div>

            <Link
              href="/"
              className="group flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Return to website
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <p className="pt-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground/50">
              © {new Date().getFullYear()} Artisan Gallery
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ==============================================================
   SUBMIT BUTTON
================================================================ */

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="group h-12 w-full rounded-md bg-foreground text-background shadow-none transition-all hover:bg-foreground/90"
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-background/30 border-t-background" />
          <span>Signing in...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <span>Sign in</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      )}
    </Button>
  );
}