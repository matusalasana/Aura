import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { useState } from "react";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useCartStore } from "@/features/cart/store/cartStore";
import ThemeToggle from "@/components/common/ThemeToggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading } = useCurrentUser();
  const items = useCartStore((state) => state.items);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  const closeMenu = () => setOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="flex-between gap-3 p-4">
        {/* Brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="heading shrink-0 text-xl text-foreground transition-colors hover:text-primary"
        >
          Aura{!isLoading && user?.role ? ` ${user.role}` : ""}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="btn-ghost"
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>

        {/* Actions */}
        <div className="relative flex-center gap-2">
          <button
            type="button"
            className="btn-outline relative p-2"
            onClick={() => navigate("/cart")}
            aria-label={`Cart${items.length > 0 ? `, ${items.length} items` : ""}`}
          >
            <ShoppingBag className="h-5 w-5" />

            {items.length > 0 && (
              <span className="badge-destructive absolute -right-2 -top-2">
                {items.length}
              </span>
            )}
          </button>

          {user ? (
            <button
              type="button"
              className="btn-ghost p-2"
              onClick={() => navigate("/account")}
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="btn-ghost p-2 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-border bg-background p-4 shadow-md animate-fade-in md:hidden">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className="btn-ghost w-full justify-start"
            >
              {item.name}
            </Link>
          ))}

          <div className="mt-2 border-t border-border pt-3">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;