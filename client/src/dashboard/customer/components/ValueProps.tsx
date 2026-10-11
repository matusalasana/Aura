import { ShieldCheck, Truck, Sparkles } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Shopping",
    description:
      "Discover products from independent businesses in one convenient marketplace.",
  },
  {
    icon: Truck,
    title: "Convenient Ordering",
    description:
      "Explore products from different stores and manage your shopping in one place.",
  },
  {
    icon: Sparkles,
    title: "Discover Something New",
    description:
      "Find distinctive products and explore collections from growing businesses.",
  },
];

export default function ValueProps() {
  return (
    <section className="bg-muted/30 py-16 transition-colors duration-300 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group flex h-full flex-col items-center rounded-2xl border border-border bg-card p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
            >
              <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                <Icon className="size-8" aria-hidden="true" />
              </div>

              <h3 className="mb-3 text-lg font-bold text-card-foreground sm:text-xl">
                {title}
              </h3>

              <p className="max-w-sm text-sm leading-7 text-muted-foreground sm:text-base">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}