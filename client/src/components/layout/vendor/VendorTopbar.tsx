import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/common/ThemeToggle";

interface TopbarProps {
  storeName?: string;
}

export default function VendorTopbar({
  storeName = "My Store",
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:h-20 sm:px-6">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          className="hidden rounded-xl border border-border p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:flex"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Dashboard
          </h1>

          <p className="truncate text-xs text-muted-foreground sm:text-sm">
            Welcome back, {storeName}
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="hidden flex-1 justify-center px-6 xl:flex">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted-foreground" />

          <input
            type="search"
            placeholder="Search products, orders..."
            aria-label="Search products and orders"
            className="h-11 w-full rounded-xl border border-input bg-muted/40 pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {/* Theme */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          className="rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-3"
          aria-label="Toggle theme"
        >
          <ThemeToggle />
        </motion.button>

        {/* Notifications */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          className="relative rounded-xl border border-border p-2.5 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-3"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />

          <span
            className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background"
            aria-hidden="true"
          />
        </motion.button>

        {/* Profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-border p-2 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:gap-3 sm:px-3"
          aria-label="Open profile menu"
        >
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary sm:h-11 sm:w-11">
            <UserRound className="h-5 w-5" />
          </div>

          <div className="hidden min-w-0 text-left md:block">
            <h3 className="max-w-32 truncate text-sm font-semibold text-foreground">
              {storeName}
            </h3>

            <p className="text-xs text-muted-foreground">
              Store Admin
            </p>
          </div>

          <ChevronDown className="hidden h-[18px] w-[18px] text-muted-foreground md:block" />
        </button>
      </div>
    </header>
  );
}