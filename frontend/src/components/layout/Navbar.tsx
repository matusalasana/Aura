import { Link } from "react-router-dom";
import {
  Bell,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-4 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-lg">
            A
          </div>

          <span className="hidden text-2xl font-black tracking-tight text-slate-900 sm:block">
            Aura
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            to="/products"
            className="font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Products
          </Link>

          <Link
            to="/vendors"
            className="font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Vendors
          </Link>

          <Link
            to="/categories"
            className="font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Categories
          </Link>

          <Link
            to="/deals"
            className="font-medium text-slate-700 transition hover:text-indigo-600"
          >
            Deals
          </Link>
        </nav>

        {/* Search */}
        <div className="hidden flex-1 lg:flex">
          <div className="relative w-full max-w-xl">

            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search products..."
              className="h-12 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-5 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
            />

          </div>
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-2">

          <button className="hidden rounded-xl p-3 transition hover:bg-slate-100 lg:flex">
            <Heart size={22} />
          </button>

          <button className="hidden rounded-xl p-3 transition hover:bg-slate-100 lg:flex">
            <Bell size={22} />
          </button>

          <button className="relative rounded-xl p-3 transition hover:bg-slate-100">

            <ShoppingCart size={22} />

            <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-semibold text-white">
              3
            </span>

          </button>

          <button className="hidden items-center gap-2 rounded-full border border-slate-200 p-1 pr-3 transition hover:border-indigo-500 hover:bg-slate-50 lg:flex">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
              <User
                size={18}
                className="text-indigo-600"
              />
            </div>

            <span className="text-sm font-semibold">
              Account
            </span>

          </button>

          <button className="rounded-xl p-3 transition hover:bg-slate-100 lg:hidden">
            <Menu size={24} />
          </button>

        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t border-slate-100 p-4 lg:hidden">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            placeholder="Search products..."
            className="h-12 w-full rounded-full border border-slate-200 bg-slate-50 pl-11 pr-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
          />

        </div>

      </div>
    </header>
  );
}