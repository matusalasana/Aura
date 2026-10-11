import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  HelpCircle,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from "lucide-react";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  email: z
    .string()
    .trim()
    .email("Enter a valid email address")
    .max(254, "Email cannot exceed 254 characters"),

  subject: z.enum([
    "General Inquiry",
    "Shopping Support",
    "Store Registration",
    "Technical Issue",
    "Business Partnership",
    "Other",
  ]),

  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message cannot exceed 5000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactOptions = [
  {
    icon: Mail,
    title: "Email us",
    description: "For general questions and support.",
    detail: "support@aura.com",
    href: "mailto:support@aura.com",
  },
  {
    icon: MessageCircle,
    title: "Business inquiries",
    description: "Interested in selling on Aura?",
    detail: "hello@aura.com",
    href: "mailto:hello@aura.com",
  },
  {
    icon: MapPin,
    title: "Our location",
    description: "Built for shoppers and businesses.",
    detail: "Addis Ababa, Ethiopia",
    href: null,
  },
];

const faqs = [
  {
    question: "How can I track my order?",
    answer:
      "Visit your account to check your order details and available tracking information.",
  },
  {
    question: "How can I open a store on Aura?",
    answer:
      "Visit our signup page to get started. Store registration and onboarding depend on the options currently available on Aura.",
  },
  {
    question: "What if I have a problem with a product?",
    answer:
      "Contact our support team with your order details and a description of the problem so we can help.",
  },
  {
    question: "How do I report a technical issue?",
    answer:
      "Use the contact form and select Technical Issue. Include what happened and the steps needed to reproduce it.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    },
  });

  const message = watch("message");

  async function onSubmit(values: ContactFormValues) {
    setSubmitted(false);

    // TODO: Send values to your backend contact endpoint.
    // Example:
    // await api.post("/contact", values);

    console.log("Validated contact form:", values);

    setSubmitted(true);
    reset();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-muted/30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground">
              <MessageCircle className="size-4 text-primary" />
              We're here to help
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let's talk about{" "}
              <span className="text-primary">what you need.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Have a question, need help with an order, or want to work with
              Aura? Send us a message and tell us how we can help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Contact information */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-primary">
              Get in touch
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              We'd love to hear from you.
            </h2>

            <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
              Whether you're shopping, running a store, or exploring what Aura
              can offer, reach out with your questions.
            </p>

            <div className="mt-8 space-y-4">
              {contactOptions.map((option) => {
                const Icon = option.icon;

                const content = (
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold">{option.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {option.description}
                      </p>
                      <p className="mt-2 break-words text-sm font-medium text-primary">
                        {option.detail}
                      </p>
                    </div>
                  </div>
                );

                return (
                  <div
                    key={option.title}
                    className="rounded-2xl border border-border bg-card p-5 text-card-foreground transition-colors hover:border-primary/40"
                  >
                    {option.href ? (
                      <a href={option.href} className="block">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-muted/50 p-5">
              <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Need help?</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Send us a message with enough detail to understand your
                  question. We'll be able to respond once the contact channel
                  is connected and monitored.
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-3xl border border-border bg-card p-5 text-card-foreground shadow-sm sm:p-8 lg:p-10">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Send us a message
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Fill in the details below.
              </p>
            </div>

            {submitted ? (
              <div
                className="mt-8 rounded-2xl border border-border bg-muted/40 p-6 text-center"
                role="status"
              >
                <CheckCircle2 className="mx-auto size-12 text-primary" />

                <h3 className="mt-4 text-lg font-semibold">
                  Message Sent
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Your message sent successfully. The support team will reach out to you soon. Please don't forget to check your email.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 text-sm font-semibold text-primary transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-7 space-y-5"
              >
                {/* Name and email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-sm font-medium"
                    >
                      Full name
                    </label>

                    <input
                      id="contact-name"
                      autoComplete="name"
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={
                        errors.name ? "contact-name-error" : undefined
                      }
                      {...register("name")}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive"
                    />

                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-2 text-sm text-destructive"
                        role="alert"
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-sm font-medium"
                    >
                      Email address
                    </label>

                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "contact-email-error" : undefined
                      }
                      {...register("email")}
                      className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive"
                    />

                    {errors.email && (
                      <p
                        id="contact-email-error"
                        className="mt-2 text-sm text-destructive"
                        role="alert"
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-medium"
                  >
                    Subject
                  </label>

                  <select
                    id="contact-subject"
                    {...register("subject")}
                    aria-invalid={!!errors.subject}
                    aria-describedby={
                      errors.subject ? "contact-subject-error" : undefined
                    }
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Shopping Support">Shopping Support</option>
                    <option value="Store Registration">Store Registration</option>
                    <option value="Technical Issue">Technical Issue</option>
                    <option value="Business Partnership">
                      Business Partnership
                    </option>
                    <option value="Other">Other</option>
                  </select>

                  {errors.subject && (
                    <p
                      id="contact-subject-error"
                      className="mt-2 text-sm text-destructive"
                      role="alert"
                    >
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block text-sm font-medium"
                  >
                    Message
                  </label>

                  <textarea
                    id="contact-message"
                    rows={6}
                    maxLength={5000}
                    placeholder="Tell us how we can help..."
                    aria-invalid={!!errors.message}
                    aria-describedby="contact-message-count"
                    {...register("message")}
                    className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive"
                  />

                  <div className="mt-2 flex items-start justify-between gap-3">
                    {errors.message ? (
                      <p
                        className="text-sm text-destructive"
                        role="alert"
                      >
                        {errors.message.message}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Minimum 10 characters
                      </p>
                    )}

                    <p
                      id="contact-message-count"
                      className="shrink-0 text-xs text-muted-foreground"
                    >
                      {message.length}/5000
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="size-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="size-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs leading-5 text-muted-foreground">
                  Your message will only be delivered after the contact
                  endpoint is implemented.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <HelpCircle className="size-6" />
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>

            <p className="mt-3 text-muted-foreground">
              Here are some quick answers to common questions.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl border border-border bg-card p-6 text-card-foreground"
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>

          {/* Final CTA */}
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl border border-border bg-card p-6 text-card-foreground sm:flex-row sm:p-8">
            <div>
              <h3 className="text-xl font-bold">
                Ready to explore Aura?
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Discover products or get started with your account.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                to="/"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border px-5 text-sm font-semibold transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Explore products
                <ArrowRight className="size-4" />
              </Link>

              <Link
                to="/sign-up"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}