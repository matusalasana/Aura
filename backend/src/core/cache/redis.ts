import { createClient } from "redis";
import { REDIS_CLOUD_URL, REDIS_LOCAL_HOST, NODE_ENV } from "../config/env";

const redisUrl =
  NODE_ENV === "development" ? REDIS_LOCAL_HOST : REDIS_CLOUD_URL;

export const redis = createClient({
  url: redisUrl,
});

// connect once
export const connectRedis = async () => {
  try {
    await redis.connect();
    console.log("✅ Redis connected");
  } catch (error) {
    console.log("❌ Redis error:", error);
  }
};