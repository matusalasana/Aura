import {
  Bell,
  ChevronDown,
  Menu,
  Moon,
  Search,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";

type TopbarProps = {
  collapsed: boolean;
  onToggleSidebar: () => void;
  storeName?: string;
};

export default function VendorTopbar({
  collapsed,
  onToggleSidebar,
  storeName = "Aura Fashion",
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-zinc-200 bg-white/80 px-6 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
      {/* Left */}

      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="hidden rounded-xl border border-zinc-200 p-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900 lg:flex"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
            Dashboard
          </h1>

          <p className="text-sm text-zinc-500">
            Welcome back, {storeName}
          </p>
        </div>
      </div>

      {/* Search */}

      <div className="hidden flex-1 justify-center px-10 xl:flex">
        <div className="relative w-full max-w-xl">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
          />

          <input
            type="text"
            placeholder="Search products, orders..."
            className="h-12 w-full rounded-2xl border border-zinc-200 bg-zinc-50 pl-12 pr-4 outline-none transition focus:border-amber-500 dark:border-zinc-700 dark:bg-zinc-900"
          />
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-3">
        {/* Theme */}

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="rounded-2xl border border-zinc-200 p-3 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          <Moon size={18} />
          {/* Replace with Sun icon when dark mode is active */}
        </motion.button>

        {/* Notifications */}

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="relative rounded-2xl border border-zinc-200 p-3 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-amber-500" />
        </motion.button>

        {/* Profile */}

        <button className="flex items-center gap-3 rounded-2xl border border-zinc-200 px-3 py-2 transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900">
          <img
            src="https://i.pravatar.cc/150"
            alt="Vendor"
            className="h-11 w-11 rounded-full object-cover"
          />

          <div className="hidden text-left md:block">
            <h3 className="font-semibold text-zinc-900 dark:text-white">
              Sana
            </h3>

            <p className="text-sm text-zinc-500">
              Vendor
            </p>
          </div>

          <ChevronDown
            size={18}
            className="hidden text-zinc-500 md:block"
          />
        </button>
      </div>
    </header>
  );
}