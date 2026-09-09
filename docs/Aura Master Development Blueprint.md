# Aura — Master Development Blueprint & Technical Specification

> **Platform:** Multi-Tenant E-Commerce SaaS Platform (Ethiopia)  
> **Backend:** Node.js, Express.js, Drizzle ORM, Neon Serverless PostgreSQL, GraphQL Yoga, BullMQ, Upstash Redis  
> **Frontend:** React (SPA / Dashboard / Storefronts), TanStack Query, Zustand, React Hook Form, Zod, Tailwind CSS, shadcn/ui  
> **Authentication & Security:** Better Auth, Sentry, Rate-Limiting, Granular RBAC  
> **Media & Storage:** Cloudinary  

---

## Table of Contents
1. [Product Overview & Ethiopian Market Scope](#1-product-overview--ethiopian-market-scope)
2. [Core Business Model & Commission Engine](#2-core-business-model--commission-engine)
3. [Multi-Tenancy & Application-Level Tenant Isolation](#3-multi-tenancy--application-level-tenant-isolation)
4. [User Identity & Account Model](#4-user-identity--account-model)
5. [Authentication & Session Management (Better Auth)](#5-authentication--session-management-better-auth)
6. [Multi-Store Management & Onboarding](#6-multi-store-management--onboarding)
7. [Seller Verification & Granular Store Suspensions](#7-seller-verification--granular-store-suspensions)
8. [Routing Engine: Subdomains & Custom Domains](#8-routing-engine-subdomains--custom-domains)
9. [Store Staff & Granular RBAC Authorization](#9-store-staff--granular-rbac-authorization)
10. [Catalog Architecture: Products, Variants & Categories](#10-catalog-architecture-products-variants--categories)
11. [Inventory System & Atomic Concurrency](#11-inventory-system--atomic-concurrency)
12. [Media Pipeline (Cloudinary Integration)](#12-media-pipeline-cloudinary-integration)
13. [Storefront Builder & Custom Pages Engine](#13-storefront-builder--custom-pages-engine)
14. [Feature Entitlement & Subscription Engine](#14-feature-entitlement--subscription-engine)
15. [Cart, Checkout & Order Lifecycle State Machine](#15-cart-checkout--order-lifecycle-state-machine)
16. [Customer Model, Wishlist & Verified Reviews](#16-customer-model-wishlist--verified-reviews)
17. [Payment Infrastructure & Double-Entry Financial Ledger](#17-payment-infrastructure--double-entry-financial-ledger)
18. [Delivery Infrastructure & Regional Zones](#18-delivery-infrastructure--regional-zones)
19. [Returns, Support Escalations & Product Moderation](#19-returns-support-escalations--product-moderation)
20. [Background Jobs & Event Pipeline (BullMQ + Redis)](#20-background-jobs--event-pipeline-bullmq--redis)
21. [Database Design & Drizzle ORM Schema (Neon PostgreSQL)](#21-database-design--drizzle-orm-schema-neon-postgresql)
22. [Express.js Server Architecture & GraphQL API Strategy](#22-expressjs-server-architecture--graphql-api-strategy)
23. [React Frontend Architecture & State Strategy](#23-react-frontend-architecture--state-strategy)
24. [Caching, Security & Financial Safety Safeguards](#24-caching-security--financial-safety-safeguards)
25. [Phased Development Roadmap (Phases 0 to 17)](#25-phased-development-roadmap-phases-0-to-17)
26. [Production Deployment, CI/CD & Observability](#26-production-deployment-cicd--observability)
27. [Key Product & Technical Decisions Summary](#27-key-product--technical-decisions-summary)
28. [Complete Production Directory Structure & Checklist](#28-complete-production-directory-structure--checklist)

---

## 1. Product Overview & Ethiopian Market Scope

**Aura** is an Ethiopian multi-tenant e-commerce SaaS platform designed to enable sellers and businesses to rapidly deploy independent, high-performance online stores.

### Core Principles
- **SaaS Infrastructure over Marketplace:** Aura is not an open public marketplace at launch. It is store infrastructure analogous to Shopify, explicitly designed for the Ethiopian ecosystem (e.g., local currency ETB, localized delivery, regional payment providers like Chapa and Telebirr).
- **Independent Storefronts:** Each merchant operates under their own domain/subdomain (`acer.aura.com` or custom domain `www.acershop.et`). `aura.com` serves strictly as the main SaaS platform, marketing site, seller portal, and platform administration portal.
- **Tenant Isolation & Shared Infrastructure:** Single logical backend API built on Express.js and Node.js with Neon PostgreSQL, isolating tenant data at the database query layer via strict `storeId` constraints.

---

## 2. Core Business Model & Commission Engine

Aura operates on a **commission-only revenue model** at launch. Sellers incur no upfront monthly subscription fees. Aura extracts a category-based commission on successfully completed order items.

### Commission Calculation Architecture
Commissions are dynamically configured per global product category by Aura Administrators and versioned across order transactions.

```
Order Total Calculation (Server-Side):
  Gross Item Price = Quantity * Unit Price
  Category Commission % = Dynamic Global Category Rate
  Aura Commission Amount = Gross Item Price * (Commission Rate / 100)
  Seller Net Yield = Gross Item Price - Aura Commission Amount
```

### Business Rules
1. **Historical Ledger Locking:** Commission rates applied at checkout are immutable once an order is placed. Changing a category's commission rate does not retroactive alter historical orders.
2. **Refund Reversals:** Upon an approved refund, category commissions are recalculated or reversed according to platform policy and recorded in the double-entry financial ledger.
3. **Auditing:** All commission payouts and reversals generate matching ledger entries referencing the specific `orderId`, `itemId`, and `storeId`.

---

## 3. Multi-Tenancy & Application-Level Tenant Isolation

Aura uses **Application-Level Multi-Tenancy** over a single shared Neon PostgreSQL database.

```
       +-------------------------------------------------------+
       |                  Express.js Router                    |
       +-------------------------------------------------------+
                                   |
                     Tenant Context Middleware
        Extracts Subdomain/Domain -> Resolves `storeId`
                                   |
                 +-----------------+-----------------+
                 |                                   |
    GraphQL Resolver / API Handler     Background Job Runner
        Injects `storeId`                 Injects `storeId`
                 |                                   |
                 +-----------------+-----------------+
                                   |
                        Drizzle ORM Query Layer
            Automatic `.where(eq(schema.table.storeId, ctx.storeId))`
```

### Safety & Isolation Guarantees
1. **Tenant Resolution Middleware:** Incoming HTTP/GraphQL requests pass through `tenantContextMiddleware`. The middleware inspects the `Host` header or authenticated session store claim, verifies existence in Upstash Redis cache, and attaches `req.tenant = { storeId, domain, status }`.
2. **Repository Guard Clause:** All database interaction functions in Drizzle require an explicit `storeId` context parameter. Raw query building without `storeId` verification is restricted.
3. **Prevention of Cross-Tenant IDOR:** Any query fetching an entity by primary key must include `.where(and(eq(table.id, id), eq(table.storeId, currentStoreId)))`.

---

## 4. User Identity & Account Model

Aura enforces **One Global Identity System**. A single user account (`users` table) can act across the entire platform in multiple capacities simultaneously.

```
                       +-------------------+
                       |    Global User    |
                       |   (users table)   |
                       +---------+---------+
                                 |
         +-----------------------+-----------------------+
         |                                               |
  +------+------+                                 +------+------+
  | Store Staff |                                 | Customer    |
  | Membership  |                                 | Profile     |
  +------+------+                                 +------+------+
         |                                               |
  Scoped to Store A                             Scoped to Store B
```

- **Global User Identity:** Contains universal credentials (email, hashed password, phone, Google OAuth identity).
- **Store Staff Memberships (`store_memberships`):** Links a global user to specific stores with fine-grained granular permissions (e.g., `products:write`, `orders:read`).
- **Store-Specific Customer Profiles (`customer_profiles`):** Customer shopping histories, addresses, store-level wishlists, and cart items remain isolated per store. Store A cannot view a customer's activity in Store B.

---

## 5. Authentication & Session Management (Better Auth)

Authentication is powered by **Better Auth** mounted directly on the Express.js application framework.

### Supported Methods
- Email & Password with strict verification policies.
- Google OAuth 2.0.
- Ethiopian Mobile Phone Number + OTP verification.

### Session Lifecycle & Security Architecture
- **Primary Identity Key:** Internal UUIDv4 (`userId`). Email and Phone number are mutable user attributes, never primary keys.
- **Tokens:** Server-side sessions backed by Neon/Redis with HTTP-only, `SameSite=Lax` (or `None` for cross-domain custom store environments), secure cookies.
- **Brute Force & Rate Limiting:** Managed via Upstash Redis sliding window counters (e.g., max 5 login attempts per 15-minute window per IP).
- **Session Revocation:** Users can audit active sessions and trigger remote device logout; admin suspensions invalidate all active sessions instantly via Redis key deletion.

---

## 6. Multi-Store Management & Onboarding

A user can own and manage multiple distinct stores using a single Aura identity.

### Onboarding Flow
1. **Step 1 (Instant Provisioning):** Store Name, Subdomain (`[slug].aura.com`), Primary Global Category.
2. **Step 2 (Progressive Profiling):** Business Logo, Banner, Bio, Support Contact Info, Ethiopian Region/City details.
3. **Step 3 (Operational Setup):** Delivery zone configuration, Payment payout options (e.g., local bank account context), Verification Document Uploads.

### Store Switcher Component Architecture
On the seller dashboard UI (React + Zustand), active store context is selected via a global dropdown. Swapping the selected store updates the state store and sets the current active `x-aura-store-id` request header for API requests.

---

## 7. Seller Verification & Granular Store Suspensions

To balance rapid merchant onboarding with platform risk management, Aura utilizes progressive verification alongside granular enforcement capability.

### Verification States
`UNVERIFIED` $\rightarrow$ `PENDING_REVIEW` $\rightarrow$ `VERIFIED` $\rightarrow$ `REJECTED`

### Granular Suspension Controls
Rather than a single boolean `is_suspended` flag, Aura supports granular capabilities flags in the `stores` table:

```typescript
type StoreStatusFlags = {
  isStorefrontActive: boolean; // Controls public viewing of storefront
  isSellingEnabled: boolean;    // Disables checkout capability while keeping store browsable
  isDashboardAllowed: boolean;  // Blocks seller staff access to admin dashboard
};
```

All enforcement state updates emit audit logs containing the responsible Aura Administrator ID, timestamp, target `storeId`, and legal/policy justification string.

---

## 8. Routing Engine: Subdomains & Custom Domains

Aura supports routing across multi-tenant domains using an Express.js middleware edge routing architecture.

```
Client Request Header: Host: acer.aura.com OR Host: www.acershop.et
                             |
                   Express Domain Middleware
                             |
      +----------------------+----------------------+
      |                                             |
Match *.aura.com Subdomain                Match Custom Domain
Look up Redis cache key                 Look up Redis cache key
`subdomain:acer`                        `domain:www.acershop.et`
      |                                             |
      +----------------------+----------------------+
                             |
                  Injects `storeId` Context
```

### Custom Domain Lifecycle & SSL
1. Merchant adds domain `www.acershop.et` in store dashboard.
2. Aura generates CNAME target (`target.aura.com`) and TXT ownership verification token.
3. Node.js background worker polls DNS records.
4. Upon verification, Cloudflare SSL/TLS custom hostname binding is configured automatically via Cloudflare API.
5. Canonical headers (`Link: <...>; rel="canonical"`) are injected on storefront responses to protect search indexing hygiene between subdomains and custom domains.

---

## 9. Store Staff & Granular RBAC Authorization

Aura avoids monolithic fixed staff roles by enforcing fine-grained system permissions.

### Permission Keys Example
- `products:read`, `products:create`, `products:update`, `products:delete`
- `orders:read`, `orders:update`, `orders:refund`
- `customers:read`
- `store:settings:update`
- `staff:manage`

### Authorization Middleware Stack (Express + GraphQL)
Every GraphQL resolver or Express REST route executing tenant actions must invoke permission assertion helpers:

```typescript
// Guard check inside service layer
export function assertStorePermission(
  ctx: RequestContext,
  requiredPermission: PermissionKey
) {
  if (ctx.isAuraAdmin) return true; // Superadmin bypass with audit log
  
  const hasPermission = ctx.membership?.permissions.includes(requiredPermission);
  if (!hasPermission) {
    throw new ForbiddenError(`Missing required permission: ${requiredPermission}`);
  }
}
```

---

## 10. Catalog Architecture: Products, Variants & Categories

### Product Architecture
Products belong exclusively to a single store (`storeId`). There is no initial shared global inventory catalog across stores.

### Product Variants Engine
- **Simple Product:** Single entity with direct `stockQuantity` and `price`.
- **Variant Product:** Parent product contains multiple child variants defined by option dimensions (e.g., Color: Red/Blue, Size: S/M/L).

```
Product (Parent)
  ├── Option 1: Color (Red, Blue)
  ├── Option 2: Size (S, M)
  └── Variants (Children)
        ├── Red / S  (SKU: RED-S, Price: 500 ETB, Stock: 10)
        ├── Red / M  (SKU: RED-M, Price: 500 ETB, Stock: 15)
        └── Blue / S (SKU: BLU-S, Price: 550 ETB, Stock: 5)
```

### Category Architecture
- **Global Categories (Aura Managed):** Platform taxonomy used for commissions and marketplace classification.
- **Store Categories (Merchant Managed):** Merchant custom taxonomy for storefront navigation.

---

## 11. Inventory System & Atomic Concurrency

To prevent overselling during high-concurrency flash sales, Aura eliminates unsafe read-then-write stock modifications. All inventory operations execute inside PostgreSQL atomic serializable transactions or isolated row locks (`FOR UPDATE`).

### Atomic Stock Reservation Function (Drizzle SQL Equivalent)
```sql
-- Executed inside a PostgreSQL transaction
UPDATE product_variants
SET stock_quantity = stock_quantity - $decrementAmount,
    updated_at = NOW()
WHERE id = $variantId 
  AND store_id = $storeId 
  AND stock_quantity >= $decrementAmount
RETURNING id, stock_quantity;
```
If zero rows are updated, the transaction throws an `InsufficientStockException`, aborting the checkout allocation safely.

---

## 12. Media Pipeline (Cloudinary Integration)

PostgreSQL stores media metadata strictly; all binary files reside on Cloudinary.

```
Client App (React Dashboard)
   │
   ├── 1. Request Signed Upload Signature ──► Express API Endpoint
   │                                                 │
   │   ◄── 2. Return Signature + Cloudinary Params ──┘
   │
   ├── 3. Direct Binary Upload ──────────────► Cloudinary CDN
   │
   └── 4. Save Media Metadata (URL, PublicID)► GraphQL Mutation (Express/Drizzle)
```

### Video & Image Optimization Rules
- Automatic image formatting (`f_auto,q_auto`).
- Preset dimensions for storefront thumbnails, product zooms, and banners.
- Background worker cleans up orphaned media on Cloudinary if media record deletion is triggered.

---

## 13. Storefront Builder & Custom Pages Engine

Sellers customize their online store visually without writing code.

### Section/Block JSON Tree Architecture
Each customizable page stores its section configuration as a structured JSON schema in Neon PostgreSQL:

```json
{
  "pageTitle": "Homepage",
  "sections": [
    {
      "id": "sec_hero_01",
      "type": "HERO_BANNER",
      "settings": {
        "title": "New Summer Collection",
        "ctaText": "Shop Now",
        "ctaLink": "/category/summer"
      },
      "responsive": {
        "desktop": { "fontSize": "48px", "alignment": "center" },
        "mobile": { "fontSize": "28px", "alignment": "left" }
      }
    },
    {
      "id": "sec_prod_grid_02",
      "type": "PRODUCT_GRID",
      "settings": {
        "categorySlug": "summer",
        "limit": 8
      }
    }
  ]
}
```

### React Renderer Component Framework
On customer storefronts, a dynamic `<SectionRenderer />` reads the section array, maps section types to modular React UI components, and safely renders the page structure.

---

## 14. Feature Entitlement & Subscription Engine

Aura utilizes a centralized capability layer to govern tier capabilities without hardcoding plan names in UI components.

### Entitlement Architecture Matrix
```
Store Subscription Tier (e.g., FREE, PRO)
          │
          ▼
   Entitled Features (Capabilities granted by platform)
          │
          ▼
   Store Feature Settings (Merchant toggles: ENABLED / DISABLED)
          │
          ▼
   Final Feature State = Entitled && Enabled
```

```typescript
export interface FeatureCapability {
  featureKey: 'WISHLIST' | 'REVIEWS' | 'ADVANCED_ANALYTICS' | 'CUSTOM_DOMAIN';
  isEntitled: boolean;
  isEnabled: boolean;
  limitQuota?: number; // e.g., max 50 products for free tier
}
```

---

## 15. Cart, Checkout & Order Lifecycle State Machine

### Cart Model
- **Guest Customer:** Local React state stored in browser `localStorage`.
- **Logged-In Customer:** Express API syncs local cart items with PostgreSQL `carts` and `cart_items` tables. Upon login, client triggers a cart merge transaction.
- **Store Boundary:** Carts are explicitly bound to a single `storeId`. Inter-store items cannot mix.

### Order Lifecycle State Machine
```
[ PENDING ] ──► (Payment Succeeded) ──► [ CONFIRMED ]
     │                                        │
     ├──► (Payment Failed/Timeout)            ├──► (Seller Fulfills) ──► [ SHIPPED ]
     │                                        │                                │
     ▼                                        ▼                                ▼
[ CANCELLED ]                            [ CANCELLED ]                  [ DELIVERED ]
                                              │                                │
                                              ▼                                ▼
                                       [ REFUNDED ] ◄── (Dispute/Return) ──────┘
```

---

## 16. Customer Model, Wishlist & Verified Reviews

### Wishlist Engine
Stored per customer profile per store. If a store's `WISHLIST` entitlement is disabled by the merchant or platform, existing wishlist data remains safe in PostgreSQL but UI access points are suppressed.

### Verified Purchase Reviews Architecture
1. Review submission mutation checks:
   - Order exists for `customerId` in target `storeId`.
   - Order status equals `DELIVERED`.
   - Order contains target `productId`.
   - No existing review present for this line item.
2. Ratings are aggregated asynchronously via BullMQ workers into cached product rating counters (`averageRating`, `reviewCount`).

---

## 17. Payment Infrastructure & Double-Entry Financial Ledger

To guarantee financial integrity across local payment providers (e.g., Chapa, Telebirr), Aura requires strict backend payment verification and double-entry ledger bookkeeping.

### Provider Abstraction Class Model
```
            +------------------------------------+
            |      PaymentProviderAdapter        |
            |   (Interface: verify, payout)      |
            +-----------------+------------------+
                              |
        +---------------------+---------------------+
        |                                           |
+-------+--------------+                   +--------+-------------+
| ChapaPaymentProvider |                   | TelebirrPaymentAdapter|
+----------------------+                   +----------------------+
```

### Ledger Entry Schema Design
Money is tracked in integer ETB minor units (cents / hundredths) to eliminate floating-point rounding errors.

```
Transaction Event: Order #1001 paid (1000 ETB total, 50 ETB Aura commission)

Ledger Journal Entry:
  - Account: CUSTOMER_CLEARING          | Debit:  1000 ETB | Credit: 0 ETB
  - Account: SELLER_PENDING_BALANCE     | Debit:  0 ETB    | Credit: 950 ETB
  - Account: AURA_COMMISSION_REVENUE    | Debit:  0 ETB    | Credit: 50 ETB
```

Payouts occur on fixed release schedules (e.g., $N$ days post-delivery) moving funds from `SELLER_PENDING_BALANCE` to `SELLER_AVAILABLE_BALANCE`.

---

## 18. Delivery Infrastructure & Regional Zones

Aura supports both **Seller-Managed Self Delivery** and **Platform Provider Logistics**.

### Ethiopian Geographic Taxonomy Model
Delivery rates are evaluated based on a structured geographical hierarchy:
- **Country:** Ethiopia
- **Regions:** Addis Ababa, Oromia, Amhara, Sidama, Tigray, SNNPR, etc.
- **Sub-Cities / Zones:** Bole, Yeka, Kirkos, Hawassa, Adama, Mekelle, etc.

Sellers configure flat rates or weight-tiered pricing per regional zone in their dashboard.

---

## 19. Returns, Support Escalations & Product Moderation

### Escalation Hierarchy
1. **Level 1 (Merchant Ticket):** Direct communication between customer and seller within the store portal.
2. **Level 2 (Aura Platform Intervention):** Either party can escalate to Aura Administrators if unresolved after 48 hours.

### Automated Product Moderation
Newly published products are processed via background job regex & semantic keyword rules. Suspicious items (e.g., prohibited goods, fraud indicators) are marked `MODERATION_PENDING` and hidden from public storefront view until reviewed in the Aura Admin Dashboard.

---

## 20. Background Jobs & Event Pipeline (BullMQ + Redis)

Background jobs execute independently of the main Express API server using **BullMQ** workers connected to **Upstash Redis**.

```
Express API Server                      Upstash Redis                      Dedicated Worker Node
     │                                        │                                     │
     ├─── Push Event: ORDER_COMPLETED ───────►│                                     │
     │    (Payload: orderId, storeId)         ├── Queue: `notifications` ──────────►│
     │                                        │                                     │-- Process Email
     │                                        │                                     │-- Send SMS
     │                                        │                                     │-- Recalculate Stock
```

### Job Queues
- `mail-queue`: Transactional email delivery (Resend API).
- `sms-queue`: OTP & notification SMS dispatch.
- `analytics-queue`: Asynchronous aggregation of storefront pageviews and sales metrics.
- `financial-queue`: Scheduled payout releases and ledger reconciliation.

---

## 21. Database Design & Drizzle ORM Schema (Neon PostgreSQL)

Below is an abbreviated representation of core database tables defined using Drizzle ORM typescript schemas.

```typescript
// src/db/schema.ts
import { pgTable, uuid, varchar, text, boolean, integer, timestamp, jsonb, decimal, primaryKey } from 'drizzle-orm/pg-core';

// 1. Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 50 }),
  passwordHash: text('password_hash'),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  isAuraAdmin: boolean('is_aura_admin').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 2. Stores Table
export const stores = pgTable('stores', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  ownerId: uuid('owner_id').references(() => users.id).notNull(),
  customDomain: varchar('custom_domain', { length: 255 }).unique(),
  verificationStatus: varchar('verification_status', { length: 50 }).default('UNVERIFIED').notNull(),
  isStorefrontActive: boolean('is_storefront_active').default(true).notNull(),
  isSellingEnabled: boolean('is_selling_enabled').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 3. Global Categories
export const globalCategories = pgTable('global_categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  commissionRate: decimal('commission_rate', { precision: 5, scale: 2 }).notNull(), // e.g. 5.00 for 5%
});

// 4. Products Table (Tenant Scoped)
export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  storeId: uuid('store_id').references(() => stores.id).notNull(),
  globalCategoryId: uuid('global_category_id').references(() => globalCategories.id).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 50 }).default('DRAFT').notNull(), // DRAFT, PUBLISHED, ARCHIVED
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 5. Product Variants Table
export const productVariants = pgTable('product_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }).notNull(),
  storeId: uuid('store_id').references(() => stores.id).notNull(),
  sku: varchar('sku', { length: 100 }),
  priceInCents: integer('price_in_cents').notNull(),
  stockQuantity: integer('stock_quantity').default(0).notNull(),
  options: jsonb('options').notNull(), // e.g. { "Color": "Red", "Size": "M" }
});

// 6. Orders Table
export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  storeId: uuid('store_id').references(() => stores.id).notNull(),
  orderNumber: varchar('order_number', { length: 100 }).notNull(),
  customerId: uuid('customer_id').references(() => users.id),
  totalAmountInCents: integer('total_amount_in_cents').notNull(),
  commissionAmountInCents: integer('commission_amount_in_cents').notNull(),
  orderStatus: varchar('order_status', { length: 50 }).default('PENDING').notNull(),
  paymentStatus: varchar('payment_status', { length: 50 }).default('UNPAID').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
```

---

## 22. Express.js Server Architecture & GraphQL API Strategy

The backend is built as a **Modular Monolith** using Express.js and GraphQL Yoga.

### Express Middleware Pipeline Architecture
```
Incoming HTTP Request
       │
       ├── 1. Helmet Security Headers & CORS Middleware
       ├── 2. Express Body Parser
       ├── 3. Tenant Context Resolver (Subdomain / Custom Domain)
       ├── 4. Better Auth Session Extraction
       ├── 5. GraphQL Yoga Sub-Router Endpoint (`/graphql`)
       │        ├── Schema Stitching / Modular Resolvers
       │        ├── Zod Schema Input Validation
       │        ├── DataLoader (Batch DB Query Resolver)
       │        └── Context Injector ({ user, storeId, db, permissions })
       └── 6. Specialized REST HTTP Webhook Routes (`/webhooks/chapa`)
```

### GraphQL DataLoader Pattern Example
To avoid $N+1$ database performance degradation when resolving nested variants or product media across GraphQL queries:

```typescript
import DataLoader from 'dataloader';

export const createVariantLoader = (db: NeonDatabase) => {
  return new DataLoader(async (productIds: readonly string[]) => {
    const variants = await db
      .select()
      .from(productVariants)
      .where(inArray(productVariants.productId, [...productIds]));
      
    const variantMap: Record<string, typeof variants> = {};
    variants.forEach((v) => {
      if (!variantMap[v.productId]) variantMap[v.productId] = [];
      variantMap[v.productId].push(v);
    });

    return productIds.map((id) => variantMap[id] || []);
  });
};
```

---

## 23. React Frontend Architecture & State Strategy

The frontend application uses React structured into clean responsibility layers.

```
+-------------------------------------------------------------------+
|                        React Application                          |
+-------------------------------------------------------------------+
                                  │
         +------------------------+------------------------+
         |                                                 |
  TanStack Query (Server State)                   Zustand (Client State)
  - Fetches GraphQL Data                          - Storefront Builder Canvas
  - Cache Invalidation & Mutations                - UI Modals & Filters
  - Optimistic Order Refetches                    - Active Store Switcher Context
```

### Form Handling & Zod Validation Example
Forms rely on `react-hook-form` with `@hookform/resolvers/zod` for zero-runtime-type-mismatch guarantees:

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const createProductSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  price: z.number().positive('Price must be greater than 0'),
  globalCategoryId: z.string().uuid(),
});

type CreateProductInput = z.infer<typeof createProductSchema>;

export function CreateProductForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = (data: CreateProductInput) => {
    // Execute GraphQL Mutation via TanStack Query
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Product Title" />
      {errors.title && <p>{errors.title.message}</p>}
      <button type="submit">Save Product</button>
    </form>
  );
}
```

---

## 24. Caching, Security & Financial Safety Safeguards

### Caching Architecture (Upstash Redis)
- **Store Settings & Entitlements:** Cached in Redis key `store:config:{storeId}` with a 1-hour TTL. Invalidated instantly upon store settings update mutation.
- **Storefront Sections:** Public page schema cached at edge / Redis layer to minimize database pressure.

### Critical Security Practices
1. **Tenant Isolation Unit Tests:** Automated integration tests run cross-tenant assertions (e.g., attempt to read Store B product using Store A staff token $\rightarrow$ assert HTTP 403 Forbidden).
2. **Server-Side Calculation Mandatory:** Product price calculations, taxes, delivery fees, and commissions are calculated strictly on the backend. Client payload prices are completely untrusted.

---

## 25. Phased Development Roadmap (Phases 0 to 17)

```
Phase 0: Foundation
  └── Repo structure, Neon PostgreSQL setup, Express skeleton, Drizzle ORM configuration.

Phase 1: Identity & Authentication
  └── Better Auth integration, Google OAuth, Email/Password, Phone OTP flows.

Phase 2: Multi-Tenancy & Store Provisioning
  └── Tenant context middleware, store creation wizard, store domain routing setup.

Phase 3: Staff Permissions & RBAC
  └── Store memberships, fine-grained permission assertions, admin overrides.

Phase 4: Catalog & Product Management
  └── Global categories, store categories, basic variants, Drizzle ORM catalog schemas.

Phase 5: Cloudinary Media Engine
  └── Signed upload REST endpoints, Cloudinary transformation utilities, React media dropzone.

Phase 6: Storefront Visual Builder
  └── Section JSON schemas, builder Zustand canvas state, storefront dynamic layout renderer.

Phase 7: Storefront Custom Pages & SEO
  └── Custom pages builder, dynamic sitemap generator, canonical header injection engine.

Phase 8: Cart & Inventory Engine
  └── Local/Server hybrid cart sync, PostgreSQL row-locking atomic inventory logic.

Phase 9: Ethiopian Payment Integration
  └── Provider abstraction layer, Chapa and Telebirr webhooks, signature verification.

Phase 10: Financial Ledger & Commission Engine
  └── Double-entry ledger tables, category commission calculation logic, payout queues.

Phase 11: Order Management & Fulfullment State Machine
  └── Order lifecycle transitions, seller dashboard order management UI, status callbacks.

Phase 12: Regional Delivery Infrastructure
  └── Ethiopian region/zone database tables, distance/flat rate delivery calculation engine.

Phase 13: Customer Experience, Wishlist & Reviews
  └── Customer profile store scopes, wishlist toggle APIs, verified buyer review mutation guards.

Phase 14: Background Queues & Notifications
  └── BullMQ worker setup, Upstash Redis queue binding, Resend transaction emails, SMS gateway.

Phase 15: SaaS Feature Entitlements Engine
  └── Centralized capability checks, tier limits enforcement, downgrade data preservation policies.

Phase 16: Moderation, Support Escalation & Aura Admin
  └── Automated moderation regex workers, admin inspection dashboard, dispute escalation portal.

Phase 17: Custom Domains, Security Hardening & Launch
  └── CNAME verification worker, Cloudflare SSL automation, penetration testing, production deployment.
```

---

## 26. Production Deployment, CI/CD & Observability

```
+-----------------------------------------------------------------------+
|                            Deployment                                 |
+-----------------------------------------------------------------------+
                                    │
    +-------------------------------+-------------------------------+
    |                               |                               |
Express API Server              React Client Applications      Worker Process Nodes
Hosted on Render / AWS App      Hosted on Vercel / Cloudflare  Hosted on Render Workers
(Node.js runtime environment)   (Static SPA CDN Assets)        (BullMQ Queue Consumers)
```

### Observability Architecture
- **Sentry Error Tracking:** Integrated in both Express API server (backend exception capture) and React client application (frontend error boundary tracking).
- **Log Aggregation:** Structured JSON logging using `pino` with request correlation IDs (`x-request-id`) injected at the Express routing layer.

---

## 27. Key Product & Technical Decisions Summary

| Topic | Technical Choice | Justification |
| :--- | :--- | :--- |
| **Business Model** | Commission-Only Multi-Tenant SaaS | Eliminates barrier to entry for Ethiopian merchants while ensuring platform revenue. |
| **Backend Runtime** | Node.js + Express.js | Mature ecosystem, high performance, clean API routing, seamless GraphQL Yoga mounting. |
| **Database & ORM** | Neon PostgreSQL + Drizzle ORM | Serverless postgres scale, full type safety, explicit control over SQL queries and transactions. |
| **Frontend Framework** | React (Vite / SPA Architecture) | Modular single page application performance, optimal client state management. |
| **Data Fetching** | TanStack Query | Superior API caching, optimistic UI updates, and loading state lifecycle management. |
| **Client State** | Zustand | Lightweight client state for visual builder canvas and store context without boilerplate. |
| **Form Management** | React Hook Form + Zod Schema | Uncompromising type safety and instant validation feedback on forms. |
| **Authentication** | Better Auth | Unified global identity management supporting OAuth, passwords, and phone OTP. |
| **Task Queue** | BullMQ + Upstash Redis | Reliable, serverless-compatible asynchronous background job processing. |
| **Media Hosting** | Cloudinary | Auto-optimization, dynamic transformations, and direct signed upload capability. |

---

## 28. Complete Production Directory Structure & Checklist

### Recommended Repository Directory Structure
```
aura/
├── packages/
│   ├── api/                  # Node.js + Express.js API Server
│   │   ├── src/
│   │   │   ├── config/       # Environment variables & constants
│   │   │   ├── db/           # Drizzle schema definitions & Neon client
│   │   │   │   ├── migrations/
│   │   │   │   └── schema.ts
│   │   │   ├── graphql/      # GraphQL Yoga schemas & resolvers
│   │   │   │   ├── modules/  # Domain-specific resolvers (products, orders)
│   │   │   │   └── context.ts
│   │   │   ├── jobs/         # BullMQ queue workers
│   │   │   ├── middleware/   # Tenant context, auth, RBAC guards
│   │   │   ├── modules/      # Business logic & repository services
│   │   │   │   ├── auth/
│   │   │   │   ├── catalog/
│   │   │   │   ├── ledger/
│   │   │   │   ├── orders/
│   │   │   │   └── payments/
│   │   │   ├── routes/       # Express REST webhooks & health endpoints
│   │   │   └── index.ts      # Server entry point
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── client/               # React Frontend (Dashboard & Storefronts)
│   │   ├── src/
│   │   │   ├── components/   # UI components (shadcn/ui primitives)
│   │   │   ├── builder/      # Storefront builder visual canvas
│   │   │   ├── hooks/        # Custom React hooks & TanStack Query wrappers
│   │   │   ├── store/        # Zustand client state modules
│   │   │   ├── pages/        # React Router view components
│   │   │   └── main.tsx
│   │   ├── package.json
│   │   └── vite.config.ts
│
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

### Production Launch Checklist
- [ ] Neon PostgreSQL instance provisioned and Drizzle migrations executed.
- [ ] Upstash Redis instance linked for BullMQ background workers.
- [ ] Better Auth secret keys, Google OAuth, and SMS gateway credentials set.
- [ ] Cloudinary production signed upload preset configured.
- [ ] Chapa and Telebirr webhook endpoints configured with signature verification.
- [ ] Tenant context isolation middleware verified via automated unit test suite.
- [ ] Cloudflare CNAME and custom domain SSL automated flow verified.
- [ ] Sentry error tracking verified on Express API and React client applications.