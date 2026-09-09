import { Redis } from "@upstash/redis";
import { Env } from "@/config/env.js";
import logger from "@/utils/logger.js";

export const redis = new Redis({
  url: Env.UPSTASH_REDIS_REST_URL,
  token: Env.UPSTASH_REDIS_REST_TOKEN,
});

export const testRedis = async() => {
  try {
    await redis.set("test:key", "Working!");

    const value = await redis.get("test:key");

    logger.info(`Redis: ${value}`);

    return value;
  } catch (error) {
    logger.error("Redis connection failed:", error);
  }
}