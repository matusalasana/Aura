import { createClient } from 'redis';
import { Env } from './env.js';
import logger from '../utils/logger';


export const redisClient = createClient({
  url: Env.REDIS_URL,
});

let redisErrorLogged = false;
let redisReconnectCooldown = false;

redisClient.on('ready', () => {
  logger.info('✅ Redis connected');
});

redisClient.on('error', (err) => {
  if (redisReconnectCooldown) return;

  logger.warn(`⚠️ Redis Error: ${err.message}`);

  redisErrorLogged = true;
  redisReconnectCooldown = true;

  // reset after cooldown
  setTimeout(() => {
    redisReconnectCooldown = false;
  }, 30000); // 30 seconds
});

export const connectRedis = async () => {
  if (!Env.REDIS_URL) {
    logger.warn(
      '⚠️ REDIS_URL missing. Running without Redis.'
    );

    return;
  }

  try {
    await redisClient.connect();
  } catch (err) {
    logger.warn(
      '⚠️ Failed to connect Redis. Falling back to database.'
    );
  }
};