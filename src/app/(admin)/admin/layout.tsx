"use client";

import React, { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentTab = pathname.includes("categories")
    ? "categories"
    : pathname.includes("products")
    ? "products"
    : "overview";

  const [selectedTab, setSelectedTab] = useState(currentTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <AdminHeader />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">
              <Link href={"/admin"} className="w-full">
                Overview
              </Link>
            </TabsTrigger>
            <TabsTrigger value="products">
              <Link href={"/admin/products"} className="w-full">
                Products
              </Link>
            </TabsTrigger>
            <TabsTrigger value="categories">
              <Link href={"/admin/categories"} className="w-full">
                Categories
              </Link>
            </TabsTrigger>
          </TabsList>

          {/* <TabsContent value="">{children}</TabsContent> */}

          <TabsContent value={currentTab}>{children}</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
