import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Women",
    count: "Explore women's fashion",
    slug: "women",
    icon: "W",
  },
  {
    name: "Men",
    count: "Explore men's fashion",
    slug: "men",
    icon: "M",
  },
  {
    name: "Kids",
    count: "Explore kids' collections",
    slug: "kids",
    icon: "K",
  },
];

export default function TrendingCategories() {
  return (
    <section className="bg-background py-16 transition-colors duration-300 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Heading */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-12">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
              Find your style
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Trending Categories
            </h2>

            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Explore collections for every part of your life.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/products?category=${encodeURIComponent(category.slug)}`}
              className={`group relative flex min-h-48 overflow-hidden rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-56 sm:p-7 ${
                index === 1
                  ? "bg-primary/10"
                  : "bg-muted/60"
              }`}
            >
              {/* Decorative background */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full border border-primary/10 transition-transform duration-500 group-hover:scale-125 sm:size-44"
              />

              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-2 size-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-110 sm:size-28"
              />

              <div className="relative z-10 flex flex-1 flex-col justify-between gap-8">
                <div className="flex size-12 items-center justify-center rounded-xl border border-primary/15 bg-background/80 text-lg font-bold text-primary shadow-sm">
                  {category.icon}
                </div>

                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                      {category.name}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.count}
                    </p>
                  </div>

                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowRight size={17} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}