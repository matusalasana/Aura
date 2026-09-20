import { Router } from "express";

import { resolveTenant } from "@/middleware/resolveTenant.js";
import authRoutes from "@/modules/auth/auth.routes.js";
import storeRoutes from "@/modules/stores/store.routes.js";



const router = Router();


router.use("/auth", authRoutes);

router.use(resolveTenant);
router.use("/stores", storeRoutes);


export default router;