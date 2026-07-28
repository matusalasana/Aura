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
          fullWidth && "w-full",

          {
            "btn-primary": variant === "primary",
            "btn-secondary": variant === "secondary",
            "btn-outline": variant === "outline",
            "btn-danger": variant === "danger",
            "bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800":
              variant === "ghost",
          },

          {
            "px-3 py-1.5 text-xs": size === "sm",
            "px-4 py-2 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
          },

          className
        )}
        {...props}
      >
        {!loading && leftIcon}

        {loading && (
          <svg
            className="size-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
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