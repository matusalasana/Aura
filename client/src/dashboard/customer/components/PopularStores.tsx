import { Link } from "react-router-dom";
import { Store, Star, ArrowUpRight, CheckCircle2, Globe } from "lucide-react";

interface Storefront {
  id: string;
  name: string;
  subdomain: string;
  category: string;
  rating: number;
  productsCount: number;
  logoUrl: string;
  verified: boolean;
  themeColor: string;
}

const POPULAR_STORES: Storefront[] = [
  {
    id: "1",
    name: "Urban Thread",
    subdomain: "urbanthread.aura.shop",
    category: "Streetwear & Apparel",
    rating: 4.9,
    productsCount: 142,
    logoUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80",
    verified: true,
    themeColor: "from-amber-500 to-orange-600",
  },
  {
    id: "2",
    name: "PulseGear",
    subdomain: "pulsegear.aura.shop",
    category: "Audio & Workstations",
    rating: 4.8,
    productsCount: 89,
    logoUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80",
    verified: true,
    themeColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "3",
    name: "RoastLab Coffee",
    subdomain: "roastlab.aura.shop",
    category: "Specialty Coffee Beans",
    rating: 5.0,
    productsCount: 34,
    logoUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80",
    verified: true,
    themeColor: "from-emerald-500 to-teal-600",
  },
];

export default function PopularStores() {
  return (
    <section className="section">
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex-between mb-8 flex-col gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <div className="badge-primary mb-2 gap-1.5">
              <Store className="h-3.5 w-3.5" />
              <span>Top Merchants</span>
            </div>
            <h2 className="heading text-2xl sm:text-3xl">Popular Stores on Aura</h2>
            <p className="subheading mt-1 text-sm">
              Discover verified multi-tenant storefronts running on custom subdomains
            </p>
          </div>

          <Link to="/stores" className="btn-outline gap-2 text-sm">
            Explore All Stores <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {POPULAR_STORES.map((store) => (
            <div
              key={store.id}
              className="card-hover group relative flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Bar */}
              <div
                className={`h-1.5 w-full bg-gradient-to-r ${store.themeColor}`}
              />

              <div className="p-6">
                {/* Store Header */}
                <div className="flex-between items-start gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={store.logoUrl}
                      alt={store.name}
                      className="avatar h-12 w-12 border border-border"
                      loading="lazy"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="heading text-base font-bold group-hover:text-primary transition-colors">
                          {store.name}
                        </h3>
                        {store.verified && (
                          <CheckCircle2 className="h-4 w-4 text-success" />
                        )}
                      </div>
                      <span className="muted text-xs">{store.category}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="badge gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{store.rating}</span>
                  </div>
                </div>

                {/* Subdomain Badge */}
                <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs font-mono text-muted-foreground">
                  <Globe className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="truncate">{store.subdomain}</span>
                </div>

                {/* Metrics */}
                <div className="flex-between mt-4 text-xs">
                  <span className="muted">Catalog Size</span>
                  <span className="font-medium text-foreground">
                    {store.productsCount} Products
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="border-t border-border bg-muted/20 px-6 py-3">
                <a
                  href={`https://${store.subdomain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost w-full justify-between px-0 text-xs font-semibold text-primary hover:bg-transparent"
                >
                  <span>Visit Storefront</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}