import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={clsx(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200",
          "focus:outline-none focus:ring-4",
          "disabled:cursor-not-allowed disabled:opacity-60",
          fullWidth && "w-full",

          // Sizes
          {
            "h-9 px-3 text-sm": size === "sm",
            "h-11 px-5 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },

          // Variants
          {
            // Amber primary
            "btn-primary":
              variant === "primary",

            // Zinc secondary
            "btn-secondary":
              variant === "secondary",

            // Outline
            "btn-outline":
              variant === "outline",

            // Ghost
            "btn-ghost":
              variant === "ghost",

            // Danger
            "btn-danger":
              variant === "danger",
          },

          className
        )}
        {...props}
      >
        {!loading && leftIcon}

        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              opacity="0.25"
            />
            <path
              d="M22 12a10 10 0 0 0-10-10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )}

        <span>{loading ? "Loading..." : children}</span>

        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;