import { useState } from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const FAQS: FAQItem[] = [
  {
    question: "How do custom subdomains work on Aura?",
    answer:
      "Aura uses dynamic wildcard domain routing. When a customer visits `yourstore.aura.shop`, our edge middleware inspects the incoming request header, resolves the tenant slug via Redis, and automatically scopes the page context and database queries to your specific store without needing manual DNS configuration.",
    category: "Subdomains",
  },
  {
    question: "Is merchant data strictly isolated between stores?",
    answer:
      "Yes. Aura implements row-level tenant scoping through Drizzle ORM middleware and PostgreSQL schema policies. Every database query automatically appends a strict `tenantId` filter, preventing any cross-tenant data access or information leakage between vendors.",
    category: "Security",
  },
  {
    question: "Can vendors map their own fully custom domains?",
    answer:
      "Yes! In addition to your default `subdomain.aura.shop` address, Pro and Enterprise plans support custom CNAME record mapping (e.g., `www.yourbrand.com`) with automatic SSL certificate provisioning through our DNS routing layer.",
    category: "Domains",
  },
  {
    question: "How long does it take to set up a new store?",
    answer:
      "Setting up a store takes less than two minutes. Once registered, your vendor workspace, default subdomain, and product catalog environment are initialized immediately with integrated Better Auth authentication.",
    category: "Onboarding",
  },
  {
    question: "How are customer accounts managed across different stores?",
    answer:
      "Customer accounts are scoped to individual storefronts by default for maximum privacy. However, platform-wide SSO can be enabled if you are running a unified marketplace where users share a single shopping profile.",
    category: "Authentication",
  },
  {
    question: "How does caching work with multi-tenant storefronts?",
    answer:
      "Aura utilizes Upstash Redis key stores to cache store configurations, navigation menus, and product catalogs. Cache keys are prefixed by `tenantId`, ensuring ultra-fast store response times with automated invalidation when catalog data changes.",
    category: "Performance",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section bg-background">
      <div className="container-custom max-w-4xl">
        {/* Section Header */}
        <div className="mx-auto text-center">
          <div className="badge-primary mb-3 gap-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-primary" />
            <span>Got Questions?</span>
          </div>
          <h2 className="heading text-3xl sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="subheading mt-3 text-base">
            Everything you need to know about setting up your multi-tenant store on Aura.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-10 flex flex-col gap-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="card transition-default overflow-hidden border border-border p-0"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex-between w-full p-5 text-left focus-ring"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="heading text-base font-semibold">
                      {faq.question}
                    </span>
                    {faq.category && (
                      <span className="badge hidden sm:inline-flex text-[10px] font-mono">
                        {faq.category}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-border/50 bg-muted/20 px-5 py-4 text-xs leading-relaxed text-secondary sm:text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="card mt-12 flex flex-col items-center justify-between gap-4 border border-border bg-muted/30 p-6 text-center sm:flex-row sm:text-left">
          <div className="flex items-center gap-3">
            <div className="grid-center h-10 w-10 shrink-0 rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="heading text-base font-bold">Have more questions?</h4>
              <p className="subheading text-xs">
                Reach out to our platform team for custom multi-tenant setup guidance.
              </p>
            </div>
          </div>

          <Link to="/contact" className="btn-outline shrink-0 text-xs">
            Contact Support
          </Link>
        </div>
      </div>
    </section>
  );
}