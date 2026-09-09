import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Store, 
  Globe, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  CreditCard 
} from "lucide-react";

interface FormData {
  storeName: string;
  category: string;
  description: string;
  subdomain: string;
  plan: "starter" | "pro" | "enterprise";
}

export default function VendorOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubdomainChecking, setIsSubdomainChecking] = useState(false);
  const [subdomainAvailable, setSubdomainAvailable] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    storeName: "",
    category: "apparel",
    description: "",
    subdomain: "",
    plan: "pro",
  });

  // Handle store name changes and auto-generate subdomain slug
  const handleStoreNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const generatedSlug = value
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .slice(0, 20);

    setFormData((prev) => ({
      ...prev,
      storeName: value,
      subdomain: generatedSlug,
    }));

    if (generatedSlug.length >= 3) {
      validateSubdomain(generatedSlug);
    } else {
      setSubdomainAvailable(null);
    }
  };

  // Mock subdomain availability check
  const validateSubdomain = (slug: string) => {
    setIsSubdomainChecking(true);
    setSubdomainAvailable(null);

    setTimeout(() => {
      // Simulate unavailable domain if slug is 'admin' or 'aura'
      const isTaken = ["admin", "aura", "app", "api", "store"].includes(slug);
      setSubdomainAvailable(!isTaken);
      setIsSubdomainChecking(false);
    }, 400);
  };

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "");
    setFormData((prev) => ({ ...prev, subdomain: slug }));

    if (slug.length >= 3) {
      validateSubdomain(slug);
    } else {
      setSubdomainAvailable(null);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate store provisioning API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <section className="section min-h-[85vh] flex-center bg-muted/20">
      <div className="container-custom max-w-2xl">
        {/* Wizard Header */}
        <div className="mb-8 text-center">
          <div className="badge-primary mb-3 gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Store Onboarding</span>
          </div>
          <h1 className="heading text-3xl sm:text-4xl">Launch Your Storefront</h1>
          <p className="subheading mt-2 text-sm">
            Set up your tenant environment and custom domain in 3 simple steps.
          </p>
        </div>

        {/* Stepper Progress Bar */}
        <div className="mb-8 flex-between relative">
          <div className="absolute top-1/2 left-0 right-0 -z-10 h-0.5 -translate-y-1/2 bg-border" />
          
          {[
            { num: 1, label: "Store Info", icon: Store },
            { num: 2, label: "Subdomain", icon: Globe },
            { num: 3, label: "Select Plan", icon: CreditCard },
          ].map((s) => {
            const Icon = s.icon;
            const isActive = step === s.num;
            const isCompleted = step > s.num;

            return (
              <div key={s.num} className="flex-center flex-col gap-1.5 bg-background px-2">
                <div
                  className={`grid-center h-10 w-10 rounded-full text-xs font-bold transition-all ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isActive
                      ? "border-2 border-primary bg-background text-primary"
                      : "border border-border bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                </div>
                <span className={`text-[11px] font-medium ${isActive || isCompleted ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Card Form */}
        <div className="card border border-border bg-card p-6 sm:p-8 shadow-sm">
          {/* STEP 1: Store Details */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="heading text-xl font-bold">1. Tell us about your store</h2>
                <p className="subheading text-xs mt-1">
                  This information will be displayed on your public store metadata.
                </p>
              </div>

              <div>
                <label className="label">Store Name</label>
                <input
                  type="text"
                  placeholder="e.g. Urban Thread"
                  value={formData.storeName}
                  onChange={handleStoreNameChange}
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="label">Primary Industry Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input"
                >
                  <option value="apparel">Apparel & Fashion</option>
                  <option value="tech">Electronics & Tech</option>
                  <option value="coffee">Food & Specialty Beverages</option>
                  <option value="home">Home & Living</option>
                  <option value="other">Other / Custom</option>
                </select>
              </div>

              <div>
                <label className="label">Short Description (Optional)</label>
                <textarea
                  placeholder="Minimalist streetwear and apparel designed for daily wear."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="textarea"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  disabled={!formData.storeName.trim()}
                  onClick={() => setStep(2)}
                  className="btn-primary gap-2 text-xs"
                >
                  Next: Claim Subdomain <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Subdomain */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="heading text-xl font-bold">2. Choose your store subdomain</h2>
                <p className="subheading text-xs mt-1">
                  Your tenant routing and wildcard URL for public storefront access.
                </p>
              </div>

              <div>
                <label className="label">Custom Subdomain</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="urbanthread"
                    value={formData.subdomain}
                    onChange={handleSubdomainChange}
                    className="input pr-28 font-mono text-sm"
                    maxLength={20}
                  />
                  <span className="absolute right-3 text-xs font-mono text-muted-foreground pointer-events-none">
                    .aura.shop
                  </span>
                </div>

                {/* Domain Availability Indicator */}
                <div className="mt-2 text-xs flex items-center gap-1.5 min-h-[20px]">
                  {isSubdomainChecking && (
                    <span className="muted flex items-center gap-1">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" /> Checking availability...
                    </span>
                  )}
                  {!isSubdomainChecking && subdomainAvailable === true && (
                    <span className="text-success font-medium flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      `{formData.subdomain}.aura.shop` is available!
                    </span>
                  )}
                  {!isSubdomainChecking && subdomainAvailable === false && (
                    <span className="text-destructive font-medium flex items-center gap-1">
                      <AlertCircle className="h-3.5 w-3.5" />
                      `{formData.subdomain}` is already reserved or unavailable.
                    </span>
                  )}
                </div>
              </div>

              {/* Subdomain Preview Box */}
              <div className="rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs text-muted-foreground">
                <span className="text-secondary block mb-1 font-sans font-medium text-[11px]">
                  Tenant Target URL Preview:
                </span>
                <div className="flex items-center gap-2 text-foreground">
                  <Globe className="h-4 w-4 text-primary shrink-0" />
                  <span className="font-semibold text-primary">
                    https://{formData.subdomain || "yourstore"}.aura.shop
                  </span>
                </div>
              </div>

              <div className="pt-4 flex-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-ghost gap-2 text-xs"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>

                <button
                  type="button"
                  disabled={!formData.subdomain || subdomainAvailable !== true}
                  onClick={() => setStep(3)}
                  className="btn-primary gap-2 text-xs"
                >
                  Next: Choose Plan <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Plan Selection & Provisioning */}
          {step === 3 && (
            <form onSubmit={handleFinalSubmit} className="space-y-5">
              <div>
                <h2 className="heading text-xl font-bold">3. Select subscription tier</h2>
                <p className="subheading text-xs mt-1">
                  Choose a tenant plan. You can upgrade or switch to custom CNAMEs anytime.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    id: "starter",
                    name: "Starter",
                    price: "$19/mo",
                    desc: "Up to 100 products on 1 subdomain",
                  },
                  {
                    id: "pro",
                    name: "Pro Vendor",
                    price: "$49/mo",
                    desc: "Unlimited products, 3 domains, priority Redis cache",
                    popular: true,
                  },
                  {
                    id: "enterprise",
                    name: "Enterprise",
                    price: "$149/mo",
                    desc: "Dedicated DB instance, 0% fees, super-admin tools",
                  },
                ].map((plan) => (
                  <label
                    key={plan.id}
                    className={`flex-between cursor-pointer rounded-xl border p-4 transition-all ${
                      formData.plan === plan.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-border hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="plan"
                        value={plan.id}
                        checked={formData.plan === plan.id}
                        onChange={() => setFormData({ ...formData, plan: plan.id as any })}
                        className="mt-1 accent-primary"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="heading text-sm font-bold">{plan.name}</span>
                          {plan.popular && (
                            <span className="badge-primary text-[10px] px-2 py-0.5">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="subheading text-xs mt-0.5">{plan.desc}</p>
                      </div>
                    </div>
                    <span className="heading text-sm font-extrabold">{plan.price}</span>
                  </label>
                ))}
              </div>

              {/* Summary Box */}
              <div className="rounded-lg border border-border bg-muted/20 p-4 text-xs space-y-1.5">
                <div className="flex-between">
                  <span className="muted">Store Name:</span>
                  <span className="font-semibold text-foreground">{formData.storeName}</span>
                </div>
                <div className="flex-between">
                  <span className="muted">Assigned Domain:</span>
                  <span className="font-mono text-primary font-semibold">
                    {formData.subdomain}.aura.shop
                  </span>
                </div>
              </div>

              <div className="pt-4 flex-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-ghost gap-2 text-xs"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary gap-2 text-xs py-2.5 px-6"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Provisioning Environment...
                    </>
                  ) : (
                    <>
                      Provision & Launch Store <Sparkles className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}