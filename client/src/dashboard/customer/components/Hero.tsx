import { Link } from "react-router-dom";
import { ArrowRight, Store, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="section relative overflow-hidden">
      <div className="container-custom flex flex-col items-center text-center">
        {/* Feature Badge */}
        <div className="badge-primary mb-6 gap-2 px-3 py-1 text-xs">
          <Zap className="h-3.5 w-3.5 text-primary" />
          <span>Multi-Tenant Storefront Engine</span>
        </div>

        {/* Hero Title */}
        <h1 className="heading max-w-3xl text-4xl sm:text-6xl">
          Launch isolated online stores on custom subdomains
        </h1>

        {/* Subtitle */}
        <p className="subheading mt-6 max-w-xl text-lg">
          Build and scale multi-vendor e-commerce platforms with tenant isolation, fast edge caching, and seamless auth.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link to="/register" className="btn-primary gap-2 py-3">
            Start Free Trial <ArrowRight className="h-4 w-4" />
          </Link>

          <Link to="/demo" className="btn-outline gap-2 py-3">
            <Store className="h-4 w-4" /> View Demo Store
          </Link>
        </div>
      </div>
    </section>
  );
}
