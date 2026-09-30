import { ArrowRight, Play, ShoppingBag, Store } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />

      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid min-h-[680px] items-center gap-16 py-24 lg:grid-cols-2">
          {/* Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-primary" />
              A better way to shop and sell online
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Everything you need.
              <span className="block text-primary">
                All in one place.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Discover products from growing businesses, or build your own
              online store with Aura. One platform connecting customers,
              products, and businesses.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition hover:opacity-90">
                <ShoppingBag className="h-5 w-5" />
                Start Shopping
                <ArrowRight className="h-4 w-4" />
              </button>

              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border bg-background px-6 font-semibold transition hover:bg-muted">
                <Store className="h-5 w-5" />
                Start Selling
              </button>
            </div>

            {/* Trust */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>✓ Easy to get started</span>
              <span>✓ Built for growing businesses</span>
              <span>✓ One connected platform</span>
            </div>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-[520px]">
              {/* Main card */}
              <div className="absolute inset-10 rounded-3xl border bg-card p-5 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Featured Store
                    </p>
                    <h3 className="mt-1 text-xl font-bold">
                      Urban Goods
                    </h3>
                  </div>

                  <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    Active
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="aspect-square rounded-2xl bg-muted" />
                  <div className="aspect-square rounded-2xl bg-muted" />
                  <div className="aspect-square rounded-2xl bg-muted" />
                  <div className="aspect-square rounded-2xl bg-muted" />
                </div>
              </div>

              {/* Floating product card */}
              <div className="absolute right-0 top-16 w-48 rounded-2xl border bg-card p-4 shadow-xl">
                <div className="h-24 rounded-xl bg-muted" />

                <p className="mt-3 text-sm font-semibold">
                  Premium Product
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  $255.00
                </p>
              </div>

              {/* Floating store card */}
              <div className="absolute bottom-14 left-0 flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-xl">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <Store className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <p className="text-sm font-semibold">
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