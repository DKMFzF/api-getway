import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

/**
 * Валидация переменных окружения
 */
const configSchema = z.object({
  PORT: z.string().default("5000"),
  AUTH_SERVICE_URL: z.string().url(),
  AUTH_SERVICE_ROUTE: z.string().default("/auth"),
  AUTH_SERVICE_URL_LOGIN: z.string().default("/login"),
  AUTH_SERVICE_URL_PROTECTED: z.string().default("/protected"),
  USER_SERVICE_URL: z.string().url(),
  USER_SERVICE_ROUTE: z.string().default("/user"),
  USER_SERVICE_URL_REGISTER: z.string().default("/register"),
});

const envConfig = configSchema.safeParse(process.env);

if (!envConfig.success) {
  console.error("[CONFIG ERROR] Invalid environment variables:", envConfig.error.format());
  process.exit(1);
}

export const config = envConfig.data;
