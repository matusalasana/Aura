import { redisClient } from '../config/redis';
import logger from './logger';

const isRedisReady = () => redisClient?.isReady;

const get = async (key) => {
  try {
    if (!isRedisReady()) return null;

    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.error(`Cache Get Error [${key}]:`, error);
    return null;
  }
};

const set = async (key, value, ttlInSeconds = 3600) => {
  try {
    if (!isRedisReady()) return;

    const options = {};
    if (ttlInSeconds) {  // Only add EX if TTL is 
      options.EX = ttlInSeconds;
    }
    
    await redisClient.set(key, JSON.stringify(value), options);
  } catch (error) {
    logger.error(`Cache Set Error [${key}]:`, error);
  }
};

const del = async (key) => {
  try {
    if (!isRedisReady()) return;

    await redisClient.del(key);
  } catch (error) {
    logger.error(`Cache Del Error [${key}]:`, error);
  }
};

const delByPattern = async (pattern) => {
  try {
    if (!isRedisReady()) return;

    const keys = await redisClient.keys(pattern);

    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
  } catch (error) {
    logger.error(`Cache DelByPattern Error [${pattern}]:`, error);
  }
};

export const CacheService = {
  get,
  set,
  del,
  delByPattern
};