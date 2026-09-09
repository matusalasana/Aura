import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { useState } from "react";

import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 flex-between border-b border-border bg-background/80 p-4 backdrop-blur-md">
      {/* Brand Logo */}
      <Link to="/" className="heading text-xl">
        Aura
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden flex-center gap-2 md:flex">
        {navLinks.map((item) => (
          <Link key={item.path} to={item.path}>
            <button className="btn-ghost">{item.name}</button>
          </Link>
        ))}
      </div>

      {/* Right Action Icons & Auth */}
      <div className="flex-center gap-2">
        <button
          className="btn-outline p-2"
          onClick={() => navigate("/cart")}
          aria-label="Cart"
        >
          <ShoppingBag className="h-5 w-5" />
        </button>

        {user ? (
          <button
            className="btn-ghost p-2"
            onClick={() => navigate("/account")}
            aria-label="Account"
          >
            <User className="h-5 w-5" />
          </button>
        ) : (
          <button className="btn-primary" onClick={() => navigate("/login")}>
            Sign In
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="btn-ghost p-2 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="absolute left-0 top-full flex w-full flex-col gap-2 border-b border-border bg-background p-4 md:hidden">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
            >
              <button className="btn-ghost w-full justify-start">
                {item.name}
              </button>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
