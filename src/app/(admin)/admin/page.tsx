import Link from "next/link";
import {
  ArrowRight,
  FolderOpen,
  Grid3X3,
  Package,
  Plus,
  Sparkles,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  fetchCategoriesCount,
  fetchProductsCount,
  getContacts,
} from "@/lib/actions";

import Visitors from "@/components/admin/visitors";
import Contacts from "@/components/admin/contacts";
import { limit } from "@/lib/constant";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ page?: number }>;
}) {
  const categoryCount = await fetchCategoriesCount();
  const productCount = await fetchProductsCount();

  const currentContactPage = Number((await searchParams).page) || 1;

  const { contacts, totalCount: contactCount } =
    await getContacts(currentContactPage);

  const pageCount = Math.ceil(contactCount / limit);

  const stats = [
    {
      label: "Total Products",
      value: productCount,
      description: "Products in your catalog",
      icon: Package,
      href: "/admin/products",
    },
    {
      label: "Collections",
      value: categoryCount,
      description: "Active product categories",
      icon: Grid3X3,
      href: "/admin/categories",
    },
    {
      label: "Enquiries",
      value: contactCount,
      description: "Customer enquiries received",
      icon: FolderOpen,
      href: "#enquiries",
    },
  ];

  return (
    <div className="space-y-10">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            Admin Dashboard
          </div>

          <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Overview
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Manage your collections, products, customer enquiries, and
            storefront content from one place.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild variant="outline">
            <Link href="/admin/categories">
              <Grid3X3 className="mr-2 h-4 w-4" />
              Collections
            </Link>
          </Button>

          <Button asChild>
            <Link href="/admin/products">
              <Plus className="mr-2 h-4 w-4" />
              Manage Products
            </Link>
          </Button>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Link key={stat.label} href={stat.href} className="group block">
              <Card className="h-full transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </p>

                      <p className="font-heading text-4xl font-semibold tracking-tight">
                        {stat.value}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    Manage
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </section>

      {/* =====================================================
          VISITORS
      ===================================================== */}
      <section className="space-y-5">
        <div>
          <h2 className="font-heading text-xl font-semibold tracking-tight">
            Storefront Activity
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor how visitors are interacting with your website.
          </p>
        </div>

        <Visitors />
      </section>

      {/* =====================================================
          ENQUIRIES
      ===================================================== */}
      <section id="enquiries" className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-heading text-xl font-semibold tracking-tight">
              Customer Enquiries
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Keep track of recent enquiries from potential customers.
            </p>
          </div>

          {contactCount > 0 && (
            <span className="text-xs text-muted-foreground">
              {contactCount} {contactCount === 1 ? "enquiry" : "enquiries"}{" "}
              total
            </span>
          )}
        </div>

        {contactCount > 0 ? (
          <Contacts
            contacts={contacts}
            pageCount={Number(pageCount)}
            currentPage={currentContactPage}
          />
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center px-6 py-14 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FolderOpen className="h-5 w-5 text-muted-foreground" />
              </div>

              <h3 className="font-heading text-lg font-semibold">
                No enquiries yet
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Customer enquiries submitted through your website will appear
                here.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
