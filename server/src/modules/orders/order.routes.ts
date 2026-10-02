import { Router } from "express";

import { OrderController } from "@/modules/orders/order.controller.js";
import {
  createOrderSchema,
} from "@/modules/orders/order.validations.js";
import { validate } from "@/middleware/validation.js";
import { authenticate } from "@/middleware/authenticate.js";


const router = Router();


router.post(
  "/", 
  authenticate,
  OrderController.createOrder
);

router.get(
  "/", 
  authenticate,
  OrderController.getOrders
);



export default router