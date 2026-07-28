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
    const helperId =
      helperText || error ? `${id ?? props.name}-description` : undefined;

    return (
      <div className="w-full space-y-2">
        {label && (
          <label htmlFor={id} className="label">
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={helperId}
            className={clsx(
              "input",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error &&
                "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
              {rightIcon}
            </span>
          )}
        </div>

        {error ? (
          <p id={helperId} className="error-text">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="muted text-sm">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;