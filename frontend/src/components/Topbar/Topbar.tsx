import React from "react";
import {
  Moon,
  Sun,
  ShoppingCart,
  User,
} from "lucide-react";

const Topbar = () => {
  return (
    <div className="sticky top-0 z-50 border-b border-base-200 bg-base-100/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LOGO */}
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            Aura
          </h1>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <label className="swap swap-rotate btn btn-ghost btn-circle">
            <input type="checkbox" />

            {/* Sun */}
            <Sun className="swap-on h-5 w-5" />

            {/* Moon */}
            <Moon className="swap-off h-5 w-5" />
          </label>

          {/* Cart */}
          <button className="btn btn-ghost btn-circle relative">
            <ShoppingCart size={20} />

            <span className="badge badge-sm badge-neutral absolute -right-1 -top-1">
              3
            </span>
          </button>

          {/* Profile */}
          <button className="btn btn-ghost btn-circle">
            <User size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;