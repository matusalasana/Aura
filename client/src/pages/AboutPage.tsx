import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  Layers3,
  ShoppingBag,
  Store,
  Users,
  Sparkles,
  Compass,
} from "lucide-react";

const values = [
  {
    icon: ShoppingBag,
    title: "A better shopping experience",
    description:
      "Finding products should feel simple. Aura brings products from different stores into one place, making it easier to explore your options.",
  },
  {
    icon: Store,
    title: "Opportunities for businesses",
    description:
      "Aura gives businesses a place to present their products online and reach customers through a shared marketplace.",
  },
  {
    icon: Heart,
    title: "Built around people",
    description:
      "Behind every order is a person, and behind every store is someone building a business. We want the experience to work for both.",
  },
];

const principles = [
  {
    icon: Compass,
    title: "Keep it simple",
    description:
      "Clear navigation, useful product information, and a straightforward experience from browsing to checkout.",
  },
  {
    icon: Users,
    title: "Bring people together",
    description:
      "Create a shared space where customers can discover stores and businesses can showcase what they offer.",
  },
  {
    icon: Layers3,
    title: "Keep improving",
    description:
      "Build on feedback, focus on what matters, and improve the marketplace as the needs of its users evolve.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 -top-24 size-80 rounded-full bg-primary/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-20 size-96 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="size-4 text-primary" />
              Get to know Aura
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              More than a marketplace.{" "}
              <span className="text-primary">A place to discover.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Aura brings shoppers and businesses together in one online
              marketplace. Explore products, discover stores, and find more of
              what you're looking for without jumping between different sites.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Explore products
                <ArrowRight className="size-4" />
              </Link>

              <Link
                to="/stores"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-background px-6 font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Discover stores
              </Link>
            </div>
          </div>

          {/* Decorative marketplace illustration */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/5 blur-2xl" />

            <div className="relative rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-7">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Welcome to
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight">
                    Aura<span className="text-primary">.</span>
                  </h2>
                </div>

                <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ShoppingBag className="size-6" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-muted/60 p-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-background text-primary">
                    <ShoppingBag className="size-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">Explore</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Products for different needs and interests.
                  </p>
                </div>

                <div className="rounded-2xl bg-primary/10 p-4">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-background text-primary">
                    <Store className="size-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">Discover</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    Stores and businesses in one marketplace.
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-border p-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Heart className="size-5" />
                </div>

                <div>
                  <p className="font-semibold">Shopping, connected</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    One place to find something you love.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 top-10 hidden rounded-xl border border-border bg-card px-4 py-3 shadow-sm sm:block">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="size-2 rounded-full bg-primary" />
                Made for discovery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our story
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Shopping should feel less complicated.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-muted-foreground">
            <p>
              Shopping online offers plenty of choices, but finding the right
              product can mean visiting multiple websites, comparing different
              stores, and figuring out where to start.
            </p>

            <p>
              Aura is built around a simple idea: bring products and stores
              together in one marketplace where people can browse, discover,
              and shop more conveniently.
            </p>

            <p>
              We also want businesses to have a place to showcase their
              products online. By connecting stores and shoppers through one
              platform, Aura aims to make online commerce more accessible and
              easier to navigate.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              What matters to us
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built with a clear purpose.
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              The experience should be useful for the people who shop and the
              people who sell.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-border bg-card p-6 text-card-foreground transition-colors hover:border-primary/40 sm:p-7"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            How we think
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            The principles behind Aura.
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            We're focused on creating a marketplace that stays useful,
            approachable, and practical as it grows.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <article key={principle.title} className="flex gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-primary">
                  <Icon className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-medium text-primary">
                    0{index + 1}
                  </p>

                  <h3 className="mt-1 text-lg font-semibold">
                    {principle.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-10 sm:py-16 lg:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full border border-primary-foreground/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-36 right-40 size-80 rounded-full border border-primary-foreground/10"
          />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Your next discovery starts here.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-primary-foreground/80">
                Explore the marketplace, find stores, and see what Aura has
                to offer.
              </p>
            </div>

            <Link
              to="/"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-background px-6 font-semibold text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Start exploring
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}