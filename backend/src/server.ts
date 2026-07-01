import { app } from './app';
import { Env } from './config/env';
import { connectDB } from './db';
import { connectRedis } from './config/redis';
import logger from './utils/logger';

const startServer = async () => {
  try {
    // 1. Connect to Database (Neon)
    await connectDB();

    // 2. Connect to Redis (Caching)
    connectRedis();

    // 3. Start Express Server
    app.listen(Number(Env.PORT), '0.0.0.0', () => {
      logger.info(`🔥 AURA Server running`);
      logger.info(`🌐 Address: http://localhost:${Env.PORT}`);
      logger.info(`⚙️ Environment: ${Env.NODE_ENV}`);
      logger.info(`💻 Developer: https://sana-matusala-portfolio.vercel.app`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
