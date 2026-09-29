import { ArrowRight } from "lucide-react";

const merchants = [
  { name: "Nova Market", logo: "NM" },
  { name: "Urban Goods", logo: "UG" },
  { name: "Luma Store", logo: "LS" },
  { name: "EthioCraft", logo: "EC" },
  { name: "Mira Fashion", logo: "MF" },
  { name: "Addis Supply", logo: "AS" },
];

export default function MerchantMarquee() {
  return (
    <section className="border-y bg-background py-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Trusted by growing businesses
          </p>

          <h2 className="text-2xl font-semibold tracking-tight">
            Built for merchants ready to grow
          </h2>
        </div>

        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent" />

          <div className="flex w-max animate-scroll-left gap-4">
            {[...merchants, ...merchants].map((merchant, index) => (
              <div
                key={`${merchant.name}-${index}`}
                className="flex h-16 min-w-48 items-center gap-3 rounded-xl border bg-card px-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {merchant.logo}
                </div>

                <span className="whitespace-nowrap font-medium">
                  {merchant.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button className="group flex items-center gap-2 text-sm font-medium text-primary">
            Explore stores

            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}