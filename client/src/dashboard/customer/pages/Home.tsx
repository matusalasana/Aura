import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { useStores } from "@/features/stores/hooks/useStores";

import Hero from "@/dashboard/customer/components/Hero";
import FeaturedCategories from "@/dashboard/customer/components/FeaturedCategories";
import FeaturedStores from "@/dashboard/customer/components/FeaturedStores";
import PopularStores from "@/dashboard/customer/components/PopularStores";
import WhyAura from "@/dashboard/customer/components/WhyAura";
import Testimonials from "@/dashboard/customer/components/Testimonials";
import FAQ from "@/dashboard/customer/components/FAQ";
import Pricing from "@/dashboard/customer/components/Pricing";
import MerchantMarquee from "@/dashboard/customer/components/MerchantMarquee";


export default function AuraHomePage() {
  
  const { data: stores = [] } = useStores();
  
  return (
    <main className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Hero />

      <MerchantMarquee stores={stores ?? []} />

      {/* Featured products */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary sm:text-sm">
                Discover Aura
              </p>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Explore Products
              </h2>

              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Find something you’ll love from our stores.
              </p>
            </div>

            <Link
              to="/stores"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              View all
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FeaturedCategories />
      <FeaturedStores stores={stores ?? []} />
      <PopularStores />
      <WhyAura />
      <Testimonials />
      <Pricing />
      <FAQ />
    </main>
  );
}