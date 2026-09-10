import { decrypt } from "@/lib/session";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.includes(pathname);
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  // Protect /admin and everything under /admin/*
  if (isAdminRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent logged-in users from visiting /login
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
