
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import { planSchema, type PlanFormValues } from "@/features/admin/schemas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type PlanFormProps = {
  onSubmit: (data: PlanFormValues) => void | Promise<void>;
  defaultValues?: PlanFormValues;
  isSubmitting?: boolean;
};

const initialValues: PlanFormValues = {
  name: "",
  description: "",
  monthlyPrice: "0",
  yearlyPrice: "0",
  iconName: "Store",
  cta: "Get started",
  features: [""],
};

export default function PlanForm({
  onSubmit,
  defaultValues,
  isSubmitting = false,
}: PlanFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: defaultValues ?? initialValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      {/* Plan name */}
      <div className="space-y-2">
        <Label htmlFor="name">Plan name</Label>
        <Input
          id="name"
          placeholder="Starter"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-sm text-destructive">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="A simple starting point for getting your store online."
          rows={3}
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="monthlyPrice">Monthly price</Label>
          <Input
            id="monthlyPrice"
            type="number"
            min="0"
            step="0.01"
            {...register("monthlyPrice")}
          />
          {errors.monthlyPrice && (
            <p className="text-sm text-destructive">
              {errors.monthlyPrice.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearlyPrice">Yearly price</Label>
          <Input
            id="yearlyPrice"
            type="number"
            min="0"
            step="0.01"
            {...register("yearlyPrice")}
          />
          {errors.yearlyPrice && (
            <p className="text-sm text-destructive">
              {errors.yearlyPrice.message}
            </p>
          )}
        </div>
      </div>

      {/* Icon name and CTA */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="iconName">Lucide icon name</Label>
          <Input
            id="iconName"
            placeholder="Store"
            {...register("iconName")}
          />
          {errors.iconName && (
            <p className="text-sm text-destructive">
              {errors.iconName.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Example: Store, Rocket, Crown, Zap.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="cta">Call-to-action text</Label>
          <Input
            id="cta"
            placeholder="Get started"
            {...register("cta")}
          />
          {errors.cta && (
            <p className="text-sm text-destructive">
              {errors.cta.message}
            </p>
          )}
        </div>
      </div>

      {/* Dynamic features */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Label>Plan features</Label>

          <Button
            type="button"
            variant="outline"
            size="sm"
          >
            <Plus className="mr-2 size-4" />
            Add feature
          </Button>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Saving plan..." : "Create plan"}
      </Button>
    </form>
  );
}