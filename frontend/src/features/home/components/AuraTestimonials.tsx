import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Title from '../../../shared/ui/Title';

const testimonials = [
  {
    name: "Samuel Getahun",
    text: "Aura completely changed the way I shop online. Everything feels premium and thoughtfully designed.",
  },
  {
    name: "Yamlak Negash",
    text: "Minimal, elegant, and high quality. One of the best shopping experiences I’ve had.",
  },
  {
    name: "Tamrat Adane",
    text: "The products arrived beautifully packaged and exceeded my expectations.",
  },
];

const AuraTestimonials = () => {
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
          <Title 
            txt1="Loved by" 
            txt2="Customers" 
            topTitle="Testimonials"
          />

          <p className="mt-4 max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
            Thousands trust Aura for timeless style and premium quality.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="
                rounded-3xl border border-zinc-200 dark:border-zinc-800
                bg-white dark:bg-zinc-900
                p-8
              "
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star key={index} size={16} fill="currentColor" />
                ))}
              </div>

              {/* Text */}
              <p className="mt-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                “{item.text}”
              </p>

              {/* User */}
              <div className="mt-6">
                <h4 className="font-semibold">{item.name}</h4>
                <span className="text-sm text-zinc-500">
                  Verified Customer
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuraTestimonials;