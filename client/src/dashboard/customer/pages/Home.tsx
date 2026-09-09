import React, { useState } from 'react';
import { 
  Store, 
  Globe, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Layers, 
  BarChart3, 
  CheckCircle2, 
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

import Hero from "@/dashboard/customer/components/Hero";
import FeaturedCategories from "@/dashboard/customer/components/FeaturedCategories";
import PopularStores from "@/dashboard/customer/components/PopularStores";
import WhyAura from "@/dashboard/customer/components/WhyAura";
import FAQ from "@/dashboard/customer/components/FAQ";
import Pricing from "@/dashboard/customer/components/Pricing";
import VendorOnboarding from "@/components/common/VendorSignupForm";

export default function AuraHomePage() {

  return (
    <div className="min-h-screen bg-foreground text-foreground font-sans antialiased">

      <Hero />
      <VendorOnboarding />
      <Pricing />
      <FeaturedCategories />
      <PopularStores />
      <WhyAura />
      <FAQ />
      
    </div>
  );
}
