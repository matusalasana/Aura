import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "warning"
  | "link";

type Size =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "icon";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800",

  secondary:
    "bg-slate-100 text-slate-900 hover:bg-slate-200",

  outline:
    "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",

  ghost:
    "bg-transparent hover:bg-slate-100 text-slate-900",

  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",

  success:
    "bg-emerald-600 text-white hover:bg-emerald-700",

  warning:
    "bg-amber-500 text-black hover:bg-amber-600",

  link:
    "bg-transparent underline underline-offset-4 hover:text-indigo-600",
};

const sizeStyles: Record<Size, string> = {
  xs: "h-8 px-3 text-xs",

  sm: "h-9 px-4 text-sm",

  md: "h-10 px-5 text-sm",

  lg: "h-12 px-6 text-base",

  xl: "h-14 px-8 text-lg",

  icon: "h-10 w-10 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center",
          "rounded-xl font-medium",
          "transition-all duration-200",
          "focus:outline-none",
          "focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";