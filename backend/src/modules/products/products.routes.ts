import { Router } from "express";
import { ProductsController } from "./products.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { authorize } from "../../middleware/auth.middleware";
import { upload } from "../../middleware/upload.middleware";


const router = Router();


// PUBLIC

// Get all published products
router.get(
  "/",
  ProductsController.getAllProducts
);

// Get product by id
router.get(
  "/:id",
  ProductsController.getProductById
);



// VENDOR

// Create product
router.post(
  "/",
  authenticate,
  authorize("vendor"),
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  ProductsController.createProduct
);

// Get my products
router.get(
  "/me",
  authenticate,
  authorize("vendor"),
  ProductsController.getMyProducts
);

// Update product
router.patch(
  "/:id",
  authenticate,
  authorize("vendor"),
  ProductsController.updateProduct
);

// Delete product
router.delete(
  "/:id",
  authenticate,
  authorize("vendor"),
  ProductsController.deleteProduct
);

// Upload thumbnail
router.post(
  "/:id/thumbnail",
  authenticate,
  authorize("vendor"),
  upload.single("thumbnail"),
  ProductsController.uploadThumbnail
);

// Upload product images
router.post(
  "/:id/images",
  authenticate,
  authorize("vendor"),
  upload.array(
    "images",
    5
  ),
  ProductsController.uploadImages
);



// Delete product image
router.delete(
  "/:id/images/:imageId",
  authenticate,
  authorize("vendor"),
  ProductsController.deleteImage
);

// Publish product
router.patch(
  "/:id/publish",
  authenticate,
  authorize("vendor"),
  ProductsController.publishProduct
);

// Unpublish product
router.patch(
  "/:id/unpublish",
  authenticate,
  authorize("vendor"),
  ProductsController.unpublishProduct
);



export default router;