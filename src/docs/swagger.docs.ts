// @ts-ignore
import swaggerJsDoc from "swagger-jsdoc";
// @ts-ignore
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { SWAGGER_DOCS } from "../utils/logs.swagger.condition";
import { DOCS_URL } from "../config/swagger.config";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Gateway",
            version: "1.0.0",
            description: "Документация API Gateway"
        },
        servers: [
            {
                url: "http://localhost:5000",
                description: "Local server"
            }
        ],
        paths: {
            "/auth/login": {
                post: {
                    summary: "Аутентификация пользователя",
                    description: "Отправляет учетные данные и получает JWT токен",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: { type: "string", example: "user@example.com" },
                                        password: { type: "string", example: "password123" }
                                    },
                                    required: ["email", "password"]
                                }
                            }
                        }
                    },
                    responses: {
                        "200": { description: "Успешный вход в систему" },
                        "401": { description: "Неверные учетные данные" }
                    }
                }
            },
            "/auth/protected": {
                get: {
                    summary: "Получение защищенных данных",
                    description: "Проверяет токен пользователя и возвращает защищенные данные",
                    security: [{ BearerAuth: [] }],
                    responses: {
                        "200": { description: "Доступ разрешен" },
                        "401": { description: "Нет токена или он недействителен" }
                    }
                }
            },
            "/user/register": {
                post: {
                    summary: "Регистрация нового пользователя",
                    description: "Создает нового пользователя в системе",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: { type: "string", example: "newuser" },
                                        email: { type: "string", example: "newuser@example.com" },
                                        password: { type: "string", example: "securepassword" }
                                    },
                                    required: ["username", "email", "password"]
                                }
                            }
                        }
                    },
                    responses: {
                        "201": { description: "Пользователь зарегистрирован" },
                        "400": { description: "Ошибка запроса" }
                    }
                }
            }
        }
    },
    apis: ["./routes/*.ts"] // Указываем путь к роутам
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default (app: Express) => {
    app.use(DOCS_URL, swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    console.log(SWAGGER_DOCS.SWAGGER_DOCS_ENABLE);
};
