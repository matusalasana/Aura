import { ArrowRight, Store as StoreIcon } from "lucide-react";
import { Link } from "react-router-dom";
import type { Store } from "@/types/store";

interface Props {
  stores: Store[];
}

const FeaturedStores = ({stores}: Props) => {
  return (
    <section className="bg-background py-16 transition-colors duration-300 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-12">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured Stores
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground sm:text-base">
              Discover curated collections from our top creators.
            </p>
          </div>

          <Link
            to="/stores"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-base"
          >
            View all
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {stores.map((store) => (
            <Link
              key={store.storeName}
              to={`/stores/${encodeURIComponent(
                store.storeName.toLowerCase().replace(/\s+/g, "-")
              )}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="relative h-56 overflow-hidden bg-muted sm:h-64">
                <img
                  src={store.logo || undefined}
                  alt={`${store.storeName} store`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/15 text-white backdrop-blur-sm">
                    <StoreIcon size={21} aria-hidden="true" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-white sm:text-xl">
                      {store.storeName}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-white/80">
                      {store.plan}
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className="mb-1 ml-auto shrink-0 text-white opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedStores;