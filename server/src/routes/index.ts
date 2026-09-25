import { Router } from "express";

import { resolveTenant } from "@/middleware/resolveTenant.js";
import authRoutes from "@/modules/auth/auth.routes.js";
import storeRoutes from "@/modules/stores/store.routes.js";
import productRoutes from "@/modules/products/product.routes.js";



const router = Router();


router.use("/auth", authRoutes);
router.use("/stores", storeRoutes);

router.use(resolveTenant);
router.use("/products", productRoutes);


export default router;