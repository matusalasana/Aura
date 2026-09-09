import { useState } from "react";
import { Check, Zap, Sparkles, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Tier {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  badge?: string;
  isPopular?: boolean;
  features: string[];
  ctaText: string;
  ctaVariant: "primary" | "outline";
}

const PRICING_TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for new merchants launching their first online storefront.",
    monthlyPrice: 1900,
    annualPrice: 1500,
    features: [
      "1 Storefront (`subdomain.aura.shop`)",
      "Up to 100 Products",
      "Standard Redis Caching",
      "Better Auth Session Control",
      "2.0% Transaction Fee",
      "Community Support",
    ],
    ctaText: "Start Starter Trial",
    ctaVariant: "outline",
  },
  {
    id: "pro",
    name: "Pro Vendor",
    description: "Designed for growing brands needing custom domain routing & analytics.",
    monthlyPrice: 4900,
    annualPrice: 3900,
    badge: "Most Popular",
    isPopular: true,
    features: [
      "Up to 3 Subdomains or Custom Domains",
      "Unlimited Products & Catalog Items",
      "Priority Redis Edge Caching",
      "Drizzle Row-Level Tenant Isolation",
      "0.5% Transaction Fee",
      "Custom Storefront CSS Styling",
      "Priority Email & Chat Support",
    ],
    ctaText: "Launch Pro Store",
    ctaVariant: "primary",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For platforms, agencies, and large-scale multi-merchant networks.",
    monthlyPrice: 14900,
    annualPrice: 11900,
    features: [
      "Unlimited Vendor Storefronts",
      "Dedicated PostgreSQL Instance",
      "Custom CNAME SSL Provisioning",
      "0% Platform Transaction Fees",
      "Super-Admin Management Dashboard",
      "Custom Webhooks & API Access",
      "24/7 SLA & Dedicated Support Manager",
    ],
    ctaText: "Contact Sales",
    ctaVariant: "outline",
  },
];

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="section bg-muted/20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="badge-primary mb-3 gap-1.5">
            <Zap className="h-3.5 w-3.5" />
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2 className="heading text-3xl sm:text-4xl">
            Choose the Right Plan for Your Store
          </h2>
          <p className="subheading mt-3 text-base">
            Scale your multi-tenant storefront with built-in subdomain isolation, high-speed caching, and flexible vendor limits.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 flex-center gap-3">
            <span className={`text-xs font-semibold ${!isAnnual ? "text-foreground" : "text-secondary"}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative h-6 w-11 rounded-full bg-muted p-1 transition-colors duration-200 focus-ring"
              aria-label="Toggle annual billing"
            >
              <div
                className={`h-4 w-4 rounded-full bg-primary transition-transform duration-200 ${
                  isAnnual ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <div className="flex-center gap-1.5">
              <span className={`text-xs font-semibold ${isAnnual ? "text-foreground" : "text-secondary"}`}>
                Annual
              </span>
              <span className="badge-success text-[10px] font-bold">Save 20%</span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 items-stretch">
          {PRICING_TIERS.map((tier) => {
            const price = isAnnual ? tier.annualPrice : tier.monthlyPrice;

            return (
              <div
                key={tier.id}
                className={`card-hover relative flex flex-col justify-between p-8 transition-all ${
                  tier.isPopular
                    ? "border-2 border-primary bg-card shadow-lg"
                    : "border border-border bg-card"
                }`}
              >
                {/* Popular Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="badge-primary gap-1 px-3 py-1 text-xs font-bold shadow-sm">
                      <Sparkles className="h-3 w-3" />
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div>
                  {/* Plan Name & Desc */}
                  <div className="flex-between">
                    <h3 className="heading text-xl font-bold">{tier.name}</h3>
                  </div>
                  <p className="subheading mt-2 text-xs leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Price Display */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="heading text-4xl font-extrabold">{price} ETB</span>
                    <span className="muted text-xs">/ month</span>
                  </div>
                  {isAnnual && (
                    <span className="muted text-[11px]">Billed annually ({price * 12} ETB/yr)</span>
                  )}

                  {/* Divider */}
                  <div className="my-6 border-t border-border/60" />

                  {/* Feature List */}
                  <div className="space-y-3">
                    <span className="heading text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      What's Included:
                    </span>
                    <ul className="space-y-2.5">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-foreground">
                          <Check className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Call to Action Button */}
                <div className="mt-8">
                  <Link
                    to={tier.id === "enterprise" ? "/contact" : "/register"}
                    className={`w-full justify-center text-xs font-bold py-3 ${
                      tier.ctaVariant === "primary" ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {tier.ctaText}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Guarantee / Info */}
        <div className="mt-12 text-center text-xs text-secondary flex-center gap-2">
          <HelpCircle className="h-4 w-4 text-primary" />
          <span>Need custom enterprise SLAs or multi-region routing? <Link to="/contact" className="link font-semibold">Talk to our platform architect</Link></span>
        </div>
      </div>
    </section>
  );
}