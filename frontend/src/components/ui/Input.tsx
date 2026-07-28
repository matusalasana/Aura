import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-3 flex items-center text-zinc-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            className={clsx(
              "w-full rounded-xl border bg-white px-4 py-2.5 text-sm outline-none transition",
              "placeholder:text-zinc-400",
              "border-zinc-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15",
              "dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100",
              "dark:placeholder:text-zinc-500",
              "disabled:cursor-not-allowed disabled:opacity-60",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error &&
                "border-red-500 focus:border-red-500 focus:ring-red-500/15",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute inset-y-0 right-3 flex items-center text-zinc-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : helperText ? (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;