import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="
          max-w-5xl mx-auto
          rounded-[2rem]
          border border-zinc-200 dark:border-zinc-800
          bg-zinc-100 dark:bg-zinc-900
          px-6 py-16 sm:px-12
          text-center
        "
      >
        <span className="text-xs uppercase tracking-[0.4em] text-zinc-500">
          Join Aura
        </span>

        <h2 className="mt-4 text-4xl sm:text-5xl font-serif italic">
          Stay in the Loop
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
          Get updates on new collections, exclusive drops, and special offers.
        </p>

        {/* Form */}
        <form className="mt-10 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="
              flex-1 rounded-full
              border border-zinc-300 dark:border-zinc-700
              bg-white dark:bg-zinc-950
              px-6 py-4
              outline-none
              focus:ring-2 focus:ring-zinc-400
            "
          />

          <button
            type="submit"
            className="
              group inline-flex items-center justify-center gap-2
              rounded-full
              bg-black dark:bg-white
              px-8 py-4
              text-sm font-semibold
              text-white dark:text-black
              transition hover:opacity-90
            "
          >
            Subscribe
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Newsletter;