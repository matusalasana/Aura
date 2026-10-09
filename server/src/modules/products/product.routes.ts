import { Router } from "express";

import { ProductController } from "@/modules/products/product.controller.js";
import variantsRoutes from "@/modules/variants/variant.routes.js";
import { validate } from "@/middleware/validation.js";
import { upload } from "@/middleware/upload.js"


const router = Router();



router.use("/:productId/variants", variantsRoutes)

router.post(
  "/", 
  upload.array("images", 10),
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
  ProductController.updateProduct
);

router.delete(
  "/:productId",
  ProductController.deleteProduct
);


export default router