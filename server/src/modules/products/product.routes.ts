import { Router } from "express";

import { ProductController } from "@/modules/products/product.controller.js";
import variantsRoutes from "@/modules/variants/variant.routes.js";
import {
  createProductSchema,
  updateProductSchema,
} from "@/modules/products/product.validations.js";
import { validate } from "@/middleware/validation.js";


const router = Router();



router.use("/:productId/variants", variantsRoutes)

router.post(
  "/", 
  validate(createProductSchema),
  ProductController.createProduct
);

router.get(
  "/", 
  ProductController.getProducts
);

router.get(
  "/:productId", 
  ProductController.getProduct
);

router.patch(
  "/:productId", 
  validate(updateProductSchema), 
  ProductController.updateProduct
);

router.delete(
  "/:productId",
  ProductController.deleteProduct
);


export default router