import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Aura gives businesses a simpler way to put their products online and manage everything from one place.",
    name: "Early Merchant",
    role: "Store Owner",
    store: "Demo Store",
  },
  {
    quote:
      "Customers can discover products while businesses focus on running their stores.",
    name: "Early Merchant",
    role: "Business Owner",
    store: "Demo Store",
  },
  {
    quote:
      "Having an individual storefront while being part of a larger marketplace creates a different shopping experience.",
    name: "Early Merchant",
    role: "Store Owner",
    store: "Demo Store",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-muted/30 py-16 transition-colors duration-300 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
            Why Aura
          </p>

          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Built with real businesses in mind
          </h2>

          <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            A simpler way for businesses to bring their products online,
            build their storefronts, and connect with customers.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.role}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
            >
              <Quote
                className="size-8 text-primary/40 transition-colors group-hover:text-primary"
                aria-hidden="true"
              />

              <blockquote className="mt-5 flex-1 text-sm leading-7 text-card-foreground sm:mt-6 sm:text-base">
                “{testimonial.quote}”
              </blockquote>

              <div className="mt-7 flex items-center gap-3 border-t border-border pt-5">
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary"
                  aria-hidden="true"
                >
                  {testimonial.name.charAt(0)}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-card-foreground">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {testimonial.role} · {testimonial.store}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Illustrative examples of the experience Aura aims to provide.
        </p>
      </div>
    </section>
  );
}