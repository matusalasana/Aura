import { createClient } from 'redis';
import { REDIS_URL } from './env';
import logger from '../utils/logger';

const redisClient = createClient({
  url: REDIS_URL,
});

redisClient.on('error', (err) => logger.error('Redis Client Error', err));
redisClient.on('connect', () => logger.info('✅ Redis connected'));

export const connectRedis = async () => {
  if (!REDIS_URL) {
    logger.warn('⚠️ REDIS_URL not provided. Redis caching will be skipped.');
    return null;
  }
  try {
    await redisClient.connect();
    return redisClient;
  } catch (err) {
    logger.error('❌ Redis connection failed:', err);
    return null;
  }
};

export { redisClient };
