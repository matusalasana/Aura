import { Router } from "express";

import { authenticate } from "@/middleware/authenticate.js";
import { StoreController } from "@/modules/stores/store.controller.js";


const router = Router();


router.post(
  "/", 
  authenticate,
  StoreController.createStore
);

router.get(
  "/me",
  authenticate,
  StoreController.getMyStore
);

router.get(
  "/:slug", 
  StoreController.getStoreBySlug
);



export default router;