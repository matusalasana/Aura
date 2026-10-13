# Aura — Master Implementation Guide (Multi-Tenant SaaS MVP)

> **Purpose:** an ordered, actionable build plan to take Aura from its current state to a launchable MVP.
> **Companion docs:** [Master Development Blueprint](./Aura%20Master%20Development%20Blueprint.md) (the *why* and the full vision), [API Endpoints](./API%20Endpoints.md), [Client Routes and Pages](./Client%20Routes%20and%20Pages.md).
> **How to use this guide:** work through the phases in order. Each phase lists tasks, files to touch, and an **exit check** you must pass before moving on. Tick the boxes as you go.

---

## Table of Contents

1. [MVP Definition](#1-mvp-definition)
2. [Current State Audit](#2-current-state-audit)
3. [Guiding Rules](#3-guiding-rules)
4. [Phase Overview](#4-phase-overview)
5. [Phase 0 — Stabilize and Secure the Foundation](#phase-0--stabilize-and-secure-the-foundation)
6. [Phase 1 — Tenant Model and Authorization](#phase-1--tenant-model-and-authorization)
7. [Phase 2 — Store Onboarding and Management](#phase-2--store-onboarding-and-management)
8. [Phase 3 — Catalog (Products, Variants, Categories)](#phase-3--catalog-products-variants-categories)
9. [Phase 4 — Public Storefront](#phase-4--public-storefront)
10. [Phase 5 — Cart, Checkout and Orders](#phase-5--cart-checkout-and-orders)
11. [Phase 6 — Store Dashboard and Order Fulfillment](#phase-6--store-dashboard-and-order-fulfillment)
12. [Phase 7 — Payments](#phase-7--payments)
13. [Phase 8 — Commission and Basic Ledger](#phase-8--commission-and-basic-ledger)
14. [Phase 9 — Platform Admin](#phase-9--platform-admin)
15. [Phase 10 — Notifications](#phase-10--notifications)
16. [Phase 11 — Subdomains and Custom Domains](#phase-11--subdomains-and-custom-domains)
17. [Phase 12 — Hardening, Testing and Launch](#phase-12--hardening-testing-and-launch)
18. [Post-MVP Backlog](#post-mvp-backlog)
19. [Definition of Done](#definition-of-done)
20. [Appendix A — Target Database Changes](#appendix-a--target-database-changes)
21. [Appendix B — Endpoint Checklist](#appendix-b--endpoint-checklist)
22. [Appendix C — Environment and Deployment Checklist](#appendix-c--environment-and-deployment-checklist)

---

## 1. MVP Definition

The MVP is done when this end-to-end story works in production:

1. A **merchant** signs up, creates a store, adds products with variants and images, and sees the store live at `/stores/:slug` (and later at a subdomain).
2. A **customer** browses the store, adds items to a cart, signs in, checks out for a single store and places an order.
3. The **merchant** sees the order in their dashboard and moves it through the fulfillment statuses.
4. The **platform admin** can review stores and products and suspend abusive ones.
5. Aura records a **commission** on each completed order.

### In scope

| Area | MVP scope |
| --- | --- |
| Identity | Email and password, Google OAuth, email verification, password reset |
| Tenancy | Stores isolated by `storeId`, slug-based routing, then subdomains |
| Catalog | Products, variants, images, global categories |
| Storefront | Public store page, product list and detail pages |
| Commerce | Client cart, one-store-per-order checkout, order lifecycle |
| Payments | Cash on delivery first, then one local provider (Chapa) |
| Finance | Commission snapshot per order and a simple ledger |
| Admin | Store and product moderation, basic overview |
| Ops | Sentry, logging, rate limiting, CI |

### Explicitly out of scope for the MVP

Visual storefront builder, custom pages and SEO tools, Telebirr, reviews and wishlist, regional delivery-zone engine, BullMQ workers, SMS OTP, entitlement engine, returns and disputes, multi-store carts, GraphQL. These are listed in the [Post-MVP Backlog](#post-mvp-backlog).

---

## 2. Current State Audit

Findings from reading the current codebase. **Verify each one before relying on it**, because the code changes quickly.

### Already in place

- Client: React 19, Vite, Tailwind v4, shadcn/ui, TanStack Query, Zustand, React Hook Form and Zod, Better Auth client (now with an absolute base URL).
- Client features: auth (sign-in, sign-up, Google, OTP, forgot and reset password), vendor signup flow, stores directory and store home, product details, persisted cart, checkout form, orders page, store dashboard widgets, product creation wizard, admin pages.
- Server: Express 5 modular monolith (`auth`, `stores`, `products`, `variants`, `orders`, `payments`, `memberships`), Drizzle schema for auth, stores, plans, memberships, products, variants, images, orders, order items, shipping information and store domains. Better Auth with Google, Sentry, Winston, Cloudinary, Upstash rate limiting.
- Deployment: Vercel (client) and Render (API) with rewrites for `/api/auth/*` and `/api/v1/*`. Google OAuth working in production.

### Gaps and risks to fix first

| # | Finding | Why it matters |
| --- | --- | --- |
| 1 | `product.routes.ts` create, update and delete routes have **no `authenticate`** and no store ownership check | Anyone can create, edit or delete products. This is a **cross-tenant security hole**. |
| 2 | `resolveTenant` resolves a store from the `:slug` route param only. Subdomain and custom-domain (Host header) resolution does not exist yet | The blueprint's routing engine is not implemented. |
| 3 | `PATCH /stores` has no `storeId` or ownership check in the route | Store updates can't be scoped safely. |
| 4 | Product list and get-one routes are commented out | The storefront cannot browse products from a dedicated products API. |
| 5 | `stores.planId` is `NOT NULL` with `onDelete: cascade` and `logo` is `NOT NULL` | Store creation fails without a plan and logo, and deleting a plan deletes stores. |
| 6 | `orders` has no payment status, no total, no shipping or commission fields | Needed for payments and commission. Only `subtotal` exists. |
| 7 | No categories table and no per-category commission | Required by the commission model. |
| 8 | Client route map differs from the plan: `/stores/me`, `/stores/products` vs planned `/stores/:storeId/*` | Dashboard cannot support multiple stores. |
| 9 | `server/.env.example` is outdated, and `SENTRY_DSN` and `TEST_HOSTNAME` are required by the env schema | New environments fail on boot. |
| 10 | Auth data model: both Better Auth and a custom `modules/auth` (JWT-style) exist | Two auth systems cause confusion. Pick Better Auth as the only source of truth. |
| 11 | No automated tests | Tenant isolation must be proven by tests. |

---

## 3. Guiding Rules

Follow these on every task.

1. **Tenant isolation is a hard rule.** Every query on tenant data takes an explicit `storeId`. Fetch-by-id always uses `and(eq(table.id, id), eq(table.storeId, storeId))`.
2. **Never trust the client.** Prices, totals, stock, commissions and delivery fees are computed on the server.
3. **Authorize in the service layer, not only in the route.** Routes call `authenticate`, services call permission helpers, repositories only run queries.
4. **One layering pattern per module:** `routes -> controller -> service -> repository`, with Zod validation at the route.
5. **Money is stored as integer minor units** (or `numeric` with fixed scale) and never as floats. Pick one and stay consistent.
6. **Atomic stock changes only.** Decrement inside a transaction with `WHERE stock >= qty`. Never read-then-write.
7. **Migrations, not `push`, in production.** Use `generate` and `migrate`. Keep migrations in git.
8. **Ship vertical slices.** Finish the shopping flow end to end before building secondary pages.
9. **Every phase ends with an exit check** and a deploy to production.

---

## 4. Phase Overview

```
P0  Stabilize & secure           ──►  safe base to build on
P1  Tenant model & authorization ──►  isolation proven
P2  Store onboarding             ──►  merchants can create stores
P3  Catalog                      ──►  merchants can sell things
P4  Public storefront            ──►  customers can browse
P5  Cart, checkout, orders       ──►  customers can buy (COD)
P6  Dashboard & fulfillment      ──►  merchants can fulfill
P7  Payments                     ──►  online payment
P8  Commission & ledger          ──►  platform earns revenue
P9  Platform admin               ──►  moderation
P10 Notifications                ──►  transactional email
P11 Subdomains & custom domains  ──►  true multi-tenant routing
P12 Hardening, tests, launch     ──►  production-ready
```

Suggested pace for one developer: P0–P2 in about 2 weeks, P3–P6 in about 5 weeks (the core product), P7–P10 in about 3 weeks, P11–P12 in about 2 weeks. Treat these as estimates, not commitments.

---

## Phase 0 — Stabilize and Secure the Foundation

**Goal:** close the security holes and make the project reproducible.

### Tasks

- [ ] **Lock down product routes.** Add `authenticate` and a store-ownership or permission check to create, update and delete in `product.routes.ts` and the variant routes.
- [ ] **Decide on one auth system.** Keep Better Auth. Remove or isolate the legacy custom auth endpoints and JWT code (`modules/auth`, `jsonwebtoken`, `bcryptjs`) if nothing depends on them.
- [ ] **Fix the schema constraints noted in the audit:** make `stores.logo` nullable, give stores a default plan (seeded "Free" plan) or make `planId` nullable, and change the plan foreign key to `onDelete: restrict`.
- [ ] **Rewrite `server/.env.example`** to match `config/env.ts`. Include every variable and mark required ones.
- [ ] **Add `client/.env.example`** and make sure `.env` files are in `.gitignore`. Rotate any secret that was ever committed.
- [ ] **Switch to real migrations:** run `npm run generate`, commit the SQL, and use `npm run migrate` in deploys.
- [ ] **Add a seed script** (`npm run seed`) creating: a Free plan, global categories, one admin, one merchant with a store, a few products.
- [ ] **Add a health endpoint** (`GET /health`) and use it in Render's health check.
- [ ] **Add CI** (GitHub Actions): install, `npm run check`, `npm run lint`, `npm run build` for both packages.
- [ ] **Add the test runner** (Vitest recommended) and one passing smoke test per package.

### Files likely touched

`server/src/modules/products/product.routes.ts`, `server/src/modules/variants/variant.routes.ts`, `server/src/db/schema/stores.ts`, `server/.env.example`, `.github/workflows/ci.yml`, `server/src/db/seeds/`.

### Exit check

- Calling `POST /api/v1/products` without a session returns `401`.
- A fresh clone can run `npm install`, `migrate`, `seed`, `dev` for both apps following the README only.
- CI is green on `main`.

---

## Phase 1 — Tenant Model and Authorization

**Goal:** make isolation structural, so a forgotten `where` clause is hard to write.

### Tasks

- [ ] **Define the request context.** Extend `types/express.d.ts` so a request can carry `user`, `store`, `membership` and `permissions`.
- [ ] **Split the middleware by responsibility:**
  - `authenticate`: loads the Better Auth session into `req.user`.
  - `resolveTenant`: resolves the store (by `:storeId`, `:slug`, or later the `Host` header) into `req.store` and returns `404` if missing or `403` if suspended where relevant.
  - `requireMembership`: loads the caller's membership for `req.store`.
  - `requirePermission(key)`: checks the membership permissions.
- [ ] **Finalize the permission keys** in `auth.permissions.ts` / `auth.roles.ts`. MVP set: `products:read|create|update|delete`, `orders:read|update`, `store:update`, `staff:manage`. Define default roles: `owner` (all) and `staff` (products and orders).
- [ ] **Create the owner membership automatically** when a store is created.
- [ ] **Repository guard:** every repository function in tenant modules requires `storeId` as its first parameter. Add a lint rule or review checklist item to reject queries without it.
- [ ] **Add an `isAdmin` check** (a platform role on the user) for admin-only routes, validated server-side from the database, never from a client-supplied value.
- [ ] **Write the tenant isolation tests** (see below). These are the most important tests in the project.

### Tenant isolation test matrix

| Scenario | Expected |
| --- | --- |
| Store A staff updates a Store B product | `403` or `404` |
| Store A staff lists Store B orders | `403` |
| Customer reads another customer's order | `404` |
| Unauthenticated create product | `401` |
| Suspended store storefront request | `403` or `404` with a clear message |

### Exit check

All matrix tests pass in CI.

---

## Phase 2 — Store Onboarding and Management

**Goal:** a signed-in user can create and manage one or more stores.

### Tasks

**Backend**

- [ ] `POST /stores`: validate with Zod (name, slug, description, category, logo upload). Reserve slugs (`admin`, `api`, `www`, `app`, `me`, `new`, `stores`, `shop`). Enforce unique, lowercase, URL-safe slugs.
- [ ] Create the store, owner membership and assign the default plan in **one transaction**.
- [ ] `GET /stores/me`: list all stores the user belongs to (not just one).
- [ ] `GET /stores/:storeId`, `PATCH /stores/:storeId`, `PATCH /stores/:storeId/slug`, `DELETE /stores/:storeId` with ownership checks.
- [ ] Deactivate instead of hard-delete when the store has orders.
- [ ] Store `status` flow: `pending -> active -> suspended`. Decide whether new stores start `active` (recommended for the MVP) or require approval.

**Frontend**

- [ ] Route restructure: `/stores` (my stores), `/stores/new`, `/stores/:storeId`, `/stores/:storeId/products`, `/stores/:storeId/orders`, `/stores/:storeId/settings`. Declare `new` before dynamic routes.
- [ ] **Public** storefront lives under `/stores/:slug` (current) or `/shop/:slug` (planned). Pick one and update both docs. Recommended: `/shop/:slug` for public and `/stores/:storeId` for management, to avoid slug and id collisions.
- [ ] Store switcher in the store layout. Keep the active `storeId` in Zustand and in the URL (URL is the source of truth).
- [ ] Onboarding wizard (name and slug, branding, contact and region), reusing the multi-step pattern from the product wizard.
- [ ] Slug availability check while typing (debounced).

### Exit check

A new user can sign up, create two stores, switch between them, and edit settings. Slug collisions and reserved words are rejected.

---

## Phase 3 — Catalog (Products, Variants, Categories)

**Goal:** merchants can fully manage a sellable catalog.

### Tasks

**Data**

- [ ] Add `global_categories` (name, slug, `commissionRate`) and link `products.categoryId`. Seed realistic categories.
- [ ] Add `status` to products (`draft`, `published`, `archived`) and a moderation flag (`isHidden` or `moderationStatus`) for admin.
- [ ] Confirm variant fields: SKU unique per store, price, stock, options JSON. Add a "has variants" rule: a simple product has exactly one default variant, which keeps checkout logic uniform.

**Backend**

- [ ] `GET /stores/:storeId/products` (paginated, filter by status, search by title).
- [ ] `POST /stores/:storeId/products`, `GET`, `PATCH`, `DELETE` (archive) for one product.
- [ ] Variant CRUD nested under the product, with stock changes only through a dedicated adjust-stock service.
- [ ] Image pipeline: start with server-side upload via Multer to Cloudinary (already present). Enforce file type and size limits, and store `publicId` so deletes can clean up Cloudinary.
- [ ] `GET /categories` (public).
- [ ] Zod schemas for all inputs. Reject unknown fields.

**Frontend**

- [ ] Connect the existing product wizard (info, media, variants, inventory, review) to the real endpoints.
- [ ] Products table with search, status filter and pagination (`ProductsTable`).
- [ ] Edit product page reusing the wizard form.
- [ ] Empty states, loading skeletons, error toasts.

### Exit check

A merchant can create a product with two variants and three images, edit it, change stock, and archive it. Another store's merchant cannot see or touch it.

---

## Phase 4 — Public Storefront

**Goal:** customers can discover stores and products without signing in.

### Tasks

**Backend**

- [ ] `GET /stores` (public directory, only `active` stores) with pagination.
- [ ] `GET /stores/:slug` (store profile) returning only public fields.
- [ ] `GET /public/stores/:slug/products` and `GET /public/products/:productId` returning only `published` and non-hidden products.
- [ ] `GET /public/products` for marketplace browsing with `categoryId`, `search`, `sort`, `page`, `limit`.
- [ ] Cache store profile and category list in Redis (short TTL) and invalidate on update.
- [ ] Add DB indexes: `products(store_id, status)`, `products(slug)`, `products(category_id)`.

**Frontend**

- [ ] `StoreHomePage`: banner, logo, description and product grid.
- [ ] Product list with category filter, search and sort (URL query params).
- [ ] `ProductDetailsPage`: image gallery, variant selector that updates price and stock, quantity selector, add to cart.
- [ ] 404 and "store unavailable" pages.
- [ ] Basic SEO: page titles and meta descriptions per store and product.

### Exit check

An anonymous visitor can open a store, filter products, open a product, select a variant and add it to the cart. Drafts and hidden products never appear.

---

## Phase 5 — Cart, Checkout and Orders

**Goal:** a customer can place a correct, tamper-proof order. Start with **cash on delivery** so the order flow is proven before payments.

### Decisions (lock these in)

- **One store per order.** If the cart contains items from multiple stores, group by store and check out one store at a time.
- Cart stays **client-side** (Zustand, persisted). It stores `variantId` and `quantity` only, never trusted prices.

### Tasks

**Data**

- [ ] Extend `orders`: `total`, `shippingFee`, `paymentStatus` (`unpaid|pending|paid|failed|refunded`), `paymentMethod`, `commissionAmount`, `notes`.
- [ ] Extend `order_items`: snapshot `productTitle`, `variantLabel`, `unitPrice`, `quantity`, `commissionRate` at purchase time. Orders must not change when products change.
- [ ] Use a unique `orderNumber` per store or globally (see `generateOrderNumber`) with a retry on collision.

**Backend: `POST /checkout` (or `POST /orders`)**

Run everything in **one database transaction**:

1. Validate the body with Zod: items (`variantId`, `quantity`), shipping address, payment method.
2. Load the variants and verify they exist, belong to one store, the product is published and the store is active.
3. Recompute unit prices from the database.
4. Atomically decrement stock: `UPDATE ... SET stock = stock - :q WHERE id = :id AND store_id = :s AND stock >= :q RETURNING`. If any update affects zero rows, roll back with an insufficient-stock error.
5. Compute subtotal, shipping fee (flat rate for the MVP) and commission from the category rate.
6. Insert the shipping information, order and order items.
7. Return the order with its number.

- [ ] `GET /orders/me` (customer history), `GET /orders/:orderId` (customer or store member only).
- [ ] `POST /orders/:orderId/cancel` for `pending` orders only, restoring stock in a transaction.
- [ ] Idempotency: accept an `Idempotency-Key` header so a double click cannot create two orders.

**Frontend**

- [ ] Cart page: edit quantities, remove items, group by store, show subtotal estimates.
- [ ] Checkout page: shipping form (`ShippingInformationForm`), payment method choice, order summary, redirect to an order confirmation page.
- [ ] Block checkout for unauthenticated users and send them to sign-in, then return to checkout.
- [ ] Orders page and order details page with status timeline.
- [ ] Reconcile the client cart against the server on checkout. Show a clear message if a price or stock changed.

### Exit check

- Two parallel checkouts for the last unit: exactly one succeeds.
- Changing the price in the browser's request has no effect on the stored total.
- Cancelling restores stock.

---

## Phase 6 — Store Dashboard and Order Fulfillment

**Goal:** merchants can run day-to-day operations.

### Tasks

**Backend**

- [ ] `GET /stores/:storeId/orders` (filter by status, paginated) and `GET /stores/:storeId/orders/:orderId`.
- [ ] `PATCH /stores/:storeId/orders/:orderId/status` enforcing an allowed-transition map:

```
pending    -> confirmed | cancelled
confirmed  -> processing | cancelled
processing -> shipped | cancelled
shipped    -> delivered
delivered  -> (terminal)
cancelled  -> (terminal)
```

- [ ] Cancelling from the merchant side restores stock.
- [ ] `GET /stores/:storeId/dashboard`: counts (products, pending orders, total orders), revenue totals, low-stock list, recent orders, sales for the last 30 days (one aggregate query each, indexed).
- [ ] Record each status change in an `order_events` table (who, from, to, when) for auditability.

**Frontend**

- [ ] Replace dashboard widgets' mock data (`DashboardStats`, `SalesOverview`, `RecentOrders`, `LowStockProducts`) with the real endpoint.
- [ ] Store orders list and details page with a status dropdown limited to valid next states.
- [ ] Store settings page (name, description, logo, contact details).

### Exit check

A merchant can see a new order within one refresh, move it to `delivered`, and the customer sees the same status. Invalid transitions are rejected with `409`.

---

## Phase 7 — Payments

**Goal:** accept online payments through a local provider, behind an abstraction.

### Tasks

- [ ] Define a `PaymentProvider` interface: `initialize(order)`, `verify(reference)`, `parseWebhook(req)`, later `payout()`.
- [ ] Implement `CashOnDeliveryProvider` (no-op initialize, manual mark-as-paid by the merchant) and `ChapaProvider`.
- [ ] Add `payments` table: `orderId`, `provider`, `reference` (unique), `amount`, `status`, `rawPayload`, timestamps.
- [ ] `POST /payments/initialize` creates a payment for an existing `pending` order and returns the provider checkout URL.
- [ ] `POST /webhooks/chapa` (outside `/api/v1`, raw body): verify the signature, then **re-verify with the provider API**, then mark the payment and order `paid`. Make it idempotent (same reference twice does nothing).
- [ ] Never mark an order paid from a client redirect. Redirect pages only show status read from the server.
- [ ] Payment timeout job: orders unpaid after N minutes are cancelled and stock restored (a cron endpoint or a simple scheduled task is enough for the MVP).
- [ ] Decide what to do with the existing Stripe configuration and the `plans` / subscription module. If Aura is commission-only at launch, hide plan UI from merchants and keep a single Free plan.

### Frontend

- [ ] Payment method selector at checkout, redirect to provider, return page that polls the order status.
- [ ] Failed and cancelled payment states with a retry button.

### Exit check

A sandbox payment marks the order paid exactly once, even if the webhook is delivered three times. A forged webhook is rejected.

---

## Phase 8 — Commission and Basic Ledger

**Goal:** record platform revenue and merchant balances accurately.

### Tasks

- [ ] Commission is already snapshotted per item in Phase 5. Verify that changing a category's rate never changes past orders.
- [ ] Add `ledger_entries`: `id`, `orderId`, `storeId`, `account` (`CUSTOMER_CLEARING`, `SELLER_PENDING`, `SELLER_AVAILABLE`, `AURA_COMMISSION`), `debit`, `credit`, `createdAt`. Entries are append-only (no updates or deletes).
- [ ] On payment confirmation (or COD delivery), post a balanced journal entry in the same transaction as the status change.
- [ ] On refund or cancellation after payment, post reversing entries.
- [ ] Release rule: move funds from `SELLER_PENDING` to `SELLER_AVAILABLE` N days after delivery (a scheduled task).
- [ ] Reconciliation check: a script/test asserting that total debits equal total credits.
- [ ] `GET /stores/:storeId/earnings`: pending, available and lifetime earnings, plus commission paid.
- [ ] Payouts: for the MVP, record payout requests and mark them paid manually in the admin panel. Automate later.

### Exit check

For any set of orders, `sum(debit) == sum(credit)`, and a store's earnings equal `gross - commission`.

---

## Phase 9 — Platform Admin

**Goal:** the platform team can moderate and oversee.

### Tasks

**Backend** (all routes behind a server-side admin check)

- [ ] `GET /admin/dashboard`: store, user, order and revenue totals.
- [ ] `GET /admin/stores`, `PATCH /admin/stores/:storeId/status` (activate or suspend with a reason).
- [ ] `GET /admin/products`, `PATCH /admin/products/:productId/status` (hide or restore).
- [ ] `GET /admin/users` with basic search.
- [ ] CRUD for global categories and their commission rates.
- [ ] Payout list and "mark as paid".
- [ ] `audit_logs` table: admin ID, action, target, reason, timestamp. Write a row for every admin mutation.
- [ ] Suspending a store hides its storefront and blocks checkout, and optionally revokes staff sessions.

**Frontend**

- [ ] Wire `AdminDashboard`, `AdminStores`, `AdminPayments` to real data. Add `AdminProducts`, `AdminUsers` and `AdminCategories`.
- [ ] Confirmation dialogs with a required reason for suspensions.

### Exit check

An admin suspends a store: its storefront returns unavailable, checkout is blocked, and an audit row exists. A non-admin gets `403` on every admin route.

---

## Phase 10 — Notifications

**Goal:** send the transactional emails customers and merchants expect.

### Tasks

- [ ] Use the existing Nodemailer setup and templates (`verifyEmail`, `resetPassword`, `welcome`). Add `orderConfirmation`, `newOrderForMerchant` and `orderStatusChanged`.
- [ ] Switch production email to a reliable SMTP/API provider (for example Resend over SMTP). Verify SPF and DKIM on your sending domain.
- [ ] Send emails **after** the database transaction commits, and never let an email failure fail the order.
- [ ] Keep an `email_logs` or use the provider dashboard for debugging.
- [ ] If volume or reliability demands it, introduce a queue (BullMQ plus Upstash Redis) here. Do not add it before it is needed.
- [ ] In-app: a simple notification badge for merchants on new orders (polling is fine for the MVP).

### Exit check

Placing an order sends one confirmation email to the customer and one alert to the merchant, and a provider outage does not break checkout.

---

## Phase 11 — Subdomains and Custom Domains

**Goal:** each store is reachable at its own address. Do this after the core flow works.

### 11a. Subdomains (`acer.aura.com`)

- [ ] Buy a domain and set a **wildcard DNS** record (`*.aura.com`) to the hosting target.
- [ ] Host the client so wildcard subdomains work (Vercel supports wildcard domains on the Pro plan, or serve the storefront from Cloudflare).
- [ ] Extend `resolveTenant` to read the `Host` header (or `X-Forwarded-Host` behind the proxy). Resolution order: custom domain, then subdomain, then slug param. Strip the port, lowercase, and ignore reserved subdomains.
- [ ] Cache host-to-store lookups in Redis (`host:<hostname>` with a short TTL) and invalidate on slug or domain change.
- [ ] Client: detect the tenant from `window.location.hostname` and render the storefront routes at `/`. Platform pages (`aura.com`) and tenant pages (`*.aura.com`) need separate route trees.
- [ ] Cookies and auth across subdomains: decide between a shared cookie domain (`.aura.com`) or per-tenant sessions. Configure Better Auth `trustedOrigins` and cookie domain accordingly, and update Google OAuth origins.
- [ ] Use the `TEST_HOSTNAME` env var or `*.localhost` for local testing.

### 11b. Custom domains (`www.acershop.et`)

- [ ] Use the existing `store_domains` table: `domain`, `verificationToken`, `status`, `verifiedAt`.
- [ ] Dashboard flow: merchant enters domain, Aura shows a CNAME target and a TXT record.
- [ ] Verification check (manual "Verify" button first; a scheduled job later) using DNS lookups.
- [ ] SSL: use a hosting provider that issues certificates per custom domain (Vercel domains API or Cloudflare for SaaS custom hostnames). Do not hand-roll certificates.
- [ ] Add `Link: rel=canonical` on storefront pages to avoid duplicate-content issues.
- [ ] Gate custom domains behind a plan or admin approval if cost is a concern.

### Exit check

`acer.<your-domain>` shows only Acer's products, a different subdomain shows a different store, and an unknown subdomain shows a branded 404. A verified custom domain serves over HTTPS.

---

## Phase 12 — Hardening, Testing and Launch

**Goal:** be confident enough to onboard real merchants.

### Security

- [ ] Re-run the tenant isolation matrix against every route, including new ones.
- [ ] Rate limits: login, sign-up, OTP, checkout, upload. Confirm Upstash limits work in production (and fail closed or open deliberately).
- [ ] Input limits: JSON body size, upload size, allowed MIME types, pagination caps (`limit <= 100`).
- [ ] CORS: allow only known origins. Helmet defaults enabled. Cookies `httpOnly`, `secure`, `sameSite` verified in production.
- [ ] Dependency audit (`npm audit`) and pinned versions for critical packages.
- [ ] Secrets only in environment variables. Rotate anything that has appeared in git history.
- [ ] Confirm no endpoint leaks other users' emails, hashes or internal IDs.

### Testing

- [ ] **Unit:** order calculation, commission math, status transition map, slug validation.
- [ ] **Integration (API):** checkout, concurrent stock, tenant isolation, webhook idempotency, admin authorization.
- [ ] **End-to-end (Playwright):** sign up, create store, create product, buy as a customer, fulfill as merchant.
- [ ] Load test checkout and storefront reads (k6 or autocannon) with realistic numbers.

### Performance and reliability

- [ ] Review slow queries (`EXPLAIN`) and add indexes. Avoid N+1 queries in lists.
- [ ] Redis caching on hot public reads. Cache headers for static assets and images.
- [ ] Render: note cold starts on free tiers and use a paid instance or keep-alive for launch.
- [ ] Neon: enable connection pooling and verify backups.
- [ ] Sentry on both apps with releases and source maps. Alerts for error spikes.
- [ ] Structured logs with a request ID on every request.

### Product polish

- [ ] Responsive pass on every page (mobile first), light and dark themes.
- [ ] Accessibility pass: labels, focus order, contrast, keyboard navigation.
- [ ] Legal pages: terms of service, privacy policy, refund policy.
- [ ] Onboarding emails and an in-app getting-started checklist for merchants.
- [ ] Analytics (privacy-friendly) for sign-ups, store creation and orders.

### Launch

- [ ] Staging environment mirroring production (separate DB, OAuth client and payment sandbox).
- [ ] Production migration dry run and a rollback plan.
- [ ] Closed beta with 3–5 real merchants, then fix what they hit.
- [ ] Public launch checklist in [Appendix C](#appendix-c--environment-and-deployment-checklist).

### Exit check

All Definition of Done items below are green, and one real merchant has completed a real order through the live system.

---

## Post-MVP Backlog

Order by what real merchants ask for first.

| Priority | Item | Notes |
| --- | --- | --- |
| High | Telebirr provider | Add through the existing `PaymentProvider` interface |
| High | Delivery zones and rates | Region/sub-city table, flat or weight-tiered pricing |
| High | Reviews (verified purchase) and wishlist | Rating aggregation can start synchronous |
| Medium | BullMQ workers and SMS (OTP, order alerts) | Move email and reconciliation off the request path |
| Medium | Entitlement engine and paid plans | Gate custom domains, product limits, analytics |
| Medium | Store categories and collections | Merchant-managed navigation |
| Medium | Server-synced carts and cart merge on login | Enables abandoned-cart features |
| Medium | Refunds and returns workflow | With ledger reversals |
| Medium | Phone sign-up with OTP | Important for local adoption |
| Low | Visual storefront builder and custom pages | Section JSON renderer |
| Low | Discount codes and promotions | |
| Low | Multi-store checkout | Split payments and fulfillment |
| Low | Advanced analytics and exports | |
| Low | Disputes and support escalation | |
| Low | Mobile app | |

---

## Definition of Done

A task or phase is done only when all of these are true.

- [ ] Behavior matches the acceptance criteria and the phase's exit check.
- [ ] Inputs validated with Zod, and errors use the shared `ApiError` / `ApiResponse` shapes.
- [ ] Tenant isolation verified with a test for any new tenant-scoped endpoint.
- [ ] Authentication and authorization checked on every route.
- [ ] Loading, empty and error states exist in the UI.
- [ ] `npm run check`, `npm run lint` and tests pass in CI.
- [ ] Migration generated, reviewed and applied to staging.
- [ ] No secrets or personal data in logs or git.
- [ ] Docs updated (README feature status, API Endpoints doc, this guide's checkboxes).
- [ ] Deployed and smoke-tested on staging, then production.

---

## Appendix A — Target Database Changes

Summary of schema work implied by this guide. Names are suggestions; align with your current naming.

| Table | Change |
| --- | --- |
| `stores` | `logo` nullable, `planId` default Free plan with `onDelete: restrict`, add contact fields (phone, city, region), `settings` JSON |
| `global_categories` | **New:** `id`, `name`, `slug`, `commissionRate` |
| `products` | Add `categoryId`, `status` (`draft/published/archived`), `moderationStatus`; indexes on `(store_id, status)` and `(category_id)` |
| `product_variants` | SKU unique per store; stock `>= 0` check constraint |
| `orders` | Add `total`, `shippingFee`, `paymentStatus`, `paymentMethod`, `commissionAmount`, `notes`, idempotency key (unique) |
| `order_items` | Snapshot title, variant label, unit price, commission rate |
| `order_events` | **New:** `orderId`, `actorId`, `from`, `to`, `createdAt` |
| `payments` | **New:** `orderId`, `provider`, `reference` (unique), `amount`, `status`, `rawPayload` |
| `ledger_entries` | **New, append-only:** `orderId`, `storeId`, `account`, `debit`, `credit` |
| `payouts` | **New:** `storeId`, `amount`, `status`, `requestedAt`, `paidAt` |
| `store_domains` | Verification token, status, `verifiedAt`, unique domain |
| `audit_logs` | **New:** `actorId`, `action`, `targetType`, `targetId`, `reason`, `createdAt` |
| `user` | Platform role / `isAdmin` flag (server-controlled, not user-writable) |

Money: choose either integer minor units or `numeric(12,2)` and apply it everywhere, including `subtotal`.

---

## Appendix B — Endpoint Checklist

Base URL: `/api/v1`. Auth lives at `/api/auth/*` (Better Auth). Mark each when implemented **and** covered by a test.

### Stores

- [ ] `POST /stores`
- [ ] `GET /stores` (public directory)
- [ ] `GET /stores/me`
- [ ] `GET /stores/:slug` (public)
- [ ] `GET /stores/:storeId/manage` or equivalent owner view
- [ ] `PATCH /stores/:storeId`
- [ ] `PATCH /stores/:storeId/slug`
- [ ] `DELETE /stores/:storeId`
- [ ] `GET /stores/:storeId/dashboard`
- [ ] `GET /stores/:storeId/earnings`

### Catalog

- [ ] `GET /categories`
- [ ] `GET /stores/:storeId/products`
- [ ] `POST /stores/:storeId/products`
- [ ] `GET /stores/:storeId/products/:productId`
- [ ] `PATCH /stores/:storeId/products/:productId`
- [ ] `DELETE /stores/:storeId/products/:productId`
- [ ] Variant CRUD under `/stores/:storeId/products/:productId/variants`
- [ ] `GET /public/stores/:slug/products`
- [ ] `GET /public/products`
- [ ] `GET /public/products/:productId`

### Commerce

- [ ] `POST /checkout`
- [ ] `GET /orders/me`
- [ ] `GET /orders/:orderId`
- [ ] `POST /orders/:orderId/cancel`
- [ ] `GET /stores/:storeId/orders`
- [ ] `GET /stores/:storeId/orders/:orderId`
- [ ] `PATCH /stores/:storeId/orders/:orderId/status`

### Payments

- [ ] `POST /payments/initialize`
- [ ] `GET /payments/:reference/status`
- [ ] `POST /webhooks/chapa` (outside the versioned prefix)

### Admin

- [ ] `GET /admin/dashboard`
- [ ] `GET /admin/stores`, `PATCH /admin/stores/:storeId/status`
- [ ] `GET /admin/products`, `PATCH /admin/products/:productId/status`
- [ ] `GET /admin/users`
- [ ] Category CRUD with commission rates
- [ ] Payout list and mark-as-paid

### Platform

- [ ] `GET /health`
- [ ] `POST /uploads` (if moving to signed or generic uploads)
- [ ] `GET /config/public`

---

## Appendix C — Environment and Deployment Checklist

### Environments

| Environment | Client | API | Database | Payments | Email |
| --- | --- | --- | --- | --- | --- |
| Local | Vite `:5173` | `:3000` | Neon dev branch | Sandbox | Mail sink |
| Staging | Vercel preview | Render staging | Neon staging branch | Sandbox | Test inbox |
| Production | Vercel | Render | Neon main | Live | Verified domain |

### Production checklist

**Configuration**

- [ ] `NODE_ENV=production`
- [ ] `CLIENT_ORIGIN` = exact client origin (https, no trailing slash)
- [ ] `SERVER_ORIGIN`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET` (long random value)
- [ ] `DATABASE_URL`, `UPSTASH_REDIS_*`, `CLOUDINARY_*`, `SMTP_*`, `SENTRY_DSN`
- [ ] Payment provider keys and webhook secret

**Google OAuth**

- [ ] Authorized origin: your production client origin
- [ ] Redirect URI: `https://<client-origin>/api/auth/callback/google`
- [ ] Consent screen published (not "Testing")

**Platform**

- [ ] `client/vercel.json` rewrites point to the production API
- [ ] Migrations applied, and a seed run for plans and categories only (no demo data)
- [ ] Render health check uses `/health`
- [ ] Sentry releases and alerts configured
- [ ] Database backups verified, with a restore tested once
- [ ] Domain DNS, wildcard record and SSL verified (Phase 11)
- [ ] Terms, privacy and refund pages published

**Smoke test after every deploy**

1. Sign in with email and with Google.
2. Create a store and a product.
3. Place an order as a different user.
4. See the order in the merchant dashboard and change its status.
5. Check Sentry for new errors.
