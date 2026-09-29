import {
  ShoppingBag,
  Store,
  Zap,
  Package,
  BarChart3,
  ShieldCheck,
  Globe,
  Rocket,
} from "lucide-react";

const features = [
  {
    icon: ShoppingBag,
    title: "Discover Products",
    description:
      "Find products from independent stores and growing brands in one place.",
  },
  {
    icon: Store,
    title: "Your Store, Your Brand",
    description:
      "Give your business its own storefront with your branding, products, and pricing.",
  },
  {
    icon: Zap,
    title: "Fast & Simple",
    description:
      "A clean shopping experience designed to make browsing and buying effortless.",
  },
  {
    icon: Package,
    title: "Powerful Product Management",
    description:
      "Manage products, variants, inventory, pricing, and your catalog from one place.",
  },
  {
    icon: BarChart3,
    title: "Built to Grow",
    description:
      "Get the tools and insights you need as your business grows.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description:
      "Modern authentication and security practices help protect your account and data.",
  },
  {
    icon: Globe,
    title: "Reach More Customers",
    description:
      "Put your products online and reach customers beyond your physical location.",
  },
  {
    icon: Rocket,
    title: "One Platform, Many Possibilities",
    description:
      "Everything you need to shop, sell, and grow in one connected platform.",
  },
];

export default function WhyAura() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Why Aura?
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to shop and grow
          </h2>

          <p className="mt-4 text-muted-foreground">
            Aura brings customers and businesses together with the tools
            needed for a better online marketplace experience.
          </p>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}