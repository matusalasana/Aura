import express from "express";
import productsRoutes from "../modules/ecommerce/products/products.routes";

const router = express.Router();

router.use("/products", productsRoutes);

export default router;