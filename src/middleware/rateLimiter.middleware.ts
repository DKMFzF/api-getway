import { Request, Response, NextFunction } from "express";
import { redis } from "../config/redis.config";

/**
 * модуль ограничения запросов в минуту на один ip
 */

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || "unknown";
  const requests = await redis.incr(ip); // Получаем количество запросов от IP за 1 минуту

  // Если первый запрос — устанавливаем TTL (время жизни) ключа в Redis
  if (requests === 1) await redis.expire(ip, 60);
  if (requests > 10) return res.status(429).json({ error: "Too many requests, please try again later." });

  next();
};
