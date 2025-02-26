import { Router, Request, Response } from "express";
import axios from "axios";
import { config } from "../config";
import LOGS from "../utils/logs.condition";

/**
 * роутинг для к сервису аунтификации по jwt
 */

const router = Router();
const AUTH_SERVICE_URL = config.AUTH_SERVICE_URL;
const AUTH_SERVICE_URL_LOGIN = config.AUTH_SERVICE_URL_LOGIN
const AUTH_SERVICE_URL_PROTECTED = config.AUTH_SERVICE_URL_PROTECTED

// запрос на jwt токен пользователя
router.post(AUTH_SERVICE_URL_LOGIN, async (req: Request, res: Response) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}${AUTH_SERVICE_URL_LOGIN}`, req.body);
        res.json(response.data);
    } catch (error: any) {
        console.error(LOGS.ERROR_AUTH_SERVICE, error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
});

// запрос на jwt токен пользователя (для админки)
router.get(AUTH_SERVICE_URL_PROTECTED, async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ error: "No token provided" });

        const response = await axios.get(`${AUTH_SERVICE_URL}${AUTH_SERVICE_URL_PROTECTED}`, { headers: { Authorization: token } });
        res.json(response.data);
    } catch (error: any) {
        console.error(LOGS.ERROR_AUTH_SERVICE, error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
});

export default router;
