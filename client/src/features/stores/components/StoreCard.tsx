import { ArrowRight, Store as StoreIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Store } from "@/types/store";

interface Props {
  store: Store;
}

const StoreCard = ({ store }: Props) => {
  const [imageError, setImageError] = useState(false);

  const showLogo = Boolean(store.logo) && !imageError;

  return (
    <Link
      to={`/stores/${store.slug}`}
      aria-label={`Visit ${store.name}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Store cover */}
      <div className="relative flex h-36 items-center justify-center overflow-hidden bg-muted sm:h-40">
        {showLogo ? (
          <img
            src={store.logo!}
            alt={`${store.name} logo`}
            loading="lazy"
            onError={() => setImageError(true)}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
            <StoreIcon
              size={44}
              strokeWidth={1.25}
              className="text-muted-foreground/50"
              aria-hidden="true"
            />
          </div>
        )}

        <span className="absolute right-3 top-3 rounded-full border border-border/60 bg-background/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
          Store
        </span>
      </div>

      {/* Store details */}
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-muted">
            {showLogo ? (
              <img
                src={store.logo!}
                alt=""
                className="size-full object-cover"
                aria-hidden="true"
              />
            ) : (
              <StoreIcon
                size={21}
                className="text-muted-foreground"
                aria-hidden="true"
              />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-card-foreground transition-colors group-hover:text-primary">
              {store.name}
            </h3>
            <p className="mt-1 truncate text-sm text-muted-foreground">
              Explore this store's collection
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-medium text-muted-foreground">
            Visit store
          </span>

          <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground">
            <ArrowRight size={16} aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;