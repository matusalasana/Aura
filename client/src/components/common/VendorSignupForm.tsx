import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { type FormData, storeSignupSchema } from "@/features/stores/schemas";

const steps = [
  { num: 1, label: "Store Info", icon: Store },
  { num: 2, label: "Subdomain", icon: Globe },
  { num: 3, label: "Select Plan", icon: CreditCard },
] as const;

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$19/mo",
    desc: "Up to 100 products on 1 subdomain",
  },
  {
    id: "pro",
    name: "Pro Vendor",
    price: "$49/mo",
    desc: "Unlimited products, 3 domains, priority Redis cache",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$149/mo",
    desc: "Dedicated DB instance, 0% fees, super-admin tools",
  },
] as const;

export default function VendorOnboarding() {
  const { mutate: signupStore, isPending } = useSignupStore();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(storeSignupSchema),
    defaultValues: {
      storeName: "",
      description: "",
      slug: "",
      plan: "starter",
    },
  });

  const onSubmit = async (formData: FormData) => {
    console.log("Vendor signup:", formData);

    signupStore(formData, {
      onSuccess: () => reset()
    })
  };

  const selectedPlan = watch("plan");
  const storeName = watch("storeName");
  const slug = watch("slug");

  return (
    <main className="card w-full max-w-2xl shadow-lg animate-scale-in">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-5"
      >
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="heading text-3xl">
            Store Onboarding
          </h1>

          <p className="subheading text-sm">
            Launch Your Storefront
          </p>

          <p className="subheading mt-2 text-sm">
            Set up your tenant environment and custom domain in 3 simple
            steps.
          </p>
        </div>

        <div className="container-custom max-w-2xl">
          {/* Stepper Progress Bar */}
          <div className="relative mb-8 flex-between">
            <div className="absolute left-0 right-0 top-1/2 -z-10 h-0.5 -translate-y-1/2 bg-border" />

            {steps.map((s) => {
              const Icon = s.icon;
              const isActive = step === s.num;
              const isCompleted = step > s.num;

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
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="heading text-xl font-bold">
                  1. Tell us about your store
                </h2>

                <p className="subheading mt-1 text-xs">
                  This information will be displayed on your public store
                  metadata.
                </p>
              </div>

              {/* Store Name */}
              <div>
                <label
                  htmlFor="storeName"
                  className="label"
                >
                  Store Name
                </label>

                <input
                  id="storeName"
                  type="text"
                  placeholder="Acme Fashion"
                  className="input"
                  {...register("storeName")}
                />

                {errors.storeName && (
                  <p className="error-text mt-1">
                    {errors.storeName.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="label"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  placeholder="Tell customers about your store..."
                  className="textarea"
                  {...register("description")}
                />

                {errors.description && (
                  <p className="error-text mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-primary gap-2 text-xs"
                >
                  Next: Claim Subdomain
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="heading text-xl font-bold">
                  2. Choose your store subdomain
                </h2>

                <p className="subheading mt-1 text-xs">
                  Your tenant routing and wildcard URL for public storefront
                  access.
                </p>
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="slug"
                  className="label"
                >
                  Slug
                </label>

                <input
                  id="slug"
                  type="text"
                  placeholder="acme-fashion"
                  className="input"
                  {...register("slug")}
                />

                {errors.slug && (
                  <p className="error-text mt-1">
                    {errors.slug.message}
                  </p>
                )}

                {slug && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    Your store will be available at{" "}
                    <span className="font-mono text-primary">
                      {slug}.aura.shop
                    </span>
                  </p>
                )}
              </div>

              <div className="flex-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-ghost gap-2 text-xs"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="btn-primary gap-2 text-xs"
                >
                  Next: Choose Plan
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="heading text-xl font-bold">
                  3. Select subscription tier
                </h2>

                <p className="subheading mt-1 text-xs">
                  Choose a tenant plan. You can upgrade or switch to custom
                  CNAMEs anytime.
                </p>
              </div>

              {/* Plans */}
              <div className="space-y-3">
                {plans.map((item) => {
                  const isSelected = selectedPlan === item.id;

                  return (
                    <label
                      key={item.id}
                      htmlFor={`plan-${item.id}`}
                      className={`block cursor-pointer rounded-lg border p-4 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          id={`plan-${item.id}`}
                          type="radio"
                          value={item.id}
                          {...register("plan")}
                          className="mt-1"
                        />

                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">
                                {item.name}
                              </span>

                              {item.popular && (
                                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                                  Popular
                                </span>
                              )}
                            </div>

                            <span className="font-semibold text-primary">
                              {item.price}
                            </span>
                          </div>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </label>
                  );
                })}

                {errors.plan && (
                  <p className="error-text mt-1">
                    {errors.plan.message}
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-1.5 rounded-lg border border-border bg-muted/20 p-4 text-xs">
                <div className="flex-between">
                  <span className="muted">
                    Store Name:
                  </span>

                  <span className="font-semibold text-foreground">
                    {storeName || "—"}
                  </span>
                </div>

                <div className="flex-between">
                  <span className="muted">
                    Assigned Domain:
                  </span>

                  <span className="font-mono font-semibold text-primary">
                    {slug ? `${slug}.aura.shop` : "—"}
                  </span>
                </div>

                <div className="flex-between">
                  <span className="muted">
                    Plan:
                  </span>

                  <span className="font-semibold capitalize text-foreground">
                    {selectedPlan || "—"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-ghost gap-2 text-xs"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary gap-2 px-6 py-2.5 text-xs"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Launching Environment...
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