import { Router, Request, Response } from "express";
import axios from "axios";
import { config } from "../config/index.config";
import { LOGS } from "../utils/logs.service.condition";

const router = Router();
const USER_SERVICE_URL = config.USER_SERVICE_URL;
const USER_SERVICE_URL_REGISTER = config.USER_SERVICE_URL_REGISTER;
const USER_SERVICE_URL_CHANGE_PASS = config.USER_SERVICE_URL_CHANGE_PASS;

/**
 * логин к сервису авторизации
 */

// регистрация пользователя
router.post(USER_SERVICE_URL_REGISTER, async (req: Request, res: Response) => {
    try {
        const response = await axios.post(`${USER_SERVICE_URL}${USER_SERVICE_URL_REGISTER}`, req.body);
        res.json(response.data);
    } catch (error: any) {
        console.error(LOGS.ERROR_USER_SERVICE, error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
});

// изменение пароля
router.post(USER_SERVICE_URL_CHANGE_PASS, async (req: Request, res: Response) => {
    try {
        const response = await axios.post(`${USER_SERVICE_URL}${USER_SERVICE_URL_CHANGE_PASS}`, req.body);
        res.json(response.data);
    } catch (error: any) {
        console.error(LOGS.ERROR_USER_SERVICE, error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
})

export default router;
