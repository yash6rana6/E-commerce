import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config({ path: "./backend/.env" });

export const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log("✅ Connected to Redis Cloud (Non-SSL)");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err);
});

