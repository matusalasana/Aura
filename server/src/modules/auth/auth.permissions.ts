
export const permissions = {
  
  // Products
  "products.read": "products.read",
  "products.create": "products.create",
  "products.update": "products.update",
  "products.delete": "products.delete",

  // Orders
  "orders.read": "orders.read",
  "orders.update": "orders.update",
  "orders.cancel": "orders.cancel",
  "orders.refund": "orders.refund",

  // Store
  "store.read": "store.read",
  "store.update": "store.update",
  "store.settings": "store.settings",

  // Members
  "members.read": "members.read",
  "members.invite": "members.invite",
  "members.update": "members.update",
  "members.remove": "members.remove",

  // Domains
  "domains.read": "domains.read",
  "domains.create": "domains.create",
  "domains.update": "domains.update",
  "domains.delete": "domains.delete",
  
} as const;

export type Permission = (typeof permissions)[keyof typeof permissions];