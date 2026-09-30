import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

const sidebarItems = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    label: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    label: "Inventory",
    href: "/dashboard/inventory",
    icon: Boxes,
  },
  {
    label: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
];

const DashboardSidebar = () => {
  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-card">
      {/* Store Header */}
      <div className="border-b p-4">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Store className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold">Demo Store</p>
            <p className="text-xs text-muted-foreground">Store Dashboard</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t p-3">
        <Link
          to="/dashboard/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>

        <Link
          to="/"
          className="mt-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Store className="h-4 w-4" />
          View Store
        </Link>
      </div>
    </aside>
  );
};

export default DashboardSidebar;