import { Router } from "express";

import authRoutes from "@/modules/auth/auth.routes.js";
import storeRoutes from "@/modules/stores/store.routes.js";
import orderRoutes from "@/modules/orders/order.routes.js";
import paymentRoutes from "@/modules/payments/payment.routes.js";


const router = Router();


router.use("/auth", authRoutes);
router.use("/stores", storeRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);



export default router;