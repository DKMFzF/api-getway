import { Router, Request, Response } from "express";
import axios from "axios";
import { config } from "../config";

const router = Router();
const USER_SERVICE_URL = config.USER_SERVICE_URL;

/**
 * логин к сервису авторизации
 */

router.post(config.USER_SERVICE_URL_REGISTER, async (req: Request, res: Response) => {
    try {
        const response = await axios.post(`${USER_SERVICE_URL}/register`, req.body);
        res.json(response.data);
    } catch (error: any) {
        console.error("[ERROR]: User Service error:", error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
});

export default router;
