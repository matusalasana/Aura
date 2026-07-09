import { Link } from "react-router-dom";
import {
  Store,
  Package,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const BecomeVendor = () => {
  const benefits = [
    {
      icon: Store,
      title: "Create Your Store",
      description:
        "Build your own online fashion store and showcase your products to thousands of customers.",
    },
    {
      icon: Package,
      title: "Manage Products",
      description:
        "Easily add, update, and manage your clothing products in one place.",
    },
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description:
        "Reach more customers and grow your brand with Aura marketplace.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Marketplace",
      description:
        "Sell with confidence through our trusted vendor system.",
    },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      {/* Hero */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">

          <span className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-sm text-amber-600 dark:text-amber-400">
            Start selling on Aura
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tight">
            Turn Your Fashion Brand Into
            <span className="text-amber-500">
              {" "}An Online Store
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-lg">
            Join Aura as a vendor and sell your clothing products to
            customers looking for unique styles.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register/vendor"
              className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-medium text-black hover:bg-amber-400 transition"
            >
              Become a Vendor
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/vendors"
              className="rounded-xl border border-zinc-300 dark:border-zinc-700 px-6 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
            >
              Explore Vendors
            </Link>
          </div>

        </div>
      </section>


      {/* Benefits */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  rounded-2xl 
                  border border-zinc-200 
                  dark:border-zinc-800
                  bg-white 
                  dark:bg-zinc-900
                  p-6
                  hover:border-amber-500/50
                  transition
                "
              >
                <div className="
                  flex h-12 w-12 items-center justify-center
                  rounded-xl
                  bg-amber-500/10
                  text-amber-500
                ">
                  <Icon size={24} />
                </div>

                <h3 className="mt-5 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>

              </div>
            );
          })}

        </div>
      </section>


      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="
          max-w-6xl mx-auto
          rounded-3xl
          bg-zinc-900
          dark:bg-zinc-800
          p-10
          text-center
          text-white
        ">
          <h2 className="text-3xl font-bold">
            Ready to start selling?
          </h2>

          <p className="mt-3 text-zinc-300">
            Create your vendor account today and bring your fashion
            products to Aura.
          </p>

          <Link
            to="/register/vendor"
            className="
              inline-flex
              mt-6
              items-center
              gap-2
              rounded-xl
              bg-amber-500
              px-6
              py-3
              font-semibold
              text-black
              hover:bg-amber-400
              transition
            "
          >
            Apply Now
            <ArrowRight size={18}/>
          </Link>

        </div>
      </section>

    </div>
  );
};

export default BecomeVendor;