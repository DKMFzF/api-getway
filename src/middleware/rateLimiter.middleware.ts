import { Request, Response, NextFunction } from "express";
import { redis, requestsRateLimmiter } from "../config/redis.config";
import { REDIS_LOGS } from "../utils/logs.redis.condition";

/**
 * модуль ограничения запросов в минуту на один ip
 */

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || "unknown";
  const requests = await redis.incr(ip); // Получаем количество запросов от IP за 1 минуту

  // Если первый запрос — устанавливаем TTL (время жизни) ключа в Redis
  if (requests === requestsRateLimmiter) await redis.expire(ip, 60);
  if (requests > 8) return res.status(429).json({ error: REDIS_LOGS.REDIS_MANY_REQUESTS });

  next();
};
