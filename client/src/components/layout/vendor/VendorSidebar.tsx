import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Star,
  TicketPercent,
  Wallet,
  Settings,
  LogOut,
  Store,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";

const links = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    to: "/vendor/dashboard",
  },
  {
    label: "Products",
    icon: Package,
    to: "/vendor/products",
  },
  {
    label: "Orders",
    icon: ShoppingCart,
    to: "/vendor/orders",
  },
  {
    label: "Customers",
    icon: Users,
    to: "/vendor/customers",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    to: "/vendor/analytics",
  },
  {
    label: "Reviews",
    icon: Star,
    to: "/vendor/reviews",
  },
  {
    label: "Coupons",
    icon: TicketPercent,
    to: "/vendor/coupons",
  },
  {
    label: "Wallet",
    icon: Wallet,
    to: "/vendor/wallet",
  },
  {
    label: "Settings",
    icon: Settings,
    to: "/vendor/settings",
  },
];

export default function VendorSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "sticky top-0 flex h-screen flex-col border-r border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950",
        collapsed ? "w-24" : "w-72"
      )}
    >
      {/* Logo */}

      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-5 dark:border-zinc-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-white shadow">
            <Store size={22} />
          </div>

          {!collapsed && (
            <div>
              <h1 className="text-lg font-bold text-zinc-900 dark:text-white">
                Aura
              </h1>

              <p className="text-xs text-zinc-500">
                Vendor Dashboard
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-xl p-2 transition hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  "group flex items-center rounded-2xl px-4 py-3 transition-all",
                  isActive
                    ? "bg-amber-500 text-white shadow-lg"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
                )
              }
            >
              {({ isActive }) => (
                <motion.div
                  whileHover={{ x: 3 }}
                  className="flex items-center gap-4"
                >
                  <Icon
                    size={21}
                    className={clsx(
                      isActive
                        ? "text-white"
                        : "text-zinc-500 group-hover:text-amber-500"
                    )}
                  />

                  {!collapsed && (
                    <span className="font-medium">
                      {item.label}
                    </span>
                  )}
                </motion.div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Store Card */}

      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        {!collapsed ? (
          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/100"
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-semibold text-zinc-900 dark:text-white">
                  Aura Fashion
                </h3>

                <p className="truncate text-sm text-zinc-500">
                  Premium Seller
                </p>
              </div>
            </div>

            <button
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 py-3 text-sm font-medium transition hover:bg-red-50 hover:text-red-600 dark:border-zinc-700 dark:hover:bg-red-500/10"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        ) : (
          <button
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 hover:bg-red-50 dark:border-zinc-700 dark:hover:bg-red-500/10"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </aside>
  );
}