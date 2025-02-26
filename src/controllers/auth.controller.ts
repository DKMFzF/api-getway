import { Request, Response } from 'express';
import { proxyRequest } from '../services/proxy.service';
import { config } from '../config';

/**
 * контроллеры для аунтификации
 */

export const login = async (req: Request, res: Response) => {
    try {
        const data = await proxyRequest(`${config.AUTH_SERVICE_URL}/login`, 'POST', req.body);
        res.json(data);
    } catch (error: any) {
        res.status(error.status).json({ error: error.message });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const data = await proxyRequest(`${config.USER_SERVICE_URL}/register`, 'POST', req.body);
        res.json(data);
    } catch (error: any) {
        res.status(error.status).json({ error: error.message });
    }
};
