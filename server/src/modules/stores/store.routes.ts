import { Router } from "express";

import { authenticate } from "@/middleware/authenticate.js";
import { resolveTenant } from "@/middleware/resolveTenant.js";
import { hasRolePermission } from "@/middleware/authorization.js";
import { PERMISSIONS } from "@/modules/auth/auth.permissions.js";
import { upload } from "@/middleware/upload.js";
import { StoreController } from "@/modules/stores/store.controller.js";
import productRoutes from "@/modules/products/product.routes.js";


const router = Router();

router.get(
  "/",
  StoreController.getStores
);

router.post(
  "/", 
  authenticate,
  hasRolePermission("vendor", PERMISSIONS.STORE_CREATE),
  upload.single("logo"),
  StoreController.createStore
);

router.get(
  "/me",
  authenticate,
  hasRolePermission("vendor", PERMISSIONS.STORE_READ),
  StoreController.getMyStore
);

router.patch(
  "/:slug",
  authenticate,
  hasRolePermission("vendor", PERMISSIONS.STORE_UPDATE),
  resolveTenant,
  StoreController.updateStore
);

router.get(
  "/:slug", 
  StoreController.getStoreBySlug
);

router.delete(
  "/:slug/suspend",
  authenticate,
  resolveTenant,
  hasRolePermission("admin", PERMISSIONS.STORE_SUSPEND),
  StoreController.deleteStore
);

router.use("/:slug/products", productRoutes)


export default router;