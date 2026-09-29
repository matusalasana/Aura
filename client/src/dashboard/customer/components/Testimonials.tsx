import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Aura gave us a much simpler way to put our products online and manage everything from one place.",
    name: "Early Merchant",
    role: "Store Owner",
    store: "Demo Store",
  },
  {
    quote:
      "The experience feels simple from both sides. Customers can discover products while we focus on running the store.",
    name: "Early Merchant",
    role: "Business Owner",
    store: "Demo Store",
  },
  {
    quote:
      "Having our own storefront while still being part of a larger marketplace makes Aura different from the usual approach.",
    name: "Early Merchant",
    role: "Store Owner",
    store: "Demo Store",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
            Success Stories
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built with real businesses in mind
          </h2>

          <p className="mt-4 text-muted-foreground">
            See how businesses are using Aura to bring their products online
            and connect with more customers.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="relative rounded-2xl border bg-card p-7"
            >
              <Quote className="h-8 w-8 text-primary/30" />

              <blockquote className="mt-6 text-base leading-7">
                “{testimonial.quote}”
              </blockquote>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <p className="font-semibold">
                    {testimonial.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {testimonial.role} · {testimonial.store}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}