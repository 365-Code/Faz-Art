"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid3X3, LayoutDashboard, Package } from "lucide-react";

import AdminHeader from "@/components/admin/AdminHeader";

const navigation = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: Grid3X3,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Admin Navigation */}
        <nav className="mb-8 overflow-x-auto border-b">
          <div className="flex min-w-max gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative flex items-center gap-2 px-4 py-3
                    text-sm font-medium transition-colors
                    ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}

                  {isActive && (
                    <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-foreground" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {children}
      </div>
    </div>
  );
}