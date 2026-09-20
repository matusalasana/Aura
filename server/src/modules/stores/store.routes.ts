import { Router } from "express";

import { authenticate } from "@/middleware/authenticate.js";
import { StoreController } from "@/modules/stores/store.controller.js";


const router = Router();


router.post(
  "/", 
  authenticate,
  StoreController.signupStore
);




export default router;