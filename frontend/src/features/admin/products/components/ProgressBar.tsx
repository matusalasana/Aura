import { motion } from "framer-motion";
import {
  Check,
  ClipboardList,
  Eye,
  Image as ImageIcon,
  Layers,
} from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
}

const STEPS = [
  { id: 1, label: "Basic Info", icon: ClipboardList },
  { id: 2, label: "Variants", icon: Layers },
  { id: 3, label: "Images", icon: ImageIcon },
  { id: 4, label: "Review", icon: Eye },
];

export default function ProgressBar({
  currentStep,
}: ProgressBarProps) {
  return (
    <div className="w-full py-6">
      <div className="mx-auto flex max-w-3xl items-start px-4">
        {STEPS.map((step, index) => {
          const Icon = step.icon;

          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isLast = index === STEPS.length - 1;

          return (
            <div
              key={step.id}
              className="relative flex flex-1 flex-col items-center"
            >
              {/* Line */}
              {!isLast && (
                <div className="absolute left-1/2 top-5 w-full">
                  <div className="h-[2px] -translate-y-1/2 bg-slate-200 dark:bg-slate-800" />

                  <motion.div
                    initial={false}
                    animate={{
                      width:
                        currentStep > step.id
                          ? "100%"
                          : currentStep === step.id
                          ? "50%"
                          : "0%",
                    }}
                    className="absolute top-0 h-[2px] -translate-y-1/2 bg-indigo-500 dark:bg-indigo-400"
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}

              {/* Step */}
              <div className="relative z-10">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300",
                    isCompleted &&
                      "border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
                    isActive &&
                      "border-indigo-500 bg-indigo-500 text-white dark:border-indigo-400 dark:bg-indigo-400",
                    !isCompleted &&
                      !isActive &&
                      "border-slate-300 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </motion.div>

                {isActive && (
                  <span className="absolute inset-0 rounded-full border border-indigo-400/40 animate-ping" />
                )}
              </div>

              {/* Label */}
              <p
                className={[
                  "mt-3 text-center text-[11px] font-semibold uppercase tracking-wide transition-colors",
                  isCompleted &&
                    "text-emerald-600 dark:text-emerald-400",
                  isActive &&
                    "text-indigo-600 dark:text-indigo-400",
                  !isCompleted &&
                    !isActive &&
                    "text-slate-400 dark:text-slate-500",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}