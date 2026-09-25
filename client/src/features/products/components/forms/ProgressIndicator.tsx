import {
  Check,
  Package,
  Boxes,
  Layers,
  ClipboardCheck,
  type LucideIcon
} from "lucide-react";

interface Step {
  num: number;
  icon: LucideIcon;
  title: string;
}

interface Props {
  type: string;
  step: number;
}

const ProgressIndicator = ({step, type}: Props) => {
  const steps = [
  { num: 1, icon: Package, title: "Basic" },
  { num: 2, icon: type === "simple" ? Boxes : Layers, title: type === "simple" ? "inventory" : "variants" },
  { num: 3, icon: ClipboardCheck, title: "Review" },
];
  
  return (
    <div className="relative mb-8 flex-between">
            <div className="absolute left-0 right-0 top-1/2 -z-10 h-0.5 -translate-y-1/2 bg-border" />

            {steps.map((s) => {
              const isActive = step === s.num;
              const isCompleted = step > s.num;
              const Icon = s.icon;

              return (
                <div
                  key={s.num}
                  className="flex-center flex-col gap-1.5 bg-background px-2"
                >
                  <div
                    className={`grid-center h-10 w-10 rounded-full text-xs font-bold transition-all ${
                      isCompleted
                        ? "bg-primary text-primary-foreground"
                        : isActive
                          ? "border-2 border-primary bg-background text-primary"
                          : "border border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>

                  <span
                    className={`text-[11px] font-medium ${
                      isActive || isCompleted
                        ? "font-semibold text-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
  )
}

export default ProgressIndicator