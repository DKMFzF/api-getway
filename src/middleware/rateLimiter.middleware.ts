import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";
import { REDIS_LOGS } from "../utils/logs.redis.condition";
import { config } from "../config/index.config";

/**
 * модуль ограничения запросов в минуту на один ip
 */

const redis = new Redis({
  host: process.env.REDIS_HOST || "redis",
  port: Number(process.env.REDIS_PORT) || 6379,
  retryStrategy: (times) => Math.min(times * 50, 2000),
});

const REQUESTS_LIMIT = Number(process.env.REQUESTS_LIMIT) || 8;
const WINDOW_SIZE = Number(process.env.WINDOW_SIZE) || 60; // в секундах

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ip = req.ip || "unknown";
    const key = `rate:${ip}`;
    
    const requests = await redis.incr(key);
    if (requests === 1) {
      await redis.expire(key, WINDOW_SIZE);
    }

    if (requests > REQUESTS_LIMIT) {
      return res.status(429).json({ error: REDIS_LOGS.REDIS_MANY_REQUESTS });
    }

    next();
  } catch (error) {
    console.error("[REDIS ERROR] Rate limiter failure:", error);
    res.status(500).json({ error: "Rate limiting service unavailable" });
  }
};
