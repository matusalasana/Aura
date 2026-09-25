import { Router } from "express";

import { VariantController } from "@/modules/variants/variant.controller.js";
import {
  createVariantSchema,
  updateVariantSchema,
} from "@/modules/variants/variant.validations.js";
import { validate } from "@/middleware/validation.js";

const router = Router({
  mergeParams: true,
});

router.post(
  "/",
  validate(createVariantSchema),
  VariantController.createVariant,
);

router.get(
  "/",
  VariantController.getVariants,
);

router.get(
  "/:variantId",
  VariantController.getVariant,
);

router.patch(
  "/:variantId",
  validate(updateVariantSchema),
  VariantController.updateVariant,
);

router.delete(
  "/:variantId",
  VariantController.deleteVariant,
);

export default router;