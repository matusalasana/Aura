import {
  Check,
  Package,
  Boxes,
  Layers,
  ClipboardCheck,
} from "lucide-react";

interface Props {
  type: string;
  step: number;
}

const ProgressIndicator = ({ step, type }: Props) => {
  const steps = [
    { num: 1, icon: Package, title: "Basic" },
    {
      num: 2,
      icon: type === "simple" ? Boxes : Layers,
      title: type === "simple" ? "Inventory" : "Variants",
    },
    { num: 3, icon: ClipboardCheck, title: "Review" },
  ];

  return (
    <nav aria-label="Product creation progress" className="mb-8 w-full">
      <div className="relative flex items-start justify-between">
        {/* Progress track */}
        <div
          className="absolute left-[16.67%] right-[16.67%] top-5 h-0.5 bg-border"
          aria-hidden="true"
        >
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{
              width: step <= 1 ? "0%" : step >= 3 ? "100%" : "50%",
            }}
          />
        </div>

        {steps.map((s) => {
          const isActive = step === s.num;
          const isCompleted = step > s.num;
          const Icon = s.icon;

          return (
            <div
              key={s.num}
              aria-current={isActive ? "step" : undefined}
              className="relative z-10 flex min-w-0 flex-1 flex-col items-center gap-2 bg-transparent"
            >
              <div
                className={`flex size-10 items-center justify-center rounded-full transition-all duration-300 ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isActive
                      ? "border-2 border-primary bg-background text-primary ring-4 ring-primary/10"
                      : "border border-border bg-background text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="size-5" />
                ) : (
                  <Icon className="size-4" />
                )}
              </div>

              <span
                className={`text-center text-xs capitalize sm:text-sm ${
                  isActive || isCompleted
                    ? "font-semibold text-foreground"
                    : "font-medium text-muted-foreground"
                }`}
              >
                {s.title}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default ProgressIndicator;