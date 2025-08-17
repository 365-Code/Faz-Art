"use client";

import { useState } from "react";
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
import { LockIcon, UserIcon, Eye, EyeOff, Shield, Gem } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Image from "next/image";

const LoginForm = () => {
  const [state, loginAction] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center bg-gradient-to-br rounded-full mb-4 shadow-lg aspect-square w-20">
            <Image
              src="/logo.jpg"
              alt="Makrana Premium"
              width={48}
              height={48}
              className="object-cover w-full h-full rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Portal
          </h1>
          <p className="text-gray-600">Makrana Premium Management System</p>
        </div>

        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center pb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-6 h-6 text-amber-600" />
              <CardTitle className="text-2xl font-bold text-gray-900">
                Secure Login
              </CardTitle>
            </div>
            <CardDescription className="text-gray-600">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form action={loginAction} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Username
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Enter your username"
                    className="pl-10 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500 bg-white"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <LockIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="pl-10 pr-10 h-12 border-gray-300 focus:border-amber-500 focus:ring-amber-500 bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {state?.errors?.message && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm font-medium">
                    {state.errors.message}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <SubmitButton />
            </form>

            {/* Security Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <div className="flex items-center space-x-2">
                <Gem className="w-4 h-4 text-amber-600" />
                <p className="text-amber-800 text-sm">
                  This is a secure admin area for Makrana Premium management.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 Makrana Premium. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="w-full h-12 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Signing in...</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Shield className="w-4 h-4" />
          <span>Sign in to Dashboard</span>
        </div>
      )}
    </Button>
  );
};
