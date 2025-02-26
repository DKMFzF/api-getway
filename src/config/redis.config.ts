import Redis from "ioredis";
import { REDIS_LOGS } from "../utils/logs.redis.condition";
import dotenv from "dotenv";

/**
 * конфиг для использования redis
 */

dotenv.config();

export const redis = new Redis({
    host: process.env.REDIS_HOST || "redis",
    port: 6379,
});

export const requestsRateLimmiter = 8;

// Проверяем подключение
redis.on("connect", () => console.log(REDIS_LOGS.REDIS_CONNECT));
redis.on("error", (err) => console.error(REDIS_LOGS.REDIS_CONNECT_ERROR, err));
