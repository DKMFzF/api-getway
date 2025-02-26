import { Request, Response, NextFunction } from 'express';

/**
 * проверка токена
 */

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: '[ERROR]: No token provided' });

    next();
};
