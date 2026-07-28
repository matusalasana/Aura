import clsx from "clsx";

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export default function ProgressIndicator({
  steps,
  currentStep,
  className,
}: ProgressIndicatorProps) {
  return (
    <div className={clsx("w-full", className)}>
      <div className="flex items-center">
        {steps.map((step, index) => {
          const completed = index < currentStep;
          const active = index === currentStep-1;

          return (
            <div
              key={step}
              className={clsx(
                "flex flex-1 items-center",
                index === steps.length - 1 && "flex-none"
              )}
            >
              <div className="flex flex-col items-center">
                <div
                  className={clsx(
                    "flex size-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all",
                    completed &&
                      "border-amber-500 bg-amber-500 text-white",
                    active &&
                      "border-amber-500 bg-white text-amber-500 dark:bg-zinc-900",
                    !completed &&
                      !active &&
                      "border-zinc-300 bg-white text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
                  )}
                >
                  {completed ? "✓" : index + 1}
                </div>

                <span
                  className={clsx(
                    "mt-2 text-center text-xs font-medium",
                    active
                      ? "text-amber-500"
                      : "text-zinc-500 dark:text-zinc-400"
                  )}
                >
                  {step}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div
                  className={clsx(
                    "mx-4 h-0.5 flex-1",
                    completed
                      ? "bg-amber-500"
                      : "bg-zinc-300 dark:bg-zinc-700"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}