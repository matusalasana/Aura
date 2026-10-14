
export const PERMISSIONS = {
  // Products
  PRODUCT_READ: "products:read",
  PRODUCT_CREATE: "products:create",
  PRODUCT_UPDATE: "products:update",
  PRODUCT_DELETE: "products:delete",

  // Orders
  ORDER_READ: "orders:read",
  ORDER_UPDATE: "orders:update",
  ORDER_CANCEL: "orders:cancel",
  ORDER_REFUND: "orders:refund",

  // Store
  STORE_CREATE: "store:create",
  STORE_READ: "store:read",
  STORE_UPDATE: "store:update",
  STORE_SUSPEND: "store:suspend",
  STORE_SETTINGS: "store:settings",
  
} as const;

export type Permission = keyof typeof PERMISSIONS;