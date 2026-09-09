import { ShieldCheck, Globe, Zap, Layers, Lock, Cpu, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  badge?: string;
}

const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Strict Tenant Data Isolation",
    description:
      "Database queries and authentication sessions are strictly scoped per tenant at the ORM layer to eliminate cross-tenant data leakage.",
    badge: "Security",
  },
  {
    icon: Globe,
    title: "Custom Subdomains & Routing",
    description:
      "Instant wildcard subdomain resolution (`store.aura.shop`) powered by dynamic middleware routing and edge request rewriting.",
    badge: "Multitenancy",
  },
  {
    icon: Zap,
    title: "Redis-Backed Edge Cache",
    description:
      "Ultra-fast store catalog responses and tenant metadata lookups cached with high-performance Upstash Redis key stores.",
    badge: "Performance",
  },
  {
    icon: Lock,
    title: "Integrated Better Auth",
    description:
      "Seamless customer and merchant authentication with role-based permissions scoped directly to individual vendor storefronts.",
    badge: "Authentication",
  },
  {
    icon: Layers,
    title: "Modular Schema with Drizzle ORM",
    description:
      "Type-safe database migrations and PostgreSQL multi-tenant schema isolation for high-scale merchant inventory management.",
    badge: "Database",
  },
  {
    icon: Cpu,
    title: "Developer-First Architecture",
    description:
      "Extensible TypeScript backend designed for custom vendor modules, Webhook event subscriptions, and automated payment payouts.",
    badge: "Extensible",
  },
];

export default function WhyAura() {
  return (
    <section className="section bg-muted/20">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="badge-primary mb-3 gap-1.5">
            <Zap className="h-3.5 w-3.5" />
            <span>Platform Infrastructure</span>
          </div>
          <h2 className="heading text-3xl sm:text-4xl">
            Why Build Your Store with{" "}
            <span className="text-gradient">Aura</span>?
          </h2>
          <p className="subheading mt-3 text-base">
            Engineered specifically for developers building multi-merchant marketplaces, custom storefront networks, and tenant-isolated SaaS platforms.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="card-hover flex flex-col justify-between p-6"
              >
                <div>
                  <div className="flex-between mb-4">
                    <div className="grid-center h-10 w-10 rounded-lg border border-border bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    {feature.badge && (
                      <span className="badge text-[10px] font-semibold uppercase tracking-wider">
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="heading text-lg font-bold">{feature.title}</h3>
                  <p className="subheading mt-2 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-border/50 pt-4">
                  <span className="muted text-[11px] font-mono">
                    0{idx + 1} / Built for Scale
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="card mt-12 flex flex-col items-center justify-between gap-6 bg-card p-8 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="heading text-xl font-bold">
              Ready to launch your multi-tenant storefront?
            </h3>
            <p className="subheading mt-1 text-xs">
              Deploy your first vendor environment or explore our live demo sandbox.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/register" className="btn-primary gap-2">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}