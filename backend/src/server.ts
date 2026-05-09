import { app } from './app';
import { PORT, NODE_ENV } from './config/env';
import { connectDB } from './config/db';
import { connectRedis } from './config/redis';
import logger from './utils/logger';

const startServer = async () => {
  try {
    // 1. Connect to Database (Neon)
    await connectDB();

    // 2. Connect to Redis (Caching)
    await connectRedis();

    // 3. Start Express Server
    app.listen(Number(PORT), '0.0.0.0', () => {
      logger.info(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
