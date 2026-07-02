import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Server,
  Globe,
  Layers,
  Rocket,
  GitBranch,
  ShieldCheck,
} from "lucide-react";

const timeline = [
  {
    icon: Code2,
    title: "Frontend Foundation",
    text: "Built with React + TypeScript to create a fast, scalable UI system for Aura.",
  },
  {
    icon: Server,
    title: "Backend Architecture",
    text: "Node.js + Express API designed with clean architecture and service separation.",
  },
  {
    icon: Database,
    title: "Database Design",
    text: "PostgreSQL schema engineered for scalability, relationships, and product integrity.",
  },
  {
    icon: ShieldCheck,
    title: "Authentication System",
    text: "JWT-based auth with refresh tokens, secure cookies, and protected routes.",
  },
  {
    icon: Globe,
    title: "Full Stack Integration",
    text: "PERN stack connected seamlessly with Axios and API abstraction.",
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    text: "Lazy loading, caching strategies, and optimized queries for smooth UX.",
  },
];

const Dev = () => {
  return (
    <main className="px-6 py-24">
      <div className="max-w-6xl mx-auto space-y-28">

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <span className="text-xs uppercase tracking-[0.4em] text-zinc-500 flex items-center justify-center gap-2">
            <GitBranch size={14} /> Development Story
          </span>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tight">
            Building Aura
            <span className="block font-serif italic font-medium">
              From Idea → Full Stack Reality
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Aura is a full-stack e-commerce platform built using the PERN stack
            (PostgreSQL, Express, React, Node.js). This project is not just a
            store — it is a complete engineering system designed with scalability,
            performance, and clean architecture in mind.
          </p>
        </motion.section>

        {/* STACK SECTION */}
        <section className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Layers,
              title: "PERN Stack",
              text: "PostgreSQL • Express • React • Node.js powering the entire system.",
            },
            {
              icon: Code2,
              title: "TypeScript First",
              text: "Strict typing across frontend and backend for reliability.",
            },
            {
              icon: ShieldCheck,
              title: "Secure by Design",
              text: "JWT auth, refresh tokens, protected APIs, and secure cookies.",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800"
              >
                <Icon className="mb-4" />
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </section>

        {/* STORY */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 text-center"
        >
          <h2 className="text-4xl font-serif italic">
            The Engineering Vision
          </h2>

          <p className="max-w-3xl mx-auto text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Aura was built with a clean separation of concerns mindset.
            The frontend is fully component-driven with reusable UI patterns,
            while the backend follows service-controller architecture to ensure
            maintainability and scalability.
          </p>

          <p className="max-w-3xl mx-auto text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Authentication flows use secure token rotation, API requests are
            handled through Axios and state management is optimized
            for performance. Every decision was made to simulate a real-world
            production-grade e-commerce system.
          </p>
        </motion.section>

        {/* TIMELINE */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif italic">
              Development Timeline
            </h2>
            <p className="text-zinc-500 mt-2 text-sm">
              Key milestones in building Aura
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {timeline.map((item, i) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex gap-4 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800"
                >
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
                    <Icon />
                  </div>

                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* FINAL STATEMENT */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h2 className="text-4xl font-serif italic">
            Built Like a Real Product
          </h2>

          <p className="max-w-3xl mx-auto text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Aura is not a tutorial project — it is a production-style system
            designed to reflect real-world engineering practices. From API design
            to UI architecture, every layer is built with intention.
          </p>
        </motion.section>

      </div>
    </main>
  );
};

export default Dev;