import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  RotateCcw,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    text: "Carefully crafted products with timeless aesthetics.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    text: "Quick and reliable shipping for every order.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    text: "Safe and protected checkout experience.",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    text: "Simple 30-day return and exchange policy.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-zinc-500">
            Why Aura
          </span>

          <h2 className="mt-4 text-4xl sm:text-5xl font-serif italic">
            Designed for Presence
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
            We blend minimal design, premium quality, and effortless shopping
            into one seamless experience.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="
                  rounded-3xl border border-zinc-200 dark:border-zinc-800
                  bg-white dark:bg-zinc-900
                  p-8
                  transition hover:-translate-y-1 shadow-lg
                "
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                  <Icon size={26} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;