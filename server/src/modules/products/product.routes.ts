import { Router } from "express";

import { ProductController } from "@/modules/products/product.controller.js";
import variantsRoutes from "@/modules/variants/variant.routes.js";
import { validate } from "@/middleware/validation.js";
import { upload } from "@/middleware/upload.js";
import { PERMISSIONS } from "@/modules/auth/auth.permissions.js";
import { authenticate } from "@/middleware/authenticate.js"
import { hasRolePermission } from "@/middleware/authorization.js"
import { resolveTenant } from "@/middleware/resolveTenant.js"


const router = Router({
  mergeParams: true
});


router.get(
  "/",
  resolveTenant,
  ProductController.getProducts
);

router.get(
  "/:productId", 
  resolveTenant,
  ProductController.getProduct
);

router.post(
  "/",
  authenticate,
  resolveTenant,
  hasRolePermission("vendor", PERMISSIONS.PRODUCT_CREATE),
  upload.array("images", 10),
  ProductController.createProduct
);

router.use(
  "/:productId/variants",
  resolveTenant,
  variantsRoutes
);

router.patch(
  "/:productId",
  authenticate,
  resolveTenant,
  ProductController.updateProduct
);

router.delete(
  "/:productId",
  authenticate,
  resolveTenant,
  ProductController.deleteProduct
);


export default router