import {
  forwardRef,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import clsx from "clsx";

interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
            <span className="pointer-events-none absolute left-3 top-3 text-zinc-400">
              {leftIcon}
            </span>
          )}

          <textarea
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={helperId}
            className={clsx(
              "textarea",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error &&
                "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <span className="pointer-events-none absolute right-3 top-3 text-zinc-400">
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

Textarea.displayName = "Textarea";

export default Textarea;