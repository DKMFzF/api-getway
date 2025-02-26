
import dotenv from 'dotenv';

dotenv.config();

/**
 * файл конфигурации микросервиса
 * определяем url микросервисов для шлюза 
 */

export const config = {
    PORT: process.env.PORT || 5000,
    AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || 'http://auth-service:3000',
    USER_SERVICE_URL: process.env.USER_SERVICE_URL || 'http://user-service:4000',
};
