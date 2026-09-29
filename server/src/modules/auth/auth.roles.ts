import type { Permission } from "./auth.permissions.js";

export const rolePermissions: Record<string, Permission[]> = {
  owner: [
    "products.read",
    "products.create",
    "products.update",
    "products.delete",

    "orders.read",
    "orders.update",
    "orders.cancel",
    "orders.refund",

    "store.read",
    "store.update",
    "store.settings",

    "members.read",
    "members.invite",
    "members.update",
    "members.remove",

    "domains.read",
    "domains.create",
    "domains.update",
    "domains.delete",
  ],

  manager: [
    "products.read",
    "products.create",
    "products.update",
    "products.delete",

    "orders.read",
    "orders.update",
    "orders.cancel",

    "store.read",

    "members.read",
    "members.invite",
    "members.update",

    "domains.read",
  ],

  staff: [
    "products.read",
    "products.update",

    "orders.read",
    "orders.update",

    "store.read",
  ],
};