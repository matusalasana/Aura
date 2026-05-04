import { redis } from "./redis";


export const cacheService = {
  
  // Get cached value
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      if (!data) return null;

      return JSON.parse(data) as T;
    } catch (error) {
      console.error("Cache GET error:", error);
      return null;
    }
  },

  // Set cache with TTL (default 1 hour)
  async set(key: string, value: any, ttlSeconds = 3600): Promise<void> {
    try {
      await redis.set(key, JSON.stringify(value), {
        EX: ttlSeconds,
      });
    } catch (error) {
      console.error("Cache SET error:", error);
    }
  },

  // Delete one key
  async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      console.error("Cache DEL error:", error);
    }
  },

  // Delete by pattern (careful in production)
  async clearPattern(pattern: string): Promise<void> {
    try {
      const keys = await redis.keys(pattern);

      if (keys.length > 0) {
        await redis.del(keys);
      }
    } catch (error) {
      console.error("Cache CLEAR error:", error);
    }
  }
};