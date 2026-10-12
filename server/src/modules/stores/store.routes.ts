import { Router } from "express";

import { authenticate } from "@/middleware/authenticate.js";
import { resolveTenant } from "@/middleware/resolveTenant.js";
import { upload } from "@/middleware/upload.js";
import { StoreController } from "@/modules/stores/store.controller.js";


const router = Router();


router.post(
  "/", 
  authenticate,
  upload.single("logo"),
  StoreController.createStore
);

router.get(
  "/",
  StoreController.getStores
);

router.get(
  "/me",
  authenticate,
  StoreController.getMyStore
);

router.patch(
  "/",
  authenticate,
  StoreController.updateStore
);

router.delete(
  "/:storeId",
  authenticate,
  StoreController.deleteStore
);

router.get(
  "/:slug", 
  StoreController.getStoreBySlug
);


router.get(
  "/:slug/products/:productId",
  resolveTenant,
  StoreController.getStoreProduct
);


export default router;