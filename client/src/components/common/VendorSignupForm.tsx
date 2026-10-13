import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Store,
  Globe,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Loader2,
  CreditCard,
} from "lucide-react";

import { useSignupStore } from "@/features/stores/hooks/useSignupStore";
import { usePlans } from "@/features/payments/hooks/usePlans";
import type { Plan } from "@/types/plan";
import { type StoreFormData, storeSignupSchema } from "@/features/stores/schemas";

const steps = [
  { num: 1, label: "Store Info", icon: Store },
  { num: 2, label: "Subdomain", icon: Globe },
  { num: 3, label: "Select Plan", icon: CreditCard },
] as const;


export default function VendorOnboarding() {
  const { mutate: signupStore, isPending } = useSignupStore();
  const { data: plans = [] } = usePlans();
  
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSignupSchema),
    defaultValues: {
      storeName: "",
      description: "",
      slug: "",
      planId: "",
    },
  });

  const onSubmit = (data: StoreFormData) => {
    const formData = new FormData();

    if(selectedLogo){
      formData.append("logo", selectedLogo)
    }
    formData.append("storeData", JSON.stringify(data))
    
    signupStore(formData, {
      onSuccess: () => reset(),
    });
  };

  const selectedPlan = watch("planId");
  const storeName = watch("storeName");
  const slug = watch("slug");

  return (
    <main className="card mx-auto w-full max-w-2xl animate-scale-in shadow-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-6"
      >
        {/* Header */}
        <header className="space-y-2 text-center">
          <h1 className="heading text-2xl font-bold tracking-tight sm:text-3xl">
            Store Onboarding
          </h1>

          <p className="subheading text-sm">
            Launch Your Storefront
          </p>

          <p className="subheading mx-auto mt-2 max-w-md text-sm leading-relaxed">
            Set up your tenant environment and custom domain in three simple
            steps.
          </p>
        </header>

        <div className="mx-auto w-full max-w-2xl">
          {/* Stepper */}
          <div className="relative mb-8 flex-between">
            <div
              className="absolute left-[12%] right-[12%] top-5 h-0.5 bg-border"
              aria-hidden="true"
            />

            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isCompleted = step > s.num;

              return (
                <div
                  key={s.num}
                  className="relative z-10 flex-center min-w-0 flex-col gap-2 bg-card px-1 sm:px-3"
                  aria-current={isActive ? "step" : undefined}
                >
                  <div
                    className={`grid-center h-10 w-10 rounded-full transition-colors ${
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
                    className={`text-center text-[11px] sm:text-xs ${
                      isActive || isCompleted
                        ? "font-semibold text-foreground"
                        : "font-medium text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Step 1: Store Information */}
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1">
                <h2 className="heading text-xl font-bold tracking-tight">
                  1. Tell us about your store
                </h2>

                <p className="subheading text-xs leading-relaxed">
                  This information will be displayed on your public store
                  metadata.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="storeName" className="label">
                  Store Name
                </label>

                <input
                  id="storeName"
                  type="text"
                  placeholder="Acme Fashion"
                  className="input w-full"
                  aria-invalid={!!errors.storeName}
                  aria-describedby={
                    errors.storeName ? "storeName-error" : undefined
                  }
                  {...register("storeName")}
                />

                {errors.storeName && (
                  <p id="storeName-error" className="error-text text-sm">
                    {errors.storeName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="logo" className="label">
                  Store Logo
                </label>

                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={(e) => {
                    setSelectedLogo(e.target.files?.[0] ?? null);
                  }}
                  className="input w-full"
                  aria-invalid={!!selectedLogo}
                  aria-describedby={
                    selectedLogo ? "storeName-error" : undefined
                  }
                />

                {!selectedLogo && (
                  <p id="logo-error" className="error-text text-sm">
                    Logo is required
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="label">
                  Description
                </label>

                <textarea
                  id="description"
                  placeholder="Tell customers about your store..."
                  className="textarea min-h-28 w-full resize-y"
                  aria-invalid={!!errors.description}
                  aria-describedby={
                    errors.description ? "description-error" : undefined
                  }
                  {...register("description")}
                />

                {errors.description && (
                  <p id="description-error" className="error-text text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-primary gap-2 text-xs sm:text-sm"
                >
                  Next: Claim Subdomain
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Subdomain */}
          {step === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1">
                <h2 className="heading text-xl font-bold tracking-tight">
                  2. Choose your store subdomain
                </h2>

                <p className="subheading text-xs leading-relaxed">
                  Choose the address customers will use to visit your
                  storefront.
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="slug" className="label">
                  Store Subdomain
                </label>

                <input
                  id="slug"
                  type="text"
                  placeholder="acme-fashion"
                  className="input w-full"
                  aria-invalid={!!errors.slug}
                  aria-describedby={
                    errors.slug ? "slug-error" : undefined
                  }
                  {...register("slug")}
                />

                {errors.slug && (
                  <p id="slug-error" className="error-text text-sm">
                    {errors.slug.message}
                  </p>
                )}

                {slug && (
                  <div className="flex items-start gap-2 rounded-lg border border-border bg-muted/40 p-3">
                    <Globe className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

                    <p className="min-w-0 text-xs leading-relaxed text-muted-foreground">
                      Your store address will be{" "}
                      <span className="break-all font-mono font-medium text-primary">
                        {slug}.aura.shop
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div className="flex-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-ghost gap-2 text-xs sm:text-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-primary gap-2 text-xs sm:text-sm"
                >
                  Next: Choose Plan
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Plan Selection */}
          {step === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1">
                <h2 className="heading text-xl font-bold tracking-tight">
                  3. Select subscription plan
                </h2>

                <p className="subheading text-xs leading-relaxed">
                  Choose the plan that fits your store. You can upgrade or
                  switch to custom CNAMEs anytime.
                </p>
              </div>

              {/* Plans */}
              <div className="space-y-3">
                {plans.map((item: Plan) => {
                  const isSelected = selectedPlan === item.id;

                  return (
                    <label
                      key={item.id}
                      htmlFor={`plan-${item.id}`}
                      className={`relative block cursor-pointer rounded-xl border p-4 transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-border bg-card hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          id={`plan-${item.id}`}
                          type="radio"
                          value={item.id}
                          {...register("planId")}
                          className="mt-1 h-4 w-4 shrink-0 accent-primary"
                        />

                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-card-foreground">
                                {item.name}
                              </span>

                              {item && (item.name === "Growth") && (
                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                  Popular
                                </span>
                              )}
                            </div>

                            <span className="font-semibold tabular-nums text-primary">
                              {item.yearlyPrice}
                            </span>
                            <span className="font-semibold tabular-nums text-primary">
                              {item.monthlyPrice}
                            </span>
                          </div>

                          <div className="flex flex-col">
                            {item?.features?.map((feature) => (
                              <span className="font-semibold tabular-nums text-foreground">
                              {feature}
                            </span>
                            ))}
                          </div>

                          <p className="text-xs leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </label>
                  );
                })}

                {errors.planId && (
                  <p className="error-text text-sm">
                    {errors.planId.message}
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Your store summary
                </h3>

                <div className="flex-between gap-4 text-xs">
                  <span className="text-muted-foreground">Store Name</span>
                  <span className="min-w-0 break-words text-right font-medium text-foreground">
                    {storeName || "—"}
                  </span>
                </div>

                <div className="flex-between gap-4 text-xs">
                  <span className="shrink-0 text-muted-foreground">
                    Assigned Domain
                  </span>
                  <span className="min-w-0 break-all text-right font-mono font-medium text-primary">
                    {slug ? `${slug}.aura.shop` : "—"}
                  </span>
                </div>

                <div className="flex-between gap-4 text-xs">
                  <span className="text-muted-foreground">Plan</span>
                  <span className="text-right font-medium capitalize text-foreground">
                    {selectedPlan || "—"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-ghost gap-2 text-xs sm:text-sm"
                  disabled={isPending}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary gap-2 text-xs sm:text-sm"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Launching Store...
                    </>
                  ) : (
                    <>
                      Launch Store
                      <Sparkles className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </main>
  );
}