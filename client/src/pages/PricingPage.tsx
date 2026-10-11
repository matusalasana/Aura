import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  HelpCircle,
  Minus,
  Sparkles,
  Store,
  Zap,
} from "lucide-react";

type BillingPeriod = "monthly" | "yearly";

type PricingPlan = {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
  icon: typeof Store;
  cta: string;
};

const plans: PricingPlan[] = [
  {
    name: "Starter",
    description: "A simple starting point for getting your store online.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Store,
    cta: "Get started",
    features: [
      "Create your store",
      "Basic store customization",
      "Product listing management",
      "Order management",
      "Standard store dashboard",
    ],
  },
  {
    name: "Growth",
    description: "For businesses ready to grow their online presence.",
    monthlyPrice: 499,
    yearlyPrice: 399,
    icon: Zap,
    cta: "Choose Growth",
    popular: true,
    features: [
      "Everything in Starter",
      "More store customization",
      "Expanded product capacity",
      "Sales and order insights",
      "Priority support, if available",
    ],
  },
  {
    name: "Business",
    description: "For established businesses with broader needs.",
    monthlyPrice: 1299,
    yearlyPrice: 999,
    icon: Sparkles,
    cta: "Contact us",
    features: [
      "Everything in Growth",
      "Higher usage limits",
      "Advanced store configuration",
      "Additional team capabilities, when supported",
      "Business-focused support",
    ],
  },
];

const faqs = [
  {
    question: "Can I start with the free plan?",
    answer:
      "Yes. The Starter plan is presented as a free entry option in this pricing design. Confirm that its limits and features match what your backend currently supports.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "The intended pricing model allows businesses to change plans as their needs evolve. Plan changes need to be supported by Aura's billing and subscription logic.",
  },
  {
    question: "Are these prices final?",
    answer:
      "No. The prices in this page are example values in Ethiopian birr (ETB). Set your actual pricing, billing periods, and feature limits before publishing.",
  },
  {
    question: "Does a paid plan guarantee more sales?",
    answer:
      "No plan can guarantee sales. Paid plans should offer clearly defined features or limits rather than promises about business results.",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] =
    useState<BillingPeriod>("monthly");

  const isYearly = billingPeriod === "yearly";

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground">
            <Sparkles className="size-4 text-primary" />
            Simple, transparent pricing
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The right plan for{" "}
            <span className="text-primary">your next step.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Whether you're starting a small store or managing a growing
            business, find a plan that fits your needs.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div
              className="inline-flex items-center rounded-xl border border-border bg-card p-1"
              role="group"
              aria-label="Billing period"
            >
              <button
                type="button"
                aria-pressed={!isYearly}
                onClick={() => setBillingPeriod("monthly")}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  !isYearly
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>

              <button
                type="button"
                aria-pressed={isYearly}
                onClick={() => setBillingPeriod("yearly")}
                className={`rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  isYearly
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Yearly
              </button>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
              <Check className="size-3.5" />
              Save with yearly billing
            </span>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = isYearly
              ? plan.yearlyPrice
              : plan.monthlyPrice;

            return (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border bg-card p-6 text-card-foreground sm:p-8 ${
                  plan.popular
                    ? "border-primary shadow-lg shadow-primary/5"
                    : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground">
                    Most popular
                  </div>
                )}

                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>

                <h2 className="mt-5 text-xl font-bold">{plan.name}</h2>

                <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">
                  {plan.description}
                </p>

                <div className="mt-6 border-b border-border pb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold tracking-tight">
                      {price === 0
                        ? "Free"
                        : `${price.toLocaleString("en-US")} ETB`}
                    </span>
                  </div>

                  {price > 0 && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      per month
                      {isYearly ? ", billed yearly" : ", billed monthly"}
                    </p>
                  )}

                  {price === 0 && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      No subscription fee
                    </p>
                  )}
                </div>

                <ul className="mt-6 flex-1 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-6"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={
                    plan.name === "Business"
                      ? "/contact"
                      : "/signup"
                  }
                  className={`mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    plan.popular
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "border border-border bg-background hover:bg-muted"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </article>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
          Example pricing for the page design. Confirm actual prices,
          subscription terms, and included features before launch.
        </p>
      </section>

      {/* Feature comparison */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Compare plans
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Know what you're choosing.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              A quick overview of the proposed differences between plans.
              Update this table to match the features enforced by your
              application.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-5 py-4 font-semibold">Feature</th>
                  <th className="px-5 py-4 font-semibold">Starter</th>
                  <th className="px-5 py-4 font-semibold text-primary">
                    Growth
                  </th>
                  <th className="px-5 py-4 font-semibold">Business</th>
                </tr>
              </thead>

              <tbody>
                {[
                  {
                    feature: "Store creation",
                    starter: true,
                    growth: true,
                    business: true,
                  },
                  {
                    feature: "Product management",
                    starter: true,
                    growth: true,
                    business: true,
                  },
                  {
                    feature: "Order management",
                    starter: true,
                    growth: true,
                    business: true,
                  },
                  {
                    feature: "Sales insights",
                    starter: false,
                    growth: true,
                    business: true,
                  },
                  {
                    feature: "Advanced configuration",
                    starter: false,
                    growth: false,
                    business: true,
                  },
                  {
                    feature: "Expanded usage limits",
                    starter: false,
                    growth: true,
                    business: true,
                  },
                ].map((row) => (
                  <tr
                    key={row.feature}
                    className="border-b border-border last:border-0"
                  >
                    <td className="px-5 py-4 font-medium">
                      {row.feature}
                    </td>

                    {[row.starter, row.growth, row.business].map(
                      (included, index) => (
                        <td key={index} className="px-5 py-4">
                          {included ? (
                            <Check
                              className="size-5 text-primary"
                              aria-label="Included"
                            />
                          ) : (
                            <Minus
                              className="size-5 text-muted-foreground"
                              aria-label="Not included"
                            />
                          )}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <HelpCircle className="size-6" />
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Pricing questions?
          </h2>

          <p className="mt-3 text-muted-foreground">
            A few things to know before choosing a plan.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-border bg-card p-5 open:border-primary/40 sm:p-6"
            >
              <summary className="cursor-pointer list-none font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-xl text-primary transition-transform group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-6 text-card-foreground sm:p-10 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Not sure which plan fits?
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              Tell us what your business needs and explore the available
              options with the Aura team.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Contact us
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}