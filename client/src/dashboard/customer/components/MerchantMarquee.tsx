import { ArrowRight } from "lucide-react";
import type { Store } from "@/types/store";

interface Props {
  stores: Store[];
}

export default function MerchantMarquee({ stores }: Props) {
  return (
    <section className="border-y bg-background py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Trusted by growing businesses
          </p>

          <h2 className="text-2xl font-semibold tracking-tight">
            Built for stores ready to grow
          </h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

          <div className="flex w-max animate-scroll-left gap-4">
            {stores.map((store, index) => (
              <div
                key={`${store.name}-${index}`}
                className="flex h-16 min-w-48 items-center gap-3 rounded-xl border bg-card px-5"
              >
                {store.logo ? (
                  <img
                    src={store.logo}
                    alt={`${store.name} logo`}
                    className="h-9 w-9 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 px-1 text-xs font-bold text-primary">
                    {store.name.split(" ")[0] ?? store.name}
                  </div>
                )}

                <span className="whitespace-nowrap font-medium">
                  {store.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="group flex items-center gap-2 text-sm font-medium text-primary">
            Explore stores
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}