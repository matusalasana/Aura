import { useState } from "react";

const resumeData = {
  name: "Alex Morgan",
  title: "Full Stack Web Developer",
  location: "San Francisco, CA (Open to Remote)",
  email: "alex.morgan.dev@gmail.com",
  phone: "+1 (415) 000-0000",
  github: "github.com/alexmorgandev",
  linkedin: "linkedin.com/in/alexmorgandev",
  portfolio: "alexmorgan.dev",
  summary:
    "Full Stack Developer with 2+ years building production-grade web applications on MERN and PERN stacks. Specializes in scalable REST API architecture, JWT-based authentication systems, and performant React frontends with real-time capabilities. Comfortable owning features end-to-end — from PostgreSQL schema design to React component systems — with a focus on clean code, fast iteration, and shipping products users love.",
  skills: {
    "Frontend": ["React.js", "TypeScript", "Tailwind CSS", "Zustand", "React Query / TanStack Query", "Responsive UI", "Framer Motion"],
    "Backend": ["Node.js", "Express.js", "REST APIs", "JWT Auth", "Refresh Tokens", "Redis", "WebSockets"],
    "Databases": ["PostgreSQL", "MongoDB", "Schema Design", "Query Optimization", "Indexing"],
    "DevOps & Tools": ["Docker", "Git / GitHub", "Vercel", "Render", "Railway", "CI/CD", "Axios"],
  },
  projects: [
    {
      name: "Nexus — SaaS Project Management Platform",
      stack: "React · Node.js · PostgreSQL · Redis · JWT · Tailwind CSS · Docker",
      url: "nexus-app.vercel.app",
      github: "github.com/alexmorgandev/nexus",
      bullets: [
        "Architected a multi-tenant SaaS app with role-based access control (RBAC), supporting 3 permission levels across workspace, project, and task scopes.",
        "Designed a normalized PostgreSQL schema with 14 tables; optimized query performance with composite indexes, cutting average API response time by 42%.",
        "Implemented JWT + refresh token authentication with Redis-backed token invalidation, enabling secure session management with zero persistent server state.",
        "Built a real-time notification system using WebSockets (Socket.io) that pushed live task updates to ~50 concurrent users in load tests without latency degradation.",
        "Reduced frontend bundle size by 31% through code splitting, lazy loading, and React Query cache management — achieving a Lighthouse performance score of 94.",
      ],
    },
    {
      name: "ShopFlow — E-Commerce API & Storefront",
      stack: "React · Express.js · MongoDB · Stripe · Zustand · Vercel · Railway",
      url: "shopflow.vercel.app",
      github: "github.com/alexmorgandev/shopflow",
      bullets: [
        "Built a full e-commerce platform with product catalog, cart, order management, and Stripe Checkout integration, processing test transactions end-to-end.",
        "Engineered a flexible product variant system in MongoDB that supports up to 5 attribute dimensions (size, color, material, etc.) with inventory tracking per SKU.",
        "Integrated Redis caching for product listing and search endpoints, reducing database load by ~60% during simulated peak traffic periods.",
        "Implemented webhook-driven order fulfillment pipeline with Stripe Events, ensuring idempotent order state transitions and preventing duplicate processing.",
        "Deployed backend on Railway with zero-downtime redeploys; frontend on Vercel with edge caching, achieving global TTFB under 200ms.",
      ],
    },
    {
      name: "Devlink — Developer Portfolio & Blog CMS",
      stack: "Next.js · TypeScript · PostgreSQL · MDX · Tailwind CSS · Prisma · Vercel",
      url: "devlink.alexmorgan.dev",
      github: "github.com/alexmorgandev/devlink",
      bullets: [
        "Built a headless CMS-backed portfolio platform where developers can publish MDX blog posts, showcase projects, and track post analytics — all via a self-hosted admin panel.",
        "Designed a fully typed API layer using TypeScript + Prisma with input validation via Zod, eliminating runtime type errors across 18 API routes.",
        "Implemented server-side rendering (SSR) for blog posts and static generation (SSG) for project pages, achieving Lighthouse SEO score of 98.",
        "Added view tracking with debounced Redis counters, preventing duplicate view inflation while maintaining accurate engagement analytics.",
      ],
    },
    {
      name: "AuthKit — Reusable Auth Microservice",
      stack: "Node.js · Express.js · PostgreSQL · Redis · JWT · Docker · TypeScript",
      github: "github.com/alexmorgandev/authkit",
      bullets: [
        "Open-source authentication microservice with email/password, OAuth (Google, GitHub), magic links, and TOTP-based 2FA — ready to drop into any Express project.",
        "Implemented rate limiting with Redis sliding window algorithm, blocking brute-force login attempts while maintaining sub-10ms overhead per request.",
        "Containerized with Docker Compose; includes PostgreSQL and Redis services, enabling one-command local setup — reduced onboarding time for contributors by 70%.",
        "Achieved 87% unit test coverage with Jest; all auth flows tested with integration tests using Supertest against a live test database.",
      ],
    },
  ],
  experience: [
    {
      title: "Freelance Full Stack Developer",
      company: "Self-Employed",
      period: "Jan 2023 – Present",
      location: "Remote",
      bullets: [
        "Delivered 6+ client projects including e-commerce storefronts, REST API backends, and admin dashboards — all shipped on-time with documented codebases.",
        "Reduced a client's checkout abandonment rate by 18% by redesigning the cart UX and optimizing API response times from ~1.2s to under 300ms.",
        "Maintained a 5-star rating across 3 platforms; regularly received feedback on code quality, documentation, and communication.",
        "Built and deployed a real estate listing platform with advanced search filters, map integration (Mapbox), and landlord dashboard — active with 200+ listings.",
      ],
    },
    {
      title: "Junior Web Developer (Intern)",
      company: "TechNova Labs",
      period: "Jun 2022 – Dec 2022",
      location: "Remote",
      bullets: [
        "Contributed to a React + Node.js internal tool used by 40+ employees for tracking project milestones; implemented 3 major feature modules independently.",
        "Refactored legacy Express routes to use async/await with centralized error handling, reducing unhandled promise rejections by 100% across 22 endpoints.",
        "Collaborated in a 4-person agile team using GitHub Projects, daily standups, and 2-week sprints — consistently delivered tasks before sprint end.",
      ],
    },
  ],
  education: {
    degree: "B.Sc. Computer Science",
    school: "University of California, Berkeley",
    period: "2019 – 2023",
    note: "Relevant coursework: Data Structures, Algorithms, Database Systems, Web Engineering, Software Architecture",
  },
  certifications: [
    "Meta Front-End Developer Certificate — Coursera (2023)",
    "The Complete Node.js Developer Course — Udemy (2022)",
    "CS50x: Introduction to Computer Science — Harvard / edX (2022)",
  ],
};

const Section = ({ title, children }) => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-3">
      <h2 className="text-xs font-bold tracking-widest uppercase text-slate-400 whitespace-nowrap">{title}</h2>
      <div className="h-px bg-slate-200 flex-1" />
    </div>
    {children}
  </div>
);

const Tag = ({ label }) => (
  <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded font-mono border border-slate-200">
    {label}
  </span>
);

const tabs = ["Visual Resume", "ATS Plain Text", "Recruiter Version", "Developer Bio", "Improvement Tips"];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const atsText = `${resumeData.name}
${resumeData.title}
${resumeData.location} | ${resumeData.email} | ${resumeData.phone}
${resumeData.portfolio} | ${resumeData.github} | ${resumeData.linkedin}

─────────────────────────────────────
PROFESSIONAL SUMMARY
─────────────────────────────────────
${resumeData.summary}

─────────────────────────────────────
TECHNICAL SKILLS
─────────────────────────────────────
Frontend: React.js, TypeScript, Tailwind CSS, Zustand, React Query / TanStack Query, Responsive UI
Backend: Node.js, Express.js, REST APIs, JWT Auth, Refresh Tokens, Redis, WebSockets
Databases: PostgreSQL, MongoDB, Schema Design, Query Optimization, Indexing
DevOps & Tools: Docker, Git/GitHub, Vercel, Render, Railway, CI/CD, Axios

─────────────────────────────────────
PROJECTS
─────────────────────────────────────
Nexus — SaaS Project Management Platform
Stack: React · Node.js · PostgreSQL · Redis · JWT · Tailwind CSS · Docker
Live: nexus-app.vercel.app | Code: github.com/alexmorgandev/nexus
• Architected a multi-tenant SaaS app with role-based access control (RBAC), supporting 3 permission levels across workspace, project, and task scopes.
• Designed a normalized PostgreSQL schema with 14 tables; optimized query performance with composite indexes, cutting average API response time by 42%.
• Implemented JWT + refresh token authentication with Redis-backed token invalidation, enabling secure session management with zero persistent server state.
• Built a real-time notification system using WebSockets (Socket.io) — tested to ~50 concurrent users without latency degradation.
• Reduced frontend bundle size by 31% through code splitting, lazy loading, and React Query cache management — Lighthouse performance score of 94.

ShopFlow — E-Commerce API & Storefront
Stack: React · Express.js · MongoDB · Stripe · Zustand · Vercel · Railway
Live: shopflow.vercel.app | Code: github.com/alexmorgandev/shopflow
• Built a full e-commerce platform with product catalog, cart, order management, and Stripe Checkout integration.
• Engineered a flexible product variant system in MongoDB supporting up to 5 attribute dimensions with per-SKU inventory tracking.
• Integrated Redis caching for product listing endpoints, reducing database load by ~60% during simulated peak traffic.
• Implemented Stripe webhook-driven order fulfillment with idempotent state transitions, preventing duplicate processing.
• Deployed with Railway + Vercel edge caching — global TTFB under 200ms.

Devlink — Developer Portfolio & Blog CMS
Stack: Next.js · TypeScript · PostgreSQL · Prisma · Tailwind CSS · Vercel
Live: devlink.alexmorgan.dev | Code: github.com/alexmorgandev/devlink
• Built a headless CMS-backed portfolio platform with MDX blog publishing, project showcase, and admin panel.
• Fully typed API layer with TypeScript + Prisma + Zod validation, eliminating runtime type errors across 18 routes.
• SSR for blog posts, SSG for project pages — Lighthouse SEO score of 98.
• Debounced Redis view counters prevent duplicate inflation while maintaining accurate engagement analytics.

AuthKit — Reusable Auth Microservice (Open Source)
Stack: Node.js · Express.js · PostgreSQL · Redis · JWT · Docker · TypeScript
Code: github.com/alexmorgandev/authkit
• Open-source auth microservice with email/password, OAuth (Google, GitHub), magic links, and TOTP 2FA.
• Redis sliding window rate limiting blocks brute-force attacks with <10ms overhead per request.
• Dockerized with Docker Compose (PostgreSQL + Redis) — one-command local setup.
• 87% unit test coverage with Jest; integration tests via Supertest against live test DB.

─────────────────────────────────────
EXPERIENCE
─────────────────────────────────────
Freelance Full Stack Developer | Self-Employed | Jan 2023 – Present | Remote
• Delivered 6+ client projects including e-commerce storefronts, REST API backends, and admin dashboards — all shipped on-time with documented codebases.
• Reduced a client's checkout abandonment rate by 18% by redesigning cart UX and cutting API response times from ~1.2s to under 300ms.
• Built and deployed a real estate listing platform with Mapbox integration, advanced search filters, and landlord dashboard — active with 200+ listings.

Junior Web Developer (Intern) | TechNova Labs | Jun 2022 – Dec 2022 | Remote
• Contributed to a React + Node.js internal tool used by 40+ employees; implemented 3 major feature modules independently.
• Refactored legacy Express routes to async/await with centralized error handling — eliminated 100% of unhandled promise rejections across 22 endpoints.
• Worked in a 4-person agile team using GitHub Projects, 2-week sprints, and daily standups.

─────────────────────────────────────
EDUCATION
─────────────────────────────────────
B.Sc. Computer Science | University of California, Berkeley | 2019 – 2023
Relevant coursework: Data Structures, Algorithms, Database Systems, Web Engineering, Software Architecture

─────────────────────────────────────
CERTIFICATIONS
─────────────────────────────────────
• Meta Front-End Developer Certificate — Coursera (2023)
• The Complete Node.js Developer Course — Udemy (2022)
• CS50x: Introduction to Computer Science — Harvard / edX (2022)`;

  const recruiterText = `ALEX MORGAN — Full Stack Developer (MERN / PERN)
${resumeData.email} | ${resumeData.portfolio} | ${resumeData.github}

QUICK PROFILE
2+ years building and shipping full-stack web apps. Strong in React, Node.js, PostgreSQL, MongoDB, JWT auth, Redis, and TypeScript. Comfortable from DB schema to deployed frontend. Looking for a junior-to-mid full stack or backend-leaning role at a product-focused team.

TOP HIGHLIGHTS
✦ Built Nexus, a multi-tenant SaaS with RBAC, real-time WebSockets, and optimized PostgreSQL queries (42% faster API responses)
✦ Cut client checkout abandonment by 18% with UX + API performance fixes
✦ Open-source AuthKit: a drop-in JWT + OAuth + 2FA microservice (Dockerized, 87% test coverage)
✦ Lighthouse scores: 94 performance, 98 SEO across production deployments
✦ Delivered 6+ freelance projects on schedule, 5-star rated

CORE STACK
React · TypeScript · Node.js · Express · PostgreSQL · MongoDB · Redis · Tailwind · Docker · Vercel

OPEN TO
Full-time · Remote · Contract-to-hire · Startup · Product-focused teams

LINKS
Portfolio: ${resumeData.portfolio}
GitHub: ${resumeData.github}
LinkedIn: ${resumeData.linkedin}`;

  const bioText = `Alex Morgan is a Full Stack Web Developer specializing in the MERN and PERN stacks, with a focus on building scalable, production-ready web applications.

With 2+ years of hands-on experience shipping real software, Alex brings a strong engineering foundation across the entire web stack — from PostgreSQL schema design and REST API architecture to React component systems and CI/CD deployments.

Recent work includes Nexus, a multi-tenant SaaS project management tool featuring role-based access control, real-time WebSocket notifications, and Redis-optimized API endpoints; and AuthKit, an open-source authentication microservice offering JWT, OAuth, magic links, and TOTP 2FA with 87% test coverage.

Alex writes clean, documented code, iterates fast, and cares deeply about performance, security, and developer experience. Currently open to full-time remote roles at product-focused startups and tech companies.

Stack: React · TypeScript · Node.js · Express.js · PostgreSQL · MongoDB · Redis · Tailwind CSS · Docker
Links: ${resumeData.portfolio} · ${resumeData.github} · ${resumeData.linkedin}`;

  const tipsText = `RESUME IMPROVEMENT TIPS — Alex Morgan
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMMEDIATE WINS (Do this week)
──────────────────────────────
1. DEPLOY EVERYTHING — Recruiters click links. Any project without a live URL loses 50% of its impact. Use Vercel (frontend) + Railway or Render (backend) for free hosting.

2. ADD A README TO EVERY PROJECT — A strong README with screenshots, a live demo GIF, local setup instructions, and architecture diagram makes your GitHub look like a senior engineer's.

3. MAKE YOUR GITHUB GREEN — Consistent commit activity (even 1 commit/day) signals active engineering. Pin your 4 best repos to your profile.

4. GET 1 QUANTIFIED TESTIMONIAL — Ask any freelance client for a short written endorsement. Even "Alex cut our load times in half" on LinkedIn adds real social proof.

SHORT-TERM (Next 30 days)
──────────────────────────
5. CONTRIBUTE TO OPEN SOURCE — 1–2 merged PRs in a known repo (React Query, Prisma, shadcn/ui) is worth more than 3 solo projects. Signals collaboration and code review comfort.

6. WRITE 2 TECHNICAL BLOG POSTS — Explain something real you built: "How I implemented Redis caching in my Express API" or "My PostgreSQL indexing strategy for a multi-tenant SaaS." Post to Dev.to or your own blog. LinkedIn will amplify it.

7. ADD END-TO-END TESTS — Cypress or Playwright on your top project. Mention "E2E tested with Cypress" in your resume. Most junior devs skip this — it differentiates you immediately.

8. BUILD ONE AI-INTEGRATED PROJECT — In 2026, any app that integrates an LLM API (OpenAI, Claude, Gemini) is immediately more interesting to startup recruiters. Even a simple feature counts.

RESUME COPY IMPROVEMENTS
──────────────────────────
9. AVOID: "Worked on", "Helped with", "Was responsible for"
   USE: "Architected", "Engineered", "Optimized", "Shipped", "Designed", "Implemented", "Reduced", "Increased"

10. ADD TECH CONTEXT TO EVERY BULLET — Don't say "built a search feature." Say "built a full-text search feature using PostgreSQL tsvector indexes with <50ms query times at 10k records."

11. NUMBERS WIN — If you don't have real metrics, estimate conservatively: "reduced load time by ~40%", "supports up to 100 concurrent connections in local load tests." Be honest, be specific.

ATS OPTIMIZATION
──────────────────
12. TARGET JOB DESCRIPTIONS — Copy exact keywords from 5 job postings you want. If they say "REST API development" and you wrote "RESTful APIs", ATS may miss it. Mirror their phrasing.

13. AVOID TABLES AND COLUMNS IN WORD DOCS — ATS systems often garble multi-column layouts. Use the plain-text version of this resume when uploading to job portals.

14. FILE FORMAT — Submit as .pdf when emailing; .docx when ATS explicitly asks for Word (some parsers prefer it).

PORTFOLIO TIPS
───────────────
15. YOUR PORTFOLIO SITE SHOULD LOAD IN <2 SECONDS — Recruiters bouncing off a slow portfolio is a silent rejection. Optimize images, use edge deployment (Vercel).

16. FEATURE A CASE STUDY — For your best project, write a 300-word engineering breakdown: problem → architecture decision → implementation → result. This is what separates you from 90% of applicants.`;

  const tabContent = [
    // Visual Resume
    <div key="visual" className="font-sans text-slate-800 max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5 mb-6">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{resumeData.name}</h1>
            <p className="text-slate-500 font-medium mt-1">{resumeData.title}</p>
            <p className="text-xs text-slate-400 mt-1">{resumeData.location}</p>
          </div>
          <div className="text-right text-xs text-slate-500 space-y-1">
            <div>{resumeData.email}</div>
            <div className="text-blue-600">{resumeData.portfolio}</div>
            <div className="text-blue-600">{resumeData.github}</div>
            <div className="text-blue-600">{resumeData.linkedin}</div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <Section title="Summary">
        <p className="text-sm text-slate-600 leading-relaxed">{resumeData.summary}</p>
      </Section>

      {/* Skills */}
      <Section title="Technical Skills">
        <div className="grid grid-cols-1 gap-2">
          {Object.entries(resumeData.skills).map(([cat, items]) => (
            <div key={cat} className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs font-semibold text-slate-500 w-32 shrink-0">{cat}</span>
              <div className="flex flex-wrap gap-1.5">
                {items.map(s => <Tag key={s} label={s} />)}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section title="Projects">
        <div className="space-y-5">
          {resumeData.projects.map((p) => (
            <div key={p.name}>
              <div className="flex justify-between items-start flex-wrap gap-1 mb-1">
                <span className="font-semibold text-slate-800 text-sm">{p.name}</span>
                <div className="flex gap-3 text-xs text-blue-600">
                  {p.url && <span>{p.url}</span>}
                  <span>{p.github}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 font-mono mb-2">{p.stack}</p>
              <ul className="space-y-1">
                {p.bullets.map((b, i) => (
                  <li key={i} className="text-xs text-slate-600 flex gap-2">
                    <span className="text-slate-300 shrink-0 mt-0.5">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section title="Experience">
        <div className="space-y-4">
          {resumeData.experience.map((e) => (
            <div key={e.title}>
              <div className="flex justify-between flex-wrap gap-1 mb-1">
                <span className="font-semibold text-slate-800 text-sm">{e.title} — <span className="font-normal text-slate-500">{e.company}</span></span>
                <span className="text-xs text-slate-400">{e.period} · {e.location}</span>
              </div>
              <ul className="space-y-1">
                {e.bullets.map((b, i) => (
                  <li key={i} className="text-xs text-slate-600 flex gap-2">
                    <span className="text-slate-300 shrink-0 mt-0.5">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section title="Education">
        <div className="flex justify-between flex-wrap gap-1">
          <div>
            <span className="font-semibold text-sm text-slate-800">{resumeData.education.degree}</span>
            <span className="text-slate-500 text-sm"> · {resumeData.education.school}</span>
            <p className="text-xs text-slate-400 mt-0.5">{resumeData.education.note}</p>
          </div>
          <span className="text-xs text-slate-400">{resumeData.education.period}</span>
        </div>
      </Section>

      {/* Certifications */}
      <Section title="Certifications">
        <ul className="space-y-1">
          {resumeData.certifications.map((c, i) => (
            <li key={i} className="text-xs text-slate-600 flex gap-2">
              <span className="text-slate-300">▸</span>{c}
            </li>
          ))}
        </ul>
      </Section>
    </div>,

    // ATS Plain Text
    <div key="ats" className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-slate-500">Plain text — safe to paste into any ATS, job portal, or Word doc.</p>
        <button onClick={() => handleCopy(atsText)} className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors">
          {copied ? "Copied ✓" : "Copy to clipboard"}
        </button>
      </div>
      <pre className="bg-slate-950 text-green-400 text-xs p-6 rounded-xl overflow-auto leading-relaxed font-mono whitespace-pre-wrap border border-slate-800">
        {atsText}
      </pre>
    </div>,

    // Recruiter Version
    <div key="recruiter" className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-slate-500">Condensed 1-page recruiter sheet — ideal for email outreach or cold applications.</p>
        <button onClick={() => handleCopy(recruiterText)} className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors">
          {copied ? "Copied ✓" : "Copy to clipboard"}
        </button>
      </div>
      <pre className="bg-white border border-slate-200 text-slate-700 text-xs p-6 rounded-xl overflow-auto leading-relaxed font-mono whitespace-pre-wrap shadow-sm">
        {recruiterText}
      </pre>
    </div>,

    // Developer Bio
    <div key="bio" className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-slate-500">Use this for GitHub profile README, portfolio About page, LinkedIn About, or Twitter/X bio.</p>
        <button onClick={() => handleCopy(bioText)} className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors">
          {copied ? "Copied ✓" : "Copy to clipboard"}
        </button>
      </div>
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100 text-sm p-8 rounded-xl leading-relaxed shadow-lg">
        {bioText.split("\n\n").map((para, i) => (
          <p key={i} className="mb-4 last:mb-0">{para}</p>
        ))}
      </div>
    </div>,

    // Tips
    <div key="tips" className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <p className="text-xs text-slate-500">Personalized improvement roadmap — take these seriously.</p>
        <button onClick={() => handleCopy(tipsText)} className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-lg hover:bg-slate-700 transition-colors">
          {copied ? "Copied ✓" : "Copy to clipboard"}
        </button>
      </div>
      <pre className="bg-amber-50 border border-amber-200 text-slate-700 text-xs p-6 rounded-xl overflow-auto leading-relaxed font-mono whitespace-pre-wrap">
        {tipsText}
      </pre>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top nav */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-bold text-slate-900">Resume Suite</span>
              <span className="ml-2 text-xs text-slate-400">5 deliverables · Replace placeholder info with yours</span>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full font-medium">ATS-Optimized · 2026</span>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeTab === i
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {tabContent[activeTab]}
      </div>

      {/* Footer note */}
      <div className="border-t border-slate-200 bg-white mt-8 py-4">
        <p className="text-center text-xs text-slate-400">
          Replace <span className="font-mono text-slate-600">Alex Morgan</span> with your real name, links, and details · All metrics are editable · Built for MERN/PERN developers in 2026
        </p>
      </div>
    </div>
  );
}