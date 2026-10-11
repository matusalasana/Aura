### Aura MVP — Complete Backend API Endpoint Plan

Base URL: `https://your-backend-domain/api/v1`

I'll separate required MVP endpoints from features we can postpone. These are the endpoints Aura should support; they are not all confirmed to exist in your code yet.

### 1\. Authentication and customer account

Better Auth should continue handling authentication. Don't recreate signup, signin, sessions, or password management with custom Express controllers.

| Method | Endpoint              | Purpose                        |
| ------ | --------------------- | ------------------------------ |
| POST   | /auth/sign-up/email   | Register a customer            |
| POST   | /auth/sign-in/email   | Sign in                        |
| POST   | /auth/sign-out        | Sign out                       |
| GET    | /auth/me              | Get current authenticated user |
| POST   | /auth/forget-password | Request password reset         |
| POST   | /auth/reset-password  | Reset password                 |
| GET    | /customers/me         | Get customer profile           |
| PATCH  | /customers/me         | Update profile                 |

The exact Better Auth URLs depend on your configuration. Keep your existing working auth integration rather than implementing this table from scratch.

### 2\. Stores

These endpoints support store creation, public storefronts, and store management.

| Method | Endpoint              | Access           | Purpose                               |
| ------ | --------------------- | ---------------- | ------------------------------------- |
| POST   | /stores               | Authenticated    | Create a store                        |
| GET    | /stores/:slug         | Public           | Resolve a store by slug               |
| GET    | /stores/me            | Authenticated    | List stores owned by the current user |
| GET    | /stores/:storeId      | Authorized owner | Get store management details          |
| PATCH  | /stores/:storeId      | Authorized owner | Update store details                  |
| PATCH  | /stores/:storeId/slug | Authorized owner | Change store slug                     |
| DELETE | /stores/:storeId      | Authorized owner | Delete or deactivate a store          |

URL convention:

* Public store: `/shop/nike`

* Store API lookup: `GET /api/v1/stores/nike`

* Store dashboard: `/stores/:storeId` in the frontend

* Store management API: `/api/v1/stores/:storeId`

Use a stable store ID for management and a slug for public URLs. Also, reserve `/stores/me` before the dynamic `/:slug` route so `"me"` isn't accidentally treated as a slug.

For the MVP, store deletion should preferably be a controlled deactivation if the store has existing orders.

### 3\. Products and categories

Every product must belong to a store. A customer visiting one store must not see another store's private or unrelated products.

| Method | Endpoint                             | Access           | Purpose                             |
| ------ | ------------------------------------ | ---------------- | ----------------------------------- |
| GET    | /stores/:storeId/products            | Authorized owner | List store's products               |
| POST   | /stores/:storeId/products            | Authorized owner | Create product                      |
| GET    | /stores/:storeId/products/:productId | Authorized owner | Get product for editing             |
| PATCH  | /stores/:storeId/products/:productId | Authorized owner | Update product                      |
| DELETE | /stores/:storeId/products/:productId | Authorized owner | Delete or archive product           |
| GET    | /public/stores/:slug/products        | Public           | Browse a store's published products |
| GET    | /public/products/:productId          | Public           | Get a published product             |
| GET    | /public/products                     | Public           | Browse marketplace products         |
| GET    | /categories                          | Public           | List categories                     |

Useful optional query parameters for browsing:

```text
GET /public/stores/nike/products?page=1&limit=12
GET /public/products?categoryId=...&search=shoes&page=1
```

Add pagination, search, sorting, and category filtering only where the frontend needs them. Don't build a complicated search engine for the MVP.

Important: The public endpoints above are a proposed naming convention. You can use your existing product routes instead if they already provide the same behavior.

### 4\. Cart and checkout

Aura currently uses a persisted Zustand cart. That means you don't necessarily need backend endpoints to add, update, and remove cart items. Keep the client-side cart for now.

The backend must still validate all products, prices, stock, and store ownership during checkout.

| Method | Endpoint              | Access                 | Purpose                                                       |
| ------ | --------------------- | ---------------------- | ------------------------------------------------------------- |
| POST   | /checkout             | Authenticated customer | Validate cart and create order                                |
| GET    | /checkout/:checkoutId | Authorized customer    | Retrieve checkout state, if using a separate checkout session |

For a lean MVP, you can omit the second endpoint and create the order directly through `POST /checkout`.

Example request:

```json
{
  "items": [
    {
      "productId": "product-uuid",
      "quantity": 2
    }
  ],
  "shippingAddress": {
    "fullName": "Customer Name",
    "phone": "09XXXXXXXX",
    "city": "Addis Ababa",
    "address": "Delivery address"
  },
  "paymentMethod": "cash_on_delivery"
}
```

The backend should calculate the final prices itself. Never trust prices or totals sent by the browser.

### Multi-store checkout decision

For Aura's first release, I recommend one store per order. If the cart contains products from multiple stores, ask the customer to check out separately for each store.

This avoids premature complexity around splitting payments, delivery charges, order fulfillment, and refunds across multiple store owners.

### 5\. Orders

Orders need to be visible to both the customer and the store owner, with authorization enforced on every request.

| Method | Endpoint                                | Access                       | Purpose                   |
| ------ | --------------------------------------- | ---------------------------- | ------------------------- |
| GET    | /orders/me                              | Customer                     | List my orders            |
| GET    | /orders/:orderId                        | Authorized customer or owner | View order details        |
| GET    | /stores/:storeId/orders                 | Authorized owner             | List store orders         |
| PATCH  | /stores/:storeId/orders/:orderId/status | Authorized owner             | Update fulfillment status |
| POST   | /orders/:orderId/cancel                 | Authorized customer          | Cancel an eligible order  |

Suggested order statuses:

* `pending`

* `confirmed`

* `processing`

* `shipped`

* `delivered`

* `cancelled`

Keep payment status separate from fulfillment status. For example, a cash-on-delivery order may be delivered while payment is still awaiting confirmation.

The backend must verify that each order belongs to the relevant customer or store before returning or changing it.

### 6\. Store dashboard and inventory

The product endpoints already cover most of the store dashboard. Avoid creating separate APIs for every dashboard widget.

| Method | Endpoint                   | Purpose            |
| ------ | -------------------------- | ------------------ |
| GET    | /stores/:storeId/dashboard | Dashboard summary  |
| GET    | /stores/:storeId/inventory | Inventory overview |

The dashboard summary can return product counts, pending orders, total orders, and basic sales totals.

Inventory can be handled directly through product updates if Aura does not yet support separate inventory records or product variants. Add a dedicated inventory module only when the existing product schema requires it.

### 7\. Platform administration

Keep the first admin API small. The platform needs to review users, stores, and products, and to deactivate abusive or invalid content.

| Method | Endpoint                          | Purpose                     |
| ------ | --------------------------------- | --------------------------- |
| GET    | /admin/dashboard                  | Platform overview           |
| GET    | /admin/stores                     | Review all stores           |
| PATCH  | /admin/stores/:storeId/status     | Activate or suspend a store |
| GET    | /admin/products                   | Review products             |
| PATCH  | /admin/products/:productId/status | Hide or restore a product   |
| GET    | /admin/users                      | Basic user management       |

These routes must use a real admin authorization check. A frontend route or a user-provided role value is not sufficient protection.

### 8\. Uploads and platform configuration

| Method | Endpoint       | Purpose                              |
| ------ | -------------- | ------------------------------------ |
| POST   | /uploads       | Upload a product image or store logo |
| GET    | /config/public | Public platform configuration        |