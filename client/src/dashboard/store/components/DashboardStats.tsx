import {
  Banknote,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    label: "Total Revenue",
    value: "ETB 12,450.00",
    description: "+12.5% from last month",
    icon: Banknote,
  },
  {
    label: "Total Orders",
    value: "248",
    description: "+8.2% from last month",
    icon: ShoppingCart,
  },
  {
    label: "Products",
    value: "64",
    description: "6 low in stock",
    icon: Package,
  },
  {
    label: "Customers",
    value: "1,240",
    description: "+18 new this month",
    icon: Users,
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.label} className="min-w-0">
            <CardContent className="flex items-start justify-between gap-3 p-5 sm:p-6">
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>

                <p className="mt-2 break-words text-xl font-bold tracking-tight sm:text-2xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {stat.description}
                </p>
              </div>

              <div className="shrink-0 rounded-lg bg-primary/10 p-2.5 text-primary">
                <Icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;