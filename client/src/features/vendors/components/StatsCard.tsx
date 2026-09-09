import type { LucideIcon } from "lucide-react";
import { TrendingDown, TrendingUp } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change: number;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
}: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
            {value}
          </h2>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
          <Icon size={22} />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        {isPositive ? (
          <TrendingUp
            size={16}
            className="text-green-600 dark:text-green-400"
          />
        ) : (
          <TrendingDown
            size={16}
            className="text-red-600 dark:text-red-400"
          />
        )}

        <span
          className={`text-sm font-medium ${
            isPositive
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {Math.abs(change)}%
        </span>

        <span className="text-sm text-zinc-500">vs last month</span>
      </div>
    </div>
  );
}