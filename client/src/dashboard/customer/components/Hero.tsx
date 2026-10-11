import { ArrowRight, ShoppingBag, Store } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />

      <div className="absolute left-1/2 top-0 -z-10 h-[400px] w-[600px] max-w-full -translate-x-1/2 rounded-full bg-primary/10 blur-3xl sm:h-[500px] sm:w-[800px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid items-center gap-12 py-16 sm:py-20 lg:min-h-[680px] lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* Content */}
          <div className="mx-auto max-w-2xl lg:mx-0">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:text-sm">
              <span className="size-2 rounded-full bg-primary" />
              A better way to shop and sell online
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl">
              Everything you need.
              <span className="mt-1 block text-primary">
                All in one place.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Discover products from growing businesses, or build your own
              online store with Aura. One platform connecting customers,
              products, and businesses.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/products"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ShoppingBag className="size-5" />
                Start Shopping
                <ArrowRight className="size-4" />
              </Link>

              <Link
                to="/signup"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Store className="size-5" />
                Start Selling
              </Link>
            </div>

            {/* Trust */}
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="text-primary">✓</span>
                Easy to get started
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-primary">✓</span>
                Built for growing businesses
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-primary">✓</span>
                One connected platform
              </span>
            </div>
          </div>

          {/* Visual */}
          <div className="relative mx-auto hidden w-full max-w-xl lg:block">
            <div className="relative aspect-square">
              {/* Main store card */}
              <div className="absolute inset-10 rounded-3xl border border-border bg-card p-5 shadow-2xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Featured Store
                    </p>
                    <h3 className="mt-1 text-xl font-bold text-card-foreground">
                      Urban Goods
                    </h3>
                  </div>

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Active
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  {[
                    "bg-primary/10",
                    "bg-muted",
                    "bg-muted",
                    "bg-primary/10",
                  ].map((color, index) => (
                    <div
                      key={index}
                      className={`aspect-square rounded-2xl ${color}`}
                    >
                      <div className="flex h-full items-center justify-center rounded-2xl border border-border/50">
                        {index % 2 === 0 ? (
                          <ShoppingBag className="size-8 text-primary/40" />
                        ) : (
                          <Store className="size-8 text-muted-foreground/40" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating product card */}
              <div className="absolute right-0 top-16 w-44 rounded-2xl border border-border bg-card p-4 shadow-xl xl:w-48">
                <div className="flex h-24 items-center justify-center rounded-xl bg-primary/10">
                  <ShoppingBag className="size-10 text-primary/50" />
                </div>

                <p className="mt-3 text-sm font-semibold text-card-foreground">
                  Premium Product
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Explore the collection
                </p>
              </div>

              {/* Floating store card */}
              <div className="absolute bottom-14 left-0 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-xl">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                  <Store className="size-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    Your Store
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ready to grow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}