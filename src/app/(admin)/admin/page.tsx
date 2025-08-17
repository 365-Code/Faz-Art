import { Card, CardContent } from "@/components/ui/card";

import { Package, Grid3X3 } from "lucide-react";
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
  searchParams: Promise<{ page: number }>;
}) {
  const categoryCount = await fetchCategoriesCount();
  const productCount = await fetchProductsCount();
  const currentContactPage = (await searchParams).page || 1;

  const { contacts, totalCount: contactCount } = await getContacts(
    currentContactPage
  );
  const pageCount = Math.floor(
    contactCount / limit + (contactCount % limit > 0 ? 1 : 0)
  );

  const stats = [
    { Label: "Total Products", value: productCount, icon: Package },
    { Label: "Categories", value: categoryCount, icon: Grid3X3 },
  ];

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.Label}
                  </p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="h-2 w-2 bg-green-500 rounded-full" />
              <div className="flex-1">
                <p className="font-medium">
                  New product added: Carrara Marble Vase
                </p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="h-2 w-2 bg-blue-500 rounded-full" />
              <div className="flex-1">
                <p className="font-medium">Category updated: Luxury Basins</p>
                <p className="text-sm text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="h-2 w-2 bg-orange-500 rounded-full" />
              <div className="flex-1">
                <p className="font-medium">Product removed: Old Marble Table</p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card> */}

      <Visitors />

      <Contacts
        contacts={contacts}
        pageCount={Number(pageCount)}
        currentPage={currentContactPage}
      />
    </>
  );
}
