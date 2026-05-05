import { redisClient } from '../config/redis';
import logger from './logger';

export const CacheService = {
  async get(key: string): Promise<any | null> {
    try {
      if (!redisClient.isOpen) return null;

      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error(`Cache Get Error [${key}]:`, error);
      return null;
    }
  },

  async set(
    key: string,
    value: any,
    ttlInSeconds: number = 3600
  ): Promise<void> {
    try {
      if (!redisClient.isOpen) return;

      await redisClient.set(key, JSON.stringify(value), {
        EX: ttlInSeconds,
      });
    } catch (error) {
      logger.error(`Cache Set Error [${key}]:`, error);
    }
  },

  async del(key: string): Promise<void> {
    try {
      if (!redisClient.isOpen) return;

      await redisClient.del(key);
    } catch (error) {
      logger.error(`Cache Del Error [${key}]:`, error);
    }
  },

  async delByPattern(pattern: string): Promise<void> {
    try {
      if (!redisClient.isOpen) return;

      const keys = await redisClient.keys(pattern);

      if (keys.length > 0) {
        await redisClient.del(keys);
      }
    } catch (error) {
      logger.error(`Cache DelByPattern Error [${pattern}]:`, error);
    }
  },
};