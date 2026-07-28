import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import clsx from "clsx";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  description?: ReactNode;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, id, ...props }, ref) => {
    const helperId =
      description || error ? `${id ?? props.name}-description` : undefined;

    return (
      <div className="space-y-2">
        <label
          htmlFor={id}
          className="flex cursor-pointer items-start gap-3"
        >
          <input
            ref={ref}
            id={id}
            type="checkbox"
            aria-invalid={!!error}
            aria-describedby={helperId}
            className={clsx(
              "mt-0.5 size-4 rounded border-zinc-300 text-amber-500",
              "focus:ring-2 focus:ring-amber-500/20",
              "dark:border-zinc-700 dark:bg-zinc-900",
              "disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          />

          <div className="space-y-1">
            {label && <span className="label mb-0">{label}</span>}

            {error ? (
              <p id={helperId} className="error-text">
                {error}
              </p>
            ) : (
              description && (
                <p id={helperId} className="muted text-sm">
                  {description}
                </p>
              )
            )}
          </div>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;