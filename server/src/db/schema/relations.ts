import { relations } from "drizzle-orm";

import {
  user,
  session,
  account,

  stores,
  storeDomains,

  products,
  productVariants,
  productImages,

  orders,
  orderItems,
  shippingInformation,
} from "@/db/schema/index.js";

/* -------------------- USER -------------------- */

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  stores: many(stores),
}));

/* -------------------- SESSION -------------------- */

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

/* -------------------- ACCOUNT -------------------- */

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

/* -------------------- STORE -------------------- */

export const storesRelations = relations(stores, ({ one, many }) => ({
  owner: one(user, {
    fields: [stores.ownerId],
    references: [user.id],
  }),
  domain: one(storeDomains, {
    fields: [stores.id],
    references: [storeDomains.storeId]
  }),
  
  products: many(products),
  orders: many(orders),
}));

/* -------------------- STORE DOMAIN -------------------- */

export const storeDomainsRelations = relations(storeDomains, ({ one }) => ({
    store: one(stores, {
      fields: [storeDomains.storeId],
      references: [stores.id],
    }),
  }),
);

/* -------------------- PRODUCT -------------------- */

export const productsRelations = relations(products, ({ one, many }) => ({
    store: one(stores, {
      fields: [products.storeId],
      references: [stores.id],
    }),

    variants: many(productVariants),
    images: many(productImages),
    orderItems: many(orderItems),
  }),
);

/* -------------------- PRODUCT VARIANT -------------------- */

export const productVariantsRelations = relations(productVariants, ({ one, many }) => ({
    product: one(products, {
      fields: [productVariants.productId],
      references: [products.id],
    }),

    orderItems: many(orderItems),
  }),
);

/* ---------------- PRODUCT IMAGES----------------- */

export const productImagesRelations = relations(productImages, ({ one }) => ({
    product: one(products, {
      fields: [productImages.productId],
      references: [products.id],
    }),
  }),
);

/* -------------------- ORDER -------------------- */

export const ordersRelations = relations(orders, ({ one, many }) => ({
    store: one(stores, {
      fields: [orders.storeId],
      references: [stores.id],
    }),

    customer: one(user, {
      fields: [orders.customerId],
      references: [user.id],
    }),

    orderItems: many(orderItems),

    shippingInformation: many(shippingInformation),
  }),
);

/* -------------------- ORDER ITEM -------------------- */

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
      fields: [orderItems.orderId],
      references: [orders.id],
    }),

    product: one(products, {
      fields: [orderItems.productId],
      references: [products.id],
    }),

    variant: one(productVariants, {
      fields: [orderItems.variantId],
      references: [productVariants.id],
    }),
  }),
);