
import {
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { User } from "@/types/auth";
import type { Product } from "@/types/product";
import type { Order } from "@/types/order";

interface Props {
  products?: Product[];
  customers?: User[];
  orders?: Order[];
}

const DashboardStats = ({
  orders = [],
  customers = [],
  products = [],
}: Props) => {
  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
    },
    {
      label: "Products",
      value: products.length,
      icon: Package,
    },
    {
      label: "Customers",
      value: customers.length,
      icon: Users,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="min-w-0">
          <CardContent className="flex items-center justify-between gap-4 p-5 sm:p-6">
            <div>
              <p className="text-sm text-muted-foreground">
                {label}
              </p>
              <p className="mt-2 text-2xl font-bold tracking-tight">
                {value}
              </p>
            </div>

            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <Icon className="size-5" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
