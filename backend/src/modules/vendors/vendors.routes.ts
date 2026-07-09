import { Router } from "express";
import { VendorController } from "./vendors.controller";

import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { upload } from "../../middlewares/upload";

const router = Router();

/* -------------------------------- PUBLIC -------------------------------- */

// Get all approved vendors
router.get("/", VendorController.getAllVendors);

// Get vendor by slug
router.get("/:slug", VendorController.getVendorBySlug);

/* ----------------------------- AUTHENTICATED ----------------------------- */

// Create vendor
router.post(
  "/",
  authenticate,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  VendorController.createVendor
);

// Get my vendor profile
router.get(
  "/me",
  authenticate,
  VendorController.getMyVendor
);

// Update my vendor profile
router.patch(
  "/me",
  authenticate,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  VendorController.updateMyVendor
);

/* -------------------------------- ADMIN --------------------------------- */

router.patch(
  "/:id/approve",
  authenticate,
  authorize("admin"),
  VendorController.approveVendor
);

router.patch(
  "/:id/reject",
  authenticate,
  authorize("admin"),
  VendorController.rejectVendor
);

router.patch(
  "/:id/suspend",
  authenticate,
  authorize("admin"),
  VendorController.suspendVendor
);

router.patch(
  "/:id/unsuspend",
  authenticate,
  authorize("admin"),
  VendorController.unsuspendVendor
);

export default router;