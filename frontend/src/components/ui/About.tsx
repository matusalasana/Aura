import { motion } from "framer-motion";

const About = () => {
  return (
    <main className="px-6 py-24">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-zinc-500">
            About Aura
          </span>

          <h1 className="text-5xl sm:text-6xl font-serif italic leading-tight">
            More Than Fashion. <br />
            It’s Your Presence.
          </h1>

          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
            Aura is built on a simple belief — what you wear should not only
            define your style, but amplify your presence. We create timeless,
            minimal, and elevated essentials for everyday confidence.
          </p>
        </motion.section>

        {/* Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <h2 className="text-3xl font-serif italic">
              Our Story
            </h2>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Aura started with a frustration — fast fashion that lacked meaning,
              identity, and longevity. We wanted something different: clothing
              and essentials that feel intentional, not disposable.
            </p>

            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              From a small idea to a growing vision, Aura represents clarity in
              design, simplicity in form, and confidence in expression. Every
              product is carefully curated or designed to fit seamlessly into
              modern life.
            </p>
          </div>

          <div className="rounded-3xl h-96 bg-[url('https://images.unsplash.com/photo-1521334884684-d80222895322?q=80&w=2000')] bg-cover bg-center" />
        </motion.section>

        {/* Mission Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h2 className="text-3xl font-serif italic">
            Our Mission
          </h2>

          <p className="max-w-3xl mx-auto text-zinc-600 dark:text-zinc-400 leading-relaxed">
            To redefine everyday essentials into something meaningful. We focus
            on minimal design, premium quality, and lasting impact — not just
            trends that fade away. Aura is built for individuals who value
            simplicity, confidence, and authenticity.
          </p>
        </motion.section>

        {/* Values */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Minimalism",
              text: "We remove noise and focus only on what matters.",
            },
            {
              title: "Quality",
              text: "Every piece is made to last beyond seasons.",
            },
            {
              title: "Intentional Design",
              text: "Nothing is random — everything has purpose.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                {item.text}
              </p>
            </div>
          ))}
        </section>

        {/* Closing */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl font-serif italic">
            Built for Your Aura
          </h2>

          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400">
            We don’t just sell products — we build a feeling. A presence. A way
            of expressing who you are without saying a word.
          </p>
        </motion.section>

      </div>
    </main>
  );
};

export default About;