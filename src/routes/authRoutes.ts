import { Router, Request, Response } from "express";
import axios from "axios";
import { config } from "../config";

/**
 * роутинг для к сервису аунтификации по JWT
 */

const router = Router();
const AUTH_SERVICE_URL = config.AUTH_SERVICE_URL;

router.post("/login", async (req: Request, res: Response) => {
    try {
        const response = await axios.post(`${AUTH_SERVICE_URL}/login`, req.body);
        res.json(response.data);
    } catch (error: any) {
        console.error("[ERROR]: Auth Service error:", error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
});

router.get("/protected", async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ error: "No token provided" });

        const response = await axios.get(`${AUTH_SERVICE_URL}/protected`, { headers: { Authorization: token } });
        res.json(response.data);
    } catch (error: any) {
        console.error("[ERROR]: Auth Service error:", error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: error.message });
    }
});

export default router;
