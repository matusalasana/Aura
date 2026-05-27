import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes";
import productRoutes from "../modules/products/products.routes";
import categoryRoutes from "../modules/categories/categories.routes";
import cartRoutes from "../modules/cart/cart.routes";
import orderRoutes from "../modules/orders/orders.routes";
import adminUserRoutes from "../modules/users/users.routes";
import analyticsRoutes from "../modules/analytics/analytics.routes";
import reviewRoutes from "../modules/reviews/reviews.routes";
import wishlistRoutes from "../modules/wishlist/wishlist.routes";
import paymentRoutes from "../modules/payments/payments.routes";
import notificationRoutes from "../modules/notifications/notifications.routes";
import uploadRoutes from "../modules/uploads/uploads.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/admin/users", adminUserRoutes);
router.use("/admin/analytics", analyticsRoutes);
router.use("/reviews", reviewRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/payments", paymentRoutes);
router.use("/notifications", notificationRoutes);
router.use("/uploads", uploadRoutes);

export default router;