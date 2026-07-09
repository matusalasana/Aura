import { Router } from "express";
import { VendorsController } from "./vendors.controller";

import { authenticate } from "../../middlewares/authenticate";
import { authorize } from "../../middlewares/authorize";
import { upload } from "../../middlewares/upload";

const router = Router();

// PUBLIC

// Get all approved vendors
router.get("/", VendorsController.getAllVendors);

// Get vendor by slug
router.get("/:slug", VendorsController.getVendorBySlug);

// AUTHENTICATED

// Create vendor
router.post(
  "/",
  authenticate,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "license", maxCount: 1 },
  ]),
  VendorsController.createVendor
);

// Get my vendor profile
router.get(
  "/me",
  authenticate,
  VendorsController.getMyVendor
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
  VendorsController.updateMyVendor
);

// ADMIN
router.patch(
  "/:id/approve",
  authenticate,
  authorize("admin"),
  VendorsController.approveVendor
);

router.patch(
  "/:id/reject",
  authenticate,
  authorize("admin"),
  VendorsController.rejectVendor
);

router.patch(
  "/:id/suspend",
  authenticate,
  authorize("admin"),
  VendorsController.suspendVendor
);

router.patch(
  "/:id/unsuspend",
  authenticate,
  authorize("admin"),
  VendorsController.unsuspendVendor
);

export default router;