import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    label: "Total Revenue",
    value: "$12,450.00",
    description: "+12.5% from last month",
    icon: DollarSign,
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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.label}>
            <CardContent className="flex items-start justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>

                <p className="mt-2 text-2xl font-bold tracking-tight">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>

              <div className="rounded-lg bg-primary/10 p-2.5 text-primary">
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;