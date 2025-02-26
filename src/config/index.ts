import dotenv from "dotenv";

dotenv.config();

/**
 * конфиг сервиса
 */

export const config = {
    PORT: process.env.PORT || 5000,
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://auth-service:3000",
    AUTH_SERVICE_URL_LOGIN: process.env.AUTH_SERVICE_URL_LOGIN || "/login",
    AUTH_SERVICE_URL_PROTECTED: process.env.AUTH_SERVICE_URL_PROTECTED || "/protected",
    USER_SERVICE_URL: process.env.USER_SERVICE_URL || "http://user-service:4000",
    USER_SERVICE_URL_REGISTER: process.env.USER_SERVICE_URL_REGISTER || "/register",
};
