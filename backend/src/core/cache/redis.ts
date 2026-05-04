import { createClient } from "redis";

const redis = createClient();

export const connectRedis = async () => {
  try {
    await redis.connect();
    console.log("✅ Redis connected");
  } catch (error) {
    console.log("❌ Error connecting to Redis:", error);
  }
};

export default redis;