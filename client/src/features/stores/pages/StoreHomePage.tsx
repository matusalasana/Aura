import { useState } from "react";
import {
  ArrowLeft,
  Search,
  Store as StoreIcon,
  Package,
  ShoppingBag,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/features/stores/hooks/useStore";
import type { Product } from "@/types/product";
import ProductGrid from "@/components/common/product/ProductGrid"


const StoreHomePage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: store, isLoading, isError, refetch } =
    useStore(slug);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [logoError, setLogoError] = useState(false);

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6">
        <div className="h-56 rounded-2xl bg-muted sm:h-72" />
        <div className="mt-8 h-8 w-56 rounded bg-muted" />
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <div className="aspect-square rounded-xl bg-muted" />
              <div className="h-4 rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (isError || !store) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <StoreIcon
          size={44}
          className="mb-4 text-muted-foreground"
          aria-hidden="true"
        />
        <h1 className="text-xl font-bold text-foreground">
          Store not found
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This store may not exist or may no longer be available.
        </p>
        <Button className="mt-5" onClick={() => navigate("/stores")}>
          Browse stores
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Store banner */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/stores"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All stores
          </Link>

          <div className="relative mt-4 overflow-hidden rounded-2xl bg-muted">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-muted to-muted" />

            <div className="relative flex min-h-60 flex-col justify-end gap-5 p-5 sm:min-h-72 sm:flex-row sm:items-end sm:justify-between sm:p-8">
              <div className="flex min-w-0 items-center gap-4 sm:gap-5">
                <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-card shadow-sm sm:size-24">
                  {store.logo && !logoError ? (
                    <img
                      src={store.logo}
                      alt={`${store.storeName} logo`}
                      onError={() => setLogoError(true)}
                      className="size-full object-cover"
                    />
                  ) : (
                    <StoreIcon
                      size={36}
                      className="text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
                    Storefront
                  </p>
                  <h1 className="break-words text-2xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {store.storeName}
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Discover products from this store.
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-card/80 px-3 py-2 text-sm text-muted-foreground backdrop-blur sm:self-auto">
                <ShoppingBag size={16} aria-hidden="true" />
                {store.products?.length}{" "}
                {store.products?.length === 1 ? "product" : "products"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Explore the collection
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Find something you love.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="h-11 pl-10"
            />
          </div>
        </div>

    
        {isLoading ? (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square rounded-xl bg-muted" />
                <div className="mt-3 h-4 rounded bg-muted" />
                <div className="mt-2 h-4 w-1/2 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="mt-10 rounded-2xl border border-border px-5 py-12 text-center">
            <p className="font-medium text-foreground">
              Could not load products
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Please try again.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => refetch()}
            >
              Try again
            </Button>
          </div>
        ) : store.products?.length > 0 ? (
          <ProductGrid
            products={store.products ?? []}
          />
          
        ) : (
          <div className="mt-8 flex flex-col items-center rounded-2xl border border-dashed border-border px-5 py-16 text-center">
            <Package
              size={40}
              className="mb-4 text-muted-foreground/60"
              aria-hidden="true"
            />
            <h3 className="font-semibold text-foreground">
              {search || activeCategory !== "All"
                ? "No matching products"
                : "No products yet"}
            </h3>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {search || activeCategory !== "All"
                ? "Try another search or choose a different category."
                : "This store hasn't added any products yet. Check back soon."}
            </p>
            {(search || activeCategory !== "All") && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        )}
      </section>
    </main>
  );
};


export default StoreHomePage;