import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { rateLimit } from 'express-rate-limit';
import { loggerMiddleware } from './middleware/logger.middleware';

// Routes
import authRoutes from './modules/auth/auth.routes';
import productRoutes from './modules/products/products.routes';
import categoryRoutes from './modules/categories/categories.routes';
import cartRoutes from './modules/cart/cart.routes';
import orderRoutes from './modules/orders/orders.routes';
import adminUserRoutes from './modules/users/users.routes';
import analyticsRoutes from './modules/analytics/analytics.routes';
import reviewRoutes from './modules/reviews/reviews.routes';
import wishlistRoutes from './modules/wishlist/wishlist.routes';
import paymentRoutes from './modules/payments/payments.routes';
import notificationRoutes from './modules/notifications/notifications.routes';

const app: Application = express();

// Security & Base Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
}));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
    exposedHeaders: ['set-cookie'], 
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());
app.use(loggerMiddleware);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100, 
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use('/api/', limiter);

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/admin/users', adminUserRoutes);
app.use('/api/v1/admin/analytics', analyticsRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/wishlist', wishlistRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/notifications', notificationRoutes);

// Health Check
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export { app };
