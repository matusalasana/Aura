import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { data: user } = useCurrentUser();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "About", path: "/about" },
  ];

  return (
    <header
      className="
        sticky top-0 z-50
        border-b border-zinc-200
        bg-white/80
        backdrop-blur-md
        dark:border-zinc-800
        dark:bg-zinc-950/80
      "
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="
            text-2xl font-bold
            text-zinc-900
            dark:text-zinc-100
          "
        >
          Aura<span className="text-amber-500">.</span>
        </Link>


        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="
                text-sm font-medium
                text-zinc-600
                transition
                hover:text-amber-500
                dark:text-zinc-400
                dark:hover:text-amber-400
              "
            >
              {link.name}
            </Link>
          ))}
        </div>


        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">

          <ThemeToggle />

          <button
            onClick={() => navigate("/cart")}
            className="
              rounded-lg p-2
              text-zinc-600
              transition
              hover:bg-zinc-100
              dark:text-zinc-400
              dark:hover:bg-zinc-800
            "
          >
            <ShoppingBag size={20} />
          </button>


          {user ? (
            <button
              onClick={() => navigate("/profile")}
              className="
                flex items-center gap-2
                rounded-lg
                bg-amber-500
                px-4 py-2
                text-sm font-semibold
                text-white
                transition
                hover:bg-amber-600
              "
            >
              <User size={16} />
              Account
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="
                rounded-lg
                bg-amber-500
                px-4 py-2
                text-sm font-semibold
                text-white
                transition
                hover:bg-amber-600
              "
            >
              Login
            </button>
          )}

        </div>


        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="
            rounded-lg p-2
            text-zinc-700
            dark:text-zinc-300
            md:hidden
          "
        >
          {open ? <X /> : <Menu />}
        </button>

      </nav>


      {/* Mobile Menu */}
      {open && (
        <div
          className="
            border-t border-zinc-200
            bg-white
            px-4 py-5
            dark:border-zinc-800
            dark:bg-zinc-950
            md:hidden
          "
        >
          <div className="flex flex-col gap-5">

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className="
                  text-sm font-medium
                  text-zinc-700
                  hover:text-amber-500
                  dark:text-zinc-300
                  dark:hover:text-amber-400
                "
              >
                {link.name}
              </Link>
            ))}


            <div className="flex items-center justify-between pt-2">
              <ThemeToggle />

              {user ? (
                <button
                  onClick={() => navigate("/profile")}
                  className="
                    rounded-lg
                    bg-amber-500
                    px-4 py-2
                    text-sm font-semibold
                    text-white
                  "
                >
                  Profile
                </button>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="
                    rounded-lg
                    bg-amber-500
                    px-4 py-2
                    text-sm font-semibold
                    text-white
                  "
                >
                  Login
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;