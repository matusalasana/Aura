import { Router } from "express";

import { authenticate } from "@/middleware/authenticate.js";
import { resolveTenant } from "@/middleware/resolveTenant.js";
import { PaymentController } from "@/modules/payments/payment.controller.js";


const router = Router();


router.post(
  "/plans", 
  authenticate,
  PaymentController.createPlan
);

router.get(
  "/plans",
  PaymentController.getPlans
);




export default router;