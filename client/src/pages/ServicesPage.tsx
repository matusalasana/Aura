import {
  ArrowRight,
  ShoppingBag,
  Store,
  Package,
  Palette,
  BarChart3,
  Users,
  Zap,
  Globe,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const customerServices = [
  {
    icon: ShoppingBag,
    title: "Product Discovery",
    description:
      "Explore products from different stores in one place and find items that match your needs and style.",
  },
  {
    icon: Package,
    title: "Convenient Shopping",
    description:
      "Browse product details, compare available options, and manage your shopping experience in one platform.",
  },
  {
    icon: Store,
    title: "Explore Independent Stores",
    description:
      "Discover individual businesses, explore their collections, and shop directly through their storefronts.",
  },
];

const businessServices = [
  {
    icon: Store,
    title: "Your Own Storefront",
    description:
      "Create a dedicated online space for your business, showcase your products, and give customers a place to discover your brand.",
  },
  {
    icon: Package,
    title: "Product & Inventory Management",
    description:
      "Organize your catalog, manage product information, configure variants, and keep your store's offerings up to date.",
  },
  {
    icon: Palette,
    title: "Brand Presentation",
    description:
      "Present your business with its own identity, product collections, pricing, and storefront experience.",
  },
  {
    icon: BarChart3,
    title: "Business Management",
    description:
      "Manage your online operations through a centralized workspace as your product catalog and customer base grow.",
  },
  {
    icon: Users,
    title: "Marketplace Visibility",
    description:
      "Make your products discoverable alongside other businesses on a shared marketplace.",
  },
  {
    icon: Globe,
    title: "Online Reach",
    description:
      "Bring your business online and make your products accessible to customers beyond your physical location.",
  },
];

const benefits = [
  "A shared platform for customers and businesses",
  "Dedicated storefronts for individual businesses",
  "Centralized product and catalog management",
  "A simpler way to discover and explore products",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />

        <div className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-primary/10 blur-3xl sm:size-96" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-2 text-sm font-medium text-primary backdrop-blur">
              <Zap className="size-4" />
              What Aura offers
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Everything you need to{" "}
              <span className="text-primary">shop and grow.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Aura connects customers with growing businesses through one
              online marketplace, combining product discovery with dedicated
              storefronts and tools for running an online business.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <ShoppingBag className="size-5" />
                Explore Products
                <ArrowRight className="size-4" />
              </Link>

              <Link
                to="/sign-up"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Store className="size-5" />
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer services */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              For customers
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              A better way to discover products
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Explore different businesses and their products without
              navigating a separate website for every store.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {customerServices.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" aria-hidden="true" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">{title}</h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Business services */}
      <section className="border-y border-border bg-muted/30 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              For businesses
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Tools to bring your business online
            </h2>

            <p className="mt-4 leading-7 text-muted-foreground">
              Give your business a digital presence, manage your products,
              and reach customers through Aura's connected marketplace.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
            {businessServices.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </div>

                <h3 className="mt-5 font-semibold">{title}</h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/sign-up"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Create Your Store
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Aura */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              One connected platform
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Less fragmentation. More opportunity.
            </h2>

            <p className="mt-5 leading-7 text-muted-foreground">
              Running an online business shouldn't mean piecing together
              disconnected experiences. Aura brings storefronts, products,
              and marketplace discovery together so customers and businesses
              can connect through one platform.
            </p>

            <Link
              to="/"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-primary transition-opacity hover:opacity-80"
            >
              Discover Aura
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-bold">The Aura experience</h3>

            <ul className="mt-6 space-y-5">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-6 text-muted-foreground sm:text-base">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to experience Aura?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-primary-foreground/80 sm:text-base">
            Whether you're looking for your next favorite product or building
            your business online, your next step starts here.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-background px-6 font-semibold text-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Start Shopping
              <ArrowRight className="size-4" />
            </Link>

            <Link
              to="/sign-up"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-primary-foreground/30 px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}