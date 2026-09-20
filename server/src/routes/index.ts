import { Router } from "express";

import authRoutes from "@/modules/auth/auth.routes.js";
import storeRoutes from "@/modules/stores/store.routes.js";



const router = Router();


router.use("/auth", authRoutes);
router.use("/stores", storeRoutes);


export default router;