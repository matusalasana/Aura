Bro, let's define Aura's complete MVP frontend routes and pages so every page maps cleanly to your backend API. We'll keep your existing React Router setup, layouts, TanStack Query, and feature-based structure. No unnecessary pages.

### 1\. Aura frontend route map

Your frontend has four main areas: public marketplace, customer account, public store, and store dashboard. Admin is a smaller fifth area.

Public marketplace

Available without signing in

`/` · Home / marketplace

`/products` · Browse products

`/products/:productId` · Product details

`/categories/:categorySlug` · Category products

`/shop/:slug` · Store homepage

`/shop/:slug/products/:productId` · Product in a store

`/sign-in` · Sign in

`/sign-up` · Create account

`/about` · About

`/contact` · Contact

`/pricing` · Pricing

`/services` · Services

Customer account

Requires customer authentication

`/cart` · Shopping cart

`/checkout` · Checkout

`/orders` · Order history

`/orders/:orderId` · Order details

`/account` · Account settings

Store management

Requires authorized store membership

`/stores` · My stores

`/stores/new` · Create a store

`/stores/:storeId` · Store dashboard

`/stores/:storeId/products` · Manage products

`/stores/:storeId/products/new` · Create product

`/stores/:storeId/products/:productId/edit` · Edit product

`/stores/:storeId/orders` · Store orders

`/stores/:storeId/orders/:orderId` · Order details

`/stores/:storeId/settings` · Store settings

Platform administration

Requires administrator authorization

`/admin` · Overview

`/admin/stores` · Manage stores

`/admin/products` · Moderate products

`/admin/users` · Manage users

This is the target route map, not a claim that all these pages already exist.

### 2\. What each page should do

| Page            | Main responsibility                                 |
| --------------- | --------------------------------------------------- |
| Home            | Marketplace discovery, featured products and stores |
| Products        | Search, category filtering, sorting and pagination  |
| Product details | Images, price, stock, quantity and add-to-cart      |
| Store homepage  | Store branding and products filtered by store       |
| Cart            | Review items, quantities and subtotal               |
| Checkout        | Shipping details, payment method and order creation |
| Customer orders | Order history and order status                      |
| My stores       | List stores the signed-in user can manage           |
| Store dashboard | Sales summary, pending orders and product count     |
| Manage products | Create, edit, archive and manage stock              |
| Store orders    | View orders and update fulfillment status           |
| Store settings  | Edit store name, slug, logo and description         |
| Admin           | Basic moderation and platform oversight             |

### 3\. Important changes to your current router

You currently use `/stores/:slug` for the store dashboard. I recommend changing that to `/stores/:storeId` because the dashboard is an authenticated management area, while `/shop/:slug` is the public storefront.

Also, your current route:

```tsx
{
  path: ":slug",
  element: <StoreDashboard />,
}
```

would conflict with a future `/stores/new` route if the dynamic route matches first. Declare specific routes such as `new` before dynamic routes, and use explicit nested paths for each store-management page.

For public storefront navigation, use the store slug consistently:

```text
/shop/nike
/shop/nike/products/product-uuid
```

This makes store context clear when a customer browses products.

### 4\. Recommended frontend structure

Keep the feature-based architecture you already use. Extend it rather than reorganizing the whole project.

```text
src/
├── layouts/
│   ├── AppLayout.tsx
│   ├── StoreLayout.tsx
│   └── AdminLayout.tsx
├── pages/
│   ├── ErrorPage.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
├── features/
│   ├── auth/
│   ├── products/
│   ├── stores/
│   │   ├── pages/
│   │   │   ├── PublicStorePage.tsx
│   │   │   ├── MyStoresPage.tsx
│   │   │   ├── CreateStorePage.tsx
│   │   │   ├── StoreDashboardPage.tsx
│   │   │   └── StoreSettingsPage.tsx
│   │   └── hooks/
│   ├── cart/
│   ├── checkout/
│   ├── orders/
│   └── customer/
├── dashboard/
│   ├── customer/
│   └── store/
└── router.tsx
```

Treat this as a target structure; existing pages such as `StoreDashboard` and `StoreProductsPage` can remain where they are until there's a real reason to move them.

### 5\. Build order — keep it lean

### MVP implementation checklist

0 of 6

Finish public storefront

Store branding and products filtered by slug

Complete product browsing

Search, categories, details and add-to-cart

Complete cart and checkout

Validate items and create an order

Complete customer orders

History, details and cancellation rules

Complete store management

My stores, products, orders and settings

Finish admin essentials

Store and product moderation

Copy checklist

My recommendation: finish the public storefront first, since we're already working on `/shop/:slug`. Then connect its product listing and product details. Don't build all the page shells before the main shopping flow works.