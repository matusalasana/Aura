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
    <section className="bg-background py-16 transition-colors duration-300 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
            Why Aura?
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Everything you need to shop and grow
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
            Aura brings customers and businesses together with the tools
            needed for a better online marketplace experience.
          </p>
        </div>

        {/* Features */}
        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:p-6"
            >
              <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </div>

              <h3 className="font-semibold leading-snug text-card-foreground">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}